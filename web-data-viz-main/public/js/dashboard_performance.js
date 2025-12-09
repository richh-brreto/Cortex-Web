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

// ======================= SLA & TÉCNICOS =======================
// SLA de MTTR geral (em horas) – ajuste conforme política da empresa
const SLA_MTTR_HORAS = 4;

// será preenchido pelo back
let TECNICOS_POR_ZONA = {};

// ======================= PARSE DE DATA DO JIRA =======================
function parseJiraDate(str) {
    if (!str) return null;
    return new Date(str.replace(/([+-]\d{2})(\d{2})$/, '$1:$2'));
}

const ESTADOS_ANDAMENTO = ['Em andamento', 'In Progress'];
const ESTADOS_RESOLVIDOS = ['Done', 'Closed', 'Concluído', 'Resolvido'];


// ======================= CARREGAR JSON DO S3 =======================
async function dashprocesso() {
  try {
    // chama o backend, que por sua vez lê do S3
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
    // fallback pros mocks
    return MOCK_TICKETS;
  }
}



// ======================= CARREGA TÉCNICOS POR ZONA =======================
async function carregarTecnicosPorZona() {
    try {
        // em vez de pegar da sessionStorage:
        const fkEmpresa = 1; // <<< COLOCA O ID CERTO DA EMPRESA AQUI

        const resp = await fetch(`/zona/tecnicos/${fkEmpresa}`);
        if (!resp.ok) {
            console.error('Erro ao buscar técnicos por zona:', resp.status);
            TECNICOS_POR_ZONA = {};
            return;
        }

        const dados = await resp.json();

        TECNICOS_POR_ZONA = {};
        dados.forEach(z => {
            TECNICOS_POR_ZONA[z.nome_zona] = z.qtd_tecnicos;
        });

        console.log('TECNICOS_POR_ZONA carregado:', TECNICOS_POR_ZONA);
    } catch (erro) {
        console.error('Falha ao carregar técnicos por zona:', erro);
        TECNICOS_POR_ZONA = {};
    }
}


