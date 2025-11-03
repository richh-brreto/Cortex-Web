const nomeInput = document.getElementById('nome-zona');

const tabelaCorpo = document.getElementById('tabela-zona-corpo');
const header = document.getElementById('header');
const headers = header.querySelectorAll('th')
const form = document.getElementById('form-zona');
const overlay = document.getElementById('sobreposicao-formulario');
const overlayInfo = document.getElementById('sobreposicao-info')
const overlayArq = document.getElementById("sobreposicao-arq")
const overlayModelo = document.getElementById("sobreposicao-modelo")
const overlayFunc = document.getElementById("sobreposicao-func")
const tituloModal = document.getElementById('modal-title');
const btnAdicionar = document.getElementById('btn-adicionar');
const btnFechar = document.getElementById('btn-fechar-modal');
const btnCancelar = document.getElementById('btn-cancelar');
const btnFecharInfo = document.getElementById('btn-fechar-modal-info')
const tituloInfo = document.getElementById('modal-title-info')
const aba = Array.from(document.getElementsByClassName('aba')) 

let linhaEditando = null;
const fk_empresa = sessionStorage.EMPRESA_USUARIO;

const pesquisaInput = document.getElementById('pesquisar-input');
const filtroSelect = document.getElementById('filtro-select');

let idZonaSelect = null

var cacheArq = null
var cacheModelo = null
var cacheFunc = null

function atualizarTotal() {
    if (!fk_empresa) return;
    
    fetch(`/zona/contarZonas/${fk_empresa}`)
        .then(res => res.json())
        .then(resultado => {
            console.log("Total de zonas recebido:", resultado);
            const total = resultado[0].total;
            document.querySelector('.numero-total').textContent = total;
        })
        .catch(erro => {
            console.error("Erro ao contar zonas:", erro);
        });
}

function buscarPossibilidades(valor, tipo, id_zona, foco){
    
    if(tipo == "arq"){
        if(!cacheArq){
            fetch(`/zona/posibilidadesArq/${fk_empresa}/${id_zona}`)
                .then(res => res.json())
                .then(posArq => {
                    console.log("Dados recebidos pelo frontend:", posArq);
                    cacheArq = posArq
                    searchComSelect(valor, cacheArq, foco)
                })
                .catch(erro => {
                    console.error("Erro ao carregar possibilidades Arquitetura:", erro);
                });
        } else {
            searchComSelect(valor, cacheArq, foco)
        }
    } else if(tipo == "modelo"){
        if(!cacheModelo){
            fetch(`/zona/posibilidadesModelo/${fk_empresa}`)
                .then(res => res.json())
                .then(posM => {
                    console.log("Dados recebidos pelo frontend:", posM);
                    cacheModelo = posM
                    searchComSelect(valor, cacheModelo, foco)
                })
                .catch(erro => {
                    console.error("Erro ao carregar possibilidades Modelo:", erro);
                });
        } else {
            searchComSelect(valor, cacheModelo, foco)
        }
    } else if(tipo == "func"){
        console.log(fk_empresa)
        if(!cacheFunc){
            fetch(`/zona/posibilidadesFunc/${fk_empresa}/${id_zona}`)
                .then(res => res.json())
                .then(posFunc => {
                    console.log("Dados recebidos pelo frontend:", posFunc);
                    cacheFunc = posFunc
                    searchComSelect(valor, cacheFunc)
                })
                .catch(erro => {
                    console.error("Erro ao carregar possibilidades Funcionario:", erro);
                });
        } else {
            searchComSelect(valor, cacheFunc, foco)
        }
    }
}

