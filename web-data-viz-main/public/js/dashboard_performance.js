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



// ======================= CORES & VAR GLOBAIS =======================
const COR_INCIDENTE = '#00B2B2';
const COR_PROBLEMA = '#D97706';
const COR_SLA       = '#B74C4C';
const COR_REAL      = '#006E66';
const COR_TEXTO     = '#64748b';
const COR_GRID      = '#E2E8F0';

let chartMTTR = null;
let chartResource = null;
let dadosTickets = [];
let zonaSelecionada = 'all';


// ======================= PARSE DE DATA DO JIRA =======================
// Converte "2025-12-06T18:36:09.791-0300" pra Date válido no JS
function parseJiraDate(str) {
    if (!str) return null;
    // só coloca o ":" no fuso horário (-0300 -> -03:00)
    return new Date(str.replace(/([+-]\d{2})(\d{2})$/, '$1:$2'));
}

// estados que contam como "em andamento" e "resolvido"
const ESTADOS_ANDAMENTO = ['Em andamento', 'In Progress'];
const ESTADOS_RESOLVIDOS = ['Done', 'Closed', 'Concluído', 'Resolvido'];


// ======================= CARREGAR JSON DO S3 =======================
// IMPORTANTE: não mexer muito aqui (é o que fala com o backend)
async function dashprocesso() {
    try {
        const resp = await fetch('/s3Route-andre/dados/tickets.json');
        const txt  = await resp.text();

        console.log('Resposta de /s3Route-andre/dados/tickets.json:', resp.status, txt);

        if (!resp.ok) {
            throw new Error('HTTP ' + resp.status + ' - ' + txt);
        }

        const dados = JSON.parse(txt);
        return dados;
    } catch (err) {
        console.error('Erro ao buscar/parsear tickets.json, usando MOCK_TICKETS:', err);
        // se der ruim no S3, cai pros mocks
        return MOCK_TICKETS;
    }
}


// ======================= INICIALIZA DASHBOARD =======================
// junta tickets reais + mocks e configura os listeners
async function inicializarDashboard() {
    try {
        const dadosReais = await dashprocesso();

        // junta o que veio do backend com os mocks
        const todos = [...dadosReais, ...MOCK_TICKETS];

        // tira duplicado usando a chave do ticket
        const vistos = new Set();
        dadosTickets = todos.filter(t => {
            if (!t || !t.chave) return false;
            if (vistos.has(t.chave)) return false;
            vistos.add(t.chave);
            return true;
        });

        console.log('Total de tickets (reais + mock, sem duplicar):', dadosTickets.length);

        popularSelectZonas(dadosTickets);
        zonaSelecionada = 'all';
        atualizarTituloDashboard();
        aplicarFiltrosDashboard();

        const select = document.getElementById('zoneSelect');
        if (select) {
            select.addEventListener('change', () => {
                zonaSelecionada = select.value;
                atualizarTituloDashboard();
                aplicarFiltrosDashboard();
            });
        }

        console.log('Dashboard inicializado com sucesso!');
    } catch (error) {
        console.error('Erro ao carregar dashboard:', error);
    }
}


// ======================= HELPERS DE STATUS / RECURSOS =======================
function mapearStatus(status) {
    const statusMap = {
        'Aberto': 'aberto',
        'Open': 'aberto',
        'Em andamento': 'andamento',
        'In Progress': 'andamento',
        'Concluído': 'resolvido',
        'Done': 'resolvido',
        'Closed': 'resolvido',
        'Resolvido': 'resolvido'
    };
    return statusMap[status] || 'aberto';
}

// descobre quais recursos (GPU/CPU/RAM/Disco) o ticket mexe, baseado nas labels
function extrairRecursos(labels) {
    const recursos = [];
    const norm = (v) => (v || '').toLowerCase();

    if (labels.some(l => norm(l) === 'gpu'))   recursos.push('GPU');
    if (labels.some(l => norm(l) === 'cpu'))   recursos.push('CPU');
    if (labels.some(l => norm(l) === 'ram'))   recursos.push('RAM');
    if (labels.some(l => norm(l) === 'disco')) recursos.push('Disco');

    return recursos;
}

