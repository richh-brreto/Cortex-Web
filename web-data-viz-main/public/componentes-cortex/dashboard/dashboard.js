// dashboard.js

import { vendasData, acessosData, tarefasData } from './dashboard-data.js';

function initDashboard() {
    const vendasChartEl = document.querySelector('#vendas-chart');
    const acessosChartEl = document.querySelector('#acessos-chart');
    const tarefasChartEl = document.querySelector('#tarefas-chart');

    if (vendasChartEl) {
        vendasChartEl.setAttribute('chart-title', vendasData.title);
        vendasChartEl.setAttribute('chart-labels', JSON.stringify(vendasData.labels));
        vendasChartEl.setAttribute('chart-data', JSON.stringify(vendasData.data));
    }

    if (acessosChartEl) {
        acessosChartEl.setAttribute('chart-title', acessosData.title);
        acessosChartEl.setAttribute('chart-labels', JSON.stringify(acessosData.labels));
        acessosChartEl.setAttribute('chart-data', JSON.stringify(acessosData.data));
    }
    
    if (tarefasChartEl) {
        tarefasChartEl.setAttribute('chart-title', tarefasData.title);
        tarefasChartEl.setAttribute('chart-labels', JSON.stringify(tarefasData.labels));
        tarefasChartEl.setAttribute('chart-data', JSON.stringify(tarefasData.data));
    }
}

document.addEventListener('DOMContentLoaded', initDashboard);