function searchComSelect(valor, cache, foco){
    var divSugestao = document.getElementById("sugestao")

    const sugestao = []
    const digitado = valor.trim().toLowerCase()
    divSugestao.innerHTML = ""

    for(let i = 0; i < cache.length; i++){
        if(cache[i].nome.toLowerCase().trim().includes(digitado)){
            sugestao.push(cache[i])
        } else if (foco === 1 && !digitado){
            sugestao.push(cache[i])
        }
    }

    for(let j = 0; j < sugestao.length; j++){
        const div = document.createElement("div")
        console.log(sugestao)
        div.textContent = sugestao[j].nome
        div.dataset.id = sugestao[j].id;
        div.style.cursor = "pointer"

        div.addEventListener("click", () => {
            const ipt = document.getElementById("iptAdd")
            ipt.value = sugestao[j].nome
            ipt.dataset.id = sugestao[j].id
            divSugestao.innerHTML = ""
        })

        divSugestao.appendChild(div)
    }         
}

function abrirModalInfo(nome, id_zona){
    overlayInfo.classList.add('show')
    document.body.style.overflow = 'hidden'
    tituloInfo.textContent = "Informações da Zona " + nome;
    idZonaSelect = id_zona
    const abaFunc = document.getElementById("aba-funcionario")
    const escolhida = document.getElementsByClassName("escolhida")
    escolhida[0].classList.remove("escolhida")
    abaFunc.classList.add("escolhida")
    carregarFuncionarios()
}

function fecharModalInfo(){
    overlayInfo.classList.remove('show');
    document.body.style.overflow = '';
    idZonaSelect = null
    cacheArq = null
    cacheModelo = null
    cacheFunc = null
}

function abrirModal(modo = 'novo') {
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    if (modo === 'novo') {
        tituloModal.textContent = 'Adicionar Zona';
        form.reset()
    } else {
        tituloModal.textContent = 'Editar Zona';
    }
}

function fecharModal() {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    linhaEditando = null;
}

function formatarData(dataISO) {
    if (!dataISO) return '';
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR');
}

function pesquisarEmZona(termo, nomeCard){
    const envoltorio = document.getElementById("infos")
    const card = envoltorio.querySelectorAll(`.card-${nomeCard}`)

    const pesquisa = termo.trim().toLowerCase()
    card.forEach(n => {
        var nome = n.querySelector("[name='nome']")
        var valor = nome.textContent.trim().toLowerCase()
        if(valor.includes(pesquisa)){
            n.style.display = ""
        } else {
            n.style.display = "none"
        }
    })
}

function adicionarEmZona(tipo, id_zona){
    const iptAdd = document.getElementById("iptAdd")
    const id = iptAdd.dataset.id

    if(!id){
        alert("Preeencha todos os campos para a vinculação.")
        return
    }
    
    if(tipo == "arquitetura"){
      const qtd = (document.getElementById("iptQtdArq").value);

      console.log(qtd, id, id_zona)
      if(!qtd){
        alert("Preeencha todos os campos para a vinculação.")
        return
      }
       fetch("/zona/vincularArquitetura/" + id_zona, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idArq: id,
                qtdArq: qtd
            })
        })
            .then(res => {
                if (res.ok) {
                    alert("Arquitetura Vinculada com sucesso!");
                    cacheArq = null
                    carregarArq();
                } else {
                    alert("Erro ao vincular arquitetura");
                }
            })
            .catch(erro => {
                console.error("Erro ao vincular:", erro);
                alert("Erro ao vincular arquitetura");
            });
    } else if(tipo == "modelo"){
        fetch("/zona/vincularModelo/" + id_zona, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idModelo: id
            })
        })
            .then(res => {
                if (res.ok) {
                    alert("Modelo vinculado com sucesso!");
                    cacheModelo = null
                    carregarModelos();
                } else {
                    alert("Erro ao vincular modelo");
                }
            })
            .catch(erro => {
                console.error("Erro ao vincular:", erro);
                alert("Erro ao vincular modelo");
            });
    } else if(tipo == "funcionario"){
        fetch("/zona/vincularFuncionario/" + id_zona, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idFunc: id
            })
        })
            .then(res => {
                if (res.ok) {
                    alert("funcionario vinculado com sucesso!");
                    cacheFunc = null
                    carregarFuncionarios()
                } else {
                    alert("Erro ao vincular funcionario");
                }
            })
            .catch(erro => {
                console.error("Erro ao vincular:", erro);
                alert("Erro ao vincular funcionario");
            });
    }
}

