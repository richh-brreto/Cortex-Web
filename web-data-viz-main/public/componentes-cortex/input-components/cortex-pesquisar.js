class SearchCortex extends HTMLElement {
    constructor() {
        super();
        this.inputElement = null;

        // Padrões específicos para um campo de pesquisa
        this.configPadrao = {
            placeholder: 'Pesquisar...',
            type: 'search', 
            id: ''
        };
    }

    connectedCallback() {
        this.render();
    }

    get value() {
        return this.inputElement ? this.inputElement.value : '';
    }

    render() {
        // A lógica de carregar e mesclar a configuração é IDÊNTICA.
        let config = this.configPadrao;
        try {
            const configString = this.getAttribute('config-data');
            if (configString) {
                const providedConfig = JSON.parse(configString);
                config = { ...this.configPadrao, ...providedConfig };
            }
        } catch (e) {
            console.error("Erro no JSON em config-data para o search:", e);
        }

        this.innerHTML = '';
        
        
        //  container principal que terá posicionamento relativo
        // para que o ícone possa ser posicionado absolutamente dentro dele.
        const container = document.createElement('div');
        container.className = 'pesquisar-container';

        //  ícone de lupa  com SVG.

        const icon = document.createElement('div');
        icon.className = 'pesquisar-icon';
        icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;

        // Criamos o elemento input
        this.inputElement = document.createElement('input');
        this.inputElement.classList.add('pesquisar-cortex');

        // Aplicamos todas as configurações do objeto 'config' ao input
        //Este loop percorre cada chave (o nome da propriedade) do objeto config. Em cada volta do loop, a variável key assume o valor de uma das chaves.
        for (const atributo in config) {
            if (Object.hasOwnProperty.call(config, atributo)) {
                this.inputElement.setAttribute(atributo, config[atributo]);
            }
        }
        
        // ícone e input dentro do container
        container.appendChild(icon);
        container.appendChild(this.inputElement);

        // Adicionando o container completo ao nosso componente
        this.appendChild(container);
    }
}

customElements.define('search-cortex', SearchCortex);