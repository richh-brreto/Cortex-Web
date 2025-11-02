// funções pra validar
function validarCampoVazio(valor, nomeCampo) {
    if (!valor || valor.trim() === '') {
        return `O campo ${nomeCampo} é obrigatório`;
    }
    return null;
}

function validarNumero(valor, nomeCampo) {
    if (!valor || valor <= 0) {
        return `O campo ${nomeCampo} deve ser maior que zero`;
    }
    return null;
}

function validarSelect(valor, nomeCampo) {
    if (!valor || valor === '0' || valor === '') {
        return `Selecione um(a) ${nomeCampo}`;
    }
    return null;
}

// função pra mostrar erro
function mostrarErro(input, mensagem) {
    const span = document.createElement('span');
    span.className = 'mensagem-erro';
    span.textContent = mensagem;
    
    // exclui mensagem de erro anterior (se existir)
    const erroAnterior = input.parentElement.querySelector('.mensagem-erro');
    if (erroAnterior) {
        erroAnterior.remove();
    }
    
    if (mensagem) {
        input.classList.add('invalido');
        input.parentElement.appendChild(span);
    } else {
        input.classList.remove('invalido');
    }
}

// função pra validar formulário
function validarFormulario(campos) {
    let erros = [];

    campos.forEach(campo => {
        const input = document.getElementById(campo.id);
        let erro = null;

        switch (campo.tipo) {
            case 'texto':
                erro = validarCampoVazio(input.value, campo.nome);
                break;
            case 'numero':
                erro = validarNumero(input.value, campo.nome);
                break;
            case 'select':
                erro = validarSelect(input.value, campo.nome);
                break;
        }

        if (erro) {
            erros.push(erro);
            mostrarErro(input, erro);
        } else {
            mostrarErro(input, null);
        }
    });

    return erros;
}

// outras funções reutilizáveis (pegando um padrão pra cada tipo)
function validarEmail(email) {
    if (!email || email.trim() === '') return false;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validarCNPJ(cnpj) {
    if (!cnpj || cnpj.trim() === '') return false;
    const apenasDigitos = cnpj.replace(/[^\d]/g, '');
    return apenasDigitos.length === 14;
}

function validarTelefone(telefone) {
    if (!telefone || telefone.trim() === '') return false;
    const apenasDigitos = telefone.replace(/[^\d]/g, '');
    return apenasDigitos.length >= 10 && apenasDigitos.length <= 11;
}

// valida IPv4: retorna true se formato correto e octetos 0-255
function validarIPv4(ip) {
    if (!ip || ip.trim() === '') return false;
    const re = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!re.test(ip)) return false;
    return ip.split('.').every(function (part) {
        const n = Number(part);
        return !Number.isNaN(n) && n >= 0 && n <= 255;
    });
}

// aplica filtro ao campo de IP (remove caracteres que não são dígitos ou ponto)
// parametro: id do input (string) ou elemento DOM
function aplicarFiltroIp(campo) {
    try {
        var inputEl = null;
        if (typeof campo === 'string') {
            inputEl = document.getElementById(campo);
        } else if (campo instanceof HTMLElement) {
            inputEl = campo;
        }
        if (!inputEl) return;
        inputEl.addEventListener('input', function () {
            const cleaned = this.value.replace(/[^0-9.]/g, '');
            if (this.value !== cleaned) this.value = cleaned;
        });
    } catch (e) {
        console.error('aplicarFiltroIp erro:', e);
    }
}