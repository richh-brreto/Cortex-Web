// 1. Pega a barra lateral
const barra = document.querySelector('.barra-lateral');

// 2. Abre/fecha o submenu quando clica
function toggleSubmenu(event, element) {
    event.preventDefault();
    const submenu = element.closest('.item-com-submenu');
    
    // Fecha todos os outros
    document.querySelectorAll('.item-com-submenu').forEach(item => {
        if (item !== submenu) {
            item.classList.remove('aberto');
        }
    });
    
    // Abre/fecha o clicado
    submenu.classList.toggle('aberto');
}

// 3. Fecha tudo quando o mouse sai da barra
barra.addEventListener('mouseleave', () => {
    document.querySelectorAll('.item-com-submenu').forEach(item => {
        item.classList.remove('aberto');
    });
});

// 4. Marca qual item do submenu foi clicado
document.querySelectorAll('.submenu-item').forEach(item => {
    item.addEventListener('click', () => {
        // Remove ativo de todos
        document.querySelectorAll('.submenu-item').forEach(i => {
            i.classList.remove('ativo');
        });
        // Adiciona no clicado
        item.classList.add('ativo');
    });
});