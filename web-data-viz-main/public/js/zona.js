const nomeInput = document.getElementById('nome-zona');


const tabelaCorpo = document.getElementById('tabela-zona-corpo');
const header = document.getElementById('header');
const headers = header.querySelectorAll('th')
const form = document.getElementById('form-zona');
const overlay = document.getElementById('sobreposicao-formulario');
const overlayInfo = document.getElementById('sobreposicao-info')
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

let idZonaSelect= null

function abrirModalInfo(nome, id_zona){
    overlayInfo.classList.add('show')
    document.body.style.overflow = 'hidden'
    tituloInfo.textContent += " " + nome;
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
    const linhas =  Array.from(tabelaCorpo.querySelectorAll('tr'));

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
        }else if( id_aba == "aba-modelos"){
            carregarModelos()
        }else if( id_aba == "aba-arq"){
            carregarArq()
        }
    })
)

function carregarArq(){
    
    fetch(`/zona/listarArq/${idZonaSelect}`)
        .then(res => res.json())
        .then(arq => {
            console.log("Dados recebidos pelo frontend:", arq);

            const envoltorio = document.getElementById("infos")
            const conteudo = document.createElement("div")

            // nome, modelo_cpu, qtd_cpu, qtd_ram, modelo_gpu, so, maxDisco, qtd

      
               
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

             const envoltorio = document.getElementById("infos")

           // nome, qtd_disco, descricao, nome_cliente, ip, hostname, tempo, cpu, ram, disco, gpu, nome_arq
            modelos.forEach(z => {
            
              
            });
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
            
             const envoltorio = document.getElementById("infos")
             const divContainer = document.createElement("div")
            divContainer.className = "tamanho"
            // foto, nome, email,telefone, cargo, ativo
            var linha = document.createElement("div")
            linha.className = "linha"

            for(let i =0; i<func.length; i++){

                if(i % 3 == 0 && i != 0){
                    divContainer.appendChild(linha)
                    linha = document.createElement("div")
                    linha.className = "linha"
                }
                const card = document.createElement("div")
                card.className = "card-usuario"

               card.innerHTML = `  
                          
                                <img src=${func[i].foto} class="foto">

                                <div class="conteudo-usuario">
                                    <h5>${func[i].nome}</h5>

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
                                    <button class="botao-del">
                                        <img src="../assets/icon/deletar.png">
                                    </button>
                                </div>
                            </div>
               `
                linha.appendChild(card)
            }

              if (linha.children.length > 0) {
                divContainer.appendChild(linha);
            }

            envoltorio.appendChild(divContainer)

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
                            <button class="btn-icone" title="VerMais"><span class="material-icons">Ver mais</span></button>
                            <button class="btn-icone" title="Editar"><span class="material-icons">edit</span></button>
                            <button class="btn-icone" title="Excluir"><span class="material-icons">delete</span></button>
                        </div>
                    </td>
                `;
                tabelaCorpo.appendChild(tr);
            });
        })
        .catch(erro => {
            console.error("Erro ao carregar zonas:", erro);
            alert("Erro ao carregar zonas");
        });


});


    headers.forEach(h =>{
    h.addEventListener('click', () =>{
        var linhas = Array.from(tabelaCorpo.querySelectorAll('tr'))
        const indice = parseInt(h.id)
        for(let i = 0; i < linhas.length; i++){
            var menor = i
            for(let j = i + 1; j < linhas.length;j++){
                var valorA = linhas[menor].children[indice].textContent.trim().toLowerCase()
                var valorB = linhas[j].children[indice].textContent.trim().toLowerCase()

            if(indice == 0 || indice == 1){   
              if(valorA.localeCompare(valorB)  > 0){
                menor = j;
              }
            }else{
              if(valorA.localeCompare(valorB)  < 0){
                menor = j;
              }
            }

            }
            var aux = linhas[i]
            linhas[i] = linhas[menor]
            linhas[menor] = aux
            
        }

        tabelaCorpo.innerHTML = ""

        for(let i = 0; i < linhas.length;i++){
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
        if (confirm("Deseja realmente excluir este funcionário?")) {
            fetch(`/zona/deletar/${id_zona}`, { method: "DELETE" })
                .then(res => {
                    if (res.ok) {
                        linha.remove();
                        alert("Zona excluído!");
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
                    alert("Zona atualizado com sucesso!");
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
                    alert("Zona cadastrado com sucesso!");
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