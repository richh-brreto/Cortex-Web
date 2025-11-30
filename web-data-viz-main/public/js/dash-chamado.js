
const modelModal = document.getElementById('modelModal');
const abaModal = document.getElementsByClassName('modal-title')



function openModal() {
    if (modelModal) {
        modelModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}
function closeModal() {
    if (modelModal) modelModal.style.display = 'none';
}


for (let i = 0; i < abaModal.length; i++) {
    abaModal[i].addEventListener("click", function () {

        for (let j = 0; j < abaModal.length; j++) {
            abaModal[j].classList.remove("ativo")
        }
        this.classList.add("ativo")

    })
}

const detalheModal = document.getElementById('detalhesChamado')
const infoModelo = document.getElementById('informacoesModelo')
const arquitetura = document.getElementById('arquitetura')
const modalBody = document.getElementById('modal-body')

        /* 
        Nome
        Modelo da Cpu
        Quantidade de Cpu
        Quantidade de Ram
        Modelo da Gpu
        Sistema Operacional
        Máximo de disco

 */
arquitetura.addEventListener('click', function () {
     modalBody.innerHTML = `
         <div class="container-modal">
                        <div class="titulo">
                            <h4>  Atual</h4>
                        </div>
                        <div class="corpo">
                            <div class="container-item-coluna">
                                <div class="info-item">
                                    <span class="info-item-label">Nome:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">114</span>
                                </div>
                                       <div class="info-item">
                                    <span class="info-item-label">Modelo da Cpu:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">I9</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Modelo da Gpu:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">GTX3090</span>
                                </div>
                            </div>
                            <div class="container-item-coluna">
                        
                                     <div class="info-item">
                                    <span class="info-item-label">Sistema Operacional:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">Ububtu</span>
                                </div>
                                                                       <div class="info-item">
                                    <span class="info-item-label">Quantidade de Cpu:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">4</span>
                                </div>
                          <div class="info-item">
                                    <span class="info-item-label">Quantidade de Ram:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">64GB</span>
                                </div>

                                                          <div class="info-item">
                                    <span class="info-item-label">Máximo de Armazenamento:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">7 T</span>
                                </div>


                            </div>
                        </div>
                    </div>
                          
        `
})

/* 


    Id do Modelo
    Nome do Modelo
    Processo Principal
    Descrição
    
    LIMITES
    Parametro de Tempo
    Parametro CPU
    Parametro RAM
    Parametro Disco
    Parametro GPU
    

    SERVIDOR
    Quantidade de Disco
    Ip
    Hostname
    Nome Zona Disponibilidade
 */



infoModelo.addEventListener("click", function () {
    modalBody.innerHTML = `
         <div class="container-modal">
                        <div class="titulo">
                            <h4> Sobre o Modelo</h4>
                        </div>
                        <div class="corpo">
                            <div class="container-item-coluna">
                                <div class="info-item">
                                    <span class="info-item-label">Id do Modelo:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">114</span>
                                </div>
                                       <div class="info-item">
                                    <span class="info-item-label">Nome do Modelo:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">Iasmin V2</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Processo Principal:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">iaassmin.exe</span>
                                </div>
                            </div>
                            <div class="container-item-coluna">
                        

                                     <div class="info-item">
                                    <span class="info-item-label">Descrição:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">Lorem dawdasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssdwa.</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="container-modal">
                        <div class="titulo">
                            <h4>Sobre o Servidor</h4>
                        </div>
                        <div class="corpo">
                            <div class="container-item-coluna">
                                <div class="info-item">
                                    <span class="info-item-label">Ip:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">112.344.54.986</span>
                                </div>
                                    <div class="info-item">
                                    <span class="info-item-label">Hostname:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">LoremIpsulom.</span>
                                </div>
                            </div>
                            <div class="container-item-coluna">
                                <div class="info-item">
                                    <span class="info-item-label">Zona de Disponibilidade:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">SP-02</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Quantidade de Disco:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">5 T</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="container-modal">
                        <div class="titulo">
                            <h4>Limites de Alertas Críticos</h4>
                        </div>
                        <div class="corpo">
                            <div class="container-item-coluna">
                                <div class="info-item">
                                    <span class="info-item-label">Tempo:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">5 minutos</span>
                                </div>
                                    <div class="info-item">
                                    <span class="info-item-label">Cpu:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">80%</span>
                                </div>
                                      <div class="info-item">
                                    <span class="info-item-label">Ram:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">80%</span>
                                </div>
                            </div>
                            <div class="container-item-coluna">
                                 <div class="info-item">
                                    <span class="info-inv"></span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Gpu:</span>
                                    <span id="info-modelo-cliente" class="info-item-value"> 80%</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Disco:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">80%</span>
                                </div>

                            </div>
                        </div>
                    </div>

                
        `
})

detalheModal.addEventListener("click", function () {
    modalBody.innerHTML = `
         <div class="container-modal">
                        <div class="titulo">
                            <h4>Informações Gerais</h4>
                        </div>
                        <div class="corpo">
                            <div class="container-item-coluna">
                                <div class="info-item">
                                    <span class="info-item-label">Criação do Ticket:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">11/10/2004 09:34</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Duração da Resolução:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">1w 3d 4h 5m</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Urgência:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">Lorem.</span>
                                </div>
                            </div>
                            <div class="container-item-coluna">
                                <div class="info-item">
                                    <span class="info-item-label">Resolução do Ticket:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">11/10/2004 10:34</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Responsável:</span>
                                    <span id="info-nome" class="info-item-value">Marilia Toscano</span>

                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Impacto:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">Lorem dawdadwa.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-modal">
                        <div class="titulo">
                            <h4>Duração de cada Alerta</h4>
                        </div>
                        <div class="corpo">
                            <span class="item-alerta"><span class="item-componente cpu">CPU:</span> 04:06</span>
                            <span class="item-alerta"><span class="item-componente ram">RAM:</span> 00:30</span>
                            <span class="item-alerta"> <span class="item-componente gpu">GPU:</span>02:05</span>
                            <span class="item-alerta"><span  class="item-componente disco"> Disco:</span> 00:05</span>                           
                        </div>
                    </div>
                    <div class="container-modal">
                        <div class="titulo">
                            <h4>Linha do Tempo do Ticket</h4>
                        </div>
                        <div class="linha-do-tempo">
                            <div class="item-linha">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                height="24px" viewBox="0 -960 960 960" width="24px" 
                                fill="rgb(23, 255, 6)">
                                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                            <span>Início <span class="item-componente tempo cpu">CPU</span>  - 10/11/2025_11:10:30 </span>
                            </div>
                            <div class="item-linha">
                                       <svg xmlns="http://www.w3.org/2000/svg" 
                                height="24px" viewBox="0 -960 960 960" width="24px" 
                                fill="rgb(23, 255, 6)">
                                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                                <span>Início  <span class="item-componente tempo ram">RAM</span>  - 10/11/2025_11:12:20</span>
                            </div>
                             <div class="item-linha">
                                 <svg xmlns="http://www.w3.org/2000/svg" height="24px" 
                           viewBox="0 -960 960 960" width="24px" fill="rgb(253, 5, 5)">
                           <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg> 
                           <span>Fim  <span class="item-componente tempo ram">RAM</span>  - 10/11/2025_11:12:50</span>
                             </div>
                              <div class="item-linha">
                                       <svg xmlns="http://www.w3.org/2000/svg" 
                                height="24px" viewBox="0 -960 960 960" width="24px" 
                                fill="rgb(23, 255, 6)">
                                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                                 <span>Início  <span class="item-componente tempo gpu">GPU</span>  - 10/11/2025_11:13:20</span>
                              </div>
                               <div class="item-linha">
                                 <svg xmlns="http://www.w3.org/2000/svg" height="24px" 
                           viewBox="0 -960 960 960" width="24px" fill="rgb(253, 5, 5)">
                           <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg> 
                                <span>Fim  <span class="item-componente tempo cpu">CPU</span>  - 10/11/2025_11:14:20</span>
                               </div>
                                <div class="item-linha">
                                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" 
                           viewBox="0 -960 960 960" width="24px" fill="rgb(253, 5, 5)">
                           <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg> 
                                    <span>Fim  <span class="item-componente tempo gpu">GPU</span>  - 10/11/2025_11:14:25</span>
                                </div>
                                 <div class="item-linha">
                                           <svg xmlns="http://www.w3.org/2000/svg" 
                                height="24px" viewBox="0 -960 960 960" width="24px" 
                                fill="rgb(23, 255, 6)">
                                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                                    <span>Início  <span class="item-componente tempo disco">Disco</span>  - 10/11/2025_11:14:40</span>
                                 </div>
                                  <div class="item-linha">
                                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" 
                           viewBox="0 -960 960 960" width="24px" fill="rgb(253, 5, 5)">
                           <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg> 
                                    <span>Fim  <span class="item-componente tempo disco">Disco</span>   - 10/11/2025_11:15:00</span> 
                                  </div>            
                        </div>
                    </div>

                
    `

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
                pointHoverRadius: 6,
                segment: {
                    borderColor: ctx => {
                        const p = ctx.p1.parsed.y;
                        return p >= 8 ? 'red' : 'blue';
                    },
                    borderDash: ctx => {
                        const p = ctx.p1.parsed.y;
                        return p >= 50 ? [6, 6] : undefined;
                    }
                }
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
                display: true,
                position: 'top',
                align: 'center',
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

