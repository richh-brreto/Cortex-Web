document.addEventListener('DOMContentLoaded', () => {
    const textoUsuario = document.getElementById('texto-usuario');
    const avatarImg = document.getElementById('avatar-user');
    const nome = sessionStorage.NOME_USUARIO || null;
    const avatar = sessionStorage.USER_AVATAR || null;
    if (textoUsuario && nome) textoUsuario.textContent = nome;
    if (avatarImg && avatar) avatarImg.src = avatar;

    const logout = document.getElementById('logout-link');
    if (logout) logout.addEventListener('click', () => { sessionStorage.clear(); window.location.href = './login.html'; });

    // pega dados do usuario
    const id = sessionStorage.ID_USUARIO;
    if (!id) { window.location.href = './login.html'; return; }

    fetch(`/usuario/dados/${id}`)
        .then(res => { if (!res.ok) throw res; return res.json(); })
        .then(usuario => {
            const info = document.querySelector('.perfil-info');
            if (info) {
                info.innerHTML = `
          <p><strong>Nome:</strong> ${usuario.nome || ''}</p>
          <p><strong>Cargo:</strong> ${usuario.cargo || ''}</p>
          <p><strong>CPF:</strong> ${usuario.cpf || '—'}</p>
          <p><strong>Telefone:</strong> ${usuario.telefone || ''}</p>
          <p><strong>Tipo de usuário:</strong> ${usuario.tipo || ''}</p>
          <p><strong>Email:</strong> ${usuario.email || ''}</p>

          <div class="campo-senha">
              <p><strong>Senha:</strong> •••••••••</p>
              <button class="mostrar-senha" title="Mostrar senha">
                  <img src="./assets/icon/eye-password.svg" alt="Mostrar senha" class="mostrar-senha-img" />
              </button>
          </div>

          <button class="button-cadastro-secondary botao-mudar-senha">Mudar Senha</button>
        `;
            }

            // atualiza foto do perfil
            const img = document.querySelector('.perfil-foto img');
            if (img && usuario.avatar) img.src = usuario.avatar;

            // atualiza avatar da navbar e salva em sessionStorage
            const navAvatar = document.getElementById('avatar-user');
            if (navAvatar && usuario.avatar) {
                navAvatar.src = usuario.avatar;
                try { sessionStorage.USER_AVATAR = usuario.avatar; } catch (e) { }
            }
        })
        .catch(err => {
            console.error(err);
            alert('Erro ao carregar dados do usuário. Por favor, tente novamente.');
        });

    const $ = s => document.querySelector(s);
    const modal = $('#modal-senha');
    const show = v => modal.style.display = v ? 'flex' : 'none';

    $('.botao-mudar-senha')?.onclick = () => {
        if (!sessionStorage.ID_USUARIO) return location.href = './login.html';
        show(true);
    };

    $('#btn-cancel-senha')?.onclick = () => show(false);

    $('#btn-salvar-senha')?.onclick = async () => {
        const atual = $('#senha-atual').value.trim();
        const nova = $('#senha-nova').value.trim();
        const conf = $('#senha-nova-confirm').value.trim();

        if (!atual || !nova || nova !== conf)
            return alert('Preencha corretamente os campos.');

        try {
            const res = await fetch('/usuario/alterarSenha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    idUsuario: sessionStorage.ID_USUARIO,
                    senhaAtual: atual,
                    senhaNova: nova
                })
            });
            const data = await res.json();
            alert(data.message || 'Senha alterada!');
            show(false);
        } catch {
            alert('Erro ao alterar senha');
        }
    };

});
