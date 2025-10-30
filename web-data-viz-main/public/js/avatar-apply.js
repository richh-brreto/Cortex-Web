document.addEventListener('DOMContentLoaded', () => {
    try {
        const avatarUrl = sessionStorage.USER_AVATAR || (sessionStorage.FOTO ? `/assets/imgs/${sessionStorage.FOTO}` : '/assets/icon/sem-foto.png');
        const userName = sessionStorage.NOME_USUARIO || '';

        // Update all avatar images
        document.querySelectorAll('img.avatar-usuario, img#avatar-user, img#foto').forEach(img => {
            if (img) img.src = avatarUrl;
        });

        // Update all username display elements
        document.querySelectorAll('.texto-usuario, #nome, #texto-usuario, .texto-usuario').forEach(el => {
            if (el) el.textContent = userName;
        });
    } catch (e) {
        console.error('Erro ao aplicar avatar:', e);
    }
});