function filtrarUltimos7Dias(tickets) {
    const hoje = new Date();
    const seteDiasAtras = new Date(hoje.getTime() - 7 * 24 * 60 * 60 * 1000);

    return tickets.filter(ticket => {
        const dataCriacao = parseJiraDate(ticket.datas.criacao);
        return dataCriacao && dataCriacao >= seteDiasAtras;
    });
}

function filtrarPorZona(tickets, zona) {
    if (zona === 'all') return tickets;
    return tickets.filter(ticket => (ticket.zona || ticket.identificador?.zona_nome) === zona);
}


// ======================= MTTR (cálculo) =======================
// aqui eu pego só o tempo de "Em andamento" -> "Done/Closed/etc"
function obterPeriodoAndamentoParaResolvido(ticket) {
    const historico = Array.isArray(ticket.historico_status)
        ? ticket.historico_status.slice()
        : [];

    if (historico.length === 0) return null;

    // ordena o histórico pela data
    historico.sort((a, b) => {
        const da = parseJiraDate(a.data);
        const db = parseJiraDate(b.data);
        return da - db;
    });

    // procura primeiro momento que entrou em andamento
    for (let i = 0; i < historico.length; i++) {
        const h = historico[i];
        if (!ESTADOS_ANDAMENTO.includes(h.para)) continue;

        const inicio = parseJiraDate(h.data);
        if (!inicio) return null;

        let fim = null;

        // procura o próximo status resolvido
        for (let j = i + 1; j < historico.length; j++) {
            const h2 = historico[j];
            if (ESTADOS_RESOLVIDOS.includes(h2.para)) {
                fim = parseJiraDate(h2.data);
                break;
            }
        }

        // se não achou no histórico, tenta pegar a data de resolução
        if (!fim && ticket.datas && ticket.datas.resolucao) {
            const possivelFim = parseJiraDate(ticket.datas.resolucao);
            if (possivelFim && possivelFim > inicio) {
                fim = possivelFim;
            }
        }

        if (!fim || fim <= inicio) return null;

        const horas = (fim - inicio) / (1000 * 60 * 60);
        if (horas < 0) return null;
        return horas;
    }

    return null;
}

// calcula MTTR médio por recurso (GPU/CPU/RAM/Disco)
function calcularMTTR(tickets) {
    const mttrPorRecurso = {
        'GPU':  { total: 0, count: 0 },
        'CPU':  { total: 0, count: 0 },
        'RAM':  { total: 0, count: 0 },
        'Disco':{ total: 0, count: 0 }
    };

    tickets.forEach(ticket => {
        const duracaoHoras = obterPeriodoAndamentoParaResolvido(ticket);
        if (duracaoHoras === null) return;

        const recursos = extrairRecursos(ticket.labels || []);
        recursos.forEach(recurso => {
            if (mttrPorRecurso[recurso]) {
                mttrPorRecurso[recurso].total += duracaoHoras;
                mttrPorRecurso[recurso].count++;
            }
        });
    });

    const resultado = {};
    Object.keys(mttrPorRecurso).forEach(recurso => {
        const item = mttrPorRecurso[recurso];
        resultado[recurso] = item.count > 0 ? item.total / item.count : 0;
    });

    return resultado;
}

// formata número de horas em "1h 20m" ou "53m"
function formatarTempo(horas) {
    if (!horas || horas <= 0) return '--';
    const totalMin = Math.round(horas * 60);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;

    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
}

