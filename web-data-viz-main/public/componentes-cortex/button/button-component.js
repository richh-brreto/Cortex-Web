class Button extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const css = document.createElement('link');
        css.setAttribute('rel', 'stylesheet');
        css.setAttribute('href', './button.css');
        this.shadowRoot.appendChild(css);

        const buttonDiv = document.createElement('div');
        buttonDiv.innerHTML = '<slot></slot>';

        this.shadowRoot.appendChild(buttonDiv);
        this._buttonDiv = buttonDiv;
    }

    connectedCallback() {
        this._buttonDiv.classList.add('button');
        const variant = this.getAttribute('variant') || 'primary';

        switch (variant) {
            case 'secondary':
                this._buttonDiv.classList.add('button-cadastro-secondary');
                break;
            case 'atribuir': 
                this._buttonDiv.classList.add('button-atribuir');
                break;
            case 'primary':
            default:
                this._buttonDiv.classList.add('button-cadastro-primary');
                break;
        }
    }
}

customElements.define('button-component', Button);