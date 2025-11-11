const tituloH1 = document.getElementById('titulo-dashboard');
const spanUltimaAtualizacao = document.getElementById('ultima-atualizacao');
const modelModal = document.getElementById('modelModal');
const serverModal = document.getElementById('serverModal');



const fundoConfirmacao = document.getElementById('fundo-confirmacao');
const tituloConfirmacao = document.getElementById('titulo-confirmacao');
const mensagemConfirmacao = document.getElementById('mensagem-confirmacao');
const botaoConfirmarOK = document.getElementById('botao-confirmar-ok');
const botaoConfirmarCancelar = document.getElementById('botao-confirmar-cancelar');
const fundoAviso = document.getElementById('fundo-aviso');
const tituloAviso = document.getElementById('titulo-aviso');
const mensagemAviso = document.getElementById('mensagem-aviso');
const botaoAvisoOK = document.getElementById('botao-aviso-ok');

var global = null

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    listarBlacklist(global)
}
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';

    if (!document.querySelector('.modal[style*="display: flex"]') && !document.querySelector('.fundo-dialogo.show')) {
        document.body.style.overflow = '';
    }
}


function mostrarConfirmacao(mensagem, titulo) {

    console.log("-> Dentro de mostrarConfirmacao:", mensagem);

    if (titulo === undefined) { titulo = 'Confirmação'; }


    return new Promise(function (resolve, reject) {
        try {

            if (!fundoConfirmacao || !tituloConfirmacao || !mensagemConfirmacao || !botaoConfirmarOK || !botaoConfirmarCancelar) {
                console.error("ERRO: Elementos do modal de confirmação não encontrados!");
                reject("Elementos do modal não encontrados");
                return;
            }

            tituloConfirmacao.textContent = titulo;
            mensagemConfirmacao.textContent = mensagem;
            fundoConfirmacao.classList.add('show');
            document.body.style.overflow = 'hidden';


            function cliqueConfirmarOK() {
                console.log("--> cliqueConfirmarOK chamado");
                if (fundoConfirmacao) fundoConfirmacao.classList.remove('show');

                if (!document.querySelector('.modal.show') && !document.querySelector('.fundo-dialogo.show')) {
                    document.body.style.overflow = '';
                }
                botaoConfirmarOK.removeEventListener('click', cliqueConfirmarOK);
                botaoConfirmarCancelar.removeEventListener('click', cliqueConfirmarCancelar);
                resolve(true);
            }

            function cliqueConfirmarCancelar() {
                console.log("--> cliqueConfirmarCancelar chamado");
                if (fundoConfirmacao) fundoConfirmacao.classList.remove('show');
                if (!document.querySelector('.modal.show') && !document.querySelector('.fundo-dialogo.show')) {
                    document.body.style.overflow = '';
                }
                botaoConfirmarOK.removeEventListener('click', cliqueConfirmarOK);
                botaoConfirmarCancelar.removeEventListener('click', cliqueConfirmarCancelar);
                resolve(false);
            }


            botaoConfirmarOK.removeEventListener('click', cliqueConfirmarOK);
            botaoConfirmarCancelar.removeEventListener('click', cliqueConfirmarCancelar);


            botaoConfirmarOK.addEventListener('click', cliqueConfirmarOK);
            botaoConfirmarCancelar.addEventListener('click', cliqueConfirmarCancelar);

        } catch (erro) {
            console.error("Erro DENTRO de mostrarConfirmacao:", erro);
            reject(erro);
        }
    });
}


window.addEventListener("load", function () {

    const idModeloAtual = sessionStorage.getItem('ID_MODELO_SELECIONADO');
    const nomeModeloAtual = sessionStorage.getItem('NOME_MODELO_SELECIONADO');
    idModeloAtualGlobal = idModeloAtual;
    if (idModeloAtual) {
        document.title = `Dashboard - ${nomeModeloAtual}`;
    } else {

       /*  alert("Erro: ID do modelo não encontrado!"); */
        //window.location.href = 'Gerenciamento_modelos-analista.html';
    }

    //carregando informações do session storage
/*     var titulo = document.getElementById('nome-modelo')
    titulo.textContent = nomeModeloAtual;

    var titulo = document.getElementById('codigo-modelo')
    titulo.textContent = idModeloAtual; */

    global = idModeloAtual

    var ultimaAtualizacao = document.getElementById('ultima-atualizacao')
    const agora = new Date();
    const horaFormatada = agora.toLocaleTimeString('pt-BR');
    const dataFormatada = agora.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    ultimaAtualizacao.textContent = `${dataFormatada} ${horaFormatada}`;

    var infoNomeModelo = document.getElementById('info-nome')
    infoNomeModelo.textContent = nomeModeloAtual;

    infoModeloGet(idModeloAtual)
    popularTabelaProcessosAtivos(listaProcessosSimulados)
    listarBlacklist(idModeloAtual)

    valorDefault()
})



