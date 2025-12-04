
var mural = require("../models/mural");
const axios = require("axios");
const JIRA_BASE_URL = "https://cortexsptech.atlassian.net";
const JIRA_EMAIL = "cortexsptech@gmail.com";
const JIRA_API_TOKEN =
  "ATATT3xFfGF0JcXq9KwvyMr5OGnI9q1yhsctTTDijkp33MFOMhbV3FBYMJf7Z24X464Vg9t6lZxlFt6iW9G9CNtkvuVs0KRgSoVPD4f-DMs8EqhIpbdcOU7WW49psWmuWwsjQk1COR8oHqqmDks_y20EsROhIRCcIJ1bAjOjg1eWVK3sLu2HPZw=4752F0D9";

function extrairCampos(issue) {
  const campos = {};
  const f = issue.fields;

  if (!f) return campos;

  if (f.summary) campos.summary = f.summary;
  if (f.description) campos.description = f.description;
  if (f.status?.name) campos.status = f.status.name;
  if (f.priority?.name) campos.priority = f.priority.name;
  if (f.issuetype?.name) campos.issuetype = f.issuetype.name;
  if (f.assignee?.displayName) campos.assignee = f.assignee.displayName;
  if (f.reporter?.displayName) campos.reporter = f.reporter.displayName;
  if (f.created) campos.created = f.created;
  if (f.updated) campos.updated = f.updated;
  if (f.project?.key) campos.project = f.project.key;

  Object.keys(f).forEach((key) => {
    if (key.startsWith("customfield_")) {
      const valor = f[key];
      if (valor !== null && valor !== undefined) {
        if (typeof valor === "object" && valor.value) {
          campos[key] = valor.value;
        } else if (typeof valor === "object" && valor.name) {
          campos[key] = valor.name;
        } else {
          campos[key] = valor;
        }
      }
    }
  });

  return campos;
}

function agruparPorModeloERecurso(issues) {
  const breakdown = {};

  const recursoPatterns = {
    CPU: /cpu|processador|processor|core/i,
    RAM: /ram|memory|memória|mem\b/i,
    Disco: /disco|disk|storage|ssd|hd\b/i,
    GPU: /gpu|vga|graphics|video|cuda/i,
  };

  issues.forEach((issue) => {
    const f = issue.fields;
    const summary = f.summary || "";
    const description = f.description || "";
    const textoCompleto = `${summary} ${description}`.toLowerCase();

    let modelo = "Desconhecido";
    const modelos = ["WAPX", "Vortex-2", "Astra-core", "Astra-Mini", "Vortex-1"];
    modelos.forEach((m) => {
      if (textoCompleto.includes(m.toLowerCase())) {
        modelo = m;
      }
    });

    if (modelo === "Desconhecido" && summary) {
      const partes = summary.split(/[-:]/);
      if (partes.length > 0) {
        modelo = partes[0].trim().toUpperCase().slice(0, 20) || "Desconhecido";
      }
    }

    if (!breakdown[modelo]) {
      breakdown[modelo] = { CPU: 0, RAM: 0, Disco: 0, GPU: 0 };
    }

    Object.entries(recursoPatterns).forEach(([recurso, pattern]) => {
      if (pattern.test(textoCompleto)) {
        breakdown[modelo][recurso]++;
      }
    });
  });

  return breakdown;
}


// Helpers para integração com Slack
async function encontrarChannelId(channelName, token) {
  if (!channelName) return null;
  const name = channelName.replace(/^#/, '');
  const url = 'https://slack.com/api/conversations.list?limit=1000&types=public_channel,private_channel';
  const resp = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!resp.data || !resp.data.ok) return null;
  const channel = (resp.data.channels || []).find(c => c.name === name || c.name_normalized === name);
  return channel ? channel.id : null;
}