function deletarEmZona(id, tipo, id_zona){
    if(tipo == "arq"){
        if (confirm("Deseja realmente desvincular esta arquitetura?")) {
            fetch(`/zona/desvincularArquitetura/${id}/${id_zona}`, { method: "DELETE" })
                .then(res => {
                    if (res.ok) {
                        alert("Arquitetura desvinculada!");
                        cacheArq = null
                        carregarArq()
                    } else {
                        alert("Erro ao desvincular arquitetura");
                    }
                })
                .catch(erro => {
                    console.error("Erro ao desvincular:", erro);
                    alert("Erro ao desvincular arquitetura");
                });
        }
    } else if(tipo == "modelo"){
        if (confirm("Deseja realmente desvincular este modelo?")) {
            fetch(`/zona/desvincularModelo/${id}`, { method: "PUT" })
                .then(res => {
                    if (res.ok) {
                        alert("Modelo desvinculada!");
                        cacheModelo = null
                        carregarModelos()
                    } else {
                        alert("Erro ao desvincular modelo");
                    }
                })
                .catch(erro => {
                    console.error("Erro ao desvincular:", erro);
                    alert("Erro ao desvincular modelo");
                });
        }
    } else if(tipo == "func"){
        if (confirm("Deseja realmente desvincular este funcionario?")) {
            fetch(`/zona/desvincularFuncionario/${id}/${id_zona}`, { method: "DELETE" })
                .then(res => {
                    if (res.ok) {
                        alert("Funcionario desvinculada!");
                        cacheFunc = null
                        carregarFuncionarios()
                    } else {
                        alert("Erro ao desvincular funcionario");
                    }
                })
                .catch(erro => {
                    console.error("Erro ao desvincular:", erro);
                    alert("Erro ao desvincular funcionario");
                });
        }
    }
}

const mapaColunas = {
    'todos': 'todos',
    'id': 0,
    'nome': 1,
    'modelos': 2,
    'arquitetura': 3,
    'funcionario': 4,
};

function aplicarPesquisa() {
    const termoPesquisa = pesquisaInput.value.toLowerCase().trim();
    const colunaFiltro = filtroSelect.value.trim();
    const linhas = Array.from(tabelaCorpo.querySelectorAll('tr'));

    linhas.forEach(linha => {
        let textoParaPesquisar = '';

        if (colunaFiltro === 'todos') {
            for (let i = 0; i < linha.children.length - 1; i++) {
                textoParaPesquisar += linha.children[i].textContent.trim().toLowerCase() + ' ';
            }
        } else {
            const indiceCelula = mapaColunas[colunaFiltro];
            textoParaPesquisar = linha.children[indiceCelula].textContent.trim().toLowerCase();
        }

        if (textoParaPesquisar.includes(termoPesquisa)) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    });
}

pesquisaInput.addEventListener('input', aplicarPesquisa);
filtroSelect.addEventListener('change', aplicarPesquisa);

btnAdicionar.addEventListener('click', () => abrirModal('novo'));
btnFechar.addEventListener('click', fecharModal);
btnCancelar.addEventListener('click', fecharModal);
btnFecharInfo.addEventListener('click', fecharModalInfo);

aba.forEach(a =>
    a.addEventListener('click', function () {
        const escolhida = document.getElementsByClassName("escolhida")
        escolhida[0].classList.remove("escolhida")
        a.classList.add("escolhida")
        const id_aba = a.id

        const containerInfo = document.getElementsByClassName("infos")
        containerInfo.innerHTML = ""

        if(id_aba == "aba-funcionario"){
            carregarFuncionarios()
        } else if(id_aba == "aba-modelos"){
            carregarModelos()
        } else if(id_aba == "aba-arq"){
            carregarArq()
        }
    })
)

