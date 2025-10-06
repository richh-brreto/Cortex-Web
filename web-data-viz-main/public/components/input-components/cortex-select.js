class SelectCortex extends HTMLElement {
    constructor() {
        super();
        // A referência agora é para o elemento select
        this.selectElement = null;

        // configurações default
        this.configPadrao = {
            label: '',
            id: '',
            options: [] // Um array de objetos { value: '', text: '' }
        };
    }

    connectedCallback() {
        this.render();
    }

    get value() {
        // A lógica do getter é a mesma, só muda a referência
        return this.selectElement ? this.selectElement.value : '';
    }

    render() {
        // A lógica de carregar e mesclar a configuração é IDÊNTICA. Nenhuma mudança aqui.
        let config = this.configPadrao;
        try {
            const configString = this.getAttribute('config-data');
            if (configString) {
                const providedConfig = JSON.parse(configString);
                config = { ...this.configPadrao, ...providedConfig };
            }
        } catch (e) {
            console.error("Erro no JSON em config-data para o select:", e);
        }

        this.innerHTML = '';
        const container = document.createElement('div');
        container.className = 'container-select'; // Classe diferente para estilização

        const label = document.createElement('label');
        label.classList.add('select-label');

        // --- MUDANÇA PRINCIPAL: Criamos um <select> em vez de <input> ---
        this.selectElement = document.createElement('select');
        this.selectElement.classList.add('select-cortex');

        const labelText = config.label;
        const selectId = config.id;
        
        label.textContent = labelText;
        if (selectId) {
            label.setAttribute('for', selectId);
        }

        // Aplica atributos como 'id', 'required', 'disabled' ao <select>
        for (const key in config) {
            if (Object.hasOwnProperty.call(config, key)) {
                // Pulamos 'label' e 'options', pois não são atributos diretos do select
                if (key !== 'label' && key !== 'options') {
                    this.selectElement.setAttribute(key, config[key]);
                }
            }
        }

        // - Criar e adicionar os <option> ---
        if (config.options && Array.isArray(config.options)) {
            config.options.forEach(optionData => {
                const option = document.createElement('option');
                option.value = optionData.value;
                option.textContent = optionData.text;
                // Adicionamos cada <option> dentro do <select>
                this.selectElement.appendChild(option);
            });
        }
        
        if (labelText) {
            container.appendChild(label);
        }
        container.appendChild(this.selectElement);
        this.appendChild(container);
    }
}

customElements.define('select-cortex', SelectCortex);