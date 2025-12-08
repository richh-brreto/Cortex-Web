const API_BASE = "/api/alertas"; // rotas do backend

// select de modelo 
const modeloSelect = document.getElementById("selectModelo")

// KPIs
const kpiTotal = document.getElementById("kpi_total");
const kpi_24h = document.getElementById("kpi_24h");
const kpiSemana = document.getElementById("kpi_semana");
const kpiMultiplas = document.getElementById("kpi_multiplas");

// contadores de alerta
let cpu = 0;
let ram = 0;
let disco = 0;
let gpu = 0;

// gráficos
let graficoCategorias = null;
let graficoIntervalos = null;


// fetchs
async function fetchAlertasSlack(modelo) {
    if (!modelo) return [];

    try {
        const resp = await fetch(`${API_BASE}/slack/${modelo}`, {
            method: "GET",
            headers: {
                "Cache-Control": "no-cache",
                "Pragma": "no-cache"
            }
        });

        if (!resp.ok) {
            console.warn("Erro ao buscar alertas Slack:", resp.status);
            return [];
        }

        return await resp.json();

    } catch (err) {
        console.error("Erro no fetch Slack:", err);
        return [];
    }
}



function calcularPredicoesTotal(totalAtual) {
    return {
        dia: Math.round(totalAtual * 1.07),
        semana: Math.round(totalAtual * 1.49)
    };
}

function atualizarKpiPredicoesTotal(totalAtual) {
    const { dia, semana } = calcularPredicoesTotal(totalAtual);
    document.getElementById("kpi_total").textContent = totalAtual;

    // previsões
    document.getElementById("kpi_pred_dia").textContent =
        `Se nada for resolvido: ~${dia} (+7% em 24h)`;

    document.getElementById("kpi_pred_semana").textContent =
        `Projeção em 7 dias: ~${semana} (+49% na semana)`;
}


function extrairModelo(text) {
    const modelo = text.match(/Modelo:\s*([^\n]+)/i);

    console.log(modelo ? modelo[1].trim() : null);

    return modelo ? modelo[1].trim() : null;
}

function extrairSeveridade(text) {
    const match = text.match(/Tipo:\s*(CRÍTICO!?|ATENÇÃO!?)/i);
    return match ? match[1].replace("!", "").toUpperCase() : null;
}

function extrairDataSlackTS(ts) {
    if (!ts) return null;

    // ts vem como string "1234567890.12345"
    const seconds = parseFloat(ts);
    return new Date(seconds * 1000);
}


function extrairAlertas(text) {
    const severidade = extrairSeveridade(text);
    const modelo = extrairModelo(text);

    const tipos = ["CPU", "RAM", "DISCO", "GPU"];
    const alertas = [];

    tipos.forEach(tipo => {
        const regex = new RegExp(`${tipo}:\\s*([0-9]+)%`, "i");
        const match = text.match(regex);

        if (match) {
            alertas.push({
                severidade,
                modelo,
                tipo
            });
        }
    });

    return alertas;
}

function contarTotalAlertas(alertasSlack) {
    let total = 0;

    alertasSlack.forEach(msg => {
        const alertas = extrairAlertas(msg.text);
        total += alertas.length;
    });

    return total;
}

function contarSeveridade(alertasSlack) {
    let criticos = 0;
    let atencao = 0;

    alertasSlack.forEach(msg => {
        const alertas = extrairAlertas(msg.text);

        alertas.forEach(a => {
            if (a.severidade === "CRÍTICO") criticos++;
            if (a.severidade === "ATENÇÃO") atencao++;
        });
    });

    return { criticos, atencao };
}

function contarCategoriasPorSeveridade(alertasSlack) {
    const counts = {
        CPU: { CRÍTICO: 0, ATENÇÃO: 0 },
        RAM: { CRÍTICO: 0, ATENÇÃO: 0 },
        DISCO: { CRÍTICO: 0, ATENÇÃO: 0 },
        GPU: { CRÍTICO: 0, ATENÇÃO: 0 }
    };

    alertasSlack.forEach(msg => {
        const alertas = extrairAlertas(msg.text);

        alertas.forEach(a => {
            if (!counts[a.tipo]) return;

            if (a.severidade === "CRÍTICO") counts[a.tipo].CRÍTICO++;
            if (a.severidade === "ATENÇÃO") counts[a.tipo].ATENÇÃO++;
        });
    });

    return counts;
}

function extrairCategoriasDaMensagem(text) {
    const alertas = extrairAlertas(text);

    const counts = { CPU: 0, RAM: 0, DISCO: 0, GPU: 0 };

    alertas.forEach(a => {
        if (counts[a.tipo] !== undefined) {
            counts[a.tipo]++;
        }
    });

    return counts;
}

// ===== gráfico de intervalos de 2h nas últimas 24h ======
function gerarIntervalos24h() {
    const agora = new Date();
    const intervalos = [];

    for (let i = 24; i > 0; i -= 2) {
        const inicio = new Date(agora.getTime() - (i * 60 * 60 * 1000));
        const fim = new Date(inicio.getTime() + (2 * 60 * 60 * 1000));

        intervalos.push({
            label: `${inicio.getHours()}h - ${fim.getHours()}h`,
            inicio,
            fim,
            count: 0
        });
    }

    return intervalos;
}

// ===== KPI de modelos com mais alertas em 24h ======

function contarModelos24h(alertasSlack) {
    const agora = new Date();
    const limite = new Date(agora.getTime() - 24 * 60 * 60 * 1000);

    const counts = {};

    alertasSlack.forEach(msg => {
        const data = extrairDataSlackTS(msg.ts);
        const modelo = extrairModelo(msg.text);

        if (!data || !modelo) return;

        if (data >= limite) {
            counts[modelo] = (counts[modelo] || 0) + 1;
        }
    });

    return counts;
}