function carregarArq(){
    fetch(`/zona/listarArq/${idZonaSelect}`)
        .then(res => res.json())
        .then(arq => {
            console.log("Dados recebidos pelo frontend:", arq);

            const topo = document.getElementById("topo-infos")
            topo.innerHTML = ""

            const envoltorio = document.getElementById("infos")
            envoltorio.innerHTML = ""

            arq.forEach(a => {          
                const card = document.createElement("div")
                card.className = "card-arq"

                card.innerHTML = `  
                    <div class="nome-arq">
                        <h4 name="nome">${a.nome}</h4>
                    </div>
                    <div class="qtd"> 
                        <div class="qtd_total">
                            <p>Qtd. Total:</p>
                            <p>${a.qtd}</p>
                        </div>   
                    </div>
                    <div class="meio">
                        <div class="esquerda">
                            <div class="modelo-cpu">
                                <p>Modelo Cpu:</p>
                                <p>${a.modelo_cpu}</p>
                            </div>
                            <div class="modelo-gpu">
                                <p>Modelo Gpu:</p>
                                <p>${a.modelo_gpu}</p>
                            </div>
                        </div>
                        <div class="direita">
                            <div class="qtd-cpu"> 
                                <p>Qtd. Cpu:</p>
                                <p>${a.qtd_cpu}</p>
                            </div>
                            <div class="max-disco">
                                <p>Máx. Disco:</p>
                                <p>${a.maxDisco}</p>
                            </div>
                            <div class="qtd-ram">
                                <p>Qtd. Ram:</p>
                                <p>${a.qtd_ram}</p>
                            </div>
                        </div>
                    </div>
                    <div class="baixo">
                        <p>Sistema Operacional:</p>
                        <p>${a.so}</p>
                    </div>
                    <div class="botao-del-usuario">
                        <button class="botao-del" name="botaoDel">
                            <img src="../assets/icon/deletar.png">
                        </button>
                        <button class="btn-del" title="Editar">
                            <img src="../assets/icon/1159633.png">
                        </button>
                    </div>
                `
                const del = card.querySelector("[name='botaoDel']")
                del.addEventListener('click', () => deletarEmZona(a.id_arquitetura, "arq", idZonaSelect))

                envoltorio.appendChild(card)
            });

            const inputPesquisa = document.createElement("input")
            inputPesquisa.type = "text"
            inputPesquisa.placeholder = "Pesquisar Nome Arquitetura..."
            inputPesquisa.classList.add("input-pesquisa")
            topo.appendChild(inputPesquisa)

            inputPesquisa.addEventListener("input", () => pesquisarEmZona(inputPesquisa.value, "arq"))

            const inputAdd = document.createElement("input")
            inputAdd.type = "search"
            inputAdd.placeholder = "Adicionar Arquitetura..."
            inputAdd.classList.add("input-pesquisa")
            inputAdd.id = "iptAdd"
            topo.appendChild(inputAdd)

            const divSugestao = document.createElement("div")
            divSugestao.id = "sugestao"
            topo.appendChild(divSugestao)

            inputAdd.addEventListener("blur", () => { setTimeout(() => {divSugestao.innerHTML = ""}, 150)})
            inputAdd.addEventListener("focus", () => buscarPossibilidades(inputAdd.value, "arq", idZonaSelect, 1))
            inputAdd.addEventListener("input", () => buscarPossibilidades(inputAdd.value, "arq", idZonaSelect, 0))

            const inputQtd = document.createElement("input")
            inputQtd.type = "number"
            inputQtd.placeholder = "Quantidade"
            inputQtd.classList.add("input-pesquisa")
            inputQtd.id = "iptQtdArq"
            topo.appendChild(inputQtd)

            const botao = document.createElement("button")
            botao.textContent = "Adicionar"
            botao.classList.add("btn")
            botao.classList.add("btn-primario")
            topo.appendChild(botao)
            
            botao.addEventListener("click", () => adicionarEmZona("arquitetura", idZonaSelect))
        })
        .catch(erro => {
            console.error("Erro ao carregar arquiteturas:", erro);
            alert("Erro ao carregar arquiteturas");
        });
}

