
const modelModal = document.getElementById('modelModal');
const abaModal = document.getElementsByClassName('modal-title')
const detalheModal = document.getElementById('detalhesChamado')
const infoModelo = document.getElementById('informacoesModelo')
const arquitetura = document.getElementById('arquitetura')
const modalBody = document.getElementById('modal-body')
const um = document.getElementById('modal-um')

async function dadosDash(idModelo,idZona,idEmpresa,idJira) {
        let dados = await JSON.parse(await (await fetch(`/s3Ticket/dadosDash/marilia/${idModelo}-${idZona}-${idEmpresa}-${idJira}.json`)).text());
        console.log(dados);
         return dados
    }



function mapCustomFieldToAlertClass(customFieldValue) {
    if (!customFieldValue) {
        return ''; // Não aplica classe se o campo for nulo/indefinido
    }

    // Converte para minúsculas e remove espaços para comparação segura
    const value = customFieldValue.toLowerCase().trim();

    if (value.includes("em alerta")) {
        // Para "Em alerta (ticket mais atual)"
        return 'alert-1';
    } else if (value.includes("normal")) {
        // Para "Normal (ticket antigo)"
        return 'alert-2';
    } else {
        return ''; // Classe padrão (sem cor especial)
    }

}

function pegarDataResolucao(changelog){
    for(let i = 0; i < changelog.histories.length; i++){
        var daVez = changelog.histories[i]
        if(daVez.items[0].toString == "Done"){

            
            return daVez.created
        }
    }

}
function calcularDuracaoResolucao(dataResolucao, created){
    var fim = Date.parse(dataResolucao)
    var inicio = Date.parse(created)

    var mili = fim - inicio
    
    return (mili / (1000 * 60 * 60)).toFixed(1)
}