function atualizarKpiModelos24h(counts) {
    kpi_24h.innerHTML = "";

    const entries = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    if (entries.length === 0) {
        kpi_24h.textContent = "Nenhum alerta nas últimas 24h";
        return;
    }

    entries.forEach(([modelo, qtd]) => {
        const div = document.createElement("div");
        div.textContent = `${modelo}: ${qtd}`;
        kpi_24h.appendChild(div);
    });
}

// ====== kpi de proporção crítica =======

function calcularProporcaoCritica(alertasSlack) {
    const total = contarTotalAlertas(alertasSlack);
    if (total === 0) return 0;

    const { criticos } = contarSeveridade(alertasSlack);
    return ((criticos / total) * 100).toFixed(2); // duas casas decimais
}

function atualizarKpiProporcaoCriticos(alertasSlack) {
    const proporcao = calcularProporcaoCritica(alertasSlack);
    document.getElementById("kpi_proporcao_criticos").textContent = proporcao + "%";
}


// ====== buscar modelos para o usuário logado ======

async function fetchModelosParaUsuario() {
    try {
        const dados = JSON.parse(sessionStorage.getItem("dados") || '{}');
        const fk_usuario = dados.ID_USUARIO;
        const fk_empresa = dados.EMPRESA_USUARIO;
        if (!fk_usuario || !fk_empresa) {
            console.warn('ID do usuário ou empresa não encontrado em sessionStorage');
            return;
        }

        const resp = await fetch(`${API_BASE}/modelos/${fk_usuario}/${fk_empresa}`);
        if (!resp.ok) return;
        const modelos = await resp.json();

        if (!modeloSelect) {
            console.warn('select de modelo não encontrado no DOM (id: selectModelo / selectModeloIntervalos)');
            return modelos;
        }

        modeloSelect.innerHTML = '';
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Selecione um modelo';
        modeloSelect.appendChild(placeholder);

        modelos.forEach(m => {
            const opt = document.createElement('option');
            const nome = m.nome
            opt.value = nome;
            opt.textContent = nome;
            modeloSelect.appendChild(opt);
        });

        if (modelos.length > 0) {
            modeloSelect.value = modelos[0].nome
            atualizarDashboard();
        }
        return modelos;
    } catch (err) {
        console.error('Erro ao carregar modelos:', err);
    }
}

// ====== buscar alertas de todos os modelos ======

async function fetchAlertasTodosModelos(listaModelos) {
    let todas = [];

    for (const m of listaModelos) {
        const nome = m.nome;
        const alertas = await fetchAlertasSlack(nome);
        todas = [...todas, ...alertas];
    }

    return todas;
}


// ====== gráfico de barras (categorias) ========
function montarGraficoCategorias(alertasSlack) {
    const counts = contarCategoriasPorSeveridade(alertasSlack);

    const labels = ["CPU", "RAM", "DISCO", "GPU"];

    const criticos = labels.map(l => counts[l].CRÍTICO);
    const atencao = labels.map(l => counts[l].ATENÇÃO);

    if (graficoCategorias) graficoCategorias.destroy();

    graficoCategorias = new Chart(
        document.getElementById("graficoCategorias"),
        {
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label: "Críticos",
                        data: criticos,
                        backgroundColor: "#B74C4C"
                    },
                    {
                        label: "Atenção",
                        data: atencao,
                        backgroundColor: "#fcd856ff"
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true }
                }
            }
        }
    );
}


// ====== gráfico de linhas (intervalos) ========
function montarGraficoIntervalos(alertas) {
    const intervalos = gerarIntervalos24h();

    alertas.forEach(a => {
        const data = extrairDataSlackTS(a.ts);
        if (!data) return;

        intervalos.forEach(i => {
            if (data >= i.inicio && data <= i.fim) {
                i.count++;
            }
        });
    });

    if (graficoIntervalos) graficoIntervalos.destroy();

    graficoIntervalos = new Chart(
        document.getElementById("graficoIntervalos"),
        {
            type: "line",
            data: {
                labels: intervalos.map(i => i.label),
                datasets: [{
                    label: "Alertas (24h)",
                    data: intervalos.map(i => i.count),
                    tension: 0.3,
                    backgroundColor: '#B74C4C',
                    borderColor: '#B74C4C',
                    borderWidth: 2
                }]
            }
        }
    );
}


// ====== atualizar dashboard completo =======

async function atualizarDashboard() {
    const modelo = modeloSelect?.value;

    if (!modelo) {
        if (graficoCategorias) graficoCategorias.destroy();
        if (graficoIntervalos) graficoIntervalos.destroy();
        return;
    }

    // alertas do modelo selecionado
    const alertas = await fetchAlertasSlack(modelo);

    montarGraficoCategorias(alertas);
    montarGraficoIntervalos(alertas);

    const total = contarTotalAlertas(alertas);
    atualizarKpiPredicoesTotal(total);
    atualizarKpiProporcaoCriticos(alertas);

    // alertas de todos os modelos
    const counts24h = contarModelos24h(window._alertasTodosModelos);
    atualizarKpiModelos24h(counts24h);
}


if (modeloSelect) {
    modeloSelect.addEventListener("change", atualizarDashboard);
} else {
    console.warn('modeloSelect ausente — evento de change não será ligado');
}

window.onload = async function () {
    const modelos = await fetchModelosParaUsuario();
    window._todosOsModelos = modelos; // armazenar globalmente

    window._alertasTodosModelos = await fetchAlertasTodosModelos(modelos);

    atualizarDashboard();
};
