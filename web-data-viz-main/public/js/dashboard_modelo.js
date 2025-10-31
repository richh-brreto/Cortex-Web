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

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';

    if (!document.querySelector('.modal[style*="display: flex"]') && !document.querySelector('.fundo-dialogo.show')) {
        document.body.style.overflow = '';
    }
}


function mostrarAviso(mensagem, titulo) {
    console.log("-> Dentro de mostrarAviso:", mensagem);
    if (titulo === undefined) { titulo = 'Aviso'; }
    if (tituloAviso) tituloAviso.textContent = titulo; else console.error("Elemento tituloAviso não encontrado!");
    if (mensagemAviso) mensagemAviso.textContent = mensagem; else console.error("Elemento mensagemAviso não encontrado!");
    if (fundoAviso) fundoAviso.classList.add('show'); else { console.error("Elemento fundoAviso não encontrado!"); return; }
    document.body.style.overflow = 'hidden';
}
function fecharAviso() {
    console.log("-> Tentando fechar Aviso");
    if (fundoAviso) fundoAviso.classList.remove('show');
    if (!document.querySelector('.modal[style*="display: flex"]') && !document.querySelector('.fundo-dialogo.show')) {
        document.body.style.overflow = '';
    }
}

if (botaoAvisoOK) {
    botaoAvisoOK.removeEventListener('click', fecharAviso);
    botaoAvisoOK.addEventListener('click', fecharAviso);
} else {
    console.error("Elemento botaoAvisoOK não encontrado!");
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

function listarBlacklist(idModelo) {


    const tabelaBlacklistCorpo = document.getElementById('tabela-blacklist-corpo');

    fetch(`/info-modelo/blacklist/listarBlacklist/${idModelo}`)
        .then(function (response) {
            if (!response.ok) { throw new Error('Falha ao buscar dados: ' + response.status + ' ' + response.statusText); }
            return response.json();
        })
        .then(function (dados) {
            console.log("chegooou:", dados);


            if (dados && dados.length > 0) {
                const dadosBanco = dados;


linhasHtml = ''
for (var i = 0; i < dadosBanco.length; i++) {
        
        var iconeAddBlacklist = `<i class="material-icons">block</i>`; 
       
                    // --- Início da Modificação ---
                    let status = dadosBanco[i].status;
                    let idProcesso = dadosBanco[i].id_processo;

                    let autokillClass = '';
                    let autokillIcon = '';
                    let autokillText = '';

                    // Define a aparência do botão baseado no status
                    if (status === 'automatico') {
                        autokillClass = 'autokill-on'; 
                        autokillIcon = 'toggle_on';
                        autokillText = 'ON';
                    } else { // 'proibido' ou qualquer outro
                        autokillClass = 'autokill-off'; 
                        autokillIcon = 'toggle_off';
                        autokillText = 'OFF';
                    }

                    // Cria o HTML do botão de toggle
                    let botaoAutokillHtml = `
                        <button class="btn-icone-texto btn-autokill ${autokillClass}" 
                                onclick="alternarAutokillProcesso(${idProcesso}, this)">
                            <i class="material-icons">${autokillIcon}</i>
                            <span>${autokillText}</span>
                        </button>
                    `;
                    // --- Fim da Modificação ---


        linhasHtml += `
          <tr>
            <td>${dadosBanco[i].nome}</td>
            
                            <!-- Coluna do meio agora é o botão -->
                            <td>${botaoAutokillHtml}</td> 

            <td>
              <button class="btn-icone-texto btn-add-blacklist" onclick="removerProcessoBlacklist(${dadosBanco[i].id_processo})">
                ${iconeAddBlacklist}
                <span>Excluir</span> 
           </button>
              
            </td>
          </tr>
        `;
      }

      
      
      tabelaBlacklistCorpo.innerHTML = linhasHtml;


      

      } else {
            // Se a blacklist estiver vazia, mostra uma mensagem
            tabelaBlacklistCorpo.innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 20px;">Nenhum processo na blacklist.</td></tr>`;
      }
    })
    .catch(function (error) {
      console.error("Erro ao buscar/processar dados da dashboard:", error);
      console.error("Não foi possível carregar os dados detalhados: " + error.message, "Erro de Dados");
      tabelaBlacklistCorpo.innerHTML = `<tr><td colspan="3" style="text-align:center; color: red; padding: 20px;">Erro ao carregar blacklist.</td></tr>`;
    });
}

function removerProcessoBlacklist(idProcesso) {
    console.log(`Remover processo da blacklist ID: ${idProcesso}`);

    mostrarConfirmacao("Deseja realmente remover este processo da blacklist?", "Confirmar Remoção")
        .then(function (confirmacao) {

            if (confirmacao) {

                fetch(`/info-modelo/blacklist/remover/${idProcesso}`, {
                    method: 'POST'
                })
                    .then(function (res) {
                        if (!res.ok) {
                            return res.text().then(function (textoErro) {
                                throw new Error(textoErro || `Erro ${res.status}`);
                            });
                        }
                        return res.json();
                    })
                    .then(function (resposta) {
                        mostrarAviso(resposta.mensagem || "Processo removido com sucesso!", "Sucesso");
                        listarBlacklist(idModeloAtualGlobal);
                    })
                    .catch(function (erro) {
                        console.error("Erro ao remover da blacklist:", erro);
                        mostrarAviso(`Falha ao remover: ${erro.message}`, "Erro");
                    });
            } else {
                console.log("Remoção cancelada pelo utilizador.");
            }
        });
}

 function alternarAutokillProcesso(idProcesso, botaoElemento) {
      
      console.log(`Alternar Autokill (status) para processo ID: ${idProcesso}`);
      
           
            botaoElemento.disabled = true;

            
            const isOn = botaoElemento.classList.contains('autokill-on');
            const novoStatus = isOn ? 'proibido' : 'automatico'; // Se está ON ('automatico'), o novo será 'proibido'. Se está OFF ('proibido'), o novo será 'automatico'.

            console.log(`Enviando novo status: ${novoStatus}`);

            
            fetch('/info-modelo/blacklist/atualizarStatus', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    id_processo: idProcesso, 
                    novo_status: novoStatus 
                })
            })
            .then(function(res) {
                if (!res.ok) { 
                    return res.text().then(function(textoErro) {
                        throw new Error(textoErro || `Erro ${res.status}`);
                    });
                }
                return res.json(); 
            })
            .then(function(resposta) {
                
                if (novoStatus === 'automatico') { 
                    botaoElemento.classList.remove('autokill-off');
                    botaoElemento.classList.add('autokill-on');
                    botaoElemento.innerHTML = `<i class="material-icons">toggle_on</i><span>ON</span>`;
                } else { 
                    botaoElemento.classList.remove('autokill-on');
                    botaoElemento.classList.add('autokill-off');
                    botaoElemento.innerHTML = `<i class="material-icons">toggle_off</i><span>OFF</span>`;
                }
                
                mostrarAviso(resposta.mensagem || "Status Autokill alterado com sucesso!", "Sucesso");
            })
            .catch(function(erro) {
                console.error("Erro ao alterar status autokill:", erro);
                mostrarAviso(`Falha ao alterar status: ${erro.message}`, "Erro");
                
            })
            .finally(function() {
                
                botaoElemento.disabled = false;
            });
 }