async function carregarMural() {

    const apiUrl = `/tickets/jira/${sessionStorage.getItem("KEY_JIRA_SLECIONADO")}`;


    try {


        const response = await fetch(apiUrl);

        if (response.status === 204) {

            return;
        }

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const tickets = await response.json();
        const campo = tickets[0].fields
        const identificador = campo.customfield_10093.split(";")
        const idModelo = identificador[0]
        const idZona = identificador[1]
        const idEmpresa = identificador[2]
        
        const dados = await dadosDash(idModelo,idZona, idEmpresa,sessionStorage.getItem("KEY_JIRA_SLECIONADO"))


        graficos(dados)

        const changelog = tickets[0].changelog
        console.log(changelog)
        fetch(`/tickets/banco/${sessionStorage.getItem("ID_MODELO_SELECIONADO")}`)
            .then(res => res.json())
            .then(modelo => {
                const m = modelo[0]
                const titulo = document.getElementById("header-topo")
                const maquinaNome = campo.customfield_10060 ? campo.customfield_10060.value : 'N/A';

                if (maquinaNome == "Normal (ticket antigo)") {
                    var maquinaSpan = ` <span style="background-color: #95a9ec; border-radius: 10px; padding: 5px; 
                        color: #070707;">
                                <h4>Normal (ticket antigo)</h4>
                            </span>`
                } else {
                    var maquinaSpan = `     <span style="background-color: #f33232; border-radius: 10px; padding: 5px; 
                        color: #070707;">
                                 <h4>Em Alerta (ticket mais atual)</h4>
                            </span> `
                }

                titulo.innerHTML = `
            
                    <div class="header-info">
                        <div class="info">
                            <h1 id="nome-modelo">${sessionStorage.getItem("KEY_JIRA_SLECIONADO")} - ${m.nomeModelo}</h1>
                        </div>

                        <div class="info" id="statusMaquina">
                            <h3>Status da Máquina:</h3>
                                ${maquinaSpan}
                        </div>
                    </div>
            `

                const titulo2 = document.getElementById("header-base")

                if (campo.status.name == "Aberto") {
                    var status = `         <span style="background-color: #F2F2F2; border-radius: 10px; padding: 5px; 
                        color: #232426;"><h4>Aberto</h4></span>
                        </div>
`

                    var dataResolucao = "---"
                    var duracaoResolucao = "---"
                } else if (campo.status.name == "Em andamento") {
                    var status = `  <span style="background-color: #6BA5F2; border-radius: 10px; padding: 5px; 
                        color: #332C34;"><h4>Em andamento</h4></span>`
                } else if (campo.status.name == "Fechado") {
                    var status = `<span style="background-color: #94C748; border-radius: 10px; padding: 5px; 
                        color: #292A2E;">
                                <h4>Fechado</h4>
                            </span>`

                     dataResolucao = pegarDataResolucao(changelog)
                     
                     duracaoResolucao = calcularDuracaoResolucao(dataResolucao, campo.created)
                } else {
                    var status = `<span style="background-color: #94C748; border-radius: 10px; padding: 5px; 
                        color: #292A2E;">
                                <h4>Concluído</h4>
                            </span>`
                     dataResolucao = pegarDataResolucao(changelog)
                     duracaoResolucao = calcularDuracaoResolucao(dataResolucao, campo.created)
                }

                var labels = "";
                for (let i = 0; i < campo.labels.length; i++) {
                    if (campo.labels[i] == "cpu") {
                        labels += `<span style="background-color: #b0f7f7; border-radius: 10px; padding: 5px; 
                        color: #00B2B2;">
                                <h4>CPU</h4>
                            </span>`
                    }
                    if (campo.labels[i] == "ram") {
                        labels += `                            <span style="background-color: rgb(169, 252, 164); border-radius: 10px; padding: 5px; 
                        color: #0cb200ff;">
                                <h4>RAM</h4>
                            </span>`
                    }
                    if (campo.labels[i] == "gpu") {
                        labels += `
                             <span style="background-color: rgb(166, 170, 252); border-radius: 10px; padding: 5px; 
                        color: #0009b2ff;">
                                <h4>GPU</h4>
                            </span>
                    `

                    }
                    if (campo.labels[i] == "disco") {
                        labels += `
                                                <span style="background-color: rgb(252, 252, 181); border-radius: 10px; padding: 5px; 
                        color: #b2b200ff;">
                                <h4>Disco</h4>
                            </span>
                    `
                    }
                }

                
                var criacaoSplit01 = campo.created.split(".")
                var criacaoSplit02 = criacaoSplit01[0].split("T")
                var createdFormatado = criacaoSplit02[0] + "  " + criacaoSplit02[1]
                 const responsavelNome = campo.assignee ? campo.assignee.displayName : 'Não Atribuído';

                titulo2.innerHTML = `
            <div class="header-info2">
                        <div class="info">
                            <h3>Status do Ticket:</h3>
                            ${status}
                        <div class="info">
                            <h3>Alertas do Ticket:</h3>
                            ${labels}
                        </div>

                    </div>
            `

                const tipo = document.getElementById("tipo-ticket")

                if (campo.customfield_10059 == "Problema") {
                    var tipoEstilo = `   <span style="background-color: #eaecab; border-radius: 10px; padding: 5px; 
                        color: #202019;">
                                <h4>Problema</h4>
                            </span>`
                } else {
                    var tipoEstilo = `  <span style="background-color: #d9e1fc; border-radius: 10px; padding: 5px; 
                        color: #464646;">
                                 <h4>Incidente</h4>
                            </span>`
                }

                tipo.innerHTML = `
                  <h3>Tipo do Ticket:</h3>
                    ${tipoEstilo}   
                           
            `
            var resolucFormatada = "---"
            if(dataResolucao.includes("T")){
                var resoluc01 = dataResolucao.split(".")
                    var resoluc02 = resoluc01[0].split("T")
            resolucFormatada = resoluc02[0] + "  " + resoluc02[1]
            }

                            var linha = ""
       
                for(let i = 0; i < dados.linha_do_tempo.length; i++){
                    var daVez2 = dados.linha_do_tempo[i]
                    if(daVez2.includes("Início") == true){
                        linha += `<div class="item-linha"> <svg xmlns="http://www.w3.org/2000/svg" 
                                height="24px" viewBox="0 -960 960 960" width="24px" 
                                fill="rgb(23, 255, 6)">
                                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                                <span>Início `

                    }else if(daVez2.includes("Fim")) {
                        linha += `<div class="item-linha"><svg xmlns="http://www.w3.org/2000/svg" height="24px" 
                           viewBox="0 -960 960 960" width="24px" fill="rgb(253, 5, 5)">
                           <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg> 
                           <span>Fim  `
                    }
                    var timestampDaVez = daVez2.trim().split("-")
                    if(daVez2.includes("CPU")){
                        linha += `<span class="item-componente tempo cpu">CPU</span>  - ${timestampDaVez[1]}</span></div>`

                    }

                    if(daVez2.includes("RAM")){
                        linha += `<span class="item-componente tempo ram">RAM</span>  - ${timestampDaVez[1]}</span></div>`

                    }
                      if(daVez2.includes("Disco")){
                        linha += `<span class="item-componente tempo disco">Disco</span>  - ${timestampDaVez[1]}</span></div>`

                    }
                      if(daVez2.includes("GPU")){
                        linha += `<span class="item-componente tempo gpu">GPU</span>  - ${timestampDaVez[1]}</span></div>`

                    }
                    if(daVez2.includes("Processo")){
                        linha += `Downtime Processo  - ${timestampDaVez[1]}</span></div>`
                    }
                    if(daVez2.includes("Servidor")){
                        linha += `Downtime Servidor  - ${timestampDaVez[1]}</span></div>`
                    }
                }


            
 modalBody.innerHTML = `
         <div class="container-modal">
                        <div class="titulo">
                            <h4>Informações Gerais</h4>
                        </div>
                        <div class="corpo">
                            <div class="container-item-coluna">
                                <div class="info-item">
                                    <span class="info-item-label">Criação do Ticket:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${createdFormatado}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Duração da Resolução:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${duracaoResolucao}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Urgência:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${campo.priority.name}</span>
                                </div>
                            </div>
                            <div class="container-item-coluna">
                                <div class="info-item">
                                    <span class="info-item-label">Resolução do Ticket:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${resolucFormatada}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Responsável:</span>
                                    <span id="info-nome" class="info-item-value">${responsavelNome}</span>

                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Impacto:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${campo.customfield_10004.value}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-modal">
                        <div class="titulo">
                            <h4>Duração de cada Alerta</h4>
                        </div>
                        <div class="corpo">
                            <span class="item-alerta"><span class="item-componente cpu">CPU:</span> ${dados.duracao_cpu}</span>
                            <span class="item-alerta"><span class="item-componente ram">RAM:</span>${dados.duracao_ram}</span>
                            <span class="item-alerta"> <span class="item-componente gpu">GPU:</span>${dados.duracao_gpu}</span>
                            <span class="item-alerta"><span  class="item-componente disco"> Disco:</span>${dados.duracao_disco}</span>                           
                        </div>
                    </div>
                    <div class="container-modal">
                        <div class="titulo">
                            <h4>Linha do Tempo do Ticket</h4>
                        </div>
                        <div class="linha-do-tempo">
                           
                            ${linha}
                           
                                
                        </div>
                    </div>

                
    `

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
                                    <span id="info-modelo-cliente" class="info-item-value">${m.arquitetura}</span>
                                </div>
                                       <div class="info-item">
                                    <span class="info-item-label">Modelo da Cpu:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.modelo_cpu}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Modelo da Gpu:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.modelo_gpu}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Sistema Operacional:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.so}</span>
                                </div>
                            </div>
                            <div class="container-item-coluna">
                        
                                     
                                                                       <div class="info-item">
                                    <span class="info-item-label">Quantidade de Cpu:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.qtd_cpu}</span>
                                </div>
                          <div class="info-item">
                                    <span class="info-item-label">Quantidade de Ram:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.qtd_ram}GB</span>
                                </div>

                                                          <div class="info-item">
                                    <span class="info-item-label">Máximo de Armazenamento:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.maxDisco}GB</span>
                                </div>


                            </div>
                        </div>
                    </div>
                          
        `
                })



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
                                    <span id="info-modelo-cliente" class="info-item-value">${m.idModelo}</span>
                                </div>
                                       <div class="info-item">
                                    <span class="info-item-label">Nome do Modelo:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.nomeModelo}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Processo Principal:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.nome_processo}</span>
                                </div>
                            </div>
                            <div class="container-item-coluna">
                        

                                     <div class="info-item">
                                    <span class="info-item-label">Descrição:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.descricao}</span>
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
                                    <span id="info-modelo-cliente" class="info-item-value">${m.ip}</span>
                                </div>
                                    <div class="info-item">
                                    <span class="info-item-label">Hostname:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.hostname}</span>
                                </div>
                            </div>
                            <div class="container-item-coluna">
                                <div class="info-item">
                                    <span class="info-item-label">Zona de Disponibilidade:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.zona}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Quantidade de Disco:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.maxDisco}GB</span>
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
                                    <span id="info-modelo-cliente" class="info-item-value">${m.tempo} minutos</span>
                                </div>
                                    <div class="info-item">
                                    <span class="info-item-label">Cpu:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.limCpu}%</span>
                                </div>
                                      <div class="info-item">
                                    <span class="info-item-label">Ram:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.limRam}%</span>
                                </div>
                            </div>
                            <div class="container-item-coluna">
                                 <div class="info-item">
                                    <span class="info-inv"></span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Gpu:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.limGpu}%</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Disco:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${m.limDisco}%</span>
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
                                    <span id="info-modelo-cliente" class="info-item-value">${createdFormatado}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Duração da Resolução:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${duracaoResolucao}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Urgência:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${campo.priority.name}</span>
                                </div>
                            </div>
                            <div class="container-item-coluna">
                                <div class="info-item">
                                    <span class="info-item-label">Resolução do Ticket:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${resolucFormatada}</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Responsável:</span>
                                    <span id="info-nome" class="info-item-value">${responsavelNome}</span>

                                </div>
                                <div class="info-item">
                                    <span class="info-item-label">Impacto:</span>
                                    <span id="info-modelo-cliente" class="info-item-value">${campo.customfield_10004.value}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container-modal">
                        <div class="titulo">
                            <h4>Duração de cada Alerta</h4>
                        </div>
                        <div class="corpo">
                            <span class="item-alerta"><span class="item-componente cpu">CPU:</span> ${dados.duracao_cpu}</span>
                            <span class="item-alerta"><span class="item-componente ram">RAM:</span>${dados.duracao_ram}</span>
                            <span class="item-alerta"> <span class="item-componente gpu">GPU:</span>${dados.duracao_gpu}</span>
                            <span class="item-alerta"><span  class="item-componente disco"> Disco:</span>${dados.duracao_disco}</span>                           
                        </div>
                    </div>
                    <div class="container-modal">
                        <div class="titulo">
                            <h4>Linha do Tempo do Ticket</h4>
                        </div>
                        <div class="linha-do-tempo">
                           
                            ${linha}
                           
                                
                        </div>
                    </div>

                
    `


                })




            })
            .catch(erro => {
                console.error("Erro ao carregar funcionários:", erro);
                alert("Erro ao carregar funcionários");
            });





    } catch (erro) {
        console.error("Erro na requisição ou processamento dos dados:", erro);

    }
}
// Inicia o carregamento dos dados quando a página é carregada
document.addEventListener('DOMContentLoaded', carregarMural);

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




