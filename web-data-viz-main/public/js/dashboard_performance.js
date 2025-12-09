// ======================= MOCKS (tickets fake pra encher a dashboard) =======================
const MOCK_TICKETS = [
  // ===================== 01/12/2025 =====================
  {
    "chave": "MOCK-201",
    "resumo": "ALERTA: CPU acima de 85% - SP-01",
    "tipo_issue": "Médio",
    "tipo": "Incidente",
    "prioridade": "Medium",
    "status": "Done",
    "datas": {
      "criacao": "2025-12-01T08:15:00.000-0300",
      "resolucao": "2025-12-01T09:10:00.000-0300"
    },
    "labels": ["cpu"],
    "identificador": {
      "valor_bruto": "201;1;1",
      "modelo_id": "201",
      "zona_id": "1",
      "empresa_id": "1",
      "zona_nome": "SP-01"
    },
    "zona": "SP-01",
    "historico_status": [
      { "data": "2025-12-01T08:20:00.000-0300", "de": "Open", "para": "In Progress" },
      { "data": "2025-12-01T09:10:00.000-0300", "de": "In Progress", "para": "Done" }
    ]
  },
  {
    "chave": "MOCK-202",
    "resumo": "ALERTA: RAM acima de 80% - SP-02",
    "tipo_issue": "Médio",
    "tipo": "Incidente",
    "prioridade": "Medium",
    "status": "Closed",
    "datas": {
      "criacao": "2025-12-01T10:30:00.000-0300",
      "resolucao": "2025-12-01T12:00:00.000-0300"
    },
    "labels": ["ram"],
    "identificador": {
      "valor_bruto": "202;2;1",
      "modelo_id": "202",
      "zona_id": "2",
      "empresa_id": "1",
      "zona_nome": "SP-02"
    },
    "zona": "SP-02",
    "historico_status": [
      { "data": "2025-12-01T10:40:00.000-0300", "de": "Open", "para": "In Progress" },
      { "data": "2025-12-01T12:00:00.000-0300", "de": "In Progress", "para": "Closed" }
    ]
  },
  {
    "chave": "MOCK-203",
    "resumo": "PROBLEMA: Latência alta em disco - MG-01",
    "tipo_issue": "Maior",
    "tipo": "Problema",
    "prioridade": "Medium",
    "status": "Aberto",
    "datas": {
      "criacao": "2025-12-01T14:05:00.000-0300",
      "resolucao": null
    },
    "labels": ["disco"],
    "identificador": {
      "valor_bruto": "203;6;3",
      "modelo_id": "203",
      "zona_id": "6",
      "empresa_id": "3",
      "zona_nome": "MG-01"
    },
    "zona": "MG-01",
    "historico_status": []
  },

  // ===================== 02/12/2025 =====================
  {
    "chave": "MOCK-204",
    "resumo": "ALERTA CRÍTICO: GPU 100% - workload IA SP-01",
    "tipo_issue": "Crítico",
    "tipo": "Incidente",
    "prioridade": "High",
    "status": "Concluído",
    "datas": {
      "criacao": "2025-12-02T07:45:00.000-0300",
      "resolucao": "2025-12-02T09:00:00.000-0300"
    },
    "labels": ["gpu"],
    "identificador": {
      "valor_bruto": "204;1;1",
      "modelo_id": "204",
      "zona_id": "1",
      "empresa_id": "1",
      "zona_nome": "SP-01"
    },
    "zona": "SP-01",
    "historico_status": [
      { "data": "2025-12-02T07:50:00.000-0300", "de": "Open", "para": "In Progress" },
      { "data": "2025-12-02T09:00:00.000-0300", "de": "In Progress", "para": "Concluído" }
    ]
  },
  {
    "chave": "MOCK-205",
    "resumo": "ALERTA CRÍTICO: CPU e RAM altas - SP-02",
    "tipo_issue": "Crítico",
    "tipo": "Incidente",
    "prioridade": "High",
    "status": "Em andamento",
    "datas": {
      "criacao": "2025-12-02T11:20:00.000-0300",
      "resolucao": null
    },
    "labels": ["cpu", "ram"],
    "identificador": {
      "valor_bruto": "205;2;1",
      "modelo_id": "205",
      "zona_id": "2",
      "empresa_id": "1",
      "zona_nome": "SP-02"
    },
    "zona": "SP-02",
    "historico_status": [
      { "data": "2025-12-02T11:30:00.000-0300", "de": "Open", "para": "In Progress" }
    ]
  },
  {
    "chave": "MOCK-206",
    "resumo": "PROBLEMA: Saturação recorrente de GPU - MG-01",
    "tipo_issue": "Crítico",
    "tipo": "Problema",
    "prioridade": "High",
    "status": "Aberto",
    "datas": {
      "criacao": "2025-12-02T15:10:00.000-0300",
      "resolucao": null
    },
    "labels": ["gpu"],
    "identificador": {
      "valor_bruto": "206;6;3",
      "modelo_id": "206",
      "zona_id": "6",
      "empresa_id": "3",
      "zona_nome": "MG-01"
    },
    "zona": "MG-01",
    "historico_status": []
  },

  // ===================== 03/12/2025 =====================
  {
    "chave": "MOCK-207",
    "resumo": "ALERTA: Disco 90% - SP-02",
    "tipo_issue": "Médio",
    "tipo": "Incidente",
    "prioridade": "Medium",
    "status": "Done",
    "datas": {
      "criacao": "2025-12-03T09:00:00.000-0300",
      "resolucao": "2025-12-03T10:00:00.000-0300"
    },
    "labels": ["disco"],
    "identificador": {
      "valor_bruto": "207;2;1",
      "modelo_id": "207",
      "zona_id": "2",
      "empresa_id": "1",
      "zona_nome": "SP-02"
    },
    "zona": "SP-02",
    "historico_status": [
      { "data": "2025-12-03T09:10:00.000-0300", "de": "Open", "para": "In Progress" },
      { "data": "2025-12-03T10:00:00.000-0300", "de": "In Progress", "para": "Done" }
    ]
  },
  {
    "chave": "MOCK-208",
    "resumo": "ALERTA: RAM acima de 85% - SP-01",
    "tipo_issue": "Médio",
    "tipo": "Incidente",
    "prioridade": "Medium",
    "status": "Em andamento",
    "datas": {
      "criacao": "2025-12-03T11:30:00.000-0300",
      "resolucao": null
    },
    "labels": ["ram"],
    "identificador": {
      "valor_bruto": "208;1;1",
      "modelo_id": "208",
      "zona_id": "1",
      "empresa_id": "1",
      "zona_nome": "SP-01"
    },
    "zona": "SP-01",
    "historico_status": [
      { "data": "2025-12-03T11:40:00.000-0300", "de": "Open", "para": "In Progress" }
    ]
  },
  {
    "chave": "MOCK-209",
    "resumo": "PROBLEMA: Capacidade de disco insuficiente recorrente - MG-01",
    "tipo_issue": "Maior",
    "tipo": "Problema",
    "prioridade": "Medium",
    "status": "Aberto",
    "datas": {
      "criacao": "2025-12-03T16:45:00.000-0300",
      "resolucao": null
    },
    "labels": ["disco"],
    "identificador": {
      "valor_bruto": "209;6;3",
      "modelo_id": "209",
      "zona_id": "6",
      "empresa_id": "3",
      "zona_nome": "MG-01"
    },
    "zona": "MG-01",
    "historico_status": []
  },

  // ===================== 04/12/2025 =====================
  {
    "chave": "MOCK-210",
    "resumo": "ALERTA CRÍTICO: CPU 95% - MG-01",
    "tipo_issue": "Crítico",
    "tipo": "Incidente",
    "prioridade": "High",
    "status": "Done",
    "datas": {
      "criacao": "2025-12-04T08:50:00.000-0300",
      "resolucao": "2025-12-04T10:30:00.000-0300"
    },
    "labels": ["cpu"],
    "identificador": {
      "valor_bruto": "210;6;3",
      "modelo_id": "210",
      "zona_id": "6",
      "empresa_id": "3",
      "zona_nome": "MG-01"
    },
    "zona": "MG-01",
    "historico_status": [
      { "data": "2025-12-04T09:00:00.000-0300", "de": "Open", "para": "In Progress" },
      { "data": "2025-12-04T10:30:00.000-0300", "de": "In Progress", "para": "Done" }
    ]
  },
  {
    "chave": "MOCK-211",
    "resumo": "ALERTA CRÍTICO: GPU e RAM altas - SP-02",
    "tipo_issue": "Crítico",
    "tipo": "Incidente",
    "prioridade": "High",
    "status": "Closed",
    "datas": {
      "criacao": "2025-12-04T13:15:00.000-0300",
      "resolucao": "2025-12-04T15:00:00.000-0300"
    },
    "labels": ["gpu", "ram"],
    "identificador": {
      "valor_bruto": "211;2;1",
      "modelo_id": "211",
      "zona_id": "2",
      "empresa_id": "1",
      "zona_nome": "SP-02"
    },
    "zona": "SP-02",
    "historico_status": [
      { "data": "2025-12-04T13:25:00.000-0300", "de": "Open", "para": "In Progress" },
      { "data": "2025-12-04T15:00:00.000-0300", "de": "In Progress", "para": "Closed" }
    ]
  },
  {
    "chave": "MOCK-212",
    "resumo": "PROBLEMA: CPU saturada em horário de pico - SP-01",
    "tipo_issue": "Crítico",
    "tipo": "Problema",
    "prioridade": "High",
    "status": "Aberto",
    "datas": {
      "criacao": "2025-12-04T18:10:00.000-0300",
      "resolucao": null
    },
    "labels": ["cpu"],
    "identificador": {
      "valor_bruto": "212;1;1",
      "modelo_id": "212",
      "zona_id": "1",
      "empresa_id": "1",
      "zona_nome": "SP-01"
    },
    "zona": "SP-01",
    "historico_status": []
  },

  // ===================== 05/12/2025 =====================
  {
    "chave": "MOCK-213",
    "resumo": "ALERTA: RAM acima de 90% - SP-01",
    "tipo_issue": "Médio",
    "tipo": "Incidente",
    "prioridade": "Medium",
    "status": "Done",
    "datas": {
      "criacao": "2025-12-05T09:40:00.000-0300",
      "resolucao": "2025-12-05T11:00:00.000-0300"
    },
    "labels": ["ram"],
    "identificador": {
      "valor_bruto": "213;1;1",
      "modelo_id": "213",
      "zona_id": "1",
      "empresa_id": "1",
      "zona_nome": "SP-01"
    },
    "zona": "SP-01",
    "historico_status": [
      { "data": "2025-12-05T09:50:00.000-0300", "de": "Open", "para": "In Progress" },
      { "data": "2025-12-05T11:00:00.000-0300", "de": "In Progress", "para": "Done" }
    ]
  },
  {
    "chave": "MOCK-214",
    "resumo": "ALERTA: Disco 95% - SP-02",
    "tipo_issue": "Médio",
    "tipo": "Incidente",
    "prioridade": "Medium",
    "status": "Em andamento",
    "datas": {
      "criacao": "2025-12-05T12:20:00.000-0300",
      "resolucao": null
    },
    "labels": ["disco"],
    "identificador": {
      "valor_bruto": "214;2;1",
      "modelo_id": "214",
      "zona_id": "2",
      "empresa_id": "1",
      "zona_nome": "SP-02"
    },
    "zona": "SP-02",
    "historico_status": [
      { "data": "2025-12-05T12:30:00.000-0300", "de": "Open", "para": "In Progress" }
    ]
  },
  {
    "chave": "MOCK-215",
    "resumo": "PROBLEMA: Uso elevado de disco durante backup - MG-01",
    "tipo_issue": "Maior",
    "tipo": "Problema",
    "prioridade": "Medium",
    "status": "Aberto",
    "datas": {
      "criacao": "2025-12-05T20:05:00.000-0300",
      "resolucao": null
    },
    "labels": ["disco"],
    "identificador": {
      "valor_bruto": "215;6;3",
      "modelo_id": "215",
      "zona_id": "6",
      "empresa_id": "3",
      "zona_nome": "MG-01"
    },
    "zona": "MG-01",
    "historico_status": []
  },

  // ===================== 06/12/2025 =====================
  {
    "chave": "MOCK-216",
    "resumo": "ALERTA CRÍTICO: GPU 100% - SP-02",
    "tipo_issue": "Crítico",
    "tipo": "Incidente",
    "prioridade": "High",
    "status": "Concluído",
    "datas": {
      "criacao": "2025-12-06T07:55:00.000-0300",
      "resolucao": "2025-12-06T09:30:00.000-0300"
    },
    "labels": ["gpu"],
    "identificador": {
      "valor_bruto": "216;2;1",
      "modelo_id": "216",
      "zona_id": "2",
      "empresa_id": "1",
      "zona_nome": "SP-02"
    },
    "zona": "SP-02",
    "historico_status": [
      { "data": "2025-12-06T08:05:00.000-0300", "de": "Open", "para": "In Progress" },
      { "data": "2025-12-06T09:30:00.000-0300", "de": "In Progress", "para": "Concluído" }
    ]
  },
  {
    "chave": "MOCK-217",
    "resumo": "ALERTA: CPU 90% - MG-01",
    "tipo_issue": "Médio",
    "tipo": "Incidente",
    "prioridade": "Medium",
    "status": "Em andamento",
    "datas": {
      "criacao": "2025-12-06T13:25:00.000-0300",
      "resolucao": null
    },
    "labels": ["cpu"],
    "identificador": {
      "valor_bruto": "217;6;3",
      "modelo_id": "217",
      "zona_id": "6",
      "empresa_id": "3",
      "zona_nome": "MG-01"
    },
    "zona": "MG-01",
    "historico_status": [
      { "data": "2025-12-06T13:35:00.000-0300", "de": "Open", "para": "In Progress" }
    ]
  },
  {
    "chave": "MOCK-218",
    "resumo": "PROBLEMA: CPU saturada em janelas de batch - SP-01",
    "tipo_issue": "Crítico",
    "tipo": "Problema",
    "prioridade": "High",
    "status": "Aberto",
    "datas": {
      "criacao": "2025-12-06T18:40:00.000-0300",
      "resolucao": null
    },
    "labels": ["cpu"],
    "identificador": {
      "valor_bruto": "218;1;1",
      "modelo_id": "218",
      "zona_id": "1",
      "empresa_id": "1",
      "zona_nome": "SP-01"
    },
    "zona": "SP-01",
    "historico_status": []
  },

  // ===================== 07/12/2025 =====================
  {
    "chave": "MOCK-219",
    "resumo": "ALERTA: RAM acima de 88% - SP-01",
    "tipo_issue": "Médio",
    "tipo": "Incidente",
    "prioridade": "Medium",
    "status": "Done",
    "datas": {
      "criacao": "2025-12-07T08:05:00.000-0300",
      "resolucao": "2025-12-07T09:20:00.000-0300"
    },
    "labels": ["ram"],
    "identificador": {
      "valor_bruto": "219;1;1",
      "modelo_id": "219",
      "zona_id": "1",
      "empresa_id": "1",
      "zona_nome": "SP-01"
    },
    "zona": "SP-01",
    "historico_status": [
      { "data": "2025-12-07T08:10:00.000-0300", "de": "Open", "para": "In Progress" },
      { "data": "2025-12-07T09:20:00.000-0300", "de": "In Progress", "para": "Done" }
    ]
  },
  {
    "chave": "MOCK-220",
    "resumo": "ALERTA CRÍTICO: CPU e Disco altos - SP-02",
    "tipo_issue": "Crítico",
    "tipo": "Incidente",
    "prioridade": "High",
    "status": "Em andamento",
    "datas": {
      "criacao": "2025-12-07T10:30:00.000-0300",
      "resolucao": null
    },
    "labels": ["cpu", "disco"],
    "identificador": {
      "valor_bruto": "220;2;1",
      "modelo_id": "220",
      "zona_id": "2",
      "empresa_id": "1",
      "zona_nome": "SP-02"
    },
    "zona": "SP-02",
    "historico_status": [
      { "data": "2025-12-07T10:40:00.000-0300", "de": "Open", "para": "In Progress" }
    ]
  },
  {
    "chave": "MOCK-221",
    "resumo": "PROBLEMA: Gargalo de I/O em disco - MG-01",
    "tipo_issue": "Maior",
    "tipo": "Problema",
    "prioridade": "Medium",
    "status": "Aberto",
    "datas": {
      "criacao": "2025-12-07T16:15:00.000-0300",
      "resolucao": null
    },
    "labels": ["disco"],
    "identificador": {
      "valor_bruto": "221;6;3",
      "modelo_id": "221",
      "zona_id": "6",
      "empresa_id": "3",
      "zona_nome": "MG-01"
    },
    "zona": "MG-01",
    "historico_status": []
  },

  // ===================== 08/12/2025 (HOJE) =====================
  {
    "chave": "MOCK-222",
    "resumo": "ALERTA: CPU acima de 80% em cluster web - SP-01",
    "tipo_issue": "Médio",
    "tipo": "Incidente",
    "prioridade": "Medium",
    "status": "Open",
    "datas": {
      "criacao": "2025-12-08T07:55:00.000-0300",
      "resolucao": null
    },
    "labels": ["cpu", "web"],
    "identificador": {
      "valor_bruto": "222;1;1",
      "modelo_id": "222",
      "zona_id": "1",
      "empresa_id": "1",
      "zona_nome": "SP-01"
    },
    "zona": "SP-01",
    "historico_status": []
  },
  {
    "chave": "MOCK-223",
    "resumo": "ALERTA CRÍTICO: RAM 95% em nó de banco - MG-01",
    "tipo_issue": "Crítico",
    "tipo": "Incidente",
    "prioridade": "High",
    "status": "Em andamento",
    "datas": {
      "criacao": "2025-12-08T08:20:00.000-0300",
      "resolucao": null
    },
    "labels": ["ram", "database"],
    "identificador": {
      "valor_bruto": "223;6;3",
      "modelo_id": "223",
      "zona_id": "6",
      "empresa_id": "3",
      "zona_nome": "MG-01"
    },
    "zona": "MG-01",
    "historico_status": [
      { "data": "2025-12-08T08:25:00.000-0300", "de": "Open", "para": "In Progress" }
    ]
  },
  {
    "chave": "MOCK-224",
    "resumo": "ALERTA: Disco 92% em storage de backups - SP-02",
    "tipo_issue": "Médio",
    "tipo": "Incidente",
    "prioridade": "Medium",
    "status": "Open",
    "datas": {
      "criacao": "2025-12-08T09:05:00.000-0300",
      "resolucao": null
    },
    "labels": ["disco", "backup"],
    "identificador": {
      "valor_bruto": "224;2;1",
      "modelo_id": "224",
      "zona_id": "2",
      "empresa_id": "1",
      "zona_nome": "SP-02"
    },
    "zona": "SP-02",
    "historico_status": []
  },
  {
    "chave": "MOCK-225",
    "resumo": "PROBLEMA: Picos recorrentes de CPU em APIs - SP-01",
    "tipo_issue": "Maior",
    "tipo": "Problema",
    "prioridade": "Medium",
    "status": "Aberto",
    "datas": {
      "criacao": "2025-12-08T10:30:00.000-0300",
      "resolucao": null
    },
    "labels": ["cpu", "api"],
    "identificador": {
      "valor_bruto": "225;1;1",
      "modelo_id": "225",
      "zona_id": "1",
      "empresa_id": "1",
      "zona_nome": "SP-01"
    },
    "zona": "SP-01",
    "historico_status": []
  }
];