// joga o MTTR nos cards de GPU/CPU/RAM/Disco
function atualizarMTTRCards(mttr) {
    const recursos   = ['GPU', 'CPU', 'RAM', 'Disco'];
    const elementos  = document.querySelectorAll('.mttr-item');

    recursos.forEach((recurso, index) => {
        if (!elementos[index]) return;
        const valorElement = elementos[index].querySelector('.mttr-value');
        if (!valorElement) return;

        const valorHoras = mttr[recurso] || 0;
        valorElement.textContent = formatarTempo(valorHoras);

        elementos[index].classList.remove('mttr-slow', 'mttr-avg', 'mttr-fast');
        if (valorHoras > 8)      elementos[index].classList.add('mttr-slow');
        else if (valorHoras > 3) elementos[index].classList.add('mttr-avg');
        else                     elementos[index].classList.add('mttr-fast');
    });
}


// ======================= MATRIZ DE STATUS (só incidentes) =======================
function calcularMatrizStatus(tickets) {
    const matriz = {
        'GPU':  { total: 0, abertos: 0, andamento: 0, resolvidos: 0, predicao: 0 },
        'CPU':  { total: 0, abertos: 0, andamento: 0, resolvidos: 0, predicao: 0 },
        'RAM':  { total: 0, abertos: 0, andamento: 0, resolvidos: 0, predicao: 0 },
        'Disco':{ total: 0, abertos: 0, andamento: 0, resolvidos: 0, predicao: 0 }
    };

    tickets.forEach(ticket => {
        if (ticket.tipo !== 'Incidente') return;

        const recursos = extrairRecursos(ticket.labels || []);
        const status   = mapearStatus(ticket.status);

        recursos.forEach(recurso => {
            const linha = matriz[recurso];
            if (!linha) return;

            linha.total++;
            if (status === 'aberto')      linha.abertos++;
            else if (status === 'andamento') linha.andamento++;
            else if (status === 'resolvido') linha.resolvidos++;
        });
    });

    // predicao = só um chute bobo (10% do que foi resolvido)
    Object.keys(matriz).forEach(recurso => {
        matriz[recurso].predicao = Math.round(matriz[recurso].resolvidos * 0.1);
    });

    return matriz;
}

function atualizarTabelaStatus(matriz) {
    const tbody = document.querySelector('.status-table tbody');
    if (!tbody) return;

    const recursos = ['GPU', 'CPU', 'RAM', 'Disco'];
    const rows = tbody.querySelectorAll('tr');

    let totalGeral = 0, totalAbertos = 0, totalAndamento = 0, totalResolvidos = 0;

    recursos.forEach((recurso, idx) => {
        const row = rows[idx];
        if (!row) return;
        const cells = row.querySelectorAll('td');
        if (cells.length < 5) return;

        const linha = matriz[recurso];

        cells[1].textContent = linha.total;
        cells[2].textContent = linha.abertos;
        cells[3].textContent = linha.andamento;
        cells[4].textContent = linha.resolvidos;

        totalGeral      += linha.total;
        totalAbertos    += linha.abertos;
        totalAndamento  += linha.andamento;
        totalResolvidos += linha.resolvidos;
    });

    const totalRow = rows[4];
    if (totalRow) {
        const cells = totalRow.querySelectorAll('td');
        if (cells.length >= 5) {
            cells[1].textContent = totalGeral;
            cells[2].textContent = totalAbertos;
            cells[3].textContent = totalAndamento;
            cells[4].textContent = totalResolvidos;
        }
    }
}


// ======================= PROBLEMAS IDENTIFICADOS (só Problema) =======================
function contarProblemas(tickets) {
    const problemas = { 'GPU': 0, 'CPU': 0, 'RAM': 0, 'Disco': 0 };

    tickets.forEach(ticket => {
        if (ticket.tipo === 'Problema') {
            const recursos = extrairRecursos(ticket.labels || []);
            recursos.forEach(recurso => {
                if (problemas[recurso] !== undefined) {
                    problemas[recurso]++;
                }
            });
        }
    });

    return problemas;
}

