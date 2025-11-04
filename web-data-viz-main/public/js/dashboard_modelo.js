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



    const modalA = document.getElementById("blacklistModal")

    modalA.innerHTML = ` <div class="modal-content" id="conteudo">
               <div class="modal-header">
                    <h3 class="modal-title ativo" id="white">Processos Permitidos</h3>
                    <h3 class="modal-title" id="mortos">Processos Mortos - log</h3>
                    <button class="modal-close" onclick="closeModal('blacklistModal')">&times;</button>
                </div>
                <div class="modal-body" id="modal-body">
                    <div class="info-items" >
                        <div class="topo-whitelist">
                            <input type="search" placeholder="Pesquisar..." class="input-pesquisa">
                            <button class="btn btn-primario" style="padding: 1%;" onclick="telaAddWhitelist()">Adicionar</button>
                        </div>
                        <section class="container-tabela">
                            <div class="envoltorio-tabela">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nome</th>
                                            <th style="width: 200px;">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tabela-blacklist-corpo">

                                    </tbody>
                                </table>
                            </div>
                            <div class="tabela-rodape">

                            </div>
                        </section>
                       
                    </div>
                </div> 
            </div>`

    const morto = document.getElementById("mortos")
    morto.addEventListener("click", () => logProcMortos())

    const white = document.getElementById("white")
    white.addEventListener("click", () => listarBlacklist(global))

    modalA.classList.add('modal');
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




                    linhasHtml += `
          <tr>
            <td>${dadosBanco[i].nome}</td>
            
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

function logProcMortos() {


    const modalA = document.getElementById("blacklistModal")

    modalA.innerHTML = ` <div class="modal-content" id="conteudo">
               <div class="modal-header">
                    <h3 class="modal-title" id="white">Whitelist de processos</h3>
                    <h3 class="modal-title ativo" id="mortos">Processos Mortos - log</h3>
                    <button class="modal-close" onclick="closeModal('blacklistModal')">&times;</button>
                </div>
                <div class="modal-body" id="modal-body">
                    <div class="info-items">
                        <div class="topo-whitelist">
                            <input type="search" placeholder="Pesquisar..." class="input-pesquisa">           
                        </div>
                        <section class="container-tabela">
                            <div class="envoltorio-tabela">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Data e Horário da Kill</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tabela-blacklist-corpo">

                                    </tbody>
                                </table>
                            </div>
                            <div class="tabela-rodape">

                            </div>
                        </section>
                       
                    </div>
                </div> 
            </div>`

    const morto = document.getElementById("mortos")
    morto.addEventListener("click", () => logProcMortos())

    const white = document.getElementById("white")
    white.addEventListener("click", () => listarBlacklist(global))
    var idModelo = global

    fetch(`/info-modelo/procMortos/${idModelo}`)
        .then(function (res) {
            if (!res.ok) {
                return res.text().then(function (textoErro) {
                    throw new Error(textoErro || `Erro ${res.status}`);
                });
            }
            return res.json();
        })
        .then(function (resposta) {

            const body = document.getElementById("tabela-blacklist-corpo")
            for (let i = 0; i < resposta.length; i++) {


                var linha = `
     <tr>
            <td>${resposta[i].id_log}</td>
            <td>${resposta[i].nome}</td>
            <td>${resposta[i].dataKill}</td>
    </tr>
        `

                body.innerHTML += linha
            }

        })
        .catch(function (erro) {
            console.error("Erro ao remover da blacklist:", erro);
            mostrarAviso(`Falha ao remover: ${erro.message}`, "Erro");
        });


}

function removerProcessoBlacklist(idProcesso) {
    console.log(`Remover processo da blacklist ID: ${idProcesso}`);

    mostrarConfirmacao("Deseja realmente remover este processo da blacklist?", "Confirmar Remoção")
        .then(function (confirmacao) {

            if (confirmacao) {

                fetch(`/info-modelo/blacklist/remover/${idProcesso}`, {
                    method: 'DELETE'
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
        .then(function (res) {
            if (!res.ok) {
                return res.text().then(function (textoErro) {
                    throw new Error(textoErro || `Erro ${res.status}`);
                });
            }
            return res.json();
        })
        .then(function (resposta) {

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
        .catch(function (erro) {
            console.error("Erro ao alterar status autokill:", erro);
            mostrarAviso(`Falha ao alterar status: ${erro.message}`, "Erro");

        })
        .finally(function () {

            botaoElemento.disabled = false;
        });
}



const processosModal = document.getElementById('procesosModal');
const tabelaProcessosAtivosCorpo = document.getElementById('tabela-processos-ativos-corpo');
const listaProcessosSimulados = [
    { nome: "chrome.exe", cpu: 15.2, ram: 51, disco: 0.1, gpu: 8.5 },
    { nome: "explorer.exe", cpu: 2.1, ram: 12, disco: 0.0, gpu: 1.0 },
    { nome: "svchost.exe", cpu: 0.5, ram: 4.1, disco: 0.0, gpu: 0.0 },
];

function popularTabelaProcessosAtivos(listaProcessos) {
    if (!tabelaProcessosAtivosCorpo) { return; }
    tabelaProcessosAtivosCorpo.innerHTML = '';
    if (!listaProcessos || listaProcessos.length === 0) { return; }

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


function telaAddWhitelist() {
    const modalBody = document.getElementById("blacklistModal")
    modalBody.innerHTML = `
    <div class="modal-content" id="conteudo">
    <div class="modal-header">
                    <button class="modal-close" onclick="listarBlacklist(global)">&#8592;</button>
                    <h3 class="modal-title1">Adicionar a Whitelist</h3>
                    <button class="modal-close" onclick="closeModal('blacklistModal')">&times;</button>
                </div>
                <div class="modal-body" id="modal-body">
                           <label for="add">Nome</label>
                    <input type="text" id="add">
                   <button class="btn btn-primario" style="padding: 1%;" onclick="adicionarProcessoBlacklist(document.getElementById('add').value)">Adicionar</button>
                    </div>
                    </div>
    `


}

function adicionarProcessoBlacklist(nomeProcesso) {


    const dados = { fk_modelo: global, nome: nomeProcesso };

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

            mostrarAviso("Processo adicionado à whitelist!", "Sucesso");
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
        method: 'PUT',
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
        //window.location.href = 'Gerenciamento_modelos-analista.html';
    }

    //carregando informações do session storage
    var titulo = document.getElementById('nome-modelo')
    titulo.textContent = nomeModeloAtual;

    var titulo = document.getElementById('codigo-modelo')
    titulo.textContent = idModeloAtual;

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

// Gráfico de Recursos - BARRAS HORIZONTAIS
const resourceCtx = document.getElementById('resourceChart').getContext('2d');
new Chart(resourceCtx, {
    type: 'bar',
    data: {
        labels: ['CPU', 'RAM', 'Disco', 'GPU'],
        datasets: [
            {
                label: 'Último registro de Uso',
                data: [50, 55, 5, 30],
                backgroundColor: 'rgba(0, 178, 178, 0.8)',
                borderColor: '#00B2B2',
                borderWidth: 2
            },
            {
                label: 'Pico',
                data: [100, 97, 13, 71],
                backgroundColor: 'rgba(0, 110, 102, 0.8)',
                borderColor: '#006E66',
                borderWidth: 2
            },
            {
                label: 'Média',
                data: [36, 29, 3, 23],
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
        labels: [
            '04/10/2025', '05/10/2025', '06/10/2025', '07/10/2025', '08/10/2025', '09/10/2025', '10/10/2025',
            '11/10/2025', '12/10/2025', '13/10/2025', '14/10/2025', '15/10/2025', '16/10/2025', '17/10/2025',
            '18/10/2025', '19/10/2025', '20/10/2025', '21/10/2025', '22/10/2025', '23/10/2025', '24/10/2025',
            '25/10/2025', '26/10/2025', '27/10/2025', '28/10/2025', '29/10/2025', '30/10/2025', '31/10/2025',
            '01/11/2025', '02/11/2025', '03/11/2025', '04/11/2025'
        ],
        datasets: [{
            label: 'Alertas - CPU',
            data: [0, 3, 3, 4, 5, 6, 7, 8, 2, 0, 0, 2, 4, 2, 2, 3, 3, 3, 3, 6, 1, 2, 3, 8, 1, 5, 5, 1, 6, 0, 2],
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
        CPU: [0, 3, 3, 4, 5, 6, 7, 8, 2, 0, 0, 2, 4, 2, 2, 3, 3, 3, 3, 6, 1, 2, 3, 8, 1, 5, 5, 1, 6, 0, 2],
        RAM: [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0],
        DISCO: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        GPU: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    alertsChart.data.datasets[0].data = dadosMock[tipo];
    alertsChart.data.datasets[0].label = 'Alertas - ' + tipo;
    alertsChart.update();

    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    botao.classList.add("active");
}

function valorDefault() {
    if (JSON.parse(sessionStorage.getItem("dados")).FK_CARGO == 1) {
        document.getElementById("inicio").value = "04/10/2024"
        document.getElementById("fim").value = "04/11/2025"
    } else if (JSON.parse(sessionStorage.getItem("dados")).FK_CARGO == 2 || JSON.parse(sessionStorage.getItem("dados")).FK_CARGO == 3) {
        document.getElementById("inicio").value = "01"
    }
}
const iptInicio = document.getElementById("inicio")
const divInicio = document.getElementById("sugestaoInicio")

iptInicio.addEventListener("blur", () => { setTimeout(() => { divInicio.innerHTML = "" }, 150) })
iptInicio.addEventListener("focus", () => searchComSelect(iptInicio.value, 1, "inicio"))
iptInicio.addEventListener("input", () => searchComSelect(iptInicio.value, 0, "inicio"))

function searchComSelect(inicio, fim, foco, ipt) {


    var sugestao = []
    var cache = []
    const fkCargo = JSON.parse(sessionStorage.getItem("dados")).FK_CARGO
    console.log(fkCargo)
    if (fkCargo == 1) {

        // datas_ultimos_12_meses.js
        cache = [
            "03/11/2024", "04/11/2024", "05/11/2024", "06/11/2024", "07/11/2024", "08/11/2024", "09/11/2024", "10/11/2024", "11/11/2024", "12/11/2024",
            "13/11/2024", "14/11/2024", "15/11/2024", "16/11/2024", "17/11/2024", "18/11/2024", "19/11/2024", "20/11/2024", "21/11/2024", "22/11/2024",
            "23/11/2024", "24/11/2024", "25/11/2024", "26/11/2024", "27/11/2024", "28/11/2024", "29/11/2024", "30/11/2024", "01/12/2024", "02/12/2024",
            "03/12/2024", "04/12/2024", "05/12/2024", "06/12/2024", "07/12/2024", "08/12/2024", "09/12/2024", "10/12/2024", "11/12/2024", "12/12/2024",
            "13/12/2024", "14/12/2024", "15/12/2024", "16/12/2024", "17/12/2024", "18/12/2024", "19/12/2024", "20/12/2024", "21/12/2024", "22/12/2024",
            "23/12/2024", "24/12/2024", "25/12/2024", "26/12/2024", "27/12/2024", "28/12/2024", "29/12/2024", "30/12/2024", "31/12/2024", "01/01/2025",
            "02/01/2025", "03/01/2025", "04/01/2025", "05/01/2025", "06/01/2025", "07/01/2025", "08/01/2025", "09/01/2025", "10/01/2025", "11/01/2025",
            "12/01/2025", "13/01/2025", "14/01/2025", "15/01/2025", "16/01/2025", "17/01/2025", "18/01/2025", "19/01/2025", "20/01/2025", "21/01/2025",
            "22/01/2025", "23/01/2025", "24/01/2025", "25/01/2025", "26/01/2025", "27/01/2025", "28/01/2025", "29/01/2025", "30/01/2025", "31/01/2025",
            "01/02/2025", "02/02/2025", "03/02/2025", "04/02/2025", "05/02/2025", "06/02/2025", "07/02/2025", "08/02/2025", "09/02/2025", "10/02/2025",
            "11/02/2025", "12/02/2025", "13/02/2025", "14/02/2025", "15/02/2025", "16/02/2025", "17/02/2025", "18/02/2025", "19/02/2025", "20/02/2025",
            "21/02/2025", "22/02/2025", "23/02/2025", "24/02/2025", "25/02/2025", "26/02/2025", "27/02/2025", "28/02/2025", "01/03/2025", "02/03/2025",
            "03/03/2025", "04/03/2025", "05/03/2025", "06/03/2025", "07/03/2025", "08/03/2025", "09/03/2025", "10/03/2025", "11/03/2025", "12/03/2025",
            "13/03/2025", "14/03/2025", "15/03/2025", "16/03/2025", "17/03/2025", "18/03/2025", "19/03/2025", "20/03/2025", "21/03/2025", "22/03/2025",
            "23/03/2025", "24/03/2025", "25/03/2025", "26/03/2025", "27/03/2025", "28/03/2025", "29/03/2025", "30/03/2025", "31/03/2025", "01/04/2025",
            "02/04/2025", "03/04/2025", "04/04/2025", "05/04/2025", "06/04/2025", "07/04/2025", "08/04/2025", "09/04/2025", "10/04/2025", "11/04/2025",
            "12/04/2025", "13/04/2025", "14/04/2025", "15/04/2025", "16/04/2025", "17/04/2025", "18/04/2025", "19/04/2025", "20/04/2025", "21/04/2025",
            "22/04/2025", "23/04/2025", "24/04/2025", "25/04/2025", "26/04/2025", "27/04/2025", "28/04/2025", "29/04/2025", "30/04/2025", "01/05/2025",
            "02/05/2025", "03/05/2025", "04/05/2025", "05/05/2025", "06/05/2025", "07/05/2025", "08/05/2025", "09/05/2025", "10/05/2025", "11/05/2025",
            "12/05/2025", "13/05/2025", "14/05/2025", "15/05/2025", "16/05/2025", "17/05/2025", "18/05/2025", "19/05/2025", "20/05/2025", "21/05/2025",
            "22/05/2025", "23/05/2025", "24/05/2025", "25/05/2025", "26/05/2025", "27/05/2025", "28/05/2025", "29/05/2025", "30/05/2025", "31/05/2025",
            "01/06/2025", "02/06/2025", "03/06/2025", "04/06/2025", "05/06/2025", "06/06/2025", "07/06/2025", "08/06/2025", "09/06/2025", "10/06/2025",
            "11/06/2025", "12/06/2025", "13/06/2025", "14/06/2025", "15/06/2025", "16/06/2025", "17/06/2025", "18/06/2025", "19/06/2025", "20/06/2025",
            "21/06/2025", "22/06/2025", "23/06/2025", "24/06/2025", "25/06/2025", "26/06/2025", "27/06/2025", "28/06/2025", "29/06/2025", "30/06/2025",
            "01/07/2025", "02/07/2025", "03/07/2025", "04/07/2025", "05/07/2025", "06/07/2025", "07/07/2025", "08/07/2025", "09/07/2025", "10/07/2025",
            "11/07/2025", "12/07/2025", "13/07/2025", "14/07/2025", "15/07/2025", "16/07/2025", "17/07/2025", "18/07/2025", "19/07/2025", "20/07/2025",
            "21/07/2025", "22/07/2025", "23/07/2025", "24/07/2025", "25/07/2025", "26/07/2025", "27/07/2025", "28/07/2025", "29/07/2025", "30/07/2025",
            "31/07/2025", "01/08/2025", "02/08/2025", "03/08/2025", "04/08/2025", "05/08/2025", "06/08/2025", "07/08/2025", "08/08/2025", "09/08/2025",
            "10/08/2025", "11/08/2025", "12/08/2025", "13/08/2025", "14/08/2025", "15/08/2025", "16/08/2025", "17/08/2025", "18/08/2025", "19/08/2025",
            "20/08/2025", "21/08/2025", "22/08/2025", "23/08/2025", "24/08/2025", "25/08/2025", "26/08/2025", "27/08/2025", "28/08/2025", "29/08/2025",
            "30/08/2025", "31/08/2025", "01/09/2025", "02/09/2025", "03/09/2025", "04/09/2025", "05/09/2025", "06/09/2025", "07/09/2025", "08/09/2025",
            "09/09/2025", "10/09/2025", "11/09/2025", "12/09/2025", "13/09/2025", "14/09/2025", "15/09/2025", "16/09/2025", "17/09/2025", "18/09/2025",
            "19/09/2025", "20/09/2025", "21/09/2025", "22/09/2025", "23/09/2025", "24/09/2025", "25/09/2025", "26/09/2025", "27/09/2025", "28/09/2025",
            "29/09/2025", "30/09/2025", "01/10/2025", "02/10/2025", "03/10/2025", "04/10/2025", "05/10/2025", "06/10/2025", "07/10/2025", "08/10/2025",
            "09/10/2025", "10/10/2025", "11/10/2025", "12/10/2025", "13/10/2025", "14/10/2025", "15/10/2025", "16/10/2025", "17/10/2025", "18/10/2025",
            "19/10/2025", "20/10/2025", "21/10/2025", "22/10/2025", "23/10/2025", "24/10/2025", "25/10/2025", "26/10/2025", "27/10/2025", "28/10/2025",
            "29/10/2025", "30/10/2025", "31/10/2025", "01/11/2025", "02/11/2025", "03/11/2025"
        ];

    } else if (fkCargo == 2 || fkCargo == 3) {
        cahce = ['01', "02", "03"]
    }


    var digitado = ""
    var validacao = ""
    if (ipt == "inicio") {
        var divSugestao = document.getElementById("sugestaoInicio")
        digitado = inicio.trim().toLowerCase()
        validacao = fim.trim().toLowerCase()
    } else if (ipt == "fim") {
        var divSugestao = document.getElementById("sugestaoFim")
        digitado = fim.trim().toLowerCase()
        validacao = inicio.trim().toLowerCase()
    }

    divSugestao.innerHTML = ""

    for (let i = 0; i < cache.length; i++) {
        if (cache[i].toLowerCase().trim().includes(digitado)) {
            sugestao.push(cache[i])
        } else if (foco === 1 && !digitado) {
            sugestao.push(cache[i])
        }
    }
    console.log(sugestao)
    for (let j = 0; j < sugestao.length; j++) {
        const div = document.createElement("div")
        div.textContent = sugestao[j]
        div.style.cursor = "pointer"
        if (ipt == "fim") {
            div.addEventListener("click", () => {
                const ipt = document.getElementById("fim")
                ipt.value = sugestao[j]
                divSugestao.innerHTML = ""
            })
        } else if (ipt == "inicio") {
            div.addEventListener("click", () => {
                const ipt = document.getElementById("inicio")
                ipt.value = sugestao[j]
                divSugestao.innerHTML = ""
            })
        }


        divSugestao.appendChild(div)
    }
} 