// ============================================================================
// ======================= COLE AQUI O MOCK_TICKETS ===========================
// ============================================================================

// const MOCK_TICKETS = [...];   <-- COLE SEU BLOCO AQUI



// ============================================================================
// ======================= CONFIGURAÇÕES GERAIS ===============================
// ============================================================================

const COR_INCIDENTE = '#00B2B2';
const COR_PROBLEMA = '#D97706';
const COR_SLA      = '#B74C4C';
const COR_REAL     = '#006E66';
const COR_TEXTO    = '#64748b';
const COR_GRID     = '#E2E8F0';

// NOVAS CORES QUE VOCÊ PEDIU
const COR_CPU   = "#2C3E50";
const COR_CPU_BG = "#D1D9E0";

const COR_RAM   = "#120A8F";
const COR_RAM_BG = "#C6C4F0";

const COR_GPU   = "#138D8D";
const COR_GPU_BG = "#C7ECEC";

const COR_DISCO   = "#B2A300";
const COR_DISCO_BG = "#F0EAC4";

let chartMTTR = null;
let chartResource = null;
let dadosTickets = [];
let zonaSelecionada = 'all';

const SLA_MTTR_HORAS = 4;
const FK_EMPRESA_PADRAO = 1;
let TECNICOS_POR_ZONA = {};