function atualizarListaProblemas(problemas) {
    const problemRows = document.querySelectorAll('.problem-row');
    const recursos = ['GPU', 'CPU', 'RAM', 'Disco'];

    recursos.forEach((recurso, idx) => {
        const row = problemRows[idx];
        if (!row) return;
        const valEl = row.querySelector('.prob-value');
        if (!valEl) return;
        valEl.textContent = problemas[recurso] || 0;
    });
}


// ======================= MTTR POR DIA (pra usar no gráfico) =======================
// aqui eu calculo o MTTR médio de cada dia dos últimos 7 dias
function calcularDadosMTTRPorDia(tickets) {
    const hoje = new Date();
    const valores = [];
    const categorias = [];

    for (let i = 6; i >= 0; i--) {
        const diaIni = new Date(hoje);
        diaIni.setDate(diaIni.getDate() - i);
        diaIni.setHours(0, 0, 0, 0);

        const diaFim = new Date(diaIni);
        diaFim.setHours(23, 59, 59, 999);

        const ticketsDia = tickets.filter(ticket => {
            const dataCriacao = parseJiraDate(ticket.datas.criacao);
            return dataCriacao && dataCriacao >= diaIni && dataCriacao <= diaFim;
        });

        const mttrDia = calcularMTTR(ticketsDia);
        const valoresValidos = Object.values(mttrDia).filter(v => v > 0);
        const mediaGeral = valoresValidos.length
            ? valoresValidos.reduce((a, b) => a + b, 0) / valoresValidos.length
            : 0;

        valores.push(mediaGeral);

        const label = String(diaIni.getDate()).padStart(2, '0') + '/' +
                      String(diaIni.getMonth() + 1).padStart(2, '0');
        categorias.push(label);
    }

    return { valores, categorias };
}


// ======================= GRÁFICO MTTR GERAL + PREDIÇÃO =======================
// aqui é o gráfico de área com REAL (verde) e PREDIÇÃO (linha laranja)
function atualizarGraficoMTTR(tickets) {
    const dados = calcularDadosMTTRPorDia(tickets);

    // MTTR real por dia (em horas)
    const mttrDiario = (dados.valores || []).map(v => Number((v || 0).toFixed(2)));
    const categoriasHistoricas = dados.categorias || []; // 7 dias

    // ----------------------------
    // CRIA 2 DIAS FUTUROS NO EIXO X
    // ----------------------------
    const hoje = new Date();
    const categoriasFuturas = [];

    for (let i = 1; i <= 2; i++) {
        const d = new Date(hoje);
        d.setDate(d.getDate() + i);
        const label =
            String(d.getDate()).padStart(2, '0') + '/' +
            String(d.getMonth() + 1).padStart(2, '0');
        categoriasFuturas.push(label);
    }

    const categorias = [...categoriasHistoricas, ...categoriasFuturas]; // 7 + 2 = 9

    // REAL: só nos 7 dias históricos
    const dadosReais = [...mttrDiario, null, null];

    // ----------------------------
    // REGRESSÃO LINEAR (usa só o passado)
    // ----------------------------
    const indicesValidos = [];
    const valoresValidos = [];

    mttrDiario.forEach((val, idx) => {
        if (val > 0) {
            indicesValidos.push(idx);   // 0..6
            valoresValidos.push(val);   // horas
        }
    });

    const totalPontos = categorias.length; // 9
    const dadosPredicao = new Array(totalPontos).fill(null);

    if (indicesValidos.length >= 2) {
        const n = indicesValidos.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

        for (let k = 0; k < n; k++) {
            const x = indicesValidos[k];
            const y = valoresValidos[k];
            sumX  += x;
            sumY  += y;
            sumXY += x * y;
            sumX2 += x * x;
        }

        const denom = (n * sumX2 - sumX * sumX);
        const m = denom !== 0 ? (n * sumXY - sumX * sumY) / denom : 0;
        const b = (sumY - m * sumX) / n;

        console.log('Tendência MTTR - inclinação (m):', m,
            ' -> m > 0: tende a subir, m < 0: tende a cair');

        const ultimoIndiceReal = mttrDiario.length - 1;  // 6
        const primeiroFuturo   = mttrDiario.length;      // 7

        // NÃO coloca mais valor real na predição:
        dadosPredicao[ultimoIndiceReal] = null;

        // predição só dos 2 dias futuros
        for (let i = primeiroFuturo; i < totalPontos; i++) {
            const x = i;
            let yPred = m * x + b;
            if (yPred < 0) yPred = 0;
            dadosPredicao[i] = Number(yPred.toFixed(2));
            }
        }

    const optionsMTTR = {
        series: [
            { name: 'Real',     data: dadosReais },
            { name: 'Predição', data: dadosPredicao }
        ],
        chart: {
            height: 220,
            type: 'area',
            background: 'transparent',
            toolbar: { show: false },
            zoom: { enabled: false }
        },
        colors: [COR_REAL, COR_PROBLEMA],
        fill: {
            type: 'solid',
            opacity: [0.25, 0] // real preenchido, predição só linha
        },
        stroke: {
            width: [3, 2],
            curve: 'smooth',
            dashArray: [0, 6]
        },
        theme: { mode: 'light' },
        xaxis: {
            categories: categorias,
            labels: { style: { colors: COR_TEXTO, fontSize: '10px' } },
            axisBorder: { show: false },
            axisTicks:  { show: false }
        },
        yaxis: {
            labels: {
                style: { colors: COR_TEXTO, fontSize: '10px' },
                formatter: (val) => formatarTempo(val)
            }
        },
        dataLabels: {
            enabled: true,
            style: { fontSize: '10px' },
            formatter: (val) => {
                if (!val || val <= 0) return '';
                return formatarTempo(val);
            }
        },
        tooltip: {
            y: {
                formatter: (val) => formatarTempo(val)
            }
        },
        grid: {
            borderColor: COR_GRID,
            strokeDashArray: 3
        },
        annotations: {}, // SLA removido
        legend: { show: true }
    };

    if (chartMTTR) chartMTTR.destroy();
    chartMTTR = new ApexCharts(document.querySelector('#mttrChart'), optionsMTTR);
    chartMTTR.render();
}



