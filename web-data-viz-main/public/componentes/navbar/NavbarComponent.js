const DADOS_ADMIN = [
    { type: 'logo', imgSrc: 'assets/icon/menu-aberto.png', text: 'Cortex' },
    { type: 'item', imgSrc: 'assets/icon/graficos.png', text: 'Zona de disponibilidade', id: 'dash-zona' },
    { type: 'item', imgSrc: 'assets/icon/alerta.png', text: 'Alertas', id: 'alerta' },
    { type: 'item', imgSrc: 'assets/icon/icons8-curso-atribuir-80.png', text: 'Atribuições', id: 'atribuicao' },
    { type: 'item', imgSrc: 'assets/icon/gestor-de-projeto.png', text: 'Gerenciamento', id: 'gerenciamento' },
    {
        type: 'submenu',
        imgSrc: 'assets/icon/modelo.png', text: 'Modelo', id: 'modelo',
        items: [ { text: 'Opção 1', active: true }, { text: 'Opção 2' }, { text: 'Opção 3' } ]
    },
    { type: 'divider' },
    { type: 'notification', imgSrc: 'assets/icon/sino.png', text: 'Notificações', id: 'sino' },
    { type: 'user' },
    { type: 'divider' },
    { type: 'logout', imgSrc: 'assets/icon/sair (1).png', text: 'Sair', id: 'sair-imagem' }
];

const DADOS_USER = [
    { type: 'logo', imgSrc: 'assets/icon/menu-aberto.png', text: 'Cortex' },
    { type: 'item', imgSrc: 'assets/icon/graficos.png', text: 'Zona de disponibilidade', id: 'dash-zona' },
    {
        type: 'submenu',
        imgSrc: 'assets/icon/modelo.png', text: 'Modelo', id: 'modelo',
        items: [ { text: 'Opção 1', active: true }, { text: 'Opção 2' }, { text: 'Opção 3' } ]
    },
    { type: 'item', imgSrc: 'assets/icon/alerta.png', text: 'Alertas', id: 'alerta' },
    { type: 'item', imgSrc: 'assets/icon/icons8-curso-atribuir-80.png', text: 'Atribuições', id: 'atribuicao' },
    {
        type: 'submenu',
        imgSrc: 'assets/icon/modelo.png', text: 'Modelo', id: 'modelo',
        items: [ { text: 'Opção 1', active: true }, { text: 'Opção 2' }, { text: 'Opção 3' } ]
    },
    { type: 'divider' },
    { type: 'notification', imgSrc: 'assets/icon/sino.png', text: 'Notificações', id: 'sino' },
    { type: 'user' },
    { type: 'divider' },
    { type: 'logout', imgSrc: 'assets/icon/sair (1).png', text: 'Sair', id: 'sair-imagem' }
];

class NavbarComponent extends HTMLElement {

    static get observedAttributes() {
        return ['user-name', 'user-avatar', 'role'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    attributeChangedCallback() {
        this.render();
    }

    _getNavDataByRole(role) {
        if (role === 'admin') return DADOS_ADMIN;
        return DADOS_USER;
    }

    _createElement(tag, attributes = {}) {
        const element = document.createElement(tag);
        for (const key in attributes) {
            if (key === 'textContent') {
                element.textContent = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        }
        return element;
    }

    render() {
        const userRole = this.getAttribute('role') || 'user';
        const userName = this.getAttribute('user-name') || 'Visitante';
        const userAvatar = this.getAttribute('user-avatar') || 'assets/icon/default-avatar.png';
        const navItemsData = this._getNavDataByRole(userRole);

        const navElement = this._createElement('nav', { class: 'barra-lateral' });

        navItemsData.forEach(item => {
            let el;
            switch (item.type) {
                case 'logo':
                    el = this._createElement('a', { class: 'item-logo' });
                    el.append(
                        this._createElement('img', { src: item.imgSrc, alt: `Logo ${item.text}`, class: 'logotipo' }),
                        this._createElement('span', { class: 'texto-logo', textContent: item.text })
                    );
                    break;

                case 'item':
                    el = this._createElement('a', { class: 'item-navegacao' });
                    el.append(
                        this._createElement('img', { src: item.imgSrc, id: item.id || '', alt: '' }),
                        this._createElement('span', { class: 'texto', textContent: item.text })
                    );
                    break;

                case 'submenu':
                    el = this._createElement('div', { class: 'item-com-submenu' });
                    const link = this._createElement('a', { class: 'item-navegacao' });
                    const textSpan = this._createElement('span', { class: 'texto', textContent: item.text });
                    textSpan.append(this._createElement('span', { class: 'seta-expansao', textContent: '▼' }));
                    
                    link.append(
                        this._createElement('img', { src: item.imgSrc, id: item.id || '', alt: '' }),
                        textSpan
                    );

                    const submenu = this._createElement('div', { class: 'submenu' });
                    item.items.forEach(subItem => {
                        const subItemEl = this._createElement('div', { 
                            class: `submenu-item ${subItem.active ? 'ativo' : ''}`.trim(),
                            textContent: subItem.text
                        });
                        submenu.appendChild(subItemEl);
                    });

                    el.append(link, submenu);
                    break;

                case 'divider':
                    el = this._createElement('div', { class: 'divisor' });
                    break;

                case 'notification':
                case 'logout':
                    el = this._createElement('a', { class: 'item-notificacao' });
                    el.append(
                        this._createElement('img', { src: item.imgSrc, id: item.id || '', alt: '' }),
                        this._createElement('span', { class: 'texto-notificacao', textContent: item.text })
                    );
                    break;
                    
                case 'user':
                    el = this._createElement('a', { class: 'item-usuario' });
                    el.append(
                        this._createElement('img', { src: userAvatar, alt: `Avatar de ${userName}`, class: 'avatar-usuario' }),
                        this._createElement('span', { class: 'texto-usuario', textContent: userName })
                    );
                    break;
            }
            if (el) navElement.appendChild(el);
        });
        
        this.replaceChildren(navElement);
    }

    setupEventListeners() {
        this.addEventListener('click', event => {
            const submenuHeader = event.target.closest('.item-com-submenu > .item-navegacao');
            if (submenuHeader) {
                event.preventDefault();
                const parent = submenuHeader.closest('.item-com-submenu');
                this.querySelectorAll('.item-com-submenu.aberto').forEach(item => {
                    if (item !== parent) item.classList.remove('aberto');
                });
                parent.classList.toggle('aberto');
            }
        });

        this.addEventListener('mouseleave', () => {
            this.querySelectorAll('.item-com-submenu.aberto').forEach(item => {
                item.classList.remove('aberto');
            });
        });
    }
}

customElements.define('custom-navbar', NavbarComponent);