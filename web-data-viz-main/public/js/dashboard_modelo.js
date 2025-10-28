function infoModeloGet(idModelo) {
    console.log("Buscando dados completos para o modelo:", idModelo);
    fetch(`/info-modelo/info-modelo-rota/${idModelo}`)
        .then(function (response) {
            if (!response.ok) { throw new Error('Falha ao buscar dados: ' + response.status + ' ' + response.statusText); }
            return response.json();
        })
        .then(function (dados) {
            console.log("Dados brutos recebidos:", dados);


            if (dados && dados.length > 0) {
                const dadosBanco = dados[0];

                document.getElementById('info-modelo-cliente').textContent = dadosBanco.cliente_nome;
                document.getElementById('info-modelo-descricao').textContent = dadosBanco.descricao;
                document.getElementById('info-modelo-zona').textContent = dadosBanco.zona_nome;
                document.getElementById('info-modelo-arquitetura').textContent = dadosBanco.nome_arquitetura;
                document.getElementById('info-modelo-descricao').textContent = dadosBanco.descricao;
                document.getElementById('info-modelo-ip').textContent = dadosBanco.ip;
                document.getElementById('info-modelo-hostname').textContent = dadosBanco.hostname;

                document.getElementById('modal-arq-nome').textContent = dadosBanco.nome_arquitetura || '--';
                document.getElementById('modal-arq-cpu-modelo').textContent = dadosBanco.modelo_cpu || '--';
                document.getElementById('modal-arq-cpu-qtd').textContent = dadosBanco.qtd_cpu || '--';
                document.getElementById('modal-arq-ram-qtd').textContent = dadosBanco.qtd_ram || '--';
                document.getElementById('modal-arq-gpu-modelo').textContent = dadosBanco.modelo_gpu || '--';
                document.getElementById('modal-arq-so').textContent = dadosBanco.so || '--';
                document.getElementById('modal-arq-disco-max').textContent = dadosBanco.maxDisco || '--';



            } else {
                throw new Error("Modelo não encontrado ou dados inválidos recebidos.");
            }
        })
        .catch(function (error) {
            console.error("Erro ao buscar/processar dados da dashboard:", error);
            mostrarAviso("Não foi possível carregar os dados detalhados: " + error.message, "Erro de Dados");
            limparSpansModais();
        });
}



window.addEventListener("load", function () {

    const idModeloAtual = sessionStorage.getItem('ID_MODELO_SELECIONADO');
    const nomeModeloAtual = sessionStorage.getItem('NOME_MODELO_SELECIONADO');

    if (idModeloAtual) {
        document.title = `Dashboard - ${nomeModeloAtual}`;
    } else {

        alert("Erro: ID do modelo não encontrado!");
        window.location.href = 'Gerenciamento_modelos-analista.html';
    }

    //carregando informações do session storage
    var titulo = document.getElementById('nome-modelo')
    titulo.textContent = nomeModeloAtual;

    var titulo = document.getElementById('codigo-modelo')
    titulo.textContent = idModeloAtual;

    var ultimaAtualizacao = document.getElementById('ultima-atualizacao')
    const agora = new Date();
    const horaFormatada = agora.toLocaleTimeString('pt-BR');
    const dataFormatada = agora.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

    ultimaAtualizacao.textContent = `${dataFormatada} ${horaFormatada}`;

    var infoNomeModelo = document.getElementById('info-nome')
    infoNomeModelo.textContent = nomeModeloAtual;

    infoModeloGet(idModeloAtual)


})



// Funções de Modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Fechar modal ao clicar fora
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Gráfico de Recursos - BARRAS HORIZONTAIS
const resourceCtx = document.getElementById('resourceChart').getContext('2d');
new Chart(resourceCtx, {
    type: 'bar',
    data: {
        labels: ['CPU', 'RAM', 'Disco', 'GPU'],
        datasets: [
            {
                label: 'Uso Atual',
                data: [72, 68, 40, 90],
                backgroundColor: 'rgba(0, 178, 178, 0.8)',
                borderColor: '#00B2B2',
                borderWidth: 2
            },
            {
                label: 'Pico',
                data: [85, 76, 47, 99],
                backgroundColor: 'rgba(0, 110, 102, 0.8)',
                borderColor: '#006E66',
                borderWidth: 2
            },
            {
                label: 'Média',
                data: [65, 62, 35, 85],
                backgroundColor: 'rgba(66, 153, 225, 0.8)',
                borderColor: '#4299E1',
                borderWidth: 2
            }
        ]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.dataset.label + ': ' + context.parsed.x + '%';
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: (value) => value + '%'
                },
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    }
});

// Gráfico de Alertas Semanais - LINHA
const alertsCtx = document.getElementById('alertsChart').getContext('2d');
new Chart(alertsCtx, {
    type: 'line',
    data: {
        labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        datasets: [{
            label: 'Alertas - CPU',
            data: [12, 8, 15, 10, 18, 5, 3],
            borderColor: '#00B2B2',
            backgroundColor: 'rgba(0, 178, 178, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#00B2B2',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return 'Alertas: ' + context.parsed.y;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 5
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)'
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