window.addEventListener("load", function () {


})



// GRAFICOS DE LINHA SERVIDOR
const alertsCtx2 = document.getElementById('alertsChart2').getContext('2d');


// GRAFICO LINHA PROCESSO
const alertsCtx = document.getElementById('alertsChart').getContext('2d');

const downtimeProcesso = document.getElementById('downtimeProcesso')
const downtimeServer = document.getElementById('downtimeServer')
const duracao = document.getElementById('duracao')

let dadosGlobal = null
let graficoAlertsCtx2 = null
let graficoAlertsCtx = null
function graficos(dados){
    dadosGlobal = dados
    duracao.innerHTML = `
        ${dados.duracao_alerta}
    ` 

    downtimeProcesso.innerHTML = `${dados.downtime_processo}`
    downtimeServer.innerHTML = `${dados.downtime_servidor}`

    console.log(dados.timestamp)
    graficoAlertsCtx2 = new Chart(alertsCtx2, {
    type: 'line',
    data: {
        labels: 
            dados.timestamp
        ,
        datasets: [
            {
                label: 'CPU',
                data: dados.cpu,
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
                data:dados.ram,
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
                data: dados.gpu,
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
                data: dados.disco,
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
    graficoAlertsCtx = new Chart(alertsCtx, {
    type: 'line',
    data: {
        labels: 
           dados.timestamp
        ,
        datasets: [
            {
                label: 'CPU',
                data: dados.cpuProc,
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
                        return p >= 8 ? 'red' : '00B2B2';
                    },
                    borderDash: ctx => {
                        const p = ctx.p1.parsed.y;
                        return p >= 50 ? [6, 6] : undefined;
                    }
                }
            },
            {
                label: 'RAM',
                data: dados.ramProc,
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
                data: dados.gpuProc,
                borderColor: '#0009b2ff',
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#0009b2ff',
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
}



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
                data: dadosGlobal.cpu,
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
                data: dadosGlobal.ram,
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
                data: dadosGlobal.gpu,
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
                data: dadosGlobal.disco,
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

    graficoAlertsCtx2.data.datasets = newDatasets;
    graficoAlertsCtx2.update();
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
                data: dadosGlobal.cpuProc,
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
                data: dadosGlobal.ramProc,
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
                data: dadosGlobal.gpuProc,
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
                data: dadosGlobal.discoProc,
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
    graficoAlertsCtx.data.datasets = newDatasets;
    graficoAlertsCtx.update();
}

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
    const container2 = document.querySelector('.multiselect-container2');
    if (!container2.contains(e.target)) {
        document.getElementById('multiselectDropdown2').classList.remove('active');
    }
});