// ============================================================================
// =============== PARTE 1 — Funções utilitárias de data/status ==============
// ============================================================================

function parseJiraDate(str) {
    if (!str) return null;
    return new Date(str.replace(/([+-]\d{2})(\d{2})$/, "$1:$2"));
}

const ESTADOS_ANDAMENTO = ['Em andamento', 'In Progress'];
const ESTADOS_RESOLVIDOS = ['Done', 'Closed', 'Concluído', 'Resolvido'];

function extrairRecursos(labels = []) {
    const n = x => (x || "").toLowerCase();
    const r = [];
    if (labels.some(l => n(l) === "gpu")) r.push("GPU");
    if (labels.some(l => n(l) === "cpu")) r.push("CPU");
    if (labels.some(l => n(l) === "ram")) r.push("RAM");
    if (labels.some(l => n(l) === "disco")) r.push("Disco");
    return r;
}



// ============================================================================
// =============== PARTE 2 — Cálculo completo do MTTR =========================
// ============================================================================

function obterMTTRTicketHoras(ticket) {
    const hist = Array.isArray(ticket.historico_status)
        ? [...ticket.historico_status]
        : [];

    if (hist.length === 0) return null;

    hist.sort((a, b) => parseJiraDate(a.data) - parseJiraDate(b.data));

    let inicio = null;
    let fim = null;

    for (const h of hist) {
        if (ESTADOS_ANDAMENTO.includes(h.para)) {
            inicio = parseJiraDate(h.data);
            break;
        }
    }

    if (!inicio) return null;

    for (const h of hist) {
        if (ESTADOS_RESOLVIDOS.includes(h.para)) {
            const d = parseJiraDate(h.data);
            if (d > inicio) {
                fim = d;
                break;
            }
        }
    }

    if (!fim && ticket.datas?.resolucao) {
        const d = parseJiraDate(ticket.datas.resolucao);
        if (d > inicio) fim = d;
    }

    if (!fim || fim <= inicio) return null;

    return (fim - inicio) / (1000 * 60 * 60);
}

