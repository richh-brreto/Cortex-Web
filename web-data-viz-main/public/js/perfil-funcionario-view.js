document.addEventListener('DOMContentLoaded', () => {
    // Verificar se usuário logado tem permissão (Analista)
    const usuarioLogado = sessionStorage.ID_USUARIO;
    
    if (!usuarioLogado) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = '../login.html';
        return;
    }

    // Pegar ID do funcionário da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idFuncionario = urlParams.get('id');

    if (!idFuncionario) {
        alert('ID do funcionário não encontrado.');
        window.history.back();
        return;
    }

    // Carregar dados do funcionário
    carregarDadosFuncionario(idFuncionario);

    // Atualizar navbar com dados do usuário logado
    atualizarNavbar();
});

// Função para atualizar dados da navbar
function atualizarNavbar() {
    const textoUsuario = document.querySelector('.texto-usuario');
    const avatarUsuario = document.querySelector('.avatar-usuario');
    
    const nomeUsuario = sessionStorage.NOME_USUARIO;
    const avatarUrl = sessionStorage.USER_AVATAR || '/assets/icon/sem-foto.png';

    if (textoUsuario && nomeUsuario) {
        textoUsuario.textContent = nomeUsuario;
    }
    
    if (avatarUsuario) {
        avatarUsuario.src = avatarUrl;
    }
}

// Função para carregar dados do funcionário
function carregarDadosFuncionario(idFuncionario) {
    fetch(`/funcionario/buscar/${idFuncionario}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do funcionário');
            }
            return response.json();
        })
        .then(funcionario => {
            console.log("Dados do funcionário carregados:", funcionario);
            exibirDadosFuncionario(funcionario);
        })
        .catch(erro => {
            console.error('Erro ao carregar dados:', erro);
            alert('Erro ao carregar dados do funcionário.');
            window.history.back();
        });
}

// Função para exibir dados do funcionário
function exibirDadosFuncionario(funcionario) {
    const perfilInfo = document.getElementById('perfil-info-funcionario');
    const fotoPerfil = document.getElementById('foto-perfil-funcionario');

    // Determinar status
    const statusUsuario = funcionario.ativo == 1 ? 'Ativo' : 'Inativo';
    const corStatus = funcionario.ativo == 1 ? '#4caf50' : '#f44336';
    
    // Formatar telefone ou mostrar "Não informado"
    const telefoneFormatado = funcionario.telefone || 'Não informado';

    if (perfilInfo) {
        perfilInfo.innerHTML = `
            <p><strong>ID:</strong> ${funcionario.id}</p>
            <p><strong>Nome:</strong> ${funcionario.nome || ''}</p>
            <p><strong>Cargo:</strong> ${funcionario.cargo || 'Não definido'}</p>
            <p><strong>Telefone:</strong> ${telefoneFormatado}</p>
            <p><strong>Email:</strong> ${funcionario.email || ''}</p>
            <p><strong>Status:</strong> <span style="color: ${corStatus}; font-weight: bold;">${statusUsuario}</span></p>
        `;
    }

    // Atualizar foto do perfil
    if (fotoPerfil) {
        const imgSrc = funcionario.foto ? `/assets/imgs/${funcionario.foto}` : '/assets/icon/sem-foto.png';
        fotoPerfil.src = imgSrc;
    }

    // Atualizar título da página
    document.title = `${funcionario.nome} - Perfil | Cortex`;
}

// Função para redirecionar para edição
function editarFuncionario(idFuncionario) {
    // Salvar ID do funcionário para edição
    sessionStorage.setItem('FUNCIONARIO_EDITAR_ID', idFuncionario);
    // Redirecionar para página de gerenciamento com modo de edição
    window.location.href = `gerenciamento_de_funcionario-analista.html?editar=${idFuncionario}`;
}