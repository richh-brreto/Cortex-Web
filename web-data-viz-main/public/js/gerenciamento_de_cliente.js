document.addEventListener('DOMContentLoaded', () => {
    // Elementos da página
    const pesquisa = document.getElementById('pesquisar-input'); // campo de texto
    const filtro = document.getElementById('filtro-select');     // select (valores: 'todos' ou 1..5)
    const corpo = document.getElementById('tabela-clientes-corpo');
    const info = document.getElementById('info-itens');         // área que mostra número de resultados

    if (!corpo) return; // sem tabela, nada a fazer

    // Função principal: mostra/oculta linhas baseado no termo e coluna selecionada
    function filtrar() {
        const termo = (pesquisa ? pesquisa.value : '').toLowerCase().trim();
        const coluna = filtro ? filtro.value : 'todos';

        const linhas = Array.from(corpo.querySelectorAll('tr'));
        let mostrados = 0;

        linhas.forEach(linha => {
            const celulas = Array.from(linha.children);
            let mostrar = false;

            if (!termo) {
                // sem termo: mostra tudo (ou mantém a estrutura caso queira filtrar por coluna no futuro)
                mostrar = coluna === 'todos' ? true : !!celulas[parseInt(coluna, 10) - 1];
            } else {
                if (coluna === 'todos') {
                    // procura em todas as células da linha
                    mostrar = celulas.some(c => c.textContent.toLowerCase().includes(termo));
                } else {
                    // procura apenas na coluna selecionada
                    const idx = parseInt(coluna, 10) - 1; // select usa 1..5 -> convert para 0..4
                    const c = celulas[idx];
                    mostrar = c ? c.textContent.toLowerCase().includes(termo) : false;
                }
            }

            linha.style.display = mostrar ? '' : 'none';
            if (mostrar) mostrados++;
        });

        // atualiza o contador de resultados
        if (info) {
            const total = linhas.length;
            info.textContent = mostrados === 0 ? 'Nenhum registro encontrado' : `Exibindo ${mostrados} de ${total} registros`;
        }
    }

    // liga eventos de filtro
    if (pesquisa) pesquisa.addEventListener('input', filtrar);
    if (filtro) filtro.addEventListener('change', filtrar);

    // --- Modal / formulário: abre e fecha ---
    const btnAdicionar = document.getElementById('btn-adicionar');
    const overlay = document.getElementById('sobreposicao-formulario');
    const btnFechar = document.getElementById('btn-fechar-modal');
    const btnCancelar = document.getElementById('btn-cancelar');

    function abrirModal() {
        if (!overlay) return;
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function fecharModal() {
        if (!overlay) return;
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    if (btnAdicionar) btnAdicionar.addEventListener('click', abrirModal);
    if (btnFechar) btnFechar.addEventListener('click', fecharModal);
    if (btnCancelar) btnCancelar.addEventListener('click', fecharModal);
    if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) fecharModal(); });

    // filtra ao carregar para garantir estado consistente
    filtrar();
});
