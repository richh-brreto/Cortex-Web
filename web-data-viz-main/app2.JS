const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-pro";

const LATEST_JSON_PATH =
  process.env.LATEST_JSON_PATH || path.join(__dirname, "Latest.json");



function sanitizeModelsForAI(models = []) {
  return models.map((m) => ({
    empresa: m.empresa,
    zona: m.zona,
    hostname: m.hostname,
    name: m.name,
    processo: m.processo,
    metrics: m.metrics,
    sla: m.sla,
    status: m.status,
    health: m.health,
    hasTickets: m.hasTickets,
    ticketKey: m.ticketKey,
  }));
}

let geminiClient = null;
if (GEMINI_API_KEY) {
  geminiClient = new GoogleGenerativeAI(GEMINI_API_KEY);
}

function buildGeminiPrompt(userPrompt, models) {
  return `
Você é um copiloto de observabilidade para modelos de IA.

Modelos:
${JSON.stringify(models, null, 2)}

Pedido do usuário para o layout do dashboard:
"${userPrompt}"

Responda APENAS com JSON válido, seguindo o schema:

{
  "title": "string opcional",
  "sections": [
    {
      "type": "priority_grid" | "alert_banner" | "focus" | "sla_table" | "tickets",
      "title": "string opcional",
      "models": ["host-a1", "host-a2"],
      "host": "host-a1",
      "filter": {
        "metric": "cpu" | "ram" | "gpu" | "storage",
        "operator": ">" | ">=" | "<" | "<=",
        "value": number
      }
    }
  ]
}

Não retorne nada fora do JSON. Não use markdown.
`;
}

function buildGeminiActionsPrompt(payload) {
  const { empresa, models = [], tickets = [] } = payload;

  return `
Você é um copiloto de SRE/Observabilidade.

Empresa: "${empresa}".

MODELOS:
${JSON.stringify(models, null, 2)}

TICKETS:
${JSON.stringify(tickets, null, 2)}

Responda EXCLUSIVAMENTE neste formato JSON:

{
  "actions": [
    {
      "title": "Resumo curto da ação (máx. 100 caracteres)",
      "detail": "Texto objetivo explicando o que o analista deve fazer e por quê, em no máximo 2 frases."
    }
  ]
}

Não retorne nada fora do JSON. Não use markdown. JSON deve ser válido.
`;
}

function extractJsonFromText(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/^```(json)?/i, "")
      .replace(/```$/, "")
      .trim();
  }
  return cleaned;
}

app.post("/ai/layout", async (req, res) => {
  const { prompt, previewOnly } = req.body || {};
  const models = req.body?.context?.models || [];

  if (!prompt || typeof prompt !== "string") {
    return res
      .status(400)
      .json({ success: false, error: "Campo 'prompt' é obrigatório." });
  }

  if (!Array.isArray(models) || models.length === 0) {
    return res.status(400).json({
      success: false,
      error: "Lista 'models' é obrigatória e não pode ser vazia.",
    });
  }

  const safeModels = sanitizeModelsForAI(models);

  if (!geminiClient) {
    const layoutFallback = {
      layoutId: "fallback-layout",
      generatedAt: new Date().toISOString(),
      title: "Layout padrão",
      sections: [
        {
          type: "alert_banner",
          title: "Alertas",
        },
        {
          type: "priority_grid",
          title: "Modelos com maior uso de CPU",
          filter: {
            metric: "cpu",
            operator: ">",
            value: 70,
          },
        },
        {
          type: "tickets",
          title: "Tickets associados a modelos críticos",
        },
      ],
    };

    return res.json({
      success: true,
      layout: layoutFallback,
      previewOnly: !!previewOnly,
      from: "fallback",
    });
  }

  try {
    const model = geminiClient.getGenerativeModel({
      model: GEMINI_MODEL,
    });

    const systemPrompt = buildGeminiPrompt(prompt, safeModels);

    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();
    const jsonString = extractJsonFromText(text);

    let layout;
    try {
      layout = JSON.parse(jsonString);
    } catch (parseErr) {
      return res.status(500).json({
        success: false,
        error: "Formato inválido retornado pela IA para o layout.",
      });
    }

    if (!layout.sections || !Array.isArray(layout.sections)) {
      return res.status(500).json({
        success: false,
        error: "Layout retornado não contém 'sections' válidas.",
      });
    }

    return res.json({
      success: true,
      layout,
      previewOnly: !!previewOnly,
      from: "gemini",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Erro interno ao gerar sugestão de layout com a IA.",
    });
  }
});