function calcularMTTRPorRecurso(tickets) {
    const res = {
        GPU: { total: 0, count: 0 },
        CPU: { total: 0, count: 0 },
        RAM: { total: 0, count: 0 },
        Disco:{ total: 0, count: 0 }
    };

    tickets.forEach(ticket => {
        const dur = obterMTTRTicketHoras(ticket);
        if (dur === null) return;

        const recs = extrairRecursos(ticket.labels);
        recs.forEach(r => {
            if (res[r]) {
                res[r].total += dur;
                res[r].count++;
            }
        });
    });

    const final = {};
    Object.keys(res).forEach(r => {
        final[r] = res[r].count > 0 ? res[r].total / res[r].count : 0;
    });

    return final;
}

function calcularMTTRGeralHoras(tickets) {
    const mttr = calcularMTTRPorRecurso(tickets);
    const vals = Object.values(mttr).filter(v => v > 0);
    if (vals.length === 0) return 0;
    return vals.reduce((a,b)=>a+b,0) / vals.length;
}

function calcularSLADaEquipe(tickets, slaHoras) {
    let total = 0;
    let dentro = 0;

    tickets.forEach(ticket => {
        const dur = obterMTTRTicketHoras(ticket);
        if (dur === null) return;
        total++;
        if (dur <= slaHoras) dentro++;
    });

    const pct = total > 0 ? (dentro/total)*100 : 0;

    return { pctDentro: pct, totalConsiderados: total };
}

