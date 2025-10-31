document.addEventListener('DOMContentLoaded', () => {
    // Verificar se usuário está logado
    const idUsuario = sessionStorage.ID_USUARIO;
    const nomeUsuario = sessionStorage.NOME_USUARIO;

    if (!idUsuario) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = '../login.html';
        return;
    }

    // Atualizar nome na navbar
    const textoUsuario = document.querySelector('.texto-usuario');
    if (textoUsuario && nomeUsuario) {
        textoUsuario.textContent = nomeUsuario;
    }

    // Carregar dados completos do usuário
    carregarDadosUsuario(idUsuario);

    // Configurar modal de alteração de senha
    configurarModalSenha();
});

// Função para carregar dados do usuário
function carregarDadosUsuario(idUsuario) {
    fetch(`/funcionario/buscar/${idUsuario}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do usuário');
            }
            return response.json();
        })
        .then(usuario => {
            console.log("Dados do usuário carregados:", usuario);
            preencherDadosPerfil(usuario);
            atualizarAvatares(usuario);
        })
        .catch(erro => {
            console.error('Erro ao carregar dados:', erro);
            alert('Erro ao carregar dados do usuário. Por favor, tente novamente.');
        });
}

// Função para preencher dados no perfil
function preencherDadosPerfil(usuario) {
    const perfilInfo = document.querySelector('.perfil-info');
    const fotoPerfil = document.querySelector('.perfil-foto img');

    // Determinar status
    const statusUsuario = usuario.ativo == 1 ? 'Ativo' : 'Inativo';
    
    // Formatar telefone ou mostrar "Não informado"
    const telefoneFormatado = usuario.telefone || 'Não informado';

    if (perfilInfo) {
        perfilInfo.innerHTML = `
            <p><strong>Nome:</strong> ${usuario.nome || ''}</p>
            <p><strong>Cargo:</strong> ${usuario.cargo || 'Não definido'}</p>
            <p><strong>Telefone:</strong> ${telefoneFormatado}</p>
            <p><strong>Tipo de usuário:</strong> ${statusUsuario}</p>
            <p><strong>Email:</strong> ${usuario.email || ''}</p>
            <div class="campo-senha">
                <p><strong>Senha:</strong> <span id="senha-texto">•••••••••</span></p>
                <button class="mostrar-senha" title="Mostrar senha" onclick="toggleSenha()">
                    <img src="../assets/icon/eye-password.svg" alt="Mostrar senha" class="mostrar-senha-img" />
                </button>
            </div>

            <button class="button-cadastro-secondary botao-mudar-senha">Mudar Senha</button>
        `;

        // Armazenar senha para toggle
        window.senhaUsuario = usuario.senha;

        // Reconfigurar eventos após inserir HTML
        configurarModalSenha();
    }

    // Atualizar foto do perfil
    if (fotoPerfil) {
        const imgSrc = usuario.foto ? `/assets/imgs/${usuario.foto}` : '/assets/icon/sem-foto.png';
        fotoPerfil.src = imgSrc;
    }
}

// Função para mostrar/ocultar senha
let senhaVisivel = false;
function toggleSenha() {
    const senhaTexto = document.getElementById('senha-texto');
    const btnMostrar = document.querySelector('.mostrar-senha img');
    
    senhaVisivel = !senhaVisivel;
    
    if (senhaVisivel) {
        senhaTexto.textContent = window.senhaUsuario;
        if (btnMostrar) {
            btnMostrar.style.opacity = '0.7';
        }
    } else {
        senhaTexto.textContent = '•••••••••';
        if (btnMostrar) {
            btnMostrar.style.opacity = '1';
        }
    }
}

// Função para atualizar todos os avatares na página
function atualizarAvatares(usuario) {
    const imgSrc = usuario.foto ? `/assets/imgs/${usuario.foto}` : '/assets/icon/sem-foto.png';
    
    // Atualizar todos os avatares na página
    const avatares = document.querySelectorAll('img.avatar-usuario, .perfil-foto img');
    
    avatares.forEach(avatar => {
        try {
            avatar.src = imgSrc;
        } catch (erro) {
            console.error('Erro ao atualizar avatar:', erro);
        }
    });

    // Salvar no sessionStorage
    try {
        sessionStorage.USER_AVATAR = imgSrc;
    } catch (erro) {
        console.error('Erro ao salvar avatar no sessionStorage:', erro);
    }
}

// Função para configurar modal de senha
function configurarModalSenha() {
    const modal = document.getElementById('modal-senha');
    const btnMudarSenha = document.querySelector('.botao-mudar-senha');
    const btnCancelar = document.getElementById('btn-cancel-senha');
    const btnSalvar = document.getElementById('btn-salvar-senha');

    // Abrir modal
    if (btnMudarSenha) {
        btnMudarSenha.onclick = () => {
            if (!sessionStorage.ID_USUARIO) {
                window.location.href = '../login.html';
                return;
            }
            mostrarModal(true);
        };
    }

    // Cancelar
    if (btnCancelar) {
        btnCancelar.onclick = () => {
            mostrarModal(false);
            limparCamposSenha();
        };
    }

    // Salvar nova senha
    if (btnSalvar) {
        btnSalvar.onclick = () => {
            alterarSenha();
        };
    }
}

// Função para mostrar/ocultar modal
function mostrarModal(exibir) {
    const modal = document.getElementById('modal-senha');
    if (modal) {
        modal.style.display = exibir ? 'flex' : 'none';
    }
}

// Função para limpar campos do modal
function limparCamposSenha() {
    const senhaAtual = document.getElementById('senha-atual');
    const senhaNova = document.getElementById('senha-nova');
    const senhaConfirm = document.getElementById('senha-nova-confirm');
    const mensagem = document.getElementById('mensagem-senha');

    if (senhaAtual) senhaAtual.value = '';
    if (senhaNova) senhaNova.value = '';
    if (senhaConfirm) senhaConfirm.value = '';
    if (mensagem) {
        mensagem.style.display = 'none';
        mensagem.textContent = '';
    }
}

// Função para alterar senha
async function alterarSenha() {
    const senhaAtual = document.getElementById('senha-atual').value.trim();
    const senhaNova = document.getElementById('senha-nova').value.trim();
    const senhaConfirm = document.getElementById('senha-nova-confirm').value.trim();
    const mensagem = document.getElementById('mensagem-senha');

    // Validações
    if (!senhaAtual || !senhaNova || !senhaConfirm) {
        exibirMensagemErro('Preencha todos os campos', mensagem);
        return;
    }

    if (senhaAtual !== window.senhaUsuario) {
        exibirMensagemErro('Senha atual incorreta', mensagem);
        return;
    }

    if (senhaNova !== senhaConfirm) {
        exibirMensagemErro('As senhas não coincidem', mensagem);
        return;
    }

    if (senhaNova.length < 6) {
        exibirMensagemErro('A nova senha deve ter no mínimo 6 caracteres', mensagem);
        return;
    }

    try {
        const response = await fetch('/funcionario/alterarSenha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idUsuario: sessionStorage.ID_USUARIO,
                senhaAtual: senhaAtual,
                senhaNova: senhaNova
            })
        });

        const data = await response.json();

        if (data.erro) {
            exibirMensagemErro(data.message, mensagem);
        } else {
            alert(data.message || 'Senha alterada com sucesso!');
            window.senhaUsuario = senhaNova;
            mostrarModal(false);
            limparCamposSenha();
        }
    } catch (erro) {
        console.error('Erro ao alterar senha:', erro);
        exibirMensagemErro('Erro ao alterar senha. Tente novamente.', mensagem);
    }
}

// Função para exibir mensagem de erro
function exibirMensagemErro(texto, elementoMensagem) {
    if (elementoMensagem) {
        elementoMensagem.textContent = texto;
        elementoMensagem.style.display = 'block';
        elementoMensagem.style.color = 'red';
    }
}