app.get("/s3Route/dados/Latest.json", (req, res) => {
  try {
    if (!fs.existsSync(LATEST_JSON_PATH)) {
      return res.status(404).json({
        error: `Latest.json não encontrado em ${LATEST_JSON_PATH}.`,
      });
    }
    const raw = fs.readFileSync(LATEST_JSON_PATH, "utf-8");
    const json = JSON.parse(raw);
    res.json(json);
  } catch {
    res.status(500).json({ error: "Erro ao ler Latest.json" });
  }
});

function computeSlaGlobal(models = []) {
  let total = 0;
  let ok = 0;

  models.forEach((m) => {
    if (!m.metrics || !m.sla) return;
    const checks = [
      { val: m.metrics.cpu, limit: m.sla.CPU },
      { val: m.metrics.ram, limit: m.sla.RAM },
      { val: m.metrics.gpu, limit: m.sla.GPU },
      { val: m.metrics.storage, limit: m.sla.DISCO },
    ];
    checks.forEach((c) => {
      if (!c.limit) return;
      total++;
      if (c.val <= c.limit) ok++;
    });
  });

  return total ? (ok / total) * 100 : 100;
}

function aggregateArchitectures(models = []) {
  const map = {};

  models.forEach((m) => {
    const arch = m.architecture || "Arquitetura padrão";
    if (!map[arch]) {
      map[arch] = {
        name: arch,
        models: 0,
        critical: 0,
        warning: 0,
        violCpu: 0,
        violRam: 0,
        violGpu: 0,
        violStorage: 0,
      };
    }
    const a = map[arch];
    a.models++;
    if (m.status === "critical") a.critical++;
    if (m.status === "warning") a.warning++;

    if (m.metrics && m.sla) {
      if (m.metrics.cpu > m.sla.CPU) a.violCpu++;
      if (m.metrics.ram > m.sla.RAM) a.violRam++;
      if (m.metrics.gpu > m.sla.GPU) a.violGpu++;
      if (m.metrics.storage > m.sla.DISCO) a.violStorage++;
    }
  });

  return Object.values(map).map((a) => {
    const totalViol = a.violCpu + a.violRam + a.violGpu + a.violStorage;
    const maxViol = a.models * 4 || 1;
    const pressureBase = totalViol / maxViol;
    const pressure = Math.min(100, pressureBase * 100);
    const resSorted = [
      ["CPU", a.violCpu],
      ["RAM", a.violRam],
      ["GPU", a.violGpu],
      ["DISCO", a.violStorage],
    ]
      .sort((x, y) => y[1] - x[1])
      .filter(([, v]) => v > 0);

    return {
      ...a,
      pressure,
      mainPressure: resSorted.length
        ? resSorted.map((r) => r[0]).join(", ")
        : "Distribuído",
    };
  });
}

function aggregateZones(models = []) {
  const aggregated = {};

  models.forEach((m) => {
    const zone = m.zona || "Sem zona";
    if (!aggregated[zone]) {
      aggregated[zone] = {
        count: 0,
        totalHealth: 0,
        critical: 0,
        warning: 0,
      };
    }
    const z = aggregated[zone];
    z.count++;
    z.totalHealth += m.health || 0;
    if (m.status === "critical") z.critical++;
    if (m.status === "warning") z.warning++;
  });

  Object.keys(aggregated).forEach((zone) => {
    const z = aggregated[zone];
    z.avgHealth = z.count ? z.totalHealth / z.count : 100;
  });

  return aggregated;
}

function aggregateTickets(tickets = []) {
  const byStatus = {};
  tickets.forEach((t) => {
    const st = t.status || "new";
    byStatus[st] = (byStatus[st] || 0) + 1;
  });
  return byStatus;
}