function calcularTicketsPorRecursoDia(tickets, tipoVisao = 'incidentes') {
    const recursos = { GPU: [], CPU: [], RAM: [], Disco: [] };
    const hoje = new Date();
    const categorias = []; // rótulos de datas (dd/MM) para o eixo X

    for (let i = 6; i >= 0; i--) {
        const diaIni = new Date(hoje);
        diaIni.setDate(diaIni.getDate() - i);
        diaIni.setHours(0, 0, 0, 0);

        const diaFim = new Date(diaIni);
        diaFim.setHours(23, 59, 59, 999);

        // label tipo "03/12"
        const label =
            String(diaIni.getDate()).padStart(2, '0') + '/' +
            String(diaIni.getMonth() + 1).padStart(2, '0');
        categorias.push(label);

        const ticketsDia = tickets.filter(ticket => {
            const dataCriacao = parseJiraDate(ticket.datas.criacao);
            if (!dataCriacao || dataCriacao < diaIni || dataCriacao > diaFim) return false;

            if (tipoVisao === 'problemas')  return ticket.tipo === 'Problema';
            if (tipoVisao === 'incidentes') return ticket.tipo === 'Incidente';
            return true;
        });

        Object.keys(recursos).forEach(recurso => {
            const count = ticketsDia.filter(t =>
                extrairRecursos(t.labels || []).includes(recurso)
            ).length;
            recursos[recurso].push(count);
        });
    }

    return {
        series: [
            { name: 'GPU',   data: recursos.GPU },
            { name: 'CPU',   data: recursos.CPU },
            { name: 'RAM',   data: recursos.RAM },
            { name: 'Disco', data: recursos.Disco }
        ],
        categorias // datas (últimos 7 dias)
    };
}