function formatarTempo(h) {
    if (!h || h <= 0) return "--";
    const min = Math.round(h * 60);
    const hh = Math.floor(min / 60);
    const mm = min % 60;

    if (hh === 0) return `${mm}m`;
    if (mm === 0) return `${hh}h`;
    return `${hh}h ${mm}m`;
}



// ============================================================================
// =============== PARTE 3 — MTTR distribuído por dia =========================
// ============================================================================

function extrairDataInicio(ticket) {
    const hist = ticket.historico_status || [];
    for (const h of hist) {
        if (ESTADOS_ANDAMENTO.includes(h.para)) {
            return parseJiraDate(h.data);
        }
    }
    return null;
}

function calcularDadosMTTRPorDia(tickets) {
    const hoje = new Date();
    const dias = [];
    const soma = Array(7).fill(0);
    const cont = Array(7).fill(0);

    for (let i = 6; i >= 0; i--) {
        const d = new Date(hoje);
        d.setDate(d.getDate() - i);
        d.setHours(0,0,0,0);
        dias.push(d);
    }

    tickets.forEach(ticket => {
        const mttr = obterMTTRTicketHoras(ticket);
        const inicio = extrairDataInicio(ticket);
        if (!mttr || !inicio) return;

        dias.forEach((dia, idx) => {
            const ini = new Date(dia);
            const fim = new Date(dia);
            fim.setHours(23,59,59,999);

            if (inicio >= ini && inicio <= fim) {
                soma[idx] += mttr;
                cont[idx]++;
            }
        });
    });

    const valores = soma.map((s,i)=> cont[i]>0 ? s/cont[i] : 0);

    const categorias = dias.map(d =>
        String(d.getDate()).padStart(2,'0') + "/" +
        String(d.getMonth()+1).padStart(2,'0')
    );

    return { valores, categorias };
}



// ============================================================================
// =============== PARTE 4 — KPI da equipe ===================================
// ============================================================================

function obterQtdTecnicos(zona) {
    if (!TECNICOS_POR_ZONA) return 0;

    if (zona === "all") {
        return Object.values(TECNICOS_POR_ZONA)
            .reduce((a,b)=>a+(b||0),0);
    }

    return TECNICOS_POR_ZONA[zona] || 0;
}

function atualizarKpiEquipe(zona, ticketsZona) {
    const elTec = document.getElementById("teamAnalystsValue");
    const elMTTR = document.getElementById("teamMttrValue");
    const elBadge = document.getElementById("teamMttrBadge");
    const elPct = document.getElementById("teamSlaPct");

    if (!elTec || !elMTTR || !elBadge || !elPct) return;

    const qtdTec = obterQtdTecnicos(zona);
    const mttr = calcularMTTRGeralHoras(ticketsZona);
    const { pctDentro } = calcularSLADaEquipe(ticketsZona, SLA_MTTR_HORAS);

    elTec.textContent = qtdTec;
    elMTTR.textContent = mttr > 0 ? formatarTempo(mttr) : "--";

    elBadge.classList.remove("sla-ok","sla-bad","sla-pending");

    if (mttr === 0) {
        elBadge.textContent = "--";
        elBadge.classList.add("sla-pending");
    } else if (mttr <= SLA_MTTR_HORAS) {
        elBadge.textContent = "Dentro";
        elBadge.classList.add("sla-ok");
    } else {
        elBadge.textContent = "Fora";
        elBadge.classList.add("sla-bad");
    }

    elPct.textContent = pctDentro > 0 ? pctDentro.toFixed(1)+"%" : "--";
}



// ============================================================================
// =============== PARTE 5 — Gráfico MTTR (linha SLA incluída) ===============
// ============================================================================

