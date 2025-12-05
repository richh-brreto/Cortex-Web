const API_BASE = "/alertas"; // rotas do backend

// select de modelo
const modeloSelect = document.getElementById("selectModelo");

// KPIs
const kpiTotal = document.getElementById("kpi_total");
const kpiHoje = document.getElementById("kpi_hoje");
const kpiSemana = document.getElementById("kpi_semana");

// gráficos
let graficoCategorias = null;
let graficoIntervalos = null;

// fetchs
async function fetchAlertasSlack(modelo) {
    const resp = await fetch(`${API_BASE}/slack/${modelo}`);
    if (!resp.ok) return [];
    return await resp.json();
}

async function fetchAlertasJira(modelo) {
    const resp = await fetch(`${API_BASE}/jira/${modelo}`);
    if (!resp.ok) return [];
    return await resp.json();
}

// processar dados das kpis
function calcularKPIs(alertas) {
    const agora = new Date();
    const hoje = agora.toISOString().slice(0, 10);

    let total = alertas.length;
    let hojeCount = 0;
    let semanaCount = 0;

    const semanaPassada = new Date();
    semanaPassada.setDate(semanaPassada.getDate() - 7);

    alertas.forEach(a => {
        const t = new Date(a.data || a.ts * 1000);

        if (t.toISOString().slice(0, 10) === hoje) hojeCount++;
        if (t >= semanaPassada) semanaCount++;
    });

    return { total, hojeCount, semanaCount };
}

function atualizarKPIs(kpis) {
    kpiTotal.textContent = kpis.total;
    kpiHoje.textContent = kpis.hojeCount;
    kpiSemana.textContent = kpis.semanaCount;
}

// detectar categorias no texto
function detectarCategoria(msg) {
    msg = msg.toLowerCase();
    if (msg.includes("cpu")) return "CPU";
    if (msg.includes("ram") || msg.includes("memória")) return "RAM";
    if (msg.includes("gpu")) return "GPU";
    if (msg.includes("disco") || msg.includes("storage")) return "DISCO";
    return "Outros";
}

// agrupar por intervalos de 1h, 6h, 24h
function agruparPorIntervalo(alertas) {
    const agora = Date.now();

    const intervalos = {
        "Última hora": 0,
        "Últimas 6h": 0,
        "Últimas 24h": 0
    };

    alertas.forEach(a => {
        const t = new Date(a.data || a.ts * 1000).getTime();

        const diff = (agora - t) / (1000 * 60 * 60); // horas

        if (diff <= 1) intervalos["Última hora"]++;
        if (diff <= 6) intervalos["Últimas 6h"]++;
        if (diff <= 24) intervalos["Últimas 24h"]++;
    });

    return intervalos;
}

// gráfico de barras (categorias)

function montarGraficoCategorias(alertas) {
    const categoriasCount = {};

    alertas.forEach(a => {
        const categoria = detectarCategoria(a.text || JSON.stringify(a));
        categoriasCount[categoria] = (categoriasCount[categoria] || 0) + 1;
    });

    const labels = Object.keys(categoriasCount);
    const values = labels.map(l => categoriasCount[l]);

    if (graficoCategorias) graficoCategorias.destroy();

    const ctx = document.getElementById("graficoCategorias");
    graficoCategorias = new Chart(ctx, {
        type: "bar",
        data: {
            labels,
            datasets: [{
                label: "Quantidade de alertas",
                data: values
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false }
            }
        }
    });
}


// gráfico de linhas (intervalos)

function montarGraficoIntervalos(alertas) {
    const intervalos = agruparPorIntervalo(alertas);

    if (graficoIntervalos) graficoIntervalos.destroy();

    const ctx = document.getElementById("graficoIntervalos");
    graficoIntervalos = new Chart(ctx, {
        type: "line",
        data: {
            labels: Object.keys(intervalos),
            datasets: [{
                label: "Alertas por intervalo",
                data: Object.values(intervalos),
                tension: 0.3
            }]
        },
        options: {
            responsive: true
        }
    });
}

// atualizar dashboard completo

async function atualizarDashboard() {
    const modelo = modeloSelect.value;

    const slack = await fetchAlertasSlack(modelo);
    const jira = await fetchAlertasJira(modelo);

    const alertas = [...slack, ...jira];

    // KPIs
    const kpis = calcularKPIs(alertas);
    atualizarKPIs(kpis);

    // Gráficos
    montarGraficoCategorias(alertas);
    montarGraficoIntervalos(alertas);
}


modeloSelect.addEventListener("change", atualizarDashboard);
window.onload = atualizarDashboard;
