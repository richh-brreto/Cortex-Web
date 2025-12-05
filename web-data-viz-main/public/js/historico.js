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
        document.getElementById('selectedCount').textContent = "Componentes"
    } else {
        document.getElementById('selectedCount').textContent = `${valores}`
    }

}

function applySelection() {
    toggleMultiselect();
    updateLineChart();
}


function updateLineChart() {

}

// Fechar dropdown ao clicar fora
document.addEventListener('click', (e) => {
    const container = document.querySelector('.multiselect-container');
    if (!container.contains(e.target)) {
        document.getElementById('multiselectDropdown').classList.remove('active');
    }
});

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



async function carregarMural() {

    const apiUrl = "/mural/historico";


    try {
    

        const response = await fetch(apiUrl);

        if (response.status === 204) {

            return;
        }

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const tickets = await response.json();


        const tabela = document.getElementById("tabela-funcionarios-corpo")

        const total = document.getElementById("total_ticket")

        total.innerHTML = `${tickets.length}`

        for (const ticket of tickets) {
            
                    const campo = ticket.fields
            const identificador = campo.customfield_10093.split(";")
            const idModelo = identificador[0]
            const idZona = identificador[1]
            const idEmpresa = identificador[2]

                fetch(`/mural/bancoHistorico/${idModelo}`)
        .then(res => res.json())
        .then(modelo => {

            const maquinaNome = campo.customfield_10060 ? campo.customfield_10060.value : 'N/A';
            const responsavelNome = campo.assignee ? campo.assignee.displayName : 'Não Atribuído';
            const data = campo.created.split(".")
            const data2 = data[0].split("T")
            const dataReal = data2[0] + "  " + data2[1]

            

            var labels = "";
            for (let i = 0; i < campo.labels.length; i++) {

                    labels += campo.labels[i] + "  ";

               
            }

            
          
                console.log(modelo)
                tabela.innerHTML += `
                            <td>${ticket.key}</td>
                    <td>${dataReal}</td>
                    <td>${modelo[0].nome}</td>
                    <td>${modelo[0].hostname}</td>
                    <td>${campo.status.name}</td>
                    <td>${labels}</td>
                    <td>${campo.customfield_10059.value}</td>
                     <td>${maquinaNome}</td>
                      <td>${responsavelNome}</td>
                    <td>
                        <div class="coluna-acoes">
                            <button class="btn btn-secundario"  onclick="irParaDashboardTicket(${idModelo}, '${ticket.key}')" title="Ver mais">Dashboard Ticket</button>
                        </div>
                    </td>
                    `;
         
        })
        .catch(erro => {
            console.error("Erro ao carregar funcionários:", erro);
            alert("Erro ao carregar funcionários");
        });

            
            }


        } catch (erro) {
            console.error("Erro na requisição ou processamento dos dados:", erro);
            
        }
    }
        // Inicia o carregamento dos dados quando a página é carregada
        document.addEventListener('DOMContentLoaded', carregarMural);


    function irParaJira(key) {
        var link = `https://cortexsptech.atlassian.net/browse/${key}`
        window.open(link, '_blank')
    }

    function irParaDashboardTicket(modelo, key) {
        sessionStorage.setItem('ID_MODELO_SELECIONADO', modelo);
        sessionStorage.setItem('KEY_JIRA_SLECIONADO', key);
        window.location.href = 'dash-chamado.html'
    }


