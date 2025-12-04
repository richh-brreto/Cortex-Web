//  helpers para padronizar
function normKey(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

let alertBreakdown = {};
let barChart = null;
let lineChart = null;
let originalLineDatasets = null;

//  -- kpis -- 
const kpiTotalOntem = document.querySelector("#kpi-total-ontem");
const kpiTotalAtivos = document.querySelector("#kpi-total-ativos");
const kpiCategoriasMultiplas = document.querySelector("#kpi-categorias-multiplas");
const kpiModelos24hContainer = document.querySelector("#kpi-modelos-24h");

//  -- requisições API -- 

async function fetchJSON(url) {
    try {
        const r = await fetch(url);
        if (!r.ok) return null;
        return await r.json();
    } catch (err) {
        console.error("Erro ao buscar " + url, err);
        return null;
    }
}

// BREAKDOWN — JIRA
async function carregarBreakdownJira() {
    const data = await fetchJSON('/mural/alertas/breakdown');
    if (!data) return;

    Object.entries(data).forEach(([modelo, recursos]) => {
        const mk = normKey(modelo);
        alertBreakdown[mk] = {
            CPU: recursos.CPU || 0,
            RAM: recursos.RAM || 0,
            Disco: recursos.Disco || 0,
            GPU: recursos.GPU || 0
        };
    });

    console.log("Breakdown Jira carregado:", alertBreakdown);
    if (barChart) updateBarChart();
}

// BREAKDOWN — SLACK
async function carregarBreakdownSlack() {
    const data = await fetchJSON('/mural/alertas/slack');
    if (!data) return;

    Object.entries(data).forEach(([modelo, recursos]) => {
        const mk = normKey(modelo);

        if (!alertBreakdown[mk]) {
            alertBreakdown[mk] = { CPU: 0, RAM: 0, Disco: 0, GPU: 0 };
        }

        alertBreakdown[mk].CPU += recursos.CPU || 0;
        alertBreakdown[mk].RAM += recursos.RAM || 0;
        alertBreakdown[mk].Disco += recursos.Disco || 0;
        alertBreakdown[mk].GPU += recursos.GPU || 0;
    });

    console.log("Breakdown Slack agregado:", alertBreakdown);

    populateModelSelects(Object.keys(alertBreakdown));
    updateBarChart();
}

// kpis do slack
async function carregarKPIsSlack() {
    const kpis = await fetchJSON('/mural/alertas/slack/kpis');
    if (!kpis) return;

    kpiTotalOntem.textContent = kpis.total_ontem ?? "0";
    kpiTotalAtivos.textContent = kpis.ativos ?? "0";
}

// kpis do jira
async function carregarKPIsJira() {
    const kpis = await fetchJSON('/mural/alertas/jira/kpis');
    if (!kpis) return;

    // categorias múltiplas
    kpiCategoriasMultiplas.textContent = kpis.categorias_multiplas ?? "0";

    // modelos 24h
    if (kpis.modelos_24h) {
        kpiModelos24hContainer.innerHTML = "";
        Object.entries(kpis.modelos_24h).forEach(([modelo, total]) => {
            const div = document.createElement("div");
            div.className = "arch-compact-item";
            div.innerHTML = `
                <div class="arch-compact-header">
                    <span class="arch-compact-name">${modelo}</span>
                    <span style="color:red">${total}</span>
                </div>
            `;
            kpiModelos24hContainer.appendChild(div);
        });
    }
}

// gráfico de linha
async function carregarLineChartAPI() {
    const data = await fetchJSON('/mural/alertas/jira/timeline');
    if (!data) return;

    const months = data.meses;
    const datasets = data.modelos.map(modeloData => ({
        label: modeloData.nome,
        data: modeloData.valores,
        borderColor: modeloData.cor || '#0099ff',
        backgroundColor: 'rgba(0,0,0,0.05)',
        fill: true,
        tension: 0.4
    }));

    const ctx = document.getElementById("lineChart").getContext("2d");
    lineChart = new Chart(ctx, {
        type: 'line',
        data: { labels: months, datasets: datasets },
        options: { responsive: true }
    });

    originalLineDatasets = JSON.parse(JSON.stringify(datasets));
    populateModelSelects(datasets.map(d => d.label));
}

// info pros selects (filtros)
function populateModelSelects(labels) {
    const barSel = document.getElementById('selectBarModel');
    const lineSel = document.getElementById('selectLineModel');

    if (!barSel || !lineSel) return;

    barSel.innerHTML = '';
    lineSel.innerHTML = '';

    labels.forEach(lbl => {
        const o1 = document.createElement("option");
        o1.value = lbl;
        o1.text = lbl;
        barSel.appendChild(o1);

        const o2 = document.createElement("option");
        o2.value = lbl;
        o2.text = lbl;
        lineSel.appendChild(o2);
    });

    barSel.onchange = updateBarChart;
    lineSel.onchange = updateLineChart;
}

// atualizar gráfico de barras
function updateBarChart() {
    if (!barChart) return;

    const select = document.getElementById("selectBarModel");
    const mk = normKey(select.value);

    const labels = ['CPU', 'RAM', 'Disco', 'GPU'];
    const selected = alertBreakdown[mk] || { CPU: 0, RAM: 0, Disco: 0, GPU: 0 };
    const data = [selected.CPU, selected.RAM, selected.Disco, selected.GPU];

    barChart.data.datasets[0].data = data;
    barChart.update();
}


// atualização do gráfico de linhas
function updateLineChart() {
    if (!lineChart || !originalLineDatasets) return;

    const selected = document.getElementById("selectLineModel").value;
    const mk = normKey(selected);

    const found = originalLineDatasets.find(ds => normKey(ds.label) === mk);

    lineChart.data.datasets = found ? [found] : originalLineDatasets;
    lineChart.update();
}

// inicializar os gráficos
window.onload = async () => {

    // inicializa gráfico de barra vazio
    const barCtx = document.getElementById("barChart").getContext("2d");
    barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['CPU', 'RAM', 'Disco', 'GPU'],
            datasets: [{
                label: "Número de Alertas",
                data: [0, 0, 0, 0],
                backgroundColor: ['rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)', 'rgba(75,192,192,0.6)', 'rgba(153,102,255,0.6)'],
                borderWidth: 1
            }]
        },
        options: { responsive: true }
    });

    async function carregarDashboard() {
        try {
            const resp = await fetch("http://localhost:3000/alertas");
            const data = await resp.json();

            atualizarKPIs(data.kpis);
            gerarGraficoModelos(data.grafico.modelos);
            gerarGraficoCategorias(data.grafico.categorias);

        } catch (e) {
            console.error("Erro ao carregar dashboard:", e);
        }
    }

    function atualizarKPIs(kpis) {
        document.getElementById("kpi-total-alertas").innerText = kpis.totalAlertas;
        document.getElementById("kpi-modelo-afetado").innerText = kpis.modeloMaisAfetado || "-";
        document.getElementById("kpi-categoria-recorrente").innerText = kpis.categoriaMaisRecorrente || "-";
    }

    // carrega tudo
    await carregarBreakdownJira();
    await carregarBreakdownSlack();
    await carregarKPIsSlack();
    await carregarKPIsJira();
    await carregarLineChartAPI();

    updateBarChart();
    updateLineChart();
};