function atualizarGraficoRecursos(tickets) {
    const dadosInc  = calcularTicketsPorRecursoDia(tickets, 'incidentes');
    const dadosProb = calcularTicketsPorRecursoDia(tickets, 'problemas');

    const seriesInc  = dadosInc.series;
    const seriesProb = dadosProb.series;
    const categoriasDias = dadosInc.categorias; // mesmos dias para ambos

    const colorsInc  = ['#00B2B2', '#006E66', '#B74C4C', '#D97706'];
    const colorsProb = ['#D97706', '#EA580C', '#B74C4C', '#F59E0B'];

    const optionsResource = {
        series: seriesInc,
        chart: {
            height: 190,
            type: 'bar',
            stacked: false,
            background: 'transparent',
            toolbar: { show: false }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '90%',
                borderRadius: 2,
                dataLabels: { position: 'center', orientation: 'vertical' }
            }
        },
        fill: { type: 'solid', opacity: 1 },
        dataLabels: {
            enabled: true,
            style: { fontSize: '10px', colors: ['#fff'] },
            formatter: (val) => (val > 0 ? val : '')
        },
        colors: colorsInc,
        theme: { mode: 'light' },
        stroke: { show: true, width: 0, colors: ['transparent'] },
        xaxis: {
            // AGORA MOSTRA AS DATAS DOS ÚLTIMOS 7 DIAS
            categories: categoriasDias,
            labels: { style: { colors: COR_TEXTO, fontSize: '10px' } },
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: { labels: { style: { colors: COR_TEXTO, fontSize: '10px' } } },
        grid: {
            borderColor: COR_GRID,
            strokeDashArray: 3,
            padding: { top: 0, right: 0, bottom: 0, left: 10 }
        },
        legend: { show: false }
    };

    if (chartResource) chartResource.destroy();
    chartResource = new ApexCharts(document.querySelector('#resourceChart'), optionsResource);
    chartResource.render();

    // guardar pro toggle
    window.seriesInc   = seriesInc;
    window.seriesProb  = seriesProb;
    window.colorsInc   = colorsInc;
    window.colorsProb  = colorsProb;
    window.categoriasDias = categoriasDias;
    window.chartResource = chartResource;

    const dotGpu   = document.getElementById('leg-gpu');
    const dotCpu   = document.getElementById('leg-cpu');
    const dotRam   = document.getElementById('leg-ram');
    const dotDisco = document.getElementById('leg-disco');
    if (dotGpu)   dotGpu.style.background  = colorsInc[0];
    if (dotCpu)   dotCpu.style.background  = colorsInc[1];
    if (dotRam)   dotRam.style.background  = colorsInc[2];
    if (dotDisco) dotDisco.style.background= colorsInc[3];
}


// botãozinho Incidentes / Problemas
function updateResourceChart(tipo) {
    if (!window.chartResource) return;

    const btnInc  = document.getElementById('btn-inc');
    const btnProb = document.getElementById('btn-prob');
    const dotGpu   = document.getElementById('leg-gpu');
    const dotCpu   = document.getElementById('leg-cpu');
    const dotRam   = document.getElementById('leg-ram');
    const dotDisco = document.getElementById('leg-disco');
    const componentSelect = document.getElementById('componentSelect');

    if (tipo === 'incidentes') {
        window.chartResource.updateSeries(window.seriesInc);
        window.chartResource.updateOptions({ colors: window.colorsInc });
        btnInc?.classList.add('active');
        btnProb?.classList.remove('active', 'problem-mode');
        if (dotGpu)   dotGpu.style.background   = window.colorsInc[0];
        if (dotCpu)   dotCpu.style.background   = window.colorsInc[1];
        if (dotRam)   dotRam.style.background   = window.colorsInc[2];
        if (dotDisco) dotDisco.style.background = window.colorsInc[3];
    } else {
        window.chartResource.updateSeries(window.seriesProb);
        window.chartResource.updateOptions({ colors: window.colorsProb });
        btnInc?.classList.remove('active');
        btnProb?.classList.add('active', 'problem-mode');
        if (dotGpu)   dotGpu.style.background   = window.colorsProb[0];
        if (dotCpu)   dotCpu.style.background   = window.colorsProb[1];
        if (dotRam)   dotRam.style.background   = window.colorsProb[2];
        if (dotDisco) dotDisco.style.background = window.colorsProb[3];
    }
    
    // Reseta o select de componentes ao mudar de tipo
    if (componentSelect) componentSelect.value = 'all';
}

