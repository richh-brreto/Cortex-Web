const CONFIG = {
  API_URL: "http://localhost:8080",
  DATA_PATH: "/s3Route/dados/Latest.json",
  AI_URL: "http://localhost:3333/ai/actions",
};

const state = {
  empresaId: null,
  empresaNome: "",
  models: [],
  zones: [],
  aiActions: null,
};

// ============================================================================
// CHAT COPILOTO
// ============================================================================

function initCopilotChat() {
  const toggleBtn = document.getElementById("chatToggle");
  const panel = document.getElementById("chatPanel");
  const closeBtn = document.getElementById("chatClose");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const messagesEl = document.getElementById("chatMessages");

  if (!toggleBtn || !panel || !form || !input || !messagesEl) return;

  const appendMessage = (text, from) => {
    const div = document.createElement("div");
    div.className = `chat-msg ${from}`;
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  toggleBtn.addEventListener("click", () => {
    panel.classList.toggle("hidden");
    if (!panel.classList.contains("hidden")) input.focus();
  });

  closeBtn.addEventListener("click", () => {
    panel.classList.add("hidden");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    appendMessage(text, "user");

    try {
      const modelsPayload = state.models.map((m) => ({
        name: m.name,
        hostname: m.hostname,
        zona: m.zona,
        status: m.status,
        health: m.health,
        metrics: m.metrics,
        sla: m.sla,
        architecture: m.architecture,
      }));

      const res = await fetch(`http://localhost:3333/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          context: {
            empresa: state.empresaNome,
            models: modelsPayload,
          },
        }),
      });

      if (!res.ok) {
        appendMessage("Não consegui falar com a IA agora. Tente novamente mais tarde.", "ai");
        return;
      }

      const data = await res.json();
      appendMessage(data.reply || "Sem resposta da IA.", "ai");
    } catch (err) {
      console.error(err);
      appendMessage("Ocorreu um erro ao consultar a IA.", "ai");
    }
  });
}

// ============================================================================
// UTILIDADES
// ============================================================================

const Utils = {
  getEmpresaIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("empresaId");
    const id = raw ? parseInt(raw, 10) : null;
    return Number.isNaN(id) ? null : id;
  },

  formatDuration(ms) {
    if (!ms || ms < 0) return "—";
    const totalSec = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSec / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ${hours % 24}h`;
    if (hours > 0) return `${hours}h ${minutes % 60}m`;
    if (minutes > 0) return `${minutes}m`;
    return `${totalSec}s`;
  },

  showToast(msg) {
    const container = document.getElementById("toast-container");
    if (!container) return;
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    container.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  },
};

// ============================================================================
// TEMPLATES DE COMPONENTES
// ============================================================================

const ComponentTemplates = {
  snapshotOperation: (data) => `
    <div class="component" data-component="snapshotOperation">
      <div class="component-header">
        <div class="component-icon">📊</div>
        <div class="component-title">
          <h3>Resumo da Operação</h3>
          <p class="context">
            ${data.zonesCount} zonas • ${data.totalModels} modelos monitorados.
          </p>
        </div>
      </div>
      <div class="stats-grid">
        <div class="stat-card ${data.zonesCount > 80 ?"ok": (data.zonesCount > 60? "warning":"critical")}">
          <div class="stat-icon">🎯</div>
          <div class="stat-content">
            <span class="stat-label">SLA Global de Recursos</span>
            <span class="stat-value ">${data.slaGlobal.toFixed(1)}%</span>
          </div>
          <span class="stat-context">% de medições de CPU, RAM, GPU e Disco dentro do limite configurado em SLA de cada modelo junto.</span>
        </div>
        <div class="stat-card critical">
          <div class="stat-icon">🚨</div>
          <div class="stat-content">
            <span class="stat-label">Modelos Críticos</span>
            <span class="stat-value">${data.criticalCount}</span>
          </div>
          <span class="stat-context">Saude < 60% ou violações graves de SLA do modelo.</span>
        </div>
        <div class="stat-card warning">
          <div class="stat-icon">⚠️</div>
          <div class="stat-content">
            <span class="stat-label">Modelos em Atenção</span>
            <span class="stat-value">${data.warningCount}</span>
          </div>
          <span class="stat-context">Saude entre 60% e 80% ou métricas de recursos se aproximando do limite da SLA.</span>
        </div>
        <div class="stat-card ${data.totalTickets < 3 ? "ok": (data.totalTickets < 7? "warning":"critical")}">
          <div class="stat-icon">🎟️</div>
          <div class="stat-content">
            <span class="stat-label">Tickets Abertos</span>
            <span class="stat-value">${data.totalTickets}</span>
          </div>
          <span class="stat-context">Total te tickets em andamento associados aos modelos monitorados.</span>
        </div>
        </div>
        <div class="component-footer">
          <div class="legend">
            <span class="legend-label">Legenda:</span>
            <span class="legend-item ok"><div class="severity-dot ok"></div><div class="legenda"> Saudável</div></span>
            <span class="legend-item warning"><div class="severity-dot warning"></div><div class="legenda"> Atenção</div></span>
            <span class="legend-item critical"><div class="severity-dot critical"></div><div class="legenda"> Crítico</div></span>
          </div>
        </div>
    </div>
  `,

  riskByZone: (zones) => `
    <div class="component" data-component="riskByZone">
      <div class="component-header">
        <div class="component-icon">🗺️</div>
        <div class="component-title">
          <h3>Mapa de Risco por Zona</h3>
          <p class="context">
            Saude da Zona, quantidade de modelos críticos/em atenção e recurso que mais pressiona em cada zona.
          </p>
        </div>
      </div>
      <div class="heatmap-grid">
        ${Object.entries(zones)
          .map(
            ([zone, data]) => `
          <div class="heatmap-cell ${data.status}">
            <div class="zone-name">${zone}</div>
            <div class="zone-health">${data.avgHealth.toFixed(0)}%</div>
            <div class="zone-count">${data.count} modelos</div>
            <div class="zone-context">
              <small>${data.critical} críticos • ${data.warning} em atenção<br>
              Principal pressão: ${data.mainResource || "—"}</small>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
      <div class="component-footer">
        <div class="legend">
          <span class="legend-label">Legenda:</span>
          <span class="legend-item ok"><div class="severity-dot ok"></div><div class="legenda"> 80–100% Saudável</div></span>
          <span class="legend-item warning"><div class="severity-dot warning"></div><div class="legenda"> 60–80% Atenção</div></span>
          <span class="legend-item critical"><div class="severity-dot critical"></div><div class="legenda"> 0–60% Crítico</div></span>
        </div>
      </div>
    </div>
  `,

  scopeSummary: (data) => `
    <div class="component" data-component="scopeSummary">
      <div class="component-header">
        <div class="component-icon">🏗️</div>
        <div class="component-title">
          <h3>Arquiteturas e Escopo Monitorado</h3>
          <p class="context">
            Visão macro de como os modelos estão distribuídos entre zonas e arquiteturas de infraestrutura.
          </p>
        </div>
      </div>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">🌐</div>
          <div class="stat-content">
            <span class="stat-label">Zonas Ativas</span>
            <span class="stat-value ">${data.zonesCount}</span>
            <span class="stat-context">Ambientes distintos onde há modelos em execução.</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏛️</div>
          <div class="stat-content">
            <span class="stat-label">Arquiteturas</span>
            <span class="stat-value">${data.archCount}</span>
            <span class="stat-context">Combinações de CPU, RAM, GPU e Disco em uso.</span>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚙️</div>
          <div class="stat-content">
            <span class="stat-label">Média de modelos por arquitetura</span>
            <span class="stat-value">${data.avgModelsPerArch.toFixed(1)}</span>
            <span class="stat-context">Ajuda a identificar arquiteturas superlotadas.</span>
          </div>
        </div>
      </div>
    </div>
  `,

  slaByResource: (resources) => `
    <div class="component" data-component="slaByResource">
      <div class="component-header">
        <div class="component-icon">📏</div>
        <div class="component-title">
          <h3>SLA por Recurso</h3>
          <p class="context">
            Para cada recurso, quantos modelos estão violando o SLA e em qual modelo o impacto é mais forte.
          </p>
        </div>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Recurso</th>
              <th>Modelos violando</th>
              <th>% Dentro do SLA</th>
              <th>Principal modelo afetado</th>
            </tr>
          </thead>
          <tbody>
            ${resources
              .map(
                (r) => `
              <tr>
                <td class="cell-main">${r.label}</td>
                <td>${r.violating}</td>
                <td>${r.okRate.toFixed(1)}%</td>
                <td>
                  ${
                    r.worstModel
                      ? `<div class="cell-main">${r.worstModel.name}</div>
                       <div class="cell-sub">${r.worstModel.zona} • ${r.worstModel.hostname}</div>`
                      : "—"
                  }
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,

  modelsRisk: (models) => `
    <div class="component" data-component="modelsRisk">
      <div class="component-header">
        <div class="component-icon critical">🚨</div>
        <div class="component-title">
          <h3>Modelos em Risco</h3>
          <p class="context">
            Modelos em estado Crítico ou Atenção, com barras de CPU, RAM, GPU e Disco vs SLA.
          </p>
        </div>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Health</th>
              <th>CPU</th>
              <th>RAM</th>
              <th>GPU</th>
              <th>Disco</th>
            </tr>
          </thead>
          <tbody>
            ${models
              .map(
                (m) => `
        <tr class="clickable" data-id-modelo="${m.idModelo || ""}">
          <td>
            <div class="cell-main">${m.name}</div>
            <div class="cell-sub">${m.hostname} • ${m.zona}</div>
          </td>
          <td>
            <div class="health-indicator ${m.status}">
              ${m.health}%
            </div>
          </td>
          ${["cpu", "ram", "gpu", "storage"]
            .map(
              (key) => `
            <td>
              <div class="metric-row">
                <div class="metric-bar-container">
                  <div class="metric-bar" style="width:${Math.min(100, m.metrics[key] || 0)}%"></div>
                </div>
                <span class="metric-value">${(m.metrics[key] || 0).toFixed(1)}%</span>
                <span class="metric-sla">
                  SLA: ${key === "storage" ? m.sla.DISCO || 0 : m.sla[key.toUpperCase()] || 0}%
                </span>
              </div>
            </td>
          `
            )
            .join("")}
        </tr>
      `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,

  architecturesPressure: (architectures) => `
    <div class="component" data-component="architecturesPressure">
      <div class="component-header">
        <div class="component-icon">🏗️</div>
        <div class="component-title">
          <h3>Arquiteturas Mais Pressionadas</h3>
          <p class="context">
            Para cada arquitetura, quantos modelos rodam nela, quantos estão em risco e quais recursos mais pesam.
          </p>
        </div>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Arquitetura</th>
              <th>Modelos</th>
              <th>Críticos / Atenção</th>
              <th>Pressão Geral</th>
              <th>Origem da Pressão</th>
            </tr>
          </thead>
          <tbody>
            ${architectures
              .map(
                (a) => `
              <tr>
                <td>
                  <div class="cell-main">${a.name}</div>
                  <div class="cell-sub">${a.spec}</div>
                </td>
                <td>${a.models}</td>
                <td>${a.critical} críticos • ${a.warning} atenção</td>
                <td>
                  <div class="metric-bar-container">
                    <div class="metric-bar" style="width:${a.pressure}%"></div>
                    <span class="metric-value">${a.pressure.toFixed(0)}%</span>
                  </div>
                </td>
                <td>${a.mainPressure}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,

  alertsTop5: (alerts) => `
    <div class="component" data-component="alertsTop5">
      <div class="component-header">
        <div class="component-icon critical">📣</div>
        <div class="component-title">
          <h3>Top 5 Alertas</h3>
          <p class="context">
            Alertas mais relevantes considerando severidade, recurso afetado e distância do SLA.
          </p>
        </div>
        <span class="badge critical">${alerts.length}</span>
      </div>
      <div class="alerts-list">
        ${
          alerts.length === 0
            ? `<div class="empty-state"><p>✅ Nenhum alerta relevante no momento.</p></div>`
            : alerts
                .map(
                  (a) => `
          <div class="alert-item ${a.severity}">
            <div class="alert-header">
              <strong>${a.modelo}</strong>
              <span class="alert-badge">
                ${a.recurso.toUpperCase()} • ${a.valor.toFixed(1)}% (> SLA ${a.limit}%)
              </span>
            </div>
            <div class="alert-details">
              <span class="detail">📍 ${a.zona}</span>
              <span class="detail">🖥️ ${a.hostname}</span>
            </div>
            <div class="alert-context">
              <small>Uso de ${a.recurso.toUpperCase()} acima do SLA nesta coleta.</small>
            </div>
          </div>
        `
                )
                .join("")
        }
      </div>
    </div>
  `,

  ticketsPanel: (tickets) => `
    <div class="component" data-component="ticketsPanel">
      <div class="component-header">
        <div class="component-icon">🎫</div>
        <div class="component-title">
          <h3>Tickets (Jira)</h3>
          <p class="context">
            Incidentes abertos por modelo, com foco no tempo em aberto e última atualização.
          </p>
        </div>
      </div>
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>Modelo</th>
              <th>Status</th>
              <th>Tempo aberto</th>
              <th>Última atualização</th>
            </tr>
          </thead>
          <tbody>
            ${
              tickets.length === 0
                ? `<tr><td class="cell-sub" colspan="5">✅ Nenhum ticket aberto.</td></tr>`
                : tickets
                    .map(
                      (t) => `
              <tr>
                <td class="cell-main">${t.key}</td>
                <td>
                  <div class="cell-main">${t.modelName}</div>
                  <div class="cell-sub">${t.hostname}</div>
                </td>
                <td><span class="status-badge ${t.statusCategory}">${t.statusLabel}</span></td>
                <td>${t.openFor}</td>
                <td>${t.updatedAgo}</td>
              </tr>
            `
                    )
                    .join("")
            }
          </tbody>
        </table>
      </div>
    </div>
  `,

  aiActions: (actions) => `
    <div class="component" data-component="aiActions">
      <div class="component-header">
        <div class="component-icon">🧠</div>
        <div class="component-title">
          <h3>Ações Sugeridas</h3>
          <p class="context">
            Próximos passos recomendados com base em modelos críticos, SLAs violados e arquiteturas pressionadas.
          </p>
        </div>
      </div>
      <ol class="actions-list">
        ${actions
          .map(
            (a) => `
          <li>
            <strong>${a.title}</strong>
            <p class="context">${a.detail}</p>
          </li>
        `
          )
          .join("")}
      </ol>
      <div class="component-footer">
        <small>💡 Este bloco pode ser usado como copiloto.</small>
      </div>
    </div>
  `,
};

// ============================================================================
// LAYOUT ENGINE
// ============================================================================

const LayoutEngine = {
  mainEl: null,
  components: [
    "snapshotOperation",
    "riskByZone",
    "scopeSummary",
    "slaByResource",
    "modelsRisk",
    "architecturesPressure",
    "alertsTop5",
    "ticketsPanel",
    "aiActions",
  ],

  init() {
    this.mainEl = document.querySelector(".dashboard-main");
    const layoutName = document.getElementById("layout-name");
    if (layoutName) {
      layoutName.textContent = "Visão Geral";
    }
  },

  render() {
    if (!this.mainEl) return;
    const html = this.components
      .map((type) => this.renderComponent(type))
      .filter(Boolean)
      .join("");
    this.mainEl.innerHTML = html;
    this.initModelsRiskClicks();
  },

  initModelsRiskClicks() {
    const rows = document.querySelectorAll('[data-component="modelsRisk"] tbody tr.clickable');
    rows.forEach((row) => {
      row.addEventListener("click", () => {
        const id = row.getAttribute("data-id-modelo");
        if (id) verProcesso(id);
      });
    });
  },

  renderComponent(type) {
    const models = state.models;
    const empresaNome = state.empresaNome;
    const zones = state.zones;

    switch (type) {
      case "snapshotOperation": {
        const slaStats = this.calcSlaStats();
        const criticalCount = models.filter((m) => m.status === "critical").length;
        const warningCount = models.filter((m) => m.status === "warning").length;
        const totalTickets = models.reduce((acc, m) => acc + (m.rawTickets?.length || 0), 0);
        return ComponentTemplates.snapshotOperation({
          empresaNome,
          slaGlobal: slaStats.slaGlobal,
          criticalCount,
          warningCount,
          totalModels: models.length,
          zonesCount: zones.length,
          totalTickets,
        });
      }

      case "riskByZone":
        return ComponentTemplates.riskByZone(this.aggregateZones());

      case "scopeSummary": {
        const archs = this.aggregateArchitectures();
        const archCount = archs.length;
        const avgModelsPerArch = archCount ? models.length / archCount : 0;
        return ComponentTemplates.scopeSummary({
          empresaNome,
          zonesCount: zones.length,
          archCount,
          avgModelsPerArch,
        });
      }

      case "slaByResource":
        return ComponentTemplates.slaByResource(this.aggregateSlaByResource());

      case "modelsRisk": {
        const riskModels = models
          .filter((m) => m.status !== "ok")
          .sort((a, b) => a.health - b.health);
        return ComponentTemplates.modelsRisk(riskModels);
      }

      case "architecturesPressure":
        return ComponentTemplates.architecturesPressure(this.aggregateArchitectures());

      case "alertsTop5":
        return ComponentTemplates.alertsTop5(this.buildAlertsFromModels());

      case "ticketsPanel":
        return ComponentTemplates.ticketsPanel(this.flattenTickets());

      case "aiActions": {
        const actions = state.aiActions || this.buildAiActionsFallback();
        return ComponentTemplates.aiActions(actions);
      }

      default:
        return "";
    }
  },

  calcSlaStats() {
    let total = 0;
    let ok = 0;
    state.models.forEach((m) => {
      if (!m.metrics || !m.sla) return;
      console.log(m)
      const checks = [
        { val: m.metrics.cpu, limit: m.sla.CPU },
        { val: m.metrics.ram, limit: m.sla.RAM },
        { val: m.metrics.gpu, limit: m.sla.GPU },
        { val: m.metrics.storage, limit: m.sla.DISCO },
      ];
      checks.forEach((c) => {
        console.log(c,total, ok)
        if (!c.limit) return;
        total++;
        if (c.val <= c.limit) ok++;
      });
    });
    console.log(total, ok);
    return { slaGlobal: total ? (ok / total) * 100 : 100 };
  },

  aggregateZones() {
    const aggregated = {};
    state.models.forEach((m) => {
      const zone = m.zona || "Sem zona";
      if (!aggregated[zone]) {
        aggregated[zone] = {
          count: 0,
          totalHealth: 0,
          critical: 0,
          warning: 0,
          resources: { cpu: 0, ram: 0, gpu: 0, storage: 0 },
        };
      }
      const z = aggregated[zone];
      z.count++;
      z.totalHealth += m.health || 0;
      if (m.status === "critical") z.critical++;
      if (m.status === "warning") z.warning++;

      if (m.metrics && m.sla) {
        if (m.metrics.cpu > m.sla.CPU) z.resources.cpu++;
        if (m.metrics.ram > m.sla.RAM) z.resources.ram++;
        if (m.metrics.gpu > m.sla.GPU) z.resources.gpu++;
        if (m.metrics.storage > m.sla.DISCO) z.resources.storage++;
      }
    });

    Object.keys(aggregated).forEach((zone) => {
      const z = aggregated[zone];
      z.avgHealth = z.count ? z.totalHealth / z.count : 100;
      z.status = z.avgHealth >= 80 ? "ok" : z.avgHealth >= 60 ? "warning" : "critical";
      const sorted = Object.entries(z.resources)
        .sort((a, b) => b[1] - a[1])
        .filter(([, v]) => v > 0);
      z.mainResource = sorted.length ? sorted[0][0] : null;
    });

    return aggregated;
  },

  aggregateSlaByResource() {
    const keys = ["cpu", "ram", "gpu", "storage"];
    return keys.map((key) => {
      let total = 0;
      let ok = 0;
      let violatingModels = new Set();
      let worstModel = null;

      state.models.forEach((m) => {
        if (!m.metrics || !m.sla) return;
        const val = m.metrics[key] || 0;
        const limit = key === "storage" ? m.sla.DISCO : m.sla[key.toUpperCase()];
        if (!limit) return;
        total++;
        if (val <= limit) {
          ok++;
        } else {
          violatingModels.add(m.hostname);
          const diff = val - limit;
          if (!worstModel || diff > worstModel.diff) {
            worstModel = { ...m, diff };
          }
        }
      });

      return {
        key,
        label: key === "storage" ? "Disco" : key.toUpperCase(),
        violating: violatingModels.size,
        okRate: total ? (ok / total) * 100 : 100,
        worstModel,
      };
    });
  },

  aggregateArchitectures() {
    const map = {};
    state.models.forEach((m) => {
      const arch = m.architecture || "Arquitetura padrão";
      if (!map[arch]) {
        map[arch] = {
          name: arch,
          spec: m.archSpec || "",
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
      const pressure = Math.min(100, (totalViol / maxViol) * 100);
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
        mainPressure: resSorted.length ? resSorted.map((r) => r[0]).join(", ") : "Distribuído",
      };
    });
  },

  buildAlertsFromModels() {
    const alerts = [];
    state.models.forEach((m) => {
      if (!m.metrics || !m.sla) return;
      const checks = [
        { key: "cpu", label: "CPU", val: m.metrics.cpu, limit: m.sla.CPU },
        { key: "ram", label: "RAM", val: m.metrics.ram, limit: m.sla.RAM },
        { key: "gpu", label: "GPU", val: m.metrics.gpu, limit: m.sla.GPU },
        { key: "storage", label: "DISCO", val: m.metrics.storage, limit: m.sla.DISCO },
      ];
      checks.forEach((c) => {
        if (!c.limit) return;
        if (c.val > c.limit) {
          alerts.push({
            modelo: m.name,
            hostname: m.hostname,
            zona: m.zona,
            recurso: c.label,
            valor: c.val,
            limit: c.limit,
            severity: m.status === "critical" ? "critical" : "warning",
          });
        }
      });
    });

    alerts.sort((a, b) => {
      const sev = (s) => (s === "critical" ? 2 : 1);
      if (sev(b.severity) !== sev(a.severity)) {
        return sev(b.severity) - sev(a.severity);
      }
      return b.valor - a.valor;
    });

    return alerts.slice(0, 5);
  },

  flattenTickets() {
    const all = [];
    const now = new Date();
    state.models.forEach((m) => {
      (m.rawTickets || []).forEach((t) => {
        const key = t.key || t.id || "—";
        const fields = t.fields || {};
        const statusObj = fields.status || {};
        const statusCategory = (statusObj.statusCategory?.key) || "new";
        const statusLabel = statusObj.name || statusCategory;
        const created = fields.created ? new Date(fields.created) : null;
        const updated = fields.updated ? new Date(fields.updated) : null;
        const openFor = created ? Utils.formatDuration(now - created) : "—";
        const updatedAgo = updated ? Utils.formatDuration(now - updated) : "—";

        all.push({
          key,
          modelName: m.name,
          hostname: m.hostname,
          statusCategory,
          statusLabel,
          openFor,
          updatedAgo,
        });
      });
    });
    return all;
  },

  buildAiActionsFallback() {
    const models = state.models;
    const criticalModels = models.filter((m) => m.status === "critical");
    const warningModels = models.filter((m) => m.status === "warning");
    const slaStats = this.calcSlaStats();
    const archs = this.aggregateArchitectures();
    const actions = [];

    if (criticalModels.length) {
      actions.push({
        title: `Tratar modelos críticos (${criticalModels.length})`,
        detail: `Priorize: ${criticalModels
          .map((m) => `${m.name} (${m.zona})`)
          .join(", ")}. Verifique CPU/RAM/GPU e considere escala de recursos ou otimização de código.`,
      });
    }

    if (archs.length) {
      const worstArch = [...archs].sort((a, b) => b.pressure - a.pressure)[0];
      actions.push({
        title: `Revisar arquitetura mais pressionada (${worstArch.name})`,
        detail: `Pressão estimada em ${worstArch.pressure.toFixed(0)}%, com foco em ${
          worstArch.mainPressure
        }. Avalie redistribuição de modelos ou aumento de capacidade.`,
      });
    }

    if (warningModels.length) {
      actions.push({
        title: `Monitorar modelos em atenção (${warningModels.length})`,
        detail: `Eles ainda não estouraram o SLA, mas estão se aproximando: ${warningModels
          .map((m) => m.name)
          .join(", ")}. Considere alertas proativos antes do estouro.`,
      });
    }

    if (slaStats.slaGlobal < 90) {
      actions.push({
        title: "Melhorar aderência ao SLA",
        detail: `SLA Global em ${slaStats.slaGlobal.toFixed(
          1
        )}%. Revise principalmente os recursos com maior número de violações em CPU/RAM/GPU/Disco.`,
      });
    }

    if (!actions.length) {
      actions.push({
        title: "Ambiente saudável",
        detail:
          "Nenhuma ação urgente identificada. Mantenha monitoramento e ajuste limiares de SLA conforme aprendizado.",
      });
    }

    return actions;
  },
};

// ============================================================================
// DATA PROCESSING
// ============================================================================

function computeHealthAndStatus(metrics, sla) {
  const scores = [];
  const score = (val, limit) => {
    if (!limit) return 100;
    if (val <= limit) return 100;
    const over = val - limit;
    const penalty = Math.min(100, over * 2);
    return Math.max(0, 100 - penalty);
  };

  const pushScore = (val, limit) => {
    if (!limit && !val) return;
    scores.push(score(val || 0, limit || 0));
  };

  pushScore(metrics.cpu, sla.CPU);
  pushScore(metrics.ram, sla.RAM);
  pushScore(metrics.gpu, sla.GPU);
  pushScore(metrics.storage, sla.DISCO);

  const health = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 100;

  let status = "ok";
  const hardViol =
    (sla.CPU && metrics.cpu > sla.CPU * 1.2) ||
    (sla.RAM && metrics.ram > sla.RAM * 1.2) ||
    (sla.GPU && metrics.gpu > sla.GPU * 1.2) ||
    (sla.DISCO && metrics.storage > sla.DISCO * 1.2);

  const softViol =
    (sla.CPU && metrics.cpu > sla.CPU) ||
    (sla.RAM && metrics.ram > sla.RAM) ||
    (sla.GPU && metrics.gpu > sla.GPU) ||
    (sla.DISCO && metrics.storage > sla.DISCO);

  if (health < 60 || hardViol) status = "critical";
  else if (health < 80 || softViol) status = "warning";

  return { health, status };
}

function transformEmpresa(rawEmpresa) {
  const models = [];
  const zonesSet = new Set();

  (rawEmpresa.zonas || []).forEach((z) => {
    const zonaNome = z.nome || "Zona sem nome";
    zonesSet.add(zonaNome);

    const archObj = (z.arquiteturas?.[0]) || {};
    const archName = archObj.idArquitetura
      ? `Arquitetura #${archObj.idArquitetura}`
      : "Arquitetura padrão";
    const archSpec = [
      archObj.CPU != null ? `${archObj.CPU} vCPU` : null,
      archObj.RAM != null ? `${archObj.RAM} GB RAM` : null,
      archObj.GPU != null ? `${archObj.GPU} GPU` : null,
      archObj.DISCO != null ? `${archObj.DISCO} GB Disco` : null,
    ]
      .filter(Boolean)
      .join(" • ");

    (z.modelos || []).forEach((m) => {
      const slaObj = (m.slas?.[0]) || {};
      const sla = {
        CPU: Number(slaObj.CPU || 0),
        RAM: Number(slaObj.RAM || 0),
        GPU: Number(slaObj.GPU || 0),
        DISCO: Number(slaObj.DISCO || 0),
      };

      let metrics = { cpu: 0, ram: 0, gpu: 0, storage: 0 };

      if (Array.isArray(m.medicao) && m.medicao.length > 0) {
        const last = m.medicao[m.medicao.length - 1];
        if (last && typeof last === "object") {
          const k = Object.keys(last)[0];
          const entry = last[k];
          if (entry) {
            metrics.cpu = Number(entry.cpu || 0);
            metrics.ram = Number(entry.ram || 0);
            metrics.gpu = Number(entry.gpu || 0);
            metrics.storage = Number(entry.disco || entry.DISCO || 0);
          }
        }
      }

      const { health, status } = computeHealthAndStatus(metrics, sla);

      models.push({
        idModelo: m.idModelos || m.id_modelo || m.id,
        empresa: rawEmpresa.nome,
        empresaId: rawEmpresa.idEmpresas,
        zona: zonaNome,
        hostname: m.hostname || m.nome || "host-desconhecido",
        name: m.nome || m.hostname || "Modelo",
        processo: m.processo || "",
        architecture: archName,
        archSpec,
        metrics,
        sla,
        health,
        status,
        statusLabel: status === "critical" ? "Crítico" : status === "warning" ? "Atenção" : "OK",
        rawTickets: m.tickets || [],
      });
    });
  });

  state.models = models;
  state.zones = Array.from(zonesSet);
  state.empresaNome = rawEmpresa.nome || "Empresa";
}

// ============================================================================
// API CALLS
// ============================================================================

async function loadAiActionsFromServer() {
  if (!CONFIG.AI_URL || !state.models.length) return;

  try {
    const tickets = [];
    state.models.forEach((m) => {
      (m.rawTickets || []).forEach((t) => {
        const fields = t.fields || {};
        const statusObj = fields.status || {};
        tickets.push({
          key: t.key || t.id || "—",
          modelName: m.name,
          hostname: m.hostname,
          status: (statusObj.statusCategory?.key) || "new",
          created: fields.created,
          updated: fields.updated,
        });
      });
    });

    const payload = {
      empresa: state.empresaNome,
      models: state.models.map((m) => ({
        name: m.name,
        hostname: m.hostname,
        zona: m.zona,
        status: m.status,
        health: m.health,
        metrics: m.metrics,
        sla: m.sla,
        architecture: m.architecture,
      })),
      tickets,
    };

    const resp = await fetch(CONFIG.AI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) throw new Error(`AI HTTP ${resp.status}`);
    const data = await resp.json();

    if (Array.isArray(data.actions)) {
      state.aiActions = data.actions;
      LayoutEngine.render();
      Utils.showToast("Ações sugeridas atualizadas pelo /ai.");
    }
  } catch (err) {
    console.warn("Falha ao obter ações do /ai, usando fallback local.", err);
  }
}

async function loadData() {
  try {
    const resp = await fetch(`${CONFIG.API_URL}${CONFIG.DATA_PATH}`);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const json = await resp.json();
    const empresas = json.empresas || [];

    let empresaId = Utils.getEmpresaIdFromUrl();
    if (!empresaId && empresas.length) {
      empresaId = empresas[0].idEmpresas;
    }

    const empresa = empresas.find((e) => e.idEmpresas === empresaId) || empresas[0];
    if (!empresa) throw new Error("Nenhuma empresa encontrada no JSON");

    state.empresaId = empresa.idEmpresas;
    transformEmpresa(empresa);

    console.log(state,1117)
    const nameEl = document.getElementById("empresa-name");
    if (nameEl) nameEl.textContent = state.empresaNome;

    LayoutEngine.render();
    Utils.showToast("Dados carregados com sucesso.");

    loadAiActionsFromServer();
  } catch (err) {
    console.error(err);
    Utils.showToast("Erro ao carregar dados. Usando dados de exemplo.");
    loadMockData();
    LayoutEngine.render();
  }
}

function loadMockData() {
  state.empresaNome = "TechCloud (Mock)";
  state.zones = ["us-east-1a", "us-east-1b"];
  state.models = [
    {
      empresa: state.empresaNome,
      empresaId: 1,
      zona: "us-east-1a",
      hostname: "host-a1",
      name: "NovaQuest",
      processo: "Inferência",
      architecture: "AETHERLINK-4C16G-0GPU",
      archSpec: "4 vCPU • 16 GB RAM • 0 GPU • 256 GB Disco",
      metrics: { cpu: 92, ram: 88, gpu: 82, storage: 70 },
      sla: { CPU: 80, RAM: 80, GPU: 75, DISCO: 85 },
      health: 45,
      status: "critical",
      statusLabel: "Crítico",
      rawTickets: [],
    },
    {
      empresa: state.empresaNome,
      empresaId: 1,
      zona: "us-east-1a",
      hostname: "host-a2",
      name: "EchoProcessor",
      processo: "Treinamento",
      architecture: "AETHERLINK-4C16G-0GPU",
      archSpec: "4 vCPU • 16 GB RAM • 0 GPU • 256 GB Disco",
      metrics: { cpu: 75, ram: 82, gpu: 30, storage: 55 },
      sla: { CPU: 80, RAM: 80, GPU: 75, DISCO: 85 },
      health: 70,
      status: "warning",
      statusLabel: "Atenção",
      rawTickets: [],
    },
    {
      empresa: state.empresaNome,
      empresaId: 1,
      zona: "us-east-1b",
      hostname: "host-b1",
      name: "GenAI-Core",
      processo: "Inferência",
      architecture: "AETHERLINK-8C32G-2GPU",
      archSpec: "8 vCPU • 32 GB RAM • 2 GPU • 512 GB Disco",
      metrics: { cpu: 45, ram: 55, gpu: 52, storage: 40 },
      sla: { CPU: 80, RAM: 80, GPU: 75, DISCO: 85 },
      health: 92,
      status: "ok",
      statusLabel: "OK",
      rawTickets: [],
    },
  ];
}

// ============================================================================
// NAVIGATION
// ============================================================================

function verProcesso(idModelo) {
  if (!idModelo) return;
  sessionStorage.ID_MODELO_SELECIONADO = idModelo;
  window.location.href = "dashprocesso.html?id_modelo=" + idModelo;
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  LayoutEngine.init();
  loadData();
  initCopilotChat();

  // Help banner
  const banner = document.getElementById("helpBanner");
  const toggle = document.getElementById("toggleHelp");
  if (banner && toggle) {
    toggle.addEventListener("click", () => {
      banner.classList.toggle("collapsed");
    });
  }

  console.log("✅ Dashboard holística carregada.");
});