function generateActionsRuleBased(payload = {}) {
  const { empresa, models = [], tickets = [] } = payload;

  const actions = [];
  const criticalModels = models.filter((m) => m.status === "critical");
  const warningModels = models.filter((m) => m.status === "warning");
  const slaGlobal = computeSlaGlobal(models);
  const archs = aggregateArchitectures(models);
  const zones = aggregateZones(models);
  const ticketSummary = aggregateTickets(tickets);

  if (criticalModels.length) {
    const topCritical = criticalModels
      .sort((a, b) => a.health - b.health)
      .slice(0, 5)
      .map((m) => `${m.name} (${m.zona}, health ${m.health}%)`);

    actions.push({
      title: `Tratar modelos críticos (${criticalModels.length})`,
      detail:
        `Priorize os seguintes modelos em ${empresa}: ` +
        topCritical.join(", ") +
        `. Revise consumo de recursos e SLAs.`,
    });
  }

  if (warningModels.length) {
    const names = warningModels.slice(0, 5).map((m) => `${m.name} (${m.zona})`);
    actions.push({
      title: `Monitorar modelos em atenção (${warningModels.length})`,
      detail:
        `Modelos em atenção: ` +
        names.join(", ") +
        `. Acompanhe tendência e crie alertas antes de violar SLAs.`,
    });
  }

  if (archs.length) {
    const worstArch = [...archs].sort((a, b) => b.pressure - a.pressure)[0];
    actions.push({
      title: `Revisar arquitetura mais pressionada (${worstArch.name})`,
      detail: `Pressão estimada em ${worstArch.pressure.toFixed(
        0
      )}%, maior incidência em ${
        worstArch.mainPressure
      }. Avalie redistribuição ou aumento de capacidade.`,
    });
  }

  const zoneEntries = Object.entries(zones);
  if (zoneEntries.length) {
    const worstZones = zoneEntries
      .sort(([, a], [, b]) => a.avgHealth - b.avgHealth)
      .slice(0, 3)
      .map(
        ([name, z]) =>
          `${name} (health médio ${z.avgHealth.toFixed(0)}%, ${
            z.critical
          } críticos)`
      );

    actions.push({
      title: "Atuar nas zonas mais sensíveis",
      detail:
        `Zonas com pior saúde média: ` +
        worstZones.join(", ") +
        `. Revise capacidade, distribuição de carga e SLAs.`,
    });
  }

  if (slaGlobal < 90) {
    actions.push({
      title: "Melhorar aderência ao SLA",
      detail: `SLA Global estimado em ${slaGlobal.toFixed(
        1
      )}%. Revise limites e padrões de consumo por modelo.`,
    });
  }

  const totalTickets = tickets.length;
  if (totalTickets) {
    const statusText = Object.entries(ticketSummary)
      .map(([st, count]) => `${st}: ${count}`)
      .join(" • ");

    actions.push({
      title: `Revisar filas de tickets (${totalTickets})`,
      detail: `Tickets ativos (${statusText}). Priorize os ligados a modelos críticos/atenção.`,
    });
  }

  if (!actions.length) {
    actions.push({
      title: "Ambiente saudável",
      detail: `Nenhuma ação urgente identificada para ${empresa}. Mantenha monitoramento e revisão periódica.`,
    });
  }

  return actions;
}

app.post("/ai/actions", async (req, res) => {
  const payload = req.body || {};

  if (!geminiClient) {
    const actions = generateActionsRuleBased(payload);
    return res.json({ actions, from: "fallback" });
  }

  try {
    const model = geminiClient.getGenerativeModel({
      model: GEMINI_MODEL,
    });

    const prompt = buildGeminiActionsPrompt(payload);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonString = extractJsonFromText(text);

    let data;
    try {
      data = JSON.parse(jsonString);
    } catch {
      const actions = generateActionsRuleBased(payload);
      return res.json({ actions, from: "fallback-parse-error" });
    }

    if (!Array.isArray(data.actions)) {
      const actions = generateActionsRuleBased(payload);
      return res.json({ actions, from: "fallback-invalid-schema" });
    }

    return res.json({ actions: data.actions, from: "gemini" });
  } catch {
    const actions = generateActionsRuleBased(payload);
    return res.json({ actions, from: "fallback-error" });
  }
});

function buildGeminiChatPrompt(message, context) {
  const { empresa, models = [] } = context || {};

  return `
Você é um copiloto de observabilidade para modelos de IA em produção.

Empresa: "${empresa || "Desconhecida"}"

Modelos:
${JSON.stringify(models, null, 2)}

Pergunta do usuário:
"${message}"

Responda em português, de forma objetiva, em no máximo 3 parágrafos curtos.
`;
}

app.post("/ai/chat", async (req, res) => {
  const { message, context } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Campo 'message' é obrigatório." });
  }

  if (!geminiClient) {
    const models = context?.models || [];
    const critical = models.filter((m) => m.status === "critical").length;
    const warning = models.filter((m) => m.status === "warning").length;

    const replyFallback =
      `Vejo ${critical} modelo(s) em estado crítico e ` +
      `${warning} em atenção. Recomendo focar primeiro nos críticos e depois acompanhar os de atenção.`;

    return res.json({ reply: replyFallback, from: "fallback" });
  }

  try {
    const model = geminiClient.getGenerativeModel({ model: GEMINI_MODEL });
    const prompt = buildGeminiChatPrompt(message, context || {});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.json({ reply: text, from: "gemini" });
  } catch(e) {
    console.log(e)
    return res.status(500).json({
      error: "Erro interno ao conversar com a IA.",
    });
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", hasGemini: !!geminiClient });
});

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