// ======================= FILTRO POR COMPONENTE =======================
function filterResourceChart(componente) {
    if (!window.chartResource || !window.seriesInc || !window.seriesProb) return;

    const btnInc = document.getElementById('btn-inc');
    const isIncidente = btnInc?.classList.contains('active');
    const series = isIncidente ? window.seriesInc : window.seriesProb;
    
    let filteredSeries;
    
    if (componente === 'all') {
        // Mostra todos os componentes
        filteredSeries = series;
    } else {
        // Filtra apenas o componente selecionado
        const componenteMap = { 'GPU': 0, 'CPU': 1, 'RAM': 2, 'Disco': 3 };
        const index = componenteMap[componente];
        if (index !== undefined && series[index]) {
            filteredSeries = [series[index]];
        } else {
            filteredSeries = series;
        }
    }
    
    window.chartResource.updateSeries(filteredSeries);
}


// ======================= TABELA POR ZONA =======================
function calcularStatusPorZona(tickets) {
    const zonas = {};

    tickets.forEach(ticket => {
        const zona = ticket.zona || ticket.identificador?.zona_nome;
        if (!zona) return;

        if (!zonas[zona]) {
            zonas[zona] = {
                gpuInc: 0,
                cpuInc: 0,
                ramInc: 0,
                discoInc: 0,
                totalGeral: 0,
                totalProblemas: 0,
                mttrHoras: 0
            };
        }

        const z = zonas[zona];
        const recursos = extrairRecursos(ticket.labels || []);

        if (ticket.tipo === 'Problema') {
            z.totalProblemas++;
        } else if (ticket.tipo === 'Incidente') {
            recursos.forEach(recurso => {
                if (recurso === 'GPU')   z.gpuInc++;
                if (recurso === 'CPU')   z.cpuInc++;
                if (recurso === 'RAM')   z.ramInc++;
                if (recurso === 'Disco') z.discoInc++;
            });
        }

        z.totalGeral++;
    });

    // calcula MTTR médio da zona usando a mesma lógica de antes
    Object.keys(zonas).forEach(zona => {
        const ticketsZona = tickets.filter(t => (t.zona || t.identificador?.zona_nome) === zona);
        const mttrZona = calcularMTTR(ticketsZona);
        const valores  = Object.values(mttrZona).filter(v => v > 0);
        const media    = valores.length ? valores.reduce((a, b) => a + b, 0) / valores.length : 0;
        zonas[zona].mttrHoras = media;
    });

    return zonas;
}

function gerarRecomendacao() {
    return { texto: 'Ver mais', classe: 'priority-warn' };
}