function carregarModelos(){
    fetch(`/zona/listarModelos/${idZonaSelect}`)
        .then(res => res.json())
        .then(modelos => {
            console.log("Dados recebidos pelo frontend:", modelos);

            const topo = document.getElementById("topo-infos")
            topo.innerHTML = ""

            const envoltorio = document.getElementById("infos")
            envoltorio.innerHTML = ""

            modelos.forEach(m => {          
                const card = document.createElement("div")
                card.className = "card-modelo"

                card.innerHTML = `  
                    <div class="titulo">
                        <h4 name="nome">${m.nome}</h4>
                    </div>
                    <div class="info-card-modelo">
                        <div class="esquerda">
                            <div class="descricao">
                                <p>Descrição:</p>
                                <p>${m.descricao}</p>
                            </div>
                            <div class="cliente">
                                <p>Cliente:</p>
                                <p>${m.nome_cliente}</p>
                            </div>
                            <div class="arquitetura">
                                <p>Arquitetura:</p>
                                <p>${m.nome_arq}</p>
                            </div>
                            <div class="qtd_disco">
                                <p>Qtd. Disco:</p>
                                <p>${m.qtd_disco}Tb</p>
                            </div>
                        </div>
                        <div class="direita">
                            <div class="ip">
                                <p>IP:</p>
                                <p>${m.ip}</p>
                            </div>
                            <div class="hostname">
                                <p>Hostname:</p>
                                <p>${m.hostname}</p>
                            </div>
                            <div class="parametros">
                                <div class="tempo">
                                    <p>Tempo:</p>
                                    <p>${m.tempo} min</p>
                                </div>
                                <div class="grid_par">
                                    <div class="cpu">
                                        <p>CPU:</p>
                                        <p>${m.cpu}%</p>
                                    </div>
                                    <div class="ram">
                                        <p>RAM:</p>
                                        <p>${m.ram}%</p>
                                    </div>
                                    <div class="disco">
                                        <p>Disco:</p>
                                        <p>${m.disco}%</p>
                                    </div>
                                    <div class="gpu">
                                        <p>GPU:</p>
                                        <p>${m.gpu}%</p>
                                    </div>
                                </div>
                            </div>
                            <div class="botao-del-usuario">
                                <button class="botao-del" name="botaoDel">
                                    <img src="../assets/icon/deletar.png">
                                </button>
                            </div>
                        </div>
                    </div>
                `

                const del = card.querySelector("[name='botaoDel']")
                del.addEventListener('click', () => deletarEmZona(m.id_modelo, "modelo"))
                envoltorio.appendChild(card)
            });

            const inputPesquisa = document.createElement("input")
            inputPesquisa.type = "text"
            inputPesquisa.placeholder = "Pesqusar Nome Modelo..."
            inputPesquisa.classList.add("input-pesquisa")
            topo.appendChild(inputPesquisa)

            inputPesquisa.addEventListener("input", () => pesquisarEmZona(inputPesquisa.value, "modelo"))

            const inputAdd = document.createElement("input")
            inputAdd.type = "search"
            inputAdd.placeholder = "Adicionar Modelo..."
            inputAdd.classList.add("input-pesquisa")
            inputAdd.id = "iptAdd"
            topo.appendChild(inputAdd)

            const divSugestao = document.createElement("div")
            divSugestao.id = "sugestao"
            topo.appendChild(divSugestao)
            
            inputAdd.addEventListener("blur", () => { setTimeout(() => {divSugestao.innerHTML = ""}, 150)})
            inputAdd.addEventListener("focus", () => buscarPossibilidades(inputAdd.value, "modelo", idZonaSelect, 1))
            inputAdd.addEventListener("input", () => buscarPossibilidades(inputAdd.value, "modelo", idZonaSelect, 0))

            const botao = document.createElement("button")
            botao.textContent = "Adicionar"
            botao.classList.add("btn")
            botao.classList.add("btn-primario")
            topo.appendChild(botao)
            
            botao.addEventListener("click", () => adicionarEmZona("modelo", idZonaSelect))
        })
        .catch(erro => {
            console.error("Erro ao carregar modelos:", erro);
            alert("Erro ao carregar modelos");
        });
}

