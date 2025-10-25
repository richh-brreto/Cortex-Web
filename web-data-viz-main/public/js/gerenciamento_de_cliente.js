const nomeInput = document.getElementById('nome-cliente');
const cnpjInput = document.getElementById('cnpj-cliente');
const telefoneInput = document.getElementById('telefone-cliente');
const emailInput = document.getElementById('email-cliente');
const descInput = document.getElementById('descricao-cliente');

const tabelaCorpo = document.getElementById('tabela-clientes-corpo');
const form = document.getElementById('form-cliente');

const overlay = document.getElementById('sobreposicao-formulario');
const tituloModal = document.getElementById('modal-title');
const btnAdicionar = document.getElementById('btn-adicionar');
const btnFechar = document.getElementById('btn-fechar-modal');
const btnCancelar = document.getElementById('btn-cancelar');
const header = document.getElementById('header');
const headers = header.querySelectorAll('th') 

let linhaEditando = null;
const fk_empresa = sessionStorage.EMPRESA_USUARIO;

const pesquisaInput = document.getElementById('pesquisar-input');
const filtroSelect = document.getElementById('filtro-select');


// Transformar
function abrirModal(modo = 'novo') {
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';

    if(modo === 'novo'){
        tituloModal.textContent = "Adicionar Cliente"
         form.reset();
    }else{
        tituloModal.textContent = 'Editar Cliente'
    }
}

function fecharModal() {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    linhaEditando = null;
}

const mapaColunas = {
    'todos': 'todos',
    'id': 0,
    'nome': 1,
    'descricao': 2,
    'cnpj': 3,
    'telefone': 4,
    'email' : 5,
    'qtd_modelos': 6
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

window.addEventListener("load", () => {
    if (!fk_empresa) {
        console.error("ID da empresa não encontrado na sessão.");
        alert("Erro ao carregar dados. Por favor, faça o login novamente.");
        return;
    }

    fetch(`/cliente/listar/${fk_empresa}`)
        .then(res => res.json())
        .then(clientes => {
            console.log("Dados recebidos pelo frontend:", clientes);

            tabelaCorpo.innerHTML = "";
            clientes.forEach(c => {
                const tr = document.createElement("tr");
                tr.setAttribute("data-id", c.id_cliente);
                tr.innerHTML = `
                    <td>${c.id_cliente}</td>
                    <td>${c.nome}</td>
                    <td>${c.descricao}</td>
                    <td>${c.cnpj}</td>
                    <td>${c.telefone}</td>
                    <td>${c.email}</td>
                    <td>${c.qtd}</td> 
                    <td>
                        <div class="coluna-acoes">
                            <button class="btn btn-secundario">Ver mais</button>
                            <button class="btn-icone" title="Editar"><span class="material-icons">edit</span></button>
                            <button class="btn-icone" title="Excluir"><span class="material-icons">delete</span></button>
                        </div>
                    </td>
                `;
                tabelaCorpo.appendChild(tr);
            });
            
        })
        .catch(erro => {
            console.error("Erro ao carregar Clientes:", erro);
            alert("Erro ao carregar Clientes");
        });
        
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

                if(indice == 6){
                    if(valorA.localeCompare(valorB)  < 0){
                        menor = j;
                    } 
                }else{
                    if(valorA.localeCompare(valorB)  > 0){
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
    const id_cliente = linha.getAttribute("data-id");
    const acao = botao.getAttribute('title');

    if (acao === 'Editar') {
        linhaEditando = linha;
        nomeInput.value = linha.children[1].textContent;
        descInput.value = linha.children[2].textContent;
        cnpjInput.value = linha.children[3].textContent;
        telefoneInput.value = linha.children[4].textContent;
        emailInput.value = linha.children[5].textContent;
        abrirModal('editar');
    } else if (acao === 'Excluir') {
        if (confirm("Deseja realmente excluir este cliente?")) {
            fetch(`/cliente/deletar/${id_cliente}`, { method: "DELETE" })
                .then(res => {
                    if (res.ok) {
                        linha.remove();
                        alert("Cliente excluído!");
                    } else {
                        alert("Erro ao excluir cliente");
                    }
                });
        }
    }
});

form.addEventListener('submit', (ev) => {
    ev.preventDefault();

    const cliente = {
        nome: nomeInput.value.trim(),
        descricao: descInput.value.trim(),
        cnpj: cnpjInput.value.trim(),
        telefone: telefoneInput.value.trim(),
        email: emailInput.value.trim(),
        fk_empresa: fk_empresa
    };

    if (linhaEditando) {
        const id_cliente = linhaEditando.getAttribute("data-id");

        fetch(`/cliente/atualizar/${id_cliente}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        })
        .then(res => {
            if (res.ok) {
                alert("Cliente atualizado com sucesso!");
                window.location.reload();
            } else {
                alert("Erro ao atualizar cliente");
            }
        });
    } else {
        fetch("/cliente/cadastrar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        })
        .then(res => {
            if (res.ok) {
                alert("Cliente cadastrado com sucesso!");
                window.location.reload();
            } else {
                alert("Erro ao cadastrar cliente");
            }
        });
    }

    fecharModal();
});