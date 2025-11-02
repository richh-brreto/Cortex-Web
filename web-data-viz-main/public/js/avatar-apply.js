document.addEventListener('DOMContentLoaded', () => {
    try {
        const defaultAvatar = '../assets/icon/sem-foto.png';
        const avatarUrl = sessionStorage.USER_AVATAR || (sessionStorage.FOTO ? `/assets/imgs/${sessionStorage.FOTO}` : defaultAvatar);
        const userName = sessionStorage.NOME_USUARIO || '';

        document.querySelectorAll('img.avatar-usuario, img#avatar-user, img#foto, .nav-avatar img').forEach(img => {
            if (!img) return;
            try {
                img.src = avatarUrl;
                img.onerror = function () {
                    if (this.src && !this.__fellback) {
                        this.__fellback = true;
                        this.src = defaultAvatar;
                    }
                };
            } catch (inner) {
                console.warn('Erro ao aplicar src no elemento de avatar:', inner, img);
            }
        });

        document.querySelectorAll('.texto-usuario, #nome, #texto-usuario, .usuario-nome').forEach(el => {
            if (!el) return;
            try { el.textContent = userName; } catch (inner) { console.warn('Erro ao setar nome do usuário:', inner, el); }
        });

        // debug
        // console.debug('avatar-apply: applied', { avatarUrl, userName, keys: Object.keys(sessionStorage || {}) });
    } catch (e) {
        console.error('Erro ao aplicar avatar:', e);
    }
});