async function buscarMensagensSlack(channelId, token, limit = 2000) {
  const mensagens = [];
  if (!channelId) return mensagens;

  let cursor = undefined;
  let fetched = 0;
  const pageSize = 200; // max per request

  while (fetched < limit) {
    const params = new URLSearchParams();
    params.append('channel', channelId);
    params.append('limit', pageSize);
    if (cursor) params.append('cursor', cursor);

    const url = `https://slack.com/api/conversations.history?${params.toString()}`;
    const resp = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!resp.data || !resp.data.ok) break;

    const msgs = resp.data.messages || [];
    mensagens.push(...msgs);
    fetched += msgs.length;
    if (!resp.data.response_metadata || !resp.data.response_metadata.next_cursor) break;
    cursor = resp.data.response_metadata.next_cursor;
    if (!cursor) break;
  }

  return mensagens;
}

function extrairModeloDeTexto(text, modelos) {
  if (!text) return null;
  const t = String(text || '');

  // 1) se foi passada uma lista conhecida, procura primeiro nela (case-insensitive)
  if (Array.isArray(modelos) && modelos.length > 0) {
    const lower = t.toLowerCase();
    for (const m of modelos) {
      if (lower.includes(String(m).toLowerCase())) return m;
    }
  }

  // normalize line endings
  const normalized = t.replace(/\r/g, '\n');

  // 2) padrão específico da ETL Java: linha como "Máquina: Modelo GenAI 192.168.0.192:DESKTOP-..."
  // captura após 'Máquina' seguido de 'Modelo' e pega somente tokens alfabéticos/ hífens até encontrar algo com dígito/colon
  const maquinaRx = /máquina\s*[:\-]?\s*modelo\s+([^\n\r]+)/i;
  let m = normalized.match(maquinaRx);
  if (m && m[1]) {
    let candidate = m[1].trim();
    const parts = candidate.split(/\s+/);
    const keep = [];
    for (const p of parts) {
      // se encontrar token que contenha dígito, '.' ou ':' provavelmente é IP/hostname, então para
      if (/[0-9]|[:.]/.test(p)) break;
      // evita tokens puros de pontuação
      if (/^[-_]+$/.test(p)) break;
      keep.push(p);
    }
    const name = keep.join(' ').trim();
    if (name) return name;
  }

  // 3) padrão "Modelo <nome> que está na Máquina ..." (como no String.format da ETL)
  const modeloQueRx = /modelo\s+([A-Za-zÀ-ÿ0-9 _\-]{1,60})\s+que\s+está/i;
  m = normalized.match(modeloQueRx);
  if (m && m[1]) {
    const candidate = m[1].trim().split(/\s+/).filter(tok => !/[0-9:.]/.test(tok)).join(' ');
    if (candidate) return candidate;
  }

  // 4) fallback genérico: pega o primeiro token após 'modelo' que não seja um identificador com dígitos
  const genericRx = /modelo[:\s-]*([^\n\r,;()]+)/i;
  m = normalized.match(genericRx);
  if (m && m[1]) {
    let candidate = m[1].trim();
    // corta se houver IP/hostname concatenado
    candidate = candidate.split(/\s+/).filter(tok => !/[0-9:.]/.test(tok)).join(' ').trim();
    if (candidate) return candidate;
  }

  return null;
}

function extrairTextDeMessage(msg) {
  // prioridade: blocks -> attachments -> text
  if (!msg) return '';
  if (msg.blocks && Array.isArray(msg.blocks)) {
    return msg.blocks.map(b => (b.text && b.text.text) || b.text || '').join('\n');
  }
  if (msg.attachments && Array.isArray(msg.attachments)) {
    return msg.attachments.map(a => a.text || (a.fields && a.fields.map(f => f.value).join(' ')) || '').join('\n');
  }
  return msg.text || '';
}

function contarRecursosEmTexto(text) {
  const counts = { CPU: 0, RAM: 0, Disco: 0, GPU: 0 };
  if (!text) return counts;
  const lower = text.toLowerCase();
  if (/\bcpu\b|processador|processor|core/i.test(lower)) counts.CPU++;
  if (/\bram\b|memory|memória|mem\b/i.test(lower)) counts.RAM++;
  if (/\bdisco\b|disk|storage|ssd|hd\b/i.test(lower)) counts.Disco++;
  if (/\bgpu\b|vga|graphics|video|cuda/i.test(lower)) counts.GPU++;
  return counts;
}