function atualizarGraficoMTTR(tickets) {
    // =============== DADOS REAIS ==================
    const dados = calcularDadosMTTRPorDia(tickets);

    // Mantém null quando não houver MTTR no dia
    const mttrDiario = dados.valores.map(v =>
        v != null ? Number(v.toFixed(2)) : null
    );
    const categorias = dados.categorias;

    // Adiciona 2 dias futuros (para predição)
    const hoje = new Date();
    const fut = [];

    for (let i = 1; i <= 2; i++) {
        const d = new Date(hoje);
        d.setDate(d.getDate() + i);
        fut.push(
            String(d.getDate()).padStart(2, "0") + "/" +
            String(d.getMonth() + 1).padStart(2, "0")
        );
    }

    const cats = [...categorias, ...fut];

    // Série real: valores dos 7 dias + 2 dias futuros vazios
    const dadosReais = [...mttrDiario, null, null];

    // =============== PREDIÇÃO (regressão linear) ===============
    const total = cats.length;
    const pred = Array(total).fill(null);

    const idxValid = [];
    const valValid = [];

    mttrDiario.forEach((v, i) => {
        if (v != null && v > 0) {
            idxValid.push(i);
            valValid.push(v);
        }
    });

    if (idxValid.length >= 2) {
        const n = idxValid.length;
        let sx = 0, sy = 0, sxy = 0, sx2 = 0;

        for (let k = 0; k < n; k++) {
            const x = idxValid[k];
            const y = valValid[k];
            sx  += x;
            sy  += y;
            sxy += x * y;
            sx2 += x * x;
        }

        const denom = n * sx2 - sx * sx;
        const m = denom !== 0 ? (n * sxy - sx * sy) / denom : 0;
        const b = (sy - m * sx) / n;

        const start = mttrDiario.length; // só prevê para os dias futuros

        for (let i = start; i < total; i++) {
            let y = m * i + b;
            if (y < 0) y = 0;
            pred[i] = Number(y.toFixed(2));   // horas decimais
        }
    }

    // =============== Y MAX considerando SLA ===============
    const reaisValidos = mttrDiario.filter(v => v != null);
    const predsValidas = pred.filter(v => v != null);

    const maxReal = reaisValidos.length ? Math.max(...reaisValidos) : 0;
    const maxPred = predsValidas.length ? Math.max(...predsValidas) : 0;
    const yMax = Math.max(maxReal, maxPred, SLA_MTTR_HORAS) * 1.2 || SLA_MTTR_HORAS * 1.2;

    // =============== CONFIG GRÁFICO ===============
    const options = {
        series: [
            { name: "Real",     data: dadosReais },
            { name: "Predição", data: pred }
        ],
        chart: {
            height: 220,
            type: "area",
            background: "transparent",
            toolbar: { show: false }
        },
        colors: [COR_REAL, COR_PROBLEMA],
        fill: { type: "solid", opacity: [0.25, 0] },
        stroke: { curve: "smooth", width: [3, 2], dashArray: [0, 6] },

        // >>> AQUI: labels em cima dos pontos das duas séries (Real e Predição)
        dataLabels: {
            enabled: true,
            enabledOnSeries: [0, 1], // 0 = Real, 1 = Predição
            formatter: (val, opts) => {
                if (val == null || isNaN(val) || val === 0) return "";
                return formatarTempo(val);    // transforma 1.51 → "1h 31m"
            },
            offsetY: -6,
            style: {
                fontSize: "10px"
            }
        },

        xaxis: {
            categories: cats,
            labels: {
                style: { colors: COR_TEXTO, fontSize: "10px" }
            }
        },
        yaxis: {
            min: 0,
            max: yMax,
            labels: {
                style: { colors: COR_TEXTO, fontSize: "10px" },
                formatter: (v) => {
                    if (v == null || isNaN(v)) return "--";
                    return formatarTempo(v);
                }
            }
        },

        tooltip: {
            y: {
                formatter: (val) => {
                    if (val == null || isNaN(val)) return "--";
                    return formatarTempo(val); // Real e Predição no tooltip em tempo
                }
            }
        },

        annotations: {
            yaxis: [
                {
                    y: SLA_MTTR_HORAS,
                    borderColor: COR_SLA,
                    strokeDashArray: 4,
                    label: {
                        text: `SLA - ${formatarTempo(SLA_MTTR_HORAS)}`,
                        style: {
                            background: COR_SLA,
                            color: "#fff",
                            fontSize: "10px"
                        }
                    }
                }
            ]
        }
    };

    if (chartMTTR) chartMTTR.destroy();
    chartMTTR = new ApexCharts(document.querySelector("#mttrChart"), options);
    chartMTTR.render();
}




// ============================================================================
// =============== PARTE 6 — Tickets por Recurso (NOVAS CORES) ================
// ============================================================================

function calcularTicketsPorRecursoDia(tickets) {
    const rec = { GPU:[], CPU:[], RAM:[], Disco:[] };
    const hoje = new Date();
    const categorias = [];

    for (let i=6;i>=0;i--){
        const ini = new Date(hoje);
        ini.setDate(ini.getDate()-i);
        ini.setHours(0,0,0,0);

        const fim = new Date(ini);
        fim.setHours(23,59,59,999);

        categorias.push(
            String(ini.getDate()).padStart(2,'0') + "/" +
            String(ini.getMonth()+1).padStart(2,'0')
        );

        const dia = tickets.filter(t=>{
            const dt = parseJiraDate(t.datas.criacao);
            return dt && dt>=ini && dt<=fim && t.tipo==="Incidente";
        });

        ["GPU","CPU","RAM","Disco"].forEach(r=>{
            rec[r].push(
                dia.filter(t => extrairRecursos(t.labels).includes(r)).length
            );
        });
    }

    return {
        series: [
            { name:"GPU",   data: rec.GPU   },
            { name:"CPU",   data: rec.CPU   },
            { name:"RAM",   data: rec.RAM   },
            { name:"Disco", data: rec.Disco }
        ],
        categorias
    };
}