function atualizarTabelaZonas(tickets) {
    const tbody = document.querySelector('.benchmark-table tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    const zonas = calcularStatusPorZona(tickets);
    const zonasOrdenadas = Object.keys(zonas).sort();

    zonasOrdenadas.forEach(zona => {
        const z = zonas[zona];
        const rec = gerarRecomendacao(); // agora SEM lógica

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><span class="zone-badge">${zona}</span></td>
            <td class="cell-number">${z.gpuInc}</td>
            <td class="cell-number">${z.cpuInc}</td>
            <td class="cell-number">${z.ramInc}</td>
            <td class="cell-number">${z.discoInc}</td>
            <td class="cell-number" style="font-weight: 700;">${z.totalGeral}</td>
            <td class="cell-number" style="font-weight: 700; color: var(--color-problema);">${z.totalProblemas}</td>
            <td class="cell-number">${formatarTempo(z.mttrHoras)}</td>
            <td>
                <button
                    class="priority-tag ${rec.classe} ver-mais-btn"
                    data-zona="${zona}"
                    type="button"
                >
                    ${rec.texto}
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // clique do "ver mais"
    const botoesVerMais = tbody.querySelectorAll('.ver-mais-btn');
    botoesVerMais.forEach(btn => {
        const zona = btn.getAttribute('data-zona');
        if (!zona) return;

        btn.addEventListener('click', () => {
            const select = document.getElementById('zoneSelect');

            zonaSelecionada = zona;
            if (select) {
                select.value = zona; // sincroniza com o dropdown
            }

            atualizarTituloDashboard();
            aplicarFiltrosDashboard();
        });
    });
}

// ======================= SELECT DE ZONAS / TÍTULO =======================
function popularSelectZonas(tickets) {
    const select = document.getElementById('zoneSelect');
    if (!select) return;

    const zonas = [...new Set(
        tickets.map(t => t.zona || t.identificador?.zona_nome).filter(Boolean)
    )].sort();

    select.innerHTML = '';
    const optAll = document.createElement('option');
    optAll.value = 'all';
    optAll.textContent = 'Todas as Zonas';
    select.appendChild(optAll);

    zonas.forEach(z => {
        const opt = document.createElement('option');
        opt.value = z;
        opt.textContent = z;
        select.appendChild(opt);
    });
}

function atualizarTituloDashboard() {
    const select       = document.getElementById('zoneSelect');
    const titleElement = document.getElementById('dashName');
    if (!select || !titleElement) return;

    const selectedOption = select.options[select.selectedIndex];
    const selectedZone   = selectedOption ? selectedOption.text : 'Todas as Zonas';

    if (select.value === 'all') {
        titleElement.textContent = 'Dashboard - Performance de Tickets (Últimos 7 dias)';
    } else {
        titleElement.textContent = `Dashboard - Performance de Tickets - ${selectedZone} (Últimos 7 dias)`;
    }
}


// ======================= APLICA FILTROS E ATUALIZA TUDO =======================
function aplicarFiltrosDashboard() {
    // 1) tickets filtrados pela zona selecionada (pra quase tudo)
    const ticketsFiltradosZona    = filtrarPorZona(dadosTickets, zonaSelecionada);
    const ticketsUltimos7DiasZona = filtrarUltimos7Dias(ticketsFiltradosZona);

    // 2) tickets de TODAS as zonas (pra tabela de zonas)
    const ticketsUltimos7DiasTodos = filtrarUltimos7Dias(dadosTickets);

    // --- tudo que é "por zona selecionada" continua igual ---
    const mttr = calcularMTTR(ticketsUltimos7DiasZona);
    atualizarMTTRCards(mttr);

    const matriz = calcularMatrizStatus(ticketsUltimos7DiasZona);
    atualizarTabelaStatus(matriz);

    const problemas = contarProblemas(ticketsUltimos7DiasZona);
    atualizarListaProblemas(problemas);

    atualizarGraficoMTTR(ticketsUltimos7DiasZona);
    atualizarGraficoRecursos(ticketsUltimos7DiasZona);

    // --- AQUI: tabela de zonas usa SEMPRE todas as zonas ---
    atualizarTabelaZonas(ticketsUltimos7DiasTodos);

    console.log('Dashboard atualizado. Zona:', zonaSelecionada);
}



// ======================= ESPERAR APexCharts CARREGAR =======================
function aguardarApexCharts() {
    if (typeof ApexCharts !== 'undefined') {
        console.log('ApexCharts carregado, iniciando dashboard...');
        inicializarDashboard();
    } else {
        console.log('Aguardando ApexCharts...');
        setTimeout(aguardarApexCharts, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', aguardarApexCharts);
} else {
    aguardarApexCharts();
}

console.log('Script de dashboard carregado!');
