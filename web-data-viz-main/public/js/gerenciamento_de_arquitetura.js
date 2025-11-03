//  verifica o limite da zona antes de cadastrar
async function verificarLimiteZona(idZona) {
    try {
        const response = await fetch(`/arquiteturas/checarLimite/${idZona}`);
        const data = await response.json();
        
        if (response.ok) {
            return data.quantidade_atual < data.limite_maximo;
        } else {
            console.error("Erro ao verificar limite da zona:", data.message);
            return false;
        }
    } catch (error) {
        console.error("Erro ao verificar limite da zona:", error);
        return false;
    }
}

// sobrescreve o evento de submit do formulário
document.getElementById("form-arquitetura").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const zonaSelect = document.getElementById("zona-modelo");
    const idZona = zonaSelect.value;
    
    if (!idZona) {
        alert("Por favor, selecione uma zona de disponibilidade.");
        return;
    }

    const temEspaco = await verificarLimiteZona(idZona);
    
    if (!temEspaco) {
        alert("Não é possível adicionar mais arquiteturas nesta zona. O limite máximo foi atingido.");
        return;
    }

    // se tiver espaço só continua
    this.submit();
});