function atualizarGraficoRecursos(tickets) {
    const data = calcularTicketsPorRecursoDia(tickets);

    const options = {
        series: data.series,
        chart:{ type:"bar", height:190, background:"transparent" },
        colors: [COR_GPU, COR_CPU, COR_RAM, COR_DISCO],
        plotOptions:{
            bar:{ borderRadius:3, columnWidth:"85%" }
        },
        dataLabels:{
            enabled:true,
            formatter:v=>v>0?v:""
        },
        xaxis:{
            categories:data.categorias,
            labels:{ style:{ colors:COR_TEXTO, fontSize:"10px" } }
        },
        yaxis:{
            labels:{ style:{ colors:COR_TEXTO, fontSize:"10px" } }
        },
        grid:{
            borderColor:COR_GRID,
            strokeDashArray:3
        }
    };

    if (chartResource) chartResource.destroy();
    chartResource = new ApexCharts(document.querySelector("#resourceChart"), options);
    chartResource.render();
}



// ============================================================================
// =============== PARTE 7 — S3 + Técnicos por zona ===========================
// ============================================================================

async function dashprocesso() {
    try {
        const resp = await fetch(`/s3Route-andre/dados/tickets.json`);
        const txt = await resp.text();

        if (!resp.ok) throw new Error(txt);

        return JSON.parse(txt);

    } catch {
        return MOCK_TICKETS;
    }
}

async function carregarTecnicosPorZona() {
    try {
        const resp = await fetch(`/zona/tecnicos/${FK_EMPRESA_PADRAO}`);
        if (!resp.ok) {
            TECNICOS_POR_ZONA = {};
            return;
        }

        const dados = await resp.json();
        TECNICOS_POR_ZONA = {};

        dados.forEach(z=>{
            TECNICOS_POR_ZONA[z.nome_zona] = z.qtd_tecnicos;
        });

    } catch {
        TECNICOS_POR_ZONA = {};
    }
}



// ============================================================================
// =============== PARTE 8 — Dashboard (filtros, select, tabelas) =============
// ============================================================================

function filtrarUltimos7Dias(tickets) {
    const hoje = new Date();
    const limite = new Date(hoje - 7*24*3600*1000);
    return tickets.filter(t=>{
        const d = parseJiraDate(t.datas.criacao);
        return d && d>=limite;
    });
}

function filtrarPorZona(tickets, zona) {
    if (zona==="all") return tickets;
    return tickets.filter(t => (t.zona || t.identificador?.zona_nome) === zona);
}

function atualizarTituloDashboard() {
    const title = document.getElementById("dashName");
    if (!title) return;

    if (zonaSelecionada === "all") {
        title.innerHTML = 
            `Dashboard - Performance dos Tickets (7 dias) <span style="color:#006E66">SLA 4h</span>`;
    } else {
        title.innerHTML = 
            `Dashboard - Zona ${zonaSelecionada} (7 dias) <span style="color:#006E66">SLA 4h</span>`;
    }
}

function popularSelectZonas(tickets) {
    const select = document.getElementById("zoneSelect");
    if (!select) return;

    const zonas = [...new Set(
        tickets.map(t => t.zona || t.identificador?.zona_nome).filter(Boolean)
    )].sort();

    select.innerHTML = "";
    select.innerHTML += `<option value="all">Todas as Zonas</option>`;

    zonas.forEach(z=>{
        select.innerHTML += `<option value="${z}">${z}</option>`;
    });
}

function atualizarTabelaStatus(matriz) {
    const tbody = document.querySelector(".status-table tbody");
    if (!tbody) return;

    const recs = ["GPU","CPU","RAM","Disco"];
    const rows = tbody.querySelectorAll("tr");

    let g=0, ab=0, an=0, r=0;

    recs.forEach((recurso,idx)=>{
        const row = rows[idx];
        const m = matriz[recurso];

        row.children[1].textContent = m.total;
        row.children[2].textContent = m.abertos;
        row.children[3].textContent = m.andamento;
        row.children[4].textContent = m.resolvidos;

        g += m.total;
        ab += m.abertos;
        an += m.andamento;
        r += m.resolvidos;
    });

    const totalRow = rows[4];
    totalRow.children[1].textContent = g;
    totalRow.children[2].textContent = ab;
    totalRow.children[3].textContent = an;
    totalRow.children[4].textContent = r;
}

function calcularMatrizStatus(tickets) {
    const matriz = {
        GPU:{total:0, abertos:0, andamento:0, resolvidos:0},
        CPU:{total:0, abertos:0, andamento:0, resolvidos:0},
        RAM:{total:0, abertos:0, andamento:0, resolvidos:0},
        Disco:{total:0, abertos:0, andamento:0, resolvidos:0}
    };

    tickets.forEach(t=>{
        if (t.tipo!=="Incidente") return;
        const recs = extrairRecursos(t.labels);
        const st = t.status;

        recs.forEach(r=>{
            matriz[r].total++;
            if (ESTADOS_ANDAMENTO.includes(st)) matriz[r].andamento++;
            else if (ESTADOS_RESOLVIDOS.includes(st)) matriz[r].resolvidos++;
            else matriz[r].abertos++;
        });
    });

    return matriz;
}

