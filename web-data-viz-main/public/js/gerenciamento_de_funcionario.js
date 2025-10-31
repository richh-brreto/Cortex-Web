const nomeInput = document.getElementById('nome-funcionario');
const emailInput = document.getElementById('email-funcionario');
const senhaInput = document.getElementById('senha-funcionario');
const cargoInput = document.getElementById('cargo-funcionario')
const telefoneInput = document.getElementById('telefone-funcionario');
const statusInput = document.getElementById('status-funcionario');
const fotoInput = document.getElementById('foto-funcionario');

const tabelaCorpo = document.getElementById('tabela-funcionarios-corpo');
const header = document.getElementById('header');
const headers = header.querySelectorAll('th')
const form = document.getElementById('form-funcionario');
const overlay = document.getElementById('sobreposicao-formulario');
const tituloModal = document.getElementById('modal-title');
const btnAdicionar = document.getElementById('btn-adicionar');
const btnFechar = document.getElementById('btn-fechar-modal');
const btnCancelar = document.getElementById('btn-cancelar');

let linhaEditando = null;
const fk_empresa = sessionStorage.EMPRESA_USUARIO;



const pesquisaInput = document.getElementById('pesquisar-input');
const filtroSelect = document.getElementById('filtro-select');

function abrirModal(modo = 'novo') {
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    if (modo === 'novo') {
        tituloModal.textContent = 'Adicionar Funcionário';
        form.reset()
    } else {
        tituloModal.textContent = 'Editar Funcionário';
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
    'foto': 2,
    'email': 3,
    'cargo': 4,
    'senha': 5,
    'telefone': 6,
    'status': 7
};

function aplicarPesquisa() {
    const termoPesquisa = pesquisaInput.value.toLowerCase().trim();
    const colunaFiltro = filtroSelect.value;
    const linhas = tabelaCorpo.querySelectorAll('tr');

    linhas.forEach(linha => {
        let textoParaPesquisar = '';

        if (colunaFiltro === 'todos') {
            for (let i = 0; i < linha.children.length - 1; i++) {
                textoParaPesquisar += linha.children[i].textContent.toLowerCase() + ' ';
            }
        } else {
            const indiceCelula = mapaColunas[colunaFiltro];
            textoParaPesquisar = linha.children[indiceCelula].textContent.toLowerCase();
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

function atualizarTabela() {
    if (!fk_empresa) {
        console.error("ID da empresa não encontrado na sessão.");
        alert("Erro ao carregar dados. Por favor, faça o login novamente.");
        return;
    }

    fetch(`/funcionario/listar/${fk_empresa}`)
        .then(res => res.json())
        .then(funcionarios => {
            console.log("Dados recebidos pelo frontend:", funcionarios);

            tabelaCorpo.innerHTML = "";
            funcionarios.forEach(f => {
                if (f.ativo == 1) {
                    f.ativo = 'Ativo'
                } else {
                    f.ativo = "Inativo"
                }

                const tr = document.createElement("tr");
                    const imgSrc = f.foto ? `/assets/imgs/${f.foto}` : '/assets/icon/sem-foto.png';
                tr.innerHTML = `
                    <td>${f.id}</td>
                    <td>${f.nome}</td>
                    <td>
                        <img src="${imgSrc}" alt="Foto de ${f.nome}" 
                            style="width:40px;height:40px;border-radius:50%;object-fit:cover;">
                    </td>
                    <td>${f.email}</td>
                    <td>${f.cargo}</td>
                    <td>${f.telefone}</td>
                    <td><span class="badge ${f.ativo}">${f.ativo}</span></td>
                    <td>
                        <div class="coluna-acoes">
                            <button class="btn btn-secundario" title="Editar">Ver mais</span><button>
                            <button class="btn-icone" title="Editar"><span class="material-icons">edit</span><button>
                            <button class="btn-icone" title="Excluir"><span class="material-icons">delete<span><button>
                        </div>
                    </td>
                `;
                tabelaCorpo.appendChild(tr);
            });
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
    atualizarTabela();
});


    headers.forEach(h =>{
    h.addEventListener('click', () =>{
        var linhas = Array.from(tabelaCorpo.querySelectorAll('tr'))
        const indice = parseInt(h.id)
        for(let i = 0; i < linhas.length; i++){
            var menor = i
            for(let j = i + 1; j < linhas.length;j++){
                var valorA = linhas[menor].children[indice].textContent.toLowerCase()
                var valorB = linhas[j].children[indice].textContent.toLowerCase()
              if(valorA.localeCompare(valorB)  > 0){
                menor = j;
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



// ... código existente ...

tabelaCorpo.addEventListener('click', (e) => {
    const botao = e.target.closest('.btn-icone, .btn-secundario');
    if (!botao) return;

    const linha = botao.closest('tr');
    const id_funcionario = linha.children[0].textContent;
    const acao = botao.getAttribute('title');

    // NOVO: Adicionar ação para "Ver mais"
    if (acao === 'Ver mais' || botao.classList.contains('btn-secundario')) {
        // Redirecionar para página de visualização do perfil
        window.location.href = `perfil-funcionario-view.html?id=${id_funcionario}`;
        return;
    }

    if (acao === 'Editar') {
        linhaEditando = linha;
        nomeInput.value = linha.children[1].textContent;
        emailInput.value = linha.children[3].textContent; // Corrigido: era [2], mas deve ser [3] por causa da foto
 
        if (linha.children[4].textContent == "Técnico Supervisor") {
            cargoInput.value = "TecnicoSupervisor";
        } else if (linha.children[4].textContent == "Técnico") {
            cargoInput.value = "Tecnico";
        } else {
            cargoInput.value = "Analista";
        }

        senhaInput.value = linha.children[5].textContent;
        telefoneInput.value = linha.children[5].textContent;

        statusInput.value = linha.children[6].textContent.trim().toLowerCase();
        abrirModal('editar');
    } else if (acao === 'Excluir') {
        if (confirm("Deseja realmente excluir este funcionário?")) {
            fetch(`/funcionario/deletar/${id_funcionario}`, { method: "DELETE" })
                .then(res => {
                    if (res.ok) {
                        linha.remove();
                        alert("Funcionário excluído!");
                    } else {
                        alert("Erro ao excluir funcionário");
                    }
                })
                .catch(erro => {
                    console.error("Erro ao excluir:", erro);
                    alert("Erro ao excluir funcionário");
                });
        }
    }
});


form.addEventListener('submit', (ev) => {
    ev.preventDefault();

        var cargoB = null
        var statusB = null
    if(cargoInput.value == "Analista"){
         cargoB = 1
    }else if(cargoInput.value == "TecnicoSupervisor"){
        cargoB = 2
    }else if(cargoInput.value == "Tecnico"){
         cargoB = 3
    }

    if(statusInput.value == "ativo"){
         statusB = 1
    }else{
         statusB = 0
    }

    const funcionario = new FormData();
    funcionario.append("nome", nomeInput.value.trim());
    funcionario.append("email", emailInput.value.trim());
    funcionario.append("senha", senhaInput.value.trim());
    funcionario.append("cargo", cargoB);
    funcionario.append("telefone", telefoneInput.value.trim());
    funcionario.append("foto", fotoInput.files[0]);
    funcionario.append("status", statusB);

    if (linhaEditando) {
        const id_funcionario = linhaEditando.children[0].textContent;
     console.log(linhaEditando.children[0].textContent)

        fetch(`/funcionario/atualizar/${id_funcionario}`, {
            method: "PUT",
            body: funcionario
        })
            .then(res => {
                if (res.ok) {
                    alert("Funcionário atualizado com sucesso!");
                    atualizarTabela();
                } else {
                    alert("Erro ao atualizar funcionário");
                }
            })
            .catch(erro => {
                console.error("Erro ao atualizar:", erro);
                alert("Erro ao atualizar funcionário");
            });
    } else {

        // Envia FormData para permitir upload da foto
        fetch("/funcionario/cadastrar/" + fk_empresa, {
            method: "POST",
            body: funcionario
        })
            .then(res => {
                if (res.ok) {
                    alert("Funcionário cadastrado com sucesso!");
                    atualizarTabela();
                } else {
                    alert("Erro ao cadastrar funcionário");
                }
            })
            .catch(erro => {
                console.error("Erro ao cadastrar:", erro);
                alert("Erro ao cadastrar funcionário");
            });
    }

    fecharModal();
});