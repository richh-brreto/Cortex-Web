
const modelModal = document.getElementById('modelModal');
const abaModal = document.getElementsByClassName('modal-title')



function openModal() {
    if (modelModal){
        modelModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}
function closeModal() {
    if (modelModal) modelModal.style.display = 'none';
}


for(let i = 0; i < abaModal.length; i++){
    abaModal[i].addEventListener("click", function (){

        for(let j = 0; j < abaModal.length;j++){
            abaModal[j].classList.remove("ativo")
        }
            this.classList.add("ativo")

})
}

const detalheModal = document.getElementById('detalhesChamado')
const infoModelo = document.getElementById('informacoesModelo')
const arquitetura = document.getElementById('arquitetura')


detalheModal.addEventListener("click", function (){

    
})

window.addEventListener("load", function () {


})



// GRAFICOS DE LINHA SERVIDOR
const alertsCtx2 = document.getElementById('alertsChart2').getContext('2d');

const alertsChart2 = new Chart(alertsCtx2, {
    type: 'line',
    data: {
        labels: [
            '11:20:30', '11:21:30', '11:22:30', '11:23:30', '11:24:30',
            '11:25:30', '11:26:30', '11:27:30', '11:28:30', '11:29:30', '11:30:30'
        ],
        datasets: [
            {
                label: 'CPU',
                data: [80, 80, 80, 79, 79, 78, 75, 60, 64, 65, 64],
                borderColor: '#00B2B2',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#00B2B2',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            },
            {
                label: 'RAM',
                data: [70, 77, 77, 76, 75, 78, 80, 80, 80, 80, 77],
                borderColor: '#0cb200ff',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#0cb200ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            },
            {
                label: 'GPU',
                data: [20, 30, 34, 33, 32, 34, 35, 35, 31, 32, 36],
                borderColor: '#0009b2ff',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#0009b2ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            },
            {
                label: 'Disco',
                data: [10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11],
                borderColor: '#b2b200ff',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#b2a300ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    boxWidth: 10,
                    padding: 20,
                    color: '#333',
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif'
                    }
                }
            },
            tooltip: {
                enabled: true,
                mode: 'nearest',
                intersect: false,
                backgroundColor: '#fff',
                titleColor: '#333',
                bodyColor: '#000',
                borderColor: '#ccc',
                borderWidth: 1
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 5 }
            },
            x: {
                grid: { display: false }
            }
        }
    }

});

// GRAFICO LINHA PROCESSO
const alertsCtx = document.getElementById('alertsChart').getContext('2d');


const alertsChart = new Chart(alertsCtx, {
    type: 'line',
    data: {
        labels: [
            '11:20:30', '11:21:30', '11:22:30', '11:23:30', '11:24:30',
            '11:25:30', '11:26:30', '11:27:30', '11:28:30', '11:29:30', '11:30:30'
        ],
        datasets: [
            {
                label: 'CPU',
                data: [8, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6],
                borderColor: '#00B2B2',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#00B2B2',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            },
            {
                label: 'RAM',
                data: [7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 7],
                borderColor: '#0cb200ff',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#0cb200ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            },
            {
                label: 'GPU',
                data: [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                borderColor: '#0009b2ff',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#0009b2ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            },
            {
                label: 'Disco',
                data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                borderColor: '#b2b200ff',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#b2a300ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            },
        ],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,              // ✅ ativa a legenda
                position: 'top',            // pode ser: 'top', 'bottom', 'left', 'right'
                align: 'center',
                labels: {
                    usePointStyle: true,    // usa o mesmo formato dos pontos do gráfico
                    pointStyle: 'circle',
                    boxWidth: 10,
                    padding: 20,
                    color: '#333',          // cor do texto da legenda
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif'
                    }
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#fff',
                titleColor: '#333',
                bodyColor: '#000',
                borderColor: '#ccc',
                borderWidth: 1,
                mode: 'nearest',
                intersect: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    }
});

// MULTISELECT

function toggleMultiselect() {
    const dropdown = document.getElementById('multiselectDropdown');
    dropdown.classList.toggle('active');
}



function updateSelection() {
    const checkboxes = document.querySelectorAll('.multiselect-option input[type="checkbox"]');
    const count = Array.from(checkboxes).filter(cb => cb.checked)
    var valores = []
    for (let i = 0; i < count.length; i++) {
        valores.push(count[i].value)
    }
    if (count.length == 4) {
        document.getElementById('selectedCount').textContent = "Todos"
    } else {
        document.getElementById('selectedCount').textContent = `${valores}`
    }

}

function applySelection() {
    toggleMultiselect();
    updateLineChart();
}


function updateLineChart() {
    const checkboxes = document.querySelectorAll('.multiselect-option input[type="checkbox"]');
    const count = Array.from(checkboxes).filter(cb => cb.checked)
    var newDatasets = []
    for (let i = 0; i < count.length; i++) {
        if (count[i].value == "CPU") {
            newDatasets.push({
                label: 'CPU',
                data: [80, 80, 80, 79, 79, 78, 75, 60, 64, 65, 64],
                borderColor: '#00B2B2',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#00B2B2',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            });
        }
        if (count[i].value == "RAM") {
            newDatasets.push({
                label: 'RAM',
                data: [70, 77, 77, 76, 75, 78, 80, 80, 80, 80, 77],
                borderColor: '#0cb200ff',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#0cb200ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            });
        }
        if (count[i].value == "GPU") {
            newDatasets.push({
                label: 'GPU',
                data: [20, 30, 34, 33, 32, 34, 35, 35, 31, 32, 36],
                borderColor: '#0009b2ff',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#0009b2ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            });
        }
        if (count[i].value == "Disco") {
            newDatasets.push({
                label: 'Disco',
                data: [10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11],
                borderColor: '#b2b200ff',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#b2a300ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            });
        }


    }

    alertsChart2.data.datasets = newDatasets;
    alertsChart2.update();
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
    const container = document.querySelector('.multiselect-container');
    if (!container.contains(e.target)) {
        document.getElementById('multiselectDropdown').classList.remove('active');
    }
});

// OUTRO
function toggleMultiselect2() {
    const dropdown2 = document.getElementById('multiselectDropdown2');
    dropdown2.classList.toggle('active');
}

function updateSelection2() {
    const checkboxes2 = document.querySelectorAll('.multiselect-option2 input[type="checkbox"]');
    const count2 = Array.from(checkboxes2).filter(cb => cb.checked)
    var valores = []
    for (let i = 0; i < count2.length; i++) {
        valores.push(count2[i].value)
    }
    if (count2.length == 4) {
        document.getElementById('selectedCount2').textContent = "Todos"
    } else {
        document.getElementById('selectedCount2').textContent = `${valores}`
    }
}

function applySelection2() {
    toggleMultiselect2();
    updateLineChart2();
}


function updateLineChart2() {
 const checkboxes2 = document.querySelectorAll('.multiselect-option2 input[type="checkbox"]');
    const count2 = Array.from(checkboxes2).filter(cb => cb.checked)
    var newDatasets = []
    for (let i = 0; i < count2.length; i++) {
        if (count2[i].value == "CPU") {
            newDatasets.push({
                    label: 'CPU',
                data: [8, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6],
                borderColor: '#00B2B2',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#00B2B2',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            });
        }
        if (count2[i].value == "RAM") {
            newDatasets.push({
                 label: 'RAM',
                data: [7, 7, 7, 7, 7, 7, 8, 8, 8, 8, 7],
                borderColor: '#0cb200ff',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#0cb200ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            });
        }
        if (count2[i].value == "GPU") {
            newDatasets.push({
                label: 'GPU',
                data: [2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                borderColor: '#0009b2ff',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#0009b2ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            });
        }
        if (count2[i].value == "Disco") {
            newDatasets.push({
                label: 'Disco',
                data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                borderColor: '#b2b200ff',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#b2a300ff',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointHoverRadius: 6
            });
        }


    }
    alertsChart.data.datasets = newDatasets;
    alertsChart.update();
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
    const container2 = document.querySelector('.multiselect-container2');
    if (!container2.contains(e.target)) {
        document.getElementById('multiselectDropdown2').classList.remove('active');
    }
});