// Atualiza os cards de MTTR por recurso (GPU, CPU, RAM, Disco)
function atualizarMTTRCards(mttr) {
    const recursos  = ['GPU', 'CPU', 'RAM', 'Disco'];
    const elementos = document.querySelectorAll('.mttr-item');

    // 80% da SLA já fica laranja
    const FATOR_ALERTA_SLA = 0.8;
    const limiteLaranja = SLA_MTTR_HORAS * FATOR_ALERTA_SLA;

    recursos.forEach((recurso, index) => {
        const card = elementos[index];
        if (!card) return;

        const valorElement = card.querySelector('.mttr-value');
        if (!valorElement) return;

        const valorHoras = mttr[recurso] || 0;
        valorElement.textContent = formatarTempo(valorHoras);

        // limpa classes anteriores
        card.classList.remove('mttr-slow', 'mttr-avg', 'mttr-fast');

        if (valorHoras === 0) {
            // sem dados: deixa sem cor especial
            return;
        }

        if (valorHoras > SLA_MTTR_HORAS) {
            // passou da SLA → vermelho
            card.classList.add('mttr-slow');
        } else if (valorHoras >= limiteLaranja) {
            // chegando perto da SLA → laranja
            card.classList.add('mttr-avg');
        } else {
            // bem dentro da SLA → verde
            card.classList.add('mttr-fast');
        }
    });
}



// ============================================================================
// =============== PARTE 9 — Aplicar filtros gerais do dashboard ==============
// ============================================================================

function aplicarFiltrosDashboard() {
    const zonaTickets = filtrarPorZona(dadosTickets, zonaSelecionada);
    const ult7 = filtrarUltimos7Dias(zonaTickets);

    const todosUlt7 = filtrarUltimos7Dias(dadosTickets);

    // MTTR Cards
    const mttr = calcularMTTRPorRecurso(ult7);
    atualizarMTTRCards(mttr);

    // Tabela Status
    const matriz = calcularMatrizStatus(ult7);
    atualizarTabelaStatus(matriz);

    // KPI Equipe
    atualizarKpiEquipe(zonaSelecionada, ult7);

    // Gráficos
    atualizarGraficoMTTR(ult7);
    atualizarGraficoRecursos(ult7);

    atualizarTabelaZonas(todosUlt7);
}



// ============================================================================
// =============== PARTE 10 — Tabela por Zona (benchmark) =====================
// ============================================================================

function calcularStatusPorZona(tickets) {
    const zonas = {};

    tickets.forEach(t=>{
        const zona = t.zona || t.identificador?.zona_nome;
        if (!zona) return;

        if (!zonas[zona]) {
            zonas[zona] = { 
                gpuInc:0, cpuInc:0, ramInc:0, discoInc:0,
                totalGeral:0, totalProblemas:0, mttrHoras:0
            };
        }

        const z = zonas[zona];
        const recs = extrairRecursos(t.labels);

        if (t.tipo==="Problema") z.totalProblemas++;
        if (t.tipo==="Incidente"){
            recs.forEach(r=>{
                if (r==="GPU") z.gpuInc++;
                if (r==="CPU") z.cpuInc++;
                if (r==="RAM") z.ramInc++;
                if (r==="Disco") z.discoInc++;
            });
        }

        z.totalGeral++;
    });

    Object.keys(zonas).forEach(zona=>{
        const tz = tickets.filter(t => (t.zona || t.identificador?.zona_nome) === zona);
        const mttrRec = calcularMTTRPorRecurso(tz);
        const vals = Object.values(mttrRec).filter(v=>v>0);
        zonas[zona].mttrHoras = vals.length ? vals.reduce((a,b)=>a+b,0)/vals.length : 0;
    });

    return zonas;
}

function atualizarTabelaZonas(tickets) {
    const tbody = document.querySelector(".benchmark-table tbody");
    if (!tbody) return;

    tbody.innerHTML = "";

    const zonas = calcularStatusPorZona(tickets);
    const lista = Object.keys(zonas).sort();

    lista.forEach(zona=>{
        const z = zonas[zona];

        tbody.innerHTML += `
        <tr>
            <td><span class="zone-badge">${zona}</span></td>
            <td>${z.gpuInc}</td>
            <td>${z.cpuInc}</td>
            <td>${z.ramInc}</td>
            <td>${z.discoInc}</td>
            <td><b>${z.totalGeral}</b></td>
            <td style="color:#D97706"><b>${z.totalProblemas}</b></td>
            <td>${formatarTempo(z.mttrHoras)}</td>
            <td><button class="priority-tag priority-warn ver-mais-btn" data-zona="${zona}">ver mais</button></td>
        </tr>`;
    });

    document.querySelectorAll(".ver-mais-btn").forEach(btn=>{
        const zona = btn.dataset.zona;
        btn.addEventListener("click", ()=>{
            zonaSelecionada = zona;
            document.getElementById("zoneSelect").value = zona;
            atualizarTituloDashboard();
            aplicarFiltrosDashboard();
        });
    });
}



// ============================================================================
// =============== PARTE 11 — Inicialização ==================================
// ============================================================================

async function inicializarDashboard() {
    try {
        const dadosReais = await dashprocesso();

        const todos = [...dadosReais, ...MOCK_TICKETS];
        const uniq = new Set();
        dadosTickets = todos.filter(t=>{
            if (!t || !t.chave) return false;
            if (uniq.has(t.chave)) return false;
            uniq.add(t.chave);
            return true;
        });

        await carregarTecnicosPorZona();
        popularSelectZonas(dadosTickets);

        zonaSelecionada = "all";
        atualizarTituloDashboard();
        aplicarFiltrosDashboard();

        document.getElementById("zoneSelect")
            .addEventListener("change", e=>{
                zonaSelecionada = e.target.value;
                atualizarTituloDashboard();
                aplicarFiltrosDashboard();
            });

    } catch (err) {
        console.error("Erro ao inicializar dashboard:", err);
    }
}

function aguardarApexCharts() {
    if (typeof ApexCharts !== "undefined") {
        inicializarDashboard();
    } else {
        setTimeout(aguardarApexCharts, 100);
    }
}

document.addEventListener("DOMContentLoaded", aguardarApexCharts);

console.log("Dashboard carregado!");  