async function buscarTickets(nome) {
  try {
    const jql = 'project = CTX AND created >= startOfDay(-0d) ORDER BY created DESC';
    const body = {
      jql,
      maxResults: 50,
      expand: ["changelog", "names", "schema"],
    };

    const response = await axios.post(
      `${JIRA_BASE_URL}/rest/api/3/search`,
      body,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${JIRA_EMAIL}:${JIRA_API_TOKEN}`
          ).toString("base64")}`,
        },
      }
    );

    const tickets = [];
    const issues = response.data.issues || [];

    issues.forEach((issue) => {
      const f = issue.fields;
      if (f.summary.includes(nome.nome)) {
        const campos = extrairCampos(issue);
        tickets.push(campos);
      }
    });

    return tickets;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}

async function listar(req, res) {
  try {
    const idEmpresa = req.params.idEmpresa;
    const nomeEmpresa = await mural.buscar(idEmpresa);
    const tickets = await buscarTickets(nomeEmpresa[0]);

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}

async function obterBreakdownAlertas(req, res) {
  try {
    const jql = 'project = CTX AND created >= startOfDay(-7d) ORDER BY created DESC';
    const body = {
      jql,
      maxResults: 100,
      expand: ["changelog"],
    };

    const response = await axios.post(
      `${JIRA_BASE_URL}/rest/api/3/search`,
      body,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${JIRA_EMAIL}:${JIRA_API_TOKEN}`
          ).toString("base64")}`,
        },
      }
    );

    const issues = response.data.issues || [];
    const breakdown = agruparPorModeloERecurso(issues);

    res.status(200).json(breakdown);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ erro: error.message });
  }
}