const processosModal = document.getElementById('procesosModal');
const tabelaProcessosAtivosCorpo = document.getElementById('tabela-processos-ativos-corpo');
const listaProcessosSimulados = [
    { nome: "chrome.exe", cpu: 15.2, ram: 51, disco: 0.1, gpu: 8.5 },
    { nome: "explorer.exe", cpu: 2.1, ram: 12, disco: 0.0, gpu: 1.0 },
    { nome: "svchost.exe", cpu: 0.5, ram: 4.1, disco: 0.0, gpu: 0.0 },
    { nome: "python_script_dados.py", cpu: 5.8, ram: 1.2, disco: 5.5, gpu: 0.0 },
    { nome: "java_api_backend.jar", cpu: 22.0, ram: 10.2, disco: 1.2, gpu: 0.0 },
    { nome: "msedge.exe", cpu: 8.9, ram: 5.0, disco: 0.2, gpu: 4.3 },
    { nome: "code.exe", cpu: 1.5, ram: 8.0, disco: 0.1, gpu: 2.0 },
    { nome: "runtimebroker.exe", cpu: 0.1, ram: 1.2, disco: 0.0, gpu: 0.0 }
];

function popularTabelaProcessosAtivos(listaProcessos) {
    if (!tabelaProcessosAtivosCorpo) {  return; }
    tabelaProcessosAtivosCorpo.innerHTML = '';
    if (!listaProcessos || listaProcessos.length === 0) {  return; }

    var linhasHtml = '';
    for (var i = 0; i < listaProcessos.length; i++) {
        const processo = listaProcessos[i];
        const cpuFormatado = processo.cpu != null ? processo.cpu.toFixed(1) : '-';
        const ramFormatado = processo.ram != null ? Math.round(processo.ram) : '-';
        const discoFormatado = processo.disco != null ? processo.disco.toFixed(1) : '-';
        const gpuFormatado = processo.gpu != null ? processo.gpu.toFixed(1) : '-';

      
        var iconeAddBlacklist = `<i class="material-icons">block</i>`; // Ícone "block" ou "remove_circle_outline"
        var iconeKill = `<i class="material-icons">close</i>`; // Ícone "close" ou "dangerous"

        linhasHtml += `
                    <tr>
                        <td>${processo.nome}</td>
                        <td>${cpuFormatado}</td>
                        <td>${ramFormatado}</td>
                        <td>${discoFormatado}</td>
                        <td>${gpuFormatado}</td>
                        <td>
                            <button class="btn-icone-texto btn-add-blacklist" onclick="adicionarProcessoBlacklist('${processo.nome}',this)">
                                ${iconeAddBlacklist}
                                <span>Adicionar à Blacklist</span> 
                            </button>
                            <button class="btn-icone-texto btn-kill" onclick="matarProcesso('${processo.nome}')">
                                 ${iconeKill}
                                 <span>Kill</span>
                            </button>
                        </td>
                    </tr>
                `;
    }
    tabelaProcessosAtivosCorpo.innerHTML = linhasHtml;
}