function carregarFuncionarios(){
    fetch(`/zona/listarFuncionario/${idZonaSelect}`)
        .then(res => res.json())
        .then(func => {
            console.log("Dados recebidos pelo frontend:", func);

            const topo = document.getElementById("topo-infos")
            topo.innerHTML = ""

            const envoltorio = document.getElementById("infos")
            envoltorio.innerHTML = ""

            var linha = document.createElement("div")
            linha.className = "linha"

            for(let i = 0; i < func.length; i++){
                if(i % 3 == 0 && i != 0){
                    envoltorio.appendChild(linha)
                    linha = document.createElement("div")
                    linha.className = "linha"
                }
                
                const card = document.createElement("div")
                card.className = "card-usuario"

                var fotoReal = "../assets/imgs/" + func[i].foto 
                    console.log(fotoReal)
                card.innerHTML = `  
                    <img src=${fotoReal} class="foto">
                    <div class="conteudo-usuario">
                        <h5 name="nome">${func[i].nome}</h5>
                        <div class="linha-conteudo">
                            <h6>Email: </h6>
                            <h6>${func[i].email}</h6>
                        </div>
                        <div class="linha-conteudo">
                            <h6>Telefone: </h6>
                            <h6>${func[i].telefone}</h6>
                        </div>
                        <div class="linha-conteudo">
                            <h6>Cargo: </h6>
                            <h6>${func[i].cargo}</h6>
                        </div>
                        <div class="linha-conteudo">
                            <h6>Status: </h6>
                            <h6>${func[i].ativo}</h6>
                        </div>
                    </div>
                    <div class="botao-del-usuario">
                        <button class="botao-del" name="botaoDel">
                            <img src="../assets/icon/deletar.png">
                        </button>
                    </div>
                `
                const del = card.querySelector("[name='botaoDel']")
                del.addEventListener('click', () => deletarEmZona(func[i].id, "func", idZonaSelect))

                linha.appendChild(card)
            }

            if (linha.children.length > 0) {
                envoltorio.appendChild(linha);
            }

            const inputPesquisa = document.createElement("input")
            inputPesquisa.type = "text"
            inputPesquisa.placeholder = "Pesqusar Nome Funcionário..."
            inputPesquisa.classList.add("input-pesquisa")
            topo.appendChild(inputPesquisa)

            inputPesquisa.addEventListener("input", () => pesquisarEmZona(inputPesquisa.value, "usuario"))

            const inputAdd = document.createElement("input")
            inputAdd.type = "search"
            inputAdd.placeholder = "Adicionar Funcionário..."
            inputAdd.classList.add("input-pesquisa")
            inputAdd.id = "iptAdd"
            topo.appendChild(inputAdd)

            const divSugestao = document.createElement("div")
            divSugestao.id = "sugestao"
            topo.appendChild(divSugestao)

            inputAdd.addEventListener("blur", () => { setTimeout(() => {divSugestao.innerHTML = ""}, 150)})
            inputAdd.addEventListener("focus", () => buscarPossibilidades(inputAdd.value, "func", idZonaSelect, 1))
            inputAdd.addEventListener("input", () => buscarPossibilidades(inputAdd.value, "func", idZonaSelect, 0))

            const botao = document.createElement("button")
            botao.textContent = "Adicionar"
            botao.classList.add("btn")
            botao.classList.add("btn-primario")
            topo.appendChild(botao)
            
            botao.addEventListener("click", () => adicionarEmZona("funcionario", idZonaSelect))
        })
        .catch(erro => {
            console.error("Erro ao carregar funcionários:", erro);
            alert("Erro ao carregar funcionários");
        });
}

