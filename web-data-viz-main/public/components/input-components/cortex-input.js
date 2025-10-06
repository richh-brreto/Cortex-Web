class inputCortex extends HTMLElement {
    constructor() {
        super();
        this.input = null;
        // Definindo as configurações padrão
        this.configPadrao = {
            label: '', // É melhor começar com um label vazio como padrão
            type: 'text',
            placeholder: '',
            id: ''
        };
    }

    connectedCallback() {
        this.render();
    }

    get value() {
        return this.input ? this.input.value : '';
    }

    render() {
        // --- PARTE 1: CARREGAR A CONFIGURAÇÃO CORRETAMENTE ---
        let config = this.configPadrao; // Começa com o padrão
        try {
            const configString = this.getAttribute('config-data');
            if (configString) {
                const providedConfig = JSON.parse(configString);
                // AQUI ESTÁ A LÓGICA DE MESCLAGEM CORRETA:
                // O que for passado no 'providedConfig' sobrescreve o padrão.
                config = { ...this.configPadrao, ...providedConfig };
            }
        } catch (e) {
            console.error("Erro no JSON em config-data:", e);
            // Se der erro, 'config' continua sendo o padrão.
        }

        // --- PARTE 2: CONSTRUIR OS ELEMENTOS ---
        this.innerHTML = ''; // Limpa o componente
        const container = document.createElement('div');
        container.className = 'container-input';

        const label = document.createElement('label');
        label.classList.add('input-label');

        this.input = document.createElement('input');
        this.input.classList.add('input-cortex');

        // --- PARTE 3: USAR A CONFIGURAÇÃO PARA MONTAR ---

        // Extrai os valores do objeto 'config' final
        const labelText = config.label;
        const inputId = config.id;

        // Configura o label
        label.textContent = labelText;
        if (inputId) {
            label.setAttribute('for', inputId);
        }

        // Aplica TODAS as propriedades do objeto 'config' ao input
        for (const key in config) {
            if (Object.hasOwnProperty.call(config, key)) {
                // A propriedade 'label' não é um atributo de input, então pulamos
                if (key !== 'label') {
                    this.input.setAttribute(key, config[key]);
                }
            }
        }

        // --- PARTE 4: ADICIONAR OS ELEMENTOS NA TELA ---
        if (labelText) {
            container.appendChild(label);
        }
        container.appendChild(this.input);
        this.appendChild(container);
    }
}

customElements.define('input-cortex', inputCortex);