let idModeloAtualGlobal = null;

function adicionarProcessoBlacklist(nomeProcesso,botaoElemento) {
    if (!idModeloAtualGlobal) {
        mostrarAviso("Não foi possível identificar o modelo atual.", "Erro");
        return;
    }

    if (botaoElemento) {
        botaoElemento.disabled = true;
        botaoElemento.innerHTML = `<i class="material-icons">hourglass_empty</i><span>Adicionando...</span>`;
    }
   

    const dados = { fk_modelo: idModeloAtualGlobal, nome: nomeProcesso };

    fetch('/info-modelo/blacklist/adicionarProibido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(function (res) {
            if (!res.ok) {
                
                return res.text().then(function (textoErro) {
                    throw new Error(textoErro || `Erro ${res.status}`); 
                });
            }
            return res.json(); 
        })
        .then(function (resposta) {
           
            mostrarAviso("Processo adicionado à blacklist!", "Sucesso");
            if (botaoElemento) {
                botaoElemento.innerHTML = `<i class="material-icons">check</i><span>Adicionado</span>`;
                botaoElemento.disabled = true;
            }
            listarBlacklist(idModeloAtualGlobal)
        })
        .catch(function (erro) {
            
            console.error("Erro ao adicionar à blacklist:", erro);
            mostrarAviso(`Falha ao adicionar: ${erro.message}`, "Erro"); // Mostra a mensagem de erro
        });
}

// --- Função Chamada pelo Botão "Kill" (SIMPLES E DIRETA) ---
function matarProcesso(nomeProcesso) {
    if (!idModeloAtualGlobal) {
        mostrarAviso("Não foi possível identificar o modelo atual.", "Erro");
        return;
    }
    console.log(`Registrar KILL (Neutro), matar=1 para '${nomeProcesso}', modelo ID: ${idModeloAtualGlobal}`);

    const dados = { fk_modelo: idModeloAtualGlobal, nome: nomeProcesso };

    // Faz o fetch direto para a rota
    fetch('/info-modelo/blacklist/registrarNeutro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
        .then(function (res) {
            if (!res.ok) {
                return res.text().then(function (textoErro) {
                    throw new Error(textoErro || `Erro ${res.status}`);
                });
            }
            return res.json();
        })
        .then(function (resposta) {

            mostrarAviso(`O processo ${nomeProcesso} será matado nos próximos segundos.`, "Info");

            // Remove da lista simulada APÓS sucesso do fetch
            const index = listaProcessosSimulados.findIndex(p => p.nome === nomeProcesso);
            if (index > -1) {
                listaProcessosSimulados.splice(index, 1);
                popularTabelaProcessosAtivos(listaProcessosSimulados); // Redesenha a tabela
            } else {
                console.warn("Processo não encontrado na lista simulada:", nomeProcesso);
            }
        })
        .catch(function (erro) {
            // Erro: Mostra a mensagem
            console.error("Erro ao registrar kill:", erro);
            mostrarAviso(`Falha ao registrar kill: ${erro.message}`, "Erro");
        });
}

window.addEventListener("load", function () {

    const idModeloAtual = sessionStorage.getItem('ID_MODELO_SELECIONADO');
    const nomeModeloAtual = sessionStorage.getItem('NOME_MODELO_SELECIONADO');
    idModeloAtualGlobal = idModeloAtual;
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
    popularTabelaProcessosAtivos(listaProcessosSimulados)
    listarBlacklist(idModeloAtual)


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

const alertsChart = new Chart(alertsCtx, {
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
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { stepSize: 5 } }, x: { grid: { display: false } } }
    }
});

function atualizarGrafico(tipo, botao) {
    const dadosMock = {
        CPU: [12, 9, 15, 10, 18, 5, 2],
        RAM: [5, 10, 8, 12, 9, 7, 3],
        DISCO: [8, 6, 9, 11, 10, 4, 2],
        GPU: [4, 5, 6, 8, 7, 5, 3]
    };

    alertsChart.data.datasets[0].data = dadosMock[tipo];
    alertsChart.data.datasets[0].label = 'Alertas - ' + tipo;
    alertsChart.update();

    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    botao.classList.add("active");
}