window.addEventListener("load", () => {
    if (!fk_empresa) {
        console.error("ID da empresa não encontrado na sessão.");
        alert("Erro ao carregar dados. Por favor, faça o login novamente.");
        return;
    }

    fetch(`/zona/listar/${fk_empresa}`)
        .then(res => res.json())
        .then(zonas => {
            console.log("Dados recebidos pelo frontend:", zonas);

            tabelaCorpo.innerHTML = "";
            zonas.forEach(z => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${z.id_zona}</td>
                    <td>${z.nome_zona}</td>
                    <td>${z.qtd_usuarios}</td>
                    <td>${z.qtd_modelos}</td>
                    <td>${z.qtd_arquiteturas}</td>
                    <td>
                        <div class="coluna-acoes">
                            <button class="btn-icone" title="VerMais"><span class="btn btn-secundario">Ver mais</span></button>
                            <button class="btn-icone" title="Editar"><span class="material-icons">edit</span></button>
                            <button class="btn-icone" title="Excluir"><span class="material-icons">delete</span></button>
                        </div>
                    </td>
                `;
                tabelaCorpo.appendChild(tr);
            });
            
            atualizarTotal();
        })
        .catch(erro => {
            console.error("Erro ao carregar zonas:", erro);
            alert("Erro ao carregar zonas");
        });
});

headers.forEach(h => {
    h.addEventListener('click', () => {
        var linhas = Array.from(tabelaCorpo.querySelectorAll('tr'))
        const indice = parseInt(h.id)
        for(let i = 0; i < linhas.length; i++){
            var menor = i
            for(let j = i + 1; j < linhas.length; j++){
                var valorA = linhas[menor].children[indice].textContent.trim().toLowerCase()
                var valorB = linhas[j].children[indice].textContent.trim().toLowerCase()

                if(indice == 0 || indice == 1){   
                    if(valorA.localeCompare(valorB) > 0){
                        menor = j;
                    }
                } else {
                    if(valorA.localeCompare(valorB) < 0){
                        menor = j;
                    }
                }
            }
            var aux = linhas
            var aux = linhas[i]
            linhas[i] = linhas[menor]
            linhas[menor] = aux
        }

        tabelaCorpo.innerHTML = ""

        for(let i = 0; i < linhas.length; i++){
            tabelaCorpo.appendChild(linhas[i])
        }
    })
})

tabelaCorpo.addEventListener('click', (e) => {
    const botao = e.target.closest('.btn-icone');
    if (!botao) return;

    const linha = botao.closest('tr');
    const id_zona = linha.children[0].textContent
    const acao = botao.getAttribute('title');

    if (acao === 'Editar') {
        linhaEditando = linha;
        nomeInput.value = linha.children[1].textContent;
        abrirModal('editar');
    } else if (acao === 'Excluir') {
        if (confirm("Deseja realmente excluir esta zona?")) {
            fetch(`/zona/deletar/${id_zona}`, { method: "DELETE" })
                .then(res => {
                    if (res.ok) {
                        linha.remove();
                        alert("Zona excluída!");
                        atualizarTotal();
                    } else {
                        alert("Erro ao excluir Zona");
                    }
                })
                .catch(erro => {
                    console.error("Erro ao excluir:", erro);
                    alert("Erro ao excluir zona");
                });
        }
    } else if (acao === "VerMais"){
        abrirModalInfo(linha.children[1].textContent, linha.children[0].textContent)
    }
});

form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const zonas = {
        nome: nomeInput.value.trim(),
    };

    if (linhaEditando) {
        const id_zona = linhaEditando.children[0].textContent;
        console.log(linhaEditando.children[0].textContent)

        fetch(`/zona/atualizar/${id_zona}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(zonas)
        })
            .then(res => {
                if (res.ok) {
                    alert("Zona atualizada com sucesso!");
                    window.location.reload();
                } else {
                    alert("Erro ao atualizar zona");
                }
            })
            .catch(erro => {
                console.error("Erro ao atualizar:", erro);
                alert("Erro ao atualizar zona");
            });
    } else {
        fetch("/zona/cadastrar/" + fk_empresa, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(zonas)
        })
            .then(res => {
                if (res.ok) {
                    alert("Zona cadastrada com sucesso!");
                    window.location.reload();
                } else {
                    alert("Erro ao cadastrar zona");
                }
            })
            .catch(erro => {
                console.error("Erro ao cadastrar:", erro);
                alert("Erro ao cadastrar zona");
            });
    }

    fecharModal();
});