// ======================= INICIALIZA DASHBOARD =======================
async function inicializarDashboard() {
    try {
        // 1) carrega tickets (S3 ou mock)
        const dadosReais = await dashprocesso();
        const todos = [...dadosReais, ...MOCK_TICKETS];

        const vistos = new Set();
        dadosTickets = todos.filter(t => {
            if (!t || !t.chave) return false;
            if (vistos.has(t.chave)) return false;
            vistos.add(t.chave);
            return true;
        });

        console.log('Total de tickets (reais + mock, sem duplicar):', dadosTickets.length);

        // 2) carrega quantidade de técnicos por zona do banco
        await carregarTecnicosPorZona(); // <<< IMPORTANTE

        // 3) resto da inicialização
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
function obterPeriodoAndamentoParaResolvido(ticket) {
    const historico = Array.isArray(ticket.historico_status)
        ? ticket.historico_status.slice()
        : [];

    if (historico.length === 0) return null;

    historico.sort((a, b) => {
        const da = parseJiraDate(a.data);
        const db = parseJiraDate(b.data);
        return da - db;
    });

    for (let i = 0; i < historico.length; i++) {
        const h = historico[i];
        if (!ESTADOS_ANDAMENTO.includes(h.para)) continue;

        const inicio = parseJiraDate(h.data);
        if (!inicio) return null;

        let fim = null;

        for (let j = i + 1; j < historico.length; j++) {
            const h2 = historico[j];
            if (ESTADOS_RESOLVIDOS.includes(h2.para)) {
                fim = parseJiraDate(h2.data);
                break;
            }
        }

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

// MTTR por recurso
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

// MTTR geral (média dos recursos com valor > 0)
function calcularMTTRGeralHoras(tickets) {
    const mttrPorRecurso = calcularMTTR(tickets);
    const valores = Object.values(mttrPorRecurso).filter(v => v > 0);
    if (!valores.length) return 0;
    return valores.reduce((a, b) => a + b, 0) / valores.length;
}

// % SLA da equipe
function calcularSLADaEquipe(tickets, slaHoras) {
    let totalConsiderados = 0;
    let dentroSla = 0;

    tickets.forEach(ticket => {
        const duracaoHoras = obterPeriodoAndamentoParaResolvido(ticket);
        if (duracaoHoras === null) return;

        totalConsiderados++;
        if (duracaoHoras <= slaHoras) dentroSla++;
    });

    const pctDentro = totalConsiderados > 0
        ? (dentroSla / totalConsiderados) * 100
        : 0;

    return { pctDentro, totalConsiderados };
}

// formata "Xh Ym"
function formatarTempo(horas) {
    if (!horas || horas <= 0) return '--';
    const totalMin = Math.round(horas * 60);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;

    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
}

// MTTR cards (GPU/CPU/RAM/Disco)
// fator de alerta: quando o MTTR passar de 80% da SLA, já fica laranja
const FATOR_ALERTA_SLA = 0.8;

// MTTR cards (GPU/CPU/RAM/Disco) com cores baseadas na SLA
function atualizarMTTRCards(mttr) {
    const recursos   = ['GPU', 'CPU', 'RAM', 'Disco'];
    const elementos  = document.querySelectorAll('.mttr-item');

    const limiteLaranja = SLA_MTTR_HORAS * FATOR_ALERTA_SLA;

    recursos.forEach((recurso, index) => {
        if (!elementos[index]) return;
        const valorElement = elementos[index].querySelector('.mttr-value');
        if (!valorElement) return;

        const valorHoras = mttr[recurso] || 0;
        valorElement.textContent = formatarTempo(valorHoras);

        // limpa classes anteriores
        elementos[index].classList.remove('mttr-slow', 'mttr-avg', 'mttr-fast');

        // aplica cor baseada na SLA
        if (valorHoras === 0) {
            // sem dados => mantem sem classe, ou você pode escolher uma padrão
            return;
        }

        if (valorHoras > SLA_MTTR_HORAS) {
            // passou da SLA -> vermelho
            elementos[index].classList.add('mttr-slow');
        } else if (valorHoras >= limiteLaranja) {
            // se aproximando da SLA -> laranja
            elementos[index].classList.add('mttr-avg');
        } else {
            // bem dentro da SLA -> verde (cor atual)
            elementos[index].classList.add('mttr-fast');
        }
    });
}



// ======================= MATRIZ DE STATUS (Incidentes) =======================
function calcularMatrizStatus(tickets) {
    const matriz = {
        'GPU':  { total: 0, abertos: 0, andamento: 0, resolvidos: 0 },
        'CPU':  { total: 0, abertos: 0, andamento: 0, resolvidos: 0 },
        'RAM':  { total: 0, abertos: 0, andamento: 0, resolvidos: 0 },
        'Disco':{ total: 0, abertos: 0, andamento: 0, resolvidos: 0 }
    };

    tickets.forEach(ticket => {
        if (ticket.tipo !== 'Incidente') return;

        const recursos = extrairRecursos(ticket.labels || []);
        const status   = mapearStatus(ticket.status);

        recursos.forEach(recurso => {
            const linha = matriz[recurso];
            if (!linha) return;

            linha.total++;
            if (status === 'aberto')        linha.abertos++;
            else if (status === 'andamento') linha.andamento++;
            else if (status === 'resolvido') linha.resolvidos++;
        });
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


// ======================= PERFORMANCE DA EQUIPE =======================
function obterQtdTecnicos(zona) {
    // se por algum motivo não carregou nada, evita erro
    if (!TECNICOS_POR_ZONA || Object.keys(TECNICOS_POR_ZONA).length === 0) {
        return 0;
    }

    if (zona === 'all') {
        // soma os técnicos de todas as zonas
        return Object.values(TECNICOS_POR_ZONA).reduce((acc, v) => acc + (v || 0), 0);
    }

    // zona específica (SP-01, SP-02, MG-01, ...)
    return TECNICOS_POR_ZONA[zona] || 0;
}

function atualizarKpiEquipe(zonaAtual, ticketsZona) {
    const elQtdTecnicos = document.getElementById('teamAnalystsValue');
    const elMttr         = document.getElementById('teamMttrValue');
    const elBadge        = document.getElementById('teamMttrBadge');
    const elPctSla       = document.getElementById('teamSlaPct');

    if (!elQtdTecnicos || !elMttr || !elBadge || !elPctSla) return;

    const numTecnicos    = obterQtdTecnicos(zonaAtual);
    const mttrEquipe     = calcularMTTRGeralHoras(ticketsZona);
    const { pctDentro }  = calcularSLADaEquipe(ticketsZona, SLA_MTTR_HORAS);

    elQtdTecnicos.textContent = numTecnicos;

    elMttr.textContent = mttrEquipe > 0
        ? formatarTempo(mttrEquipe)
        : '--';

    elBadge.classList.remove('sla-ok', 'sla-bad', 'sla-pending');
    if (mttrEquipe === 0) {
        elBadge.textContent = '--';
        elBadge.classList.add('sla-pending');
    } else if (mttrEquipe <= SLA_MTTR_HORAS) {
        elBadge.textContent = 'Dentro da SLA';
        elBadge.classList.add('sla-ok');
    } else {
        elBadge.textContent = 'Fora da SLA';
        elBadge.classList.add('sla-bad');
    }

    elPctSla.textContent = pctDentro > 0
        ? `${pctDentro.toFixed(1)}%`
        : '--';
}


// ======================= MTTR POR DIA (gráfico) =======================
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
function atualizarGraficoMTTR(tickets) {
    const dados = calcularDadosMTTRPorDia(tickets);

    const mttrDiario = (dados.valores || []).map(v => Number((v || 0).toFixed(2)));
    const categoriasHistoricas = dados.categorias || [];

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

    const categorias = [...categoriasHistoricas, ...categoriasFuturas];

    const dadosReais = [...mttrDiario, null, null];

    const indicesValidos = [];
    const valoresValidos = [];

    mttrDiario.forEach((val, idx) => {
        if (val > 0) {
            indicesValidos.push(idx);
            valoresValidos.push(val);
        }
    });

    const totalPontos = categorias.length;
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

        console.log('Tendência MTTR - inclinação (m):', m);

        const ultimoIndiceReal = mttrDiario.length - 1;
        const primeiroFuturo   = mttrDiario.length;

        dadosPredicao[ultimoIndiceReal] = null;

        for (let i = primeiroFuturo; i < totalPontos; i++) {
            const x = i;
            let yPred = m * x + b;
            if (yPred < 0) yPred = 0;
            dadosPredicao[i] = Number(yPred.toFixed(2));
        }
    }

    // ====== NOVO: garantir que o eixo Y enxergue a SLA ======
    const maxReal   = mttrDiario.length ? Math.max(...mttrDiario) : 0;
    const maxPrev   = dadosPredicao.filter(v => v != null && v > 0);
    const maxPrevVal = maxPrev.length ? Math.max(...maxPrev) : 0;

    // maior valor entre dados e SLA
    const maxData = Math.max(maxReal, maxPrevVal, SLA_MTTR_HORAS);
    // coloca um "respiro" de 20% acima
    const yMax = maxData * 1.2;

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
            opacity: [0.25, 0]
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
            min: 0,
            max: yMax, // <- garante que a linha da SLA (4h) caiba no gráfico
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
        // ====== AQUI A LINHA VERMELHA DA SLA ======
        annotations: {
            yaxis: [
                {
                    y: SLA_MTTR_HORAS,
                    borderColor: COR_SLA,       // cor vermelha da SLA
                    strokeDashArray: 4,
                    label: {
                        borderColor: COR_SLA,
                        style: {
                            color: '#fff',
                            background: COR_SLA,
                            fontSize: '10px'
                        },
                        text: `SLA - ${formatarTempo(SLA_MTTR_HORAS)}`
                    }
                }
            ]
        },
        legend: { show: true }
    };

    if (chartMTTR) chartMTTR.destroy();
    chartMTTR = new ApexCharts(document.querySelector('#mttrChart'), optionsMTTR);
    chartMTTR.render();
}



// ======================= TICKETS POR RECURSO (Incidentes) =======================
function calcularTicketsPorRecursoDia(tickets, tipoVisao = 'incidentes') {
    const recursos = { GPU: [], CPU: [], RAM: [], Disco: [] };
    const hoje = new Date();
    const categorias = [];

    for (let i = 6; i >= 0; i--) {
        const diaIni = new Date(hoje);
        diaIni.setDate(diaIni.getDate() - i);
        diaIni.setHours(0, 0, 0, 0);

        const diaFim = new Date(diaIni);
        diaFim.setHours(23, 59, 59, 999);

        const label =
            String(diaIni.getDate()).padStart(2, '0') + '/' +
            String(diaIni.getMonth() + 1).padStart(2, '0');
        categorias.push(label);

        const ticketsDia = tickets.filter(ticket => {
            const dataCriacao = parseJiraDate(ticket.datas.criacao);
            if (!dataCriacao || dataCriacao < diaIni || dataCriacao > diaFim) return false;

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
        categorias
    };
}

function atualizarGraficoRecursos(tickets) {
    const dadosInc  = calcularTicketsPorRecursoDia(tickets, 'incidentes');
    const seriesInc = dadosInc.series;
    const categoriasDias = dadosInc.categorias;

    const colorsInc = [
    '#138D8D', // GPU
    '#2C3E50', // CPU
    '#120A8F', // RAM
    '#B2A300'  // Disco
];

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

    window.seriesResource  = seriesInc;
    window.categoriasDias  = categoriasDias;
    window.colorsResource  = colorsInc;
    window.chartResource   = chartResource;

    const dotGpu   = document.getElementById('leg-gpu');
    const dotCpu   = document.getElementById('leg-cpu');
    const dotRam   = document.getElementById('leg-ram');
    const dotDisco = document.getElementById('leg-disco');
    if (dotGpu)   dotGpu.style.background   = colorsInc[0];
    if (dotCpu)   dotCpu.style.background   = colorsInc[1];
    if (dotRam)   dotRam.style.background   = colorsInc[2];
    if (dotDisco) dotDisco.style.background = colorsInc[3];
}

function filterResourceChart(componente) {
    if (!window.chartResource || !window.seriesResource) return;

    const series = window.seriesResource;
    let filteredSeries;

    if (componente === 'all') {
        filteredSeries = series;
    } else {
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
        const rec = gerarRecomendacao();

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

    const botoesVerMais = tbody.querySelectorAll('.ver-mais-btn');
    botoesVerMais.forEach(btn => {
        const zona = btn.getAttribute('data-zona');
        if (!zona) return;

        btn.addEventListener('click', () => {
            const select = document.getElementById('zoneSelect');

            zonaSelecionada = zona;
            if (select) {
                select.value = zona;
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
        titleElement.innerHTML = 'Dashboard - Performance de Resoluções dos Tickets das Zonas (Últimos 7 dias) - <span style="color: #006E66;">SLA - 4hrs</span>';
    } else {
        titleElement.innerHTML = `Dashboard - Performance de Resoluções dos Tickets das Zonas - ${selectedZone} (Últimos 7 dias) - <span style="color: #006E66;">SLA - 4hrs</span>`;
    }
}


// ======================= SLA NA PRIMEIRA KPI =======================
function inicializarSlaKpi() {
    const slaEl = document.getElementById('slaTargetValue');
    if (!slaEl) return;
    slaEl.textContent = formatarTempo(SLA_MTTR_HORAS);
}


// ======================= APLICA FILTROS E ATUALIZA TUDO =======================
function aplicarFiltrosDashboard() {
    const ticketsFiltradosZona    = filtrarPorZona(dadosTickets, zonaSelecionada);
    const ticketsUltimos7DiasZona = filtrarUltimos7Dias(ticketsFiltradosZona);

    const ticketsUltimos7DiasTodos = filtrarUltimos7Dias(dadosTickets);

    const mttr = calcularMTTR(ticketsUltimos7DiasZona);
    atualizarMTTRCards(mttr);

    const matriz = calcularMatrizStatus(ticketsUltimos7DiasZona);
    atualizarTabelaStatus(matriz);

    // NOVO: KPI de equipe
    atualizarKpiEquipe(zonaSelecionada, ticketsUltimos7DiasZona);

    atualizarGraficoMTTR(ticketsUltimos7DiasZona);
    atualizarGraficoRecursos(ticketsUltimos7DiasZona);

    atualizarTabelaZonas(ticketsUltimos7DiasTodos);

    console.log('Dashboard atualizado. Zona:', zonaSelecionada);
}


// ======================= ESPERAR APexCharts CARREGAR =======================
function aguardarApexCharts() {
    if (typeof ApexCharts !== 'undefined') {
        console.log('ApexCharts carregado, iniciando dashboard...');
        inicializarSlaKpi();
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