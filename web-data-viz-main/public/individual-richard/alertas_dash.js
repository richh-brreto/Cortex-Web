// single-select (filtro)
// helpers (faz um filtro simples normalizando a string)
function normKey(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Example breakdown data per model (replace with real data from Slack/Jira)
const alertBreakdown = {
    [normKey('WAPX')]: { CPU: 40, RAM: 80, Disco: 60, GPU: 60 },
    [normKey('Vortex-2')]: { CPU: 20, RAM: 50, Disco: 40, GPU: 70 },
    [normKey('Astra-core')]: { CPU: 10, RAM: 30, Disco: 50, GPU: 70 },
    [normKey('Astra-Mini')]: { CPU: 15, RAM: 25, Disco: 40, GPU: 70 },
    [normKey('Vortex-1')]: { CPU: 25, RAM: 20, Disco: 30, GPU: 10 }
};

let lineChart = null;
let originalLineDatasets = null;
let barChart = null;

// popula os selects com os datasets q tão disponíveis
function populateModelSelects(labels) {
    const selectBar = document.getElementById('selectBarModel');
    const selectLine = document.getElementById('selectLineModel');
    if (!selectBar || !selectLine) return;

    // limpa o q ja estiver
    selectBar.innerHTML = '';
    selectLine.innerHTML = '';

    labels.forEach((label, i) => {
        const opt1 = document.createElement('option');
        opt1.value = label;
        opt1.text = label;
        selectBar.appendChild(opt1);

        const opt2 = document.createElement('option');
        opt2.value = label;
        opt2.text = label;
        selectLine.appendChild(opt2);
    });

    // defaults
    if (selectBar.options.length) selectBar.selectedIndex = 0;
    if (selectLine.options.length) selectLine.selectedIndex = 0;

    // coloca listeners
    selectBar.addEventListener('change', () => updateBarChart());
    selectLine.addEventListener('change', () => updateLineChart());
}

function updateLineChart() {
    if (!lineChart || !originalLineDatasets) return;
    const selectLine = document.getElementById('selectLineModel');
    const selected = selectLine ? normKey(selectLine.value) : null;

    if (!selected) {
        lineChart.data.datasets = JSON.parse(JSON.stringify(originalLineDatasets));
    } else {
        const found = originalLineDatasets.find(ds => normKey(ds.label) === selected);
        if (found) {
            // só usa o que for encontrado
            lineChart.data.datasets = [JSON.parse(JSON.stringify(found))];
        } else {
            // pega tudo de volta
            lineChart.data.datasets = JSON.parse(JSON.stringify(originalLineDatasets));
        }
    }
    lineChart.update();
}

function updateBarChart() {
    if (!barChart) return;
    const selectBar = document.getElementById('selectBarModel');
    const selected = selectBar ? normKey(selectBar.value) : null;

    const labels = ['CPU', 'RAM', 'Disco', 'GPU'];
    const data = [];

    if (selected && alertBreakdown[selected]) {
        const br = alertBreakdown[selected];
        data.push(br.CPU || 0, br.RAM || 0, br.Disco || 0, br.GPU || 0);
    } else {
        // fallback: zeros
        data.push(0, 0, 0, 0);
    }

    barChart.data.labels = labels;
    if (!barChart.data.datasets || !barChart.data.datasets.length) {
        barChart.data.datasets = [{ label: 'Número de Alertas', data: data, backgroundColor: ['rgba(255,99,132,0.7)', 'rgba(54,162,235,0.7)', 'rgba(75,192,192,0.7)', 'rgba(153,102,255,0.7)'], borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(75,192,192,1)', 'rgba(153,102,255,1)'], borderWidth: 1 }];
    } else {
        barChart.data.datasets[0].data = data;
    }
    barChart.update();
}

window.addEventListener('load', () => {
    // inicializa os gráficos qnd estiver disponível
    if (typeof Chart === 'undefined') return;

    // gráfico de linha
    const lineCanvas = document.getElementById('lineChart');
    if (lineCanvas) {
        const ctx = lineCanvas.getContext('2d');
        lineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Dez', 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
                datasets: [
                    { label: 'WAPX', data: [100, 160, 190, 120, 125, 90, 80, 130, 170, 180, 223, 240], borderColor: '#00B2B2', backgroundColor: 'rgba(0,178,178,0.1)', tension: 0.4, fill: true },
                    { label: 'Vortex-2', data: [34, 40, 49, 69, 79, 85, 93, 97, 108, 112, 115, 180], borderColor: '#006E66', backgroundColor: 'rgba(0,110,102,0.1)', tension: 0.4, fill: true },
                    { label: 'Astra-core', data: [20, 28, 39, 42, 50, 62, 75, 72, 71, 76, 81, 160], borderColor: 'blue', backgroundColor: 'rgba(92,104,222,0.1)', tension: 0.4, fill: true },
                    { label: 'Astra-Mini', data: [20, 28, 39, 42, 50, 61, 70, 82, 85, 108, 138, 150], borderColor: 'rgba(180,222,92,1)', backgroundColor: 'rgba(180,222,92,0.1)', tension: 0.4, fill: true },
                    { label: 'Vortex-1', data: [20, 28, 39, 42, 51, 62, 55, 60, 60, 62, 60, 65], borderColor: '#F59E0B', backgroundColor: 'rgba(245,158,11,0.1)', tension: 0.4, fill: true }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { position: 'bottom' } },
                scales: { y: { beginAtZero: true, title: { display: true, text: 'Quantidade' } }, x: { title: { display: true, text: 'Mês' } } }
            }
        });

        originalLineDatasets = JSON.parse(JSON.stringify(lineChart.data.datasets));
    }

    // gráfico de barra
    const barCanvas = document.getElementById('barChart');
    if (barCanvas) {
        const ctx = barCanvas.getContext('2d');
        barChart = new Chart(ctx, {
            type: 'bar',
            data: { labels: ['CPU', 'RAM', 'Disco', 'GPU'], datasets: [{ label: 'Número de Alertas', data: [0, 0, 0, 0], backgroundColor: ['rgba(255,99,132,0.7)', 'rgba(54,162,235,0.7)', 'rgba(75,192,192,0.7)', 'rgba(153,102,255,0.7)'], borderColor: ['rgba(255,99,132,1)', 'rgba(54,162,235,1)', 'rgba(75,192,192,1)', 'rgba(153,102,255,1)'], borderWidth: 1 }] },
            options: { responsive: true, maintainAspectRatio: true, scales: { y: { beginAtZero: true } } }
        });
    }

    // Populate selects from originalLineDatasets labels (if available) or fallback list
    const labels = originalLineDatasets ? originalLineDatasets.map(d => d.label) : ['WAPX', 'Vortex-2', 'Astra-core', 'Astra-Mini', 'Vortex-1'];
    populateModelSelects(labels);

    // renderiza inicialmente pelos defaults
    updateLineChart();
    updateBarChart();
});