// Funções de Modal
//function openModal(modalId) {
// document.getElementById(modalId).style.display = 'block';
//}

//function closeModal(modalId) {
//   document.getElementById(modalId).style.display = 'none';
//}

// Fechar modal ao clicar fora
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}


 // GRAFICOS DE LINHA SERVIDOR
const alertsCtx2 = document.getElementById('alertsChart2').getContext('2d');

const alertsChart2 = new Chart(alertsCtx2, {
    type: 'line',
    data: {
        labels: [
            '11:20:30','11:21:30','11:22:30','11:23:30','11:24:30','11:25:30','11:26:30','11:27:30','11:28:30','11:29:30', '11:30:30'
        ],
        datasets: [{
            label: 'CPU',
            data: [80,80,80,79,79,78,75,60,64,65,64],
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
            data: [70,77,77,76,75,78,80,80,80,80,77],
            borderColor: '#9a00b2ff',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#b200a6ff',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 6
        },
     {
           label: 'GPU',
            data: [20,30,34,33,32,34,35,35,31,32,36],
            borderColor: '#00b20cff',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#00b203ff',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 6
        },
     {
           label: 'Disco',
            data: [10,10,10,10,11,11,11,11,11,11,11],
            borderColor: '#b2b200ff',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#b2a300ff',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 6
        },],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 5 } }, x: { grid: { display: false } } }
    }
});

// GRAFICO LINHA PROCESSO
const alertsCtx = document.getElementById('alertsChart').getContext('2d');


const alertsChart = new Chart(alertsCtx, {
       type: 'line',
    data: {
        labels: [
            '11:20:30','11:21:30','11:22:30','11:23:30','11:24:30','11:25:30','11:26:30','11:27:30','11:28:30','11:29:30', '11:30:30'
        ],
        datasets: [{
            label: 'CPU',
            data: [8,8,8,7,7,7,7,6,6,6,6],
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
            data: [7,7,7,7,7,7,8,8,8,8,7],
            borderColor: '#9a00b2ff',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#b200a6ff',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 6
        },
     {
           label: 'GPU',
            data: [2,3,3,3,3,3,3,3,3,3,3],
            borderColor: '#00b20cff',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#00b203ff',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 6
        },
     {
           label: 'Disco',
            data: [1,1,1,1,1,1,1,1,1,1,1],
            borderColor: '#b2b200ff',
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#b2a300ff',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 6
        },],
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 5 } }, x: { grid: { display: false } } }
    }
});

// MULTISELECT

 function toggleMultiselect() {
            const dropdown = document.getElementById('multiselectDropdown');
            dropdown.classList.toggle('active');
        }



        function updateSelection() {
            const checkboxes = document.querySelectorAll('.multiselect-option input[type="checkbox"]');
            const count = Array.from(checkboxes).filter(cb => cb.checked).length;
            document.getElementById('selectedCount').textContent = `${count} selecionada${count !== 1 ? 's' : ''}`;
        }

        function applySelection() {
            toggleMultiselect();
            updateLineChart();
        }

        
        function updateLineChart() {
            const checkboxes = document.querySelectorAll('.multiselect-option input[type="checkbox"]');
            const selected = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
            
            lineChart.data.datasets = lineChart.data.datasets.filter(dataset => 
                selected.includes(dataset.label)
            );
            lineChart.update();
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
            const count2 = Array.from(checkboxes2).filter(cb => cb.checked).length;
            document.getElementById('selectedCount2').textContent = `${count2} selecionada${count2 !== 1 ? 's' : ''}`;
        }

        function applySelection2() {
            toggleMultiselect2();
            updateLineChart2();
        }

        
        function updateLineChart2() {
            const checkboxes = document.querySelectorAll('.multiselect-option input[type="checkbox"]');
            const selected = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
            
            lineChart.data.datasets = lineChart.data.datasets.filter(dataset => 
                selected.includes(dataset.label)
            );
            lineChart.update();
        }

        // Fechar dropdown ao clicar fora
        document.addEventListener('click', (e) => {
            const container2 = document.querySelector('.multiselect-container2');
            if (!container2.contains(e.target)) {
                document.getElementById('multiselectDropdown2').classList.remove('active');
            }
        });