async function obterBreakdownSlack(req, res) {
  try {
    const token = process.env.SLACK_BOT_TOKEN;
    const channelName = process.env.SLACK_CHANNEL_NAME || "alertas";

    if (!token) {
      return res
        .status(500)
        .json({ erro: "SLACK_BOT_TOKEN não configurado (variável de ambiente)" });
    }

    // localizar canal
    const channelId = await encontrarChannelId(channelName, token);
    if (!channelId) {
      return res
        .status(404)
        .json({ erro: `Canal Slack '${channelName}' não encontrado` });
    }

    // buscar mensagens
    const mensagens = await buscarMensagensSlack(channelId, token, 1000);

    const slackBreakdown = {};

    mensagens.forEach((msg) => {
      const rawText = extrairTextDeMessage(msg);

      if (!rawText || rawText.trim().length === 0) return;

      // nomrmaliza o texto
      const text = rawText
        .replace(/\*/g, "")     // remove negrito
        .replace(/_/g, "")      // remove itálico
        .replace(/`/g, "")      // remove formatação
        .replace(/\s+/g, " ")   // normaliza espaços
        .trim();

      // extrai o modelo
      const modeloRegex = /Modelo\s+([A-Za-z0-9\- ]+?)\s+que\s+está/i;
      const modeloMatch = text.match(modeloRegex);

      const modelo =
        modeloMatch?.[1]?.trim().toUpperCase() || "Desconhecido";

      if (modelo === "Desconhecido") return;

      // cria entrada se não existir (tipo um default)
      if (!slackBreakdown[modelo]) {
        slackBreakdown[modelo] = { CPU: 0, RAM: 0, Disco: 0, GPU: 0 };
      }

      // verifica qual métrica usar
      const lower = text.toLowerCase();

      if (lower.includes("cpu")) slackBreakdown[modelo].CPU++;
      if (lower.includes("ram")) slackBreakdown[modelo].RAM++;
      if (lower.includes("disco") || lower.includes("hd") || lower.includes("ssd")) {
        slackBreakdown[modelo].Disco++;
      }
      if (lower.includes("gpu") || lower.includes("cuda")) {
        slackBreakdown[modelo].GPU++;
      }
    });

    return res.status(200).json(slackBreakdown);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: error.message });
  }
}

async function overview(req, res) {
  try {
    const token = process.env.SLACK_BOT_TOKEN;
    const channelName = process.env.SLACK_CHANNEL_NAME || "alertas";

    if (!token) {
      return res.status(500).json({ erro: "SLACK_BOT_TOKEN não configurado" });
    }

    // buscar canal do slack
    const channelId = await encontrarChannelId(channelName, token);
    if (!channelId) {
      return res.status(404).json({ erro: `Canal Slack '${channelName}' não encontrado` });
    }

    // busca mensagens do slack
    const mensagensSlack = await buscarMensagensSlack(channelId, token, 2000);
    const agora = Date.now();
    const limite24h = agora - 24 * 60 * 60 * 1000;

    // filtrar ultimas 24h
    const mensagensValidas = mensagensSlack.filter(m => {
      if (!m.ts) return false;
      const tsMs = Number(m.ts.split(".")[0]) * 1000;
      return tsMs >= limite24h;
    });

    // processar mensagens do slack
    const modelosSlack = {};
    const categoriasSlack = {};
    const timelineSlack = {};

    mensagensValidas.forEach(msg => {
      const rawText = extrairTextDeMessage(msg);
      if (!rawText) return;

      const texto = rawText.replace(/\s+/g, " ").trim();

      // modelo
      const modelo = extrairModeloDeTexto(texto, ["Astra-Core", "Astra-Mini", "Vortex-1", "Vortex-2", "Vortex-3", "GenAI"]);
      const nomeModelo = modelo || "Desconhecido";

      if (!modelosSlack[nomeModelo]) {
        modelosSlack[nomeModelo] = { CPU: 0, RAM: 0, Disco: 0, GPU: 0 };
      }

      // categorias (CPU, RAM, Disco, GPU)
      const catRegex = /(CRITICO|CRÍTICO|MAJOR|MINOR|INFO|WARNING)/i;
      const categoria = (texto.match(catRegex)?.[1] || "DESCONHECIDO").toUpperCase();

      if (!categoriasSlack[categoria]) categoriasSlack[categoria] = 0;
      categoriasSlack[categoria]++;

      const recursos = contarRecursosEmTexto(texto);
      modelosSlack[nomeModelo].CPU += recursos.CPU;
      modelosSlack[nomeModelo].RAM += recursos.RAM;
      modelosSlack[nomeModelo].Disco += recursos.Disco;
      modelosSlack[nomeModelo].GPU += recursos.GPU;

      // intervalo de tempo
      const hora = new Date(Number(msg.ts.split(".")[0]) * 1000).getHours();
      if (!timelineSlack[hora]) timelineSlack[hora] = 0;
      timelineSlack[hora]++;
    });

    // jira
    const jql = `project = CTX AND created >= -1d ORDER BY created DESC`;

    const jiraResponse = await axios.post(
      `${JIRA_BASE_URL}/rest/api/3/search`,
      {
        jql,
        maxResults: 100,
        expand: ["changelog"]
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${JIRA_EMAIL}:${JIRA_API_TOKEN}`
          ).toString("base64")}`
        }
      }
    );

    const jiraIssues = jiraResponse.data.issues || [];
    const jiraBreakdown = agruparPorModeloERecurso(jiraIssues);

    // kpis
    const totalSlack = mensagensValidas.length;
    const totalJira = jiraIssues.length;

    const modeloMaisAfetado =
      Object.entries(modelosSlack).sort((a, b) =>
        (b[1].CPU + b[1].RAM + b[1].Disco + b[1].GPU) -
        (a[1].CPU + a[1].RAM + a[1].Disco + a[1].GPU)
      )[0]?.[0] || "N/A";

    const categoriaMaisRecorrente =
      Object.entries(categoriasSlack).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

    // return único
    return res.status(200).json({
      kpis: {
        total_alertas_slack: totalSlack,
        total_alertas_jira: totalJira,
        modelo_mais_afetado: modeloMaisAfetado,
        categoria_mais_recorrente: categoriaMaisRecorrente
      },
      slack_breakdown: modelosSlack,
      jira_breakdown: jiraBreakdown,
      timeline: {
        slack: timelineSlack
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: error.message });
  }
}

module.exports = {
  listar,
  obterBreakdownAlertas,
  obterBreakdownSlack,
  overview
};