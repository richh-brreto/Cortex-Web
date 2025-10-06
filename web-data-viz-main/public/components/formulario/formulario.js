/**
 * ============================================================================
 * COMPONENTE FORMULÁRIO GENÉRICO v2.1.0
 * ============================================================================
 *
 * FUNCIONALIDADES:
 * - Modo popup (padrão) ou inline
 * - Paginação de campos configurável
 * - Scroll configurável
 * - Validação em tempo real
 * - Suporte a diversos tipos de campos
 * - Acessibilidade (ARIA, trap focus)
 *
 * EXEMPLO DE USO:
 * 
 * <!-- Modo Popup -->
 * <formulario-generico titulo="Cadastro" campos='[...]' visivel="true"></formulario-generico>
 * 
 * <!-- Modo Inline -->
 * <formulario-generico modo="inline" titulo="Cadastro" campos='[...]'></formulario-generico>
 * 
 * <!-- Com Paginação -->
 * <formulario-generico 
 *   modo="inline" 
 *   paginacao="true" 
 *   campos-por-pagina="5"
 *   campos='[...]'>
 * </formulario-generico>
 * 
 * <!-- Com Scroll -->
 * <formulario-generico 
 *   modo="inline" 
 *   altura-maxima="500px"
 *   campos='[...]'>
 * </formulario-generico>
 */

const CONFIG_FORM = {
  VALIDACAO: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    TELEFONE_REGEX: /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/,
    CPF_REGEX: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    URL_REGEX: /^https?:\/\/.+/,
  },
  MENSAGENS: {
    CAMPO_OBRIGATORIO: 'Este campo é obrigatório',
    EMAIL_INVALIDO: 'Email inválido',
    TELEFONE_INVALIDO: 'Telefone inválido',
    CPF_INVALIDO: 'CPF inválido',
    URL_INVALIDA: 'URL inválida',
    SENHA_CURTA: 'Senha deve ter no mínimo {min} caracteres',
    VALOR_MIN: 'Valor mínimo: {min}',
    VALOR_MAX: 'Valor máximo: {max}',
    TAMANHO_MIN: 'Mínimo de {min} caracteres',
    TAMANHO_MAX: 'Máximo de {max} caracteres',
  },
};

class GerenciadorEstadoForm {
  #host;

  constructor(host) {
    this.#host = host;
  }

  obter(nome, padrao = '') {
    const valor = this.#host.getAttribute(nome);
    return valor == null || valor === '' ? padrao : valor;
  }

  obterBooleano(nome, padrao = false) {
    const valor = this.#host.getAttribute(nome);
    if (valor === null) return padrao;
    return valor !== 'false';
  }

  obterJSON(nome, padrao = null) {
    const valor = this.#host.getAttribute(nome);
    if (!valor) return padrao;
    try {
      return JSON.parse(valor);
    } catch (erro) {
      console.warn(`Erro ao parsear JSON "${nome}":`, erro);
      return padrao;
    }
  }

  definir(nome, valor) {
    this.#host.setAttribute(nome, valor);
  }
}

class GerenciadorValidacao {
  validarCampo(valor, campo) {
    if (campo.obrigatorio && (!valor || String(valor).trim() === '')) {
      return { valido: false, mensagem: CONFIG_FORM.MENSAGENS.CAMPO_OBRIGATORIO };
    }

    if (!valor || String(valor).trim() === '') {
      return { valido: true, mensagem: '' };
    }

    switch (campo.tipo) {
      case 'email':
        return this.#validarEmail(valor);
      case 'tel':
      case 'telefone':
        return this.#validarTelefone(valor);
      case 'cpf':
        return this.#validarCPF(valor);
      case 'url':
        return this.#validarURL(valor);
      case 'password':
      case 'senha':
        return this.#validarSenha(valor, campo);
    }

    if (campo.min && String(valor).length < campo.min) {
      return { valido: false, mensagem: CONFIG_FORM.MENSAGENS.TAMANHO_MIN.replace('{min}', campo.min) };
    }

    if (campo.max && String(valor).length > campo.max) {
      return { valido: false, mensagem: CONFIG_FORM.MENSAGENS.TAMANHO_MAX.replace('{max}', campo.max) };
    }

    if (campo.tipo === 'number') {
      const numero = parseFloat(valor);
      if (campo.minValue !== undefined && numero < campo.minValue) {
        return { valido: false, mensagem: CONFIG_FORM.MENSAGENS.VALOR_MIN.replace('{min}', campo.minValue) };
      }
      if (campo.maxValue !== undefined && numero > campo.maxValue) {
        return { valido: false, mensagem: CONFIG_FORM.MENSAGENS.VALOR_MAX.replace('{max}', campo.maxValue) };
      }
    }

    if (campo.regex) {
      const regex = new RegExp(campo.regex);
      if (!regex.test(valor)) {
        return { valido: false, mensagem: campo.mensagemErro || 'Formato inválido' };
      }
    }

    return { valido: true, mensagem: '' };
  }

  #validarEmail(email) {
    if (!CONFIG_FORM.VALIDACAO.EMAIL_REGEX.test(email)) {
      return { valido: false, mensagem: CONFIG_FORM.MENSAGENS.EMAIL_INVALIDO };
    }
    return { valido: true, mensagem: '' };
  }

  #validarTelefone(telefone) {
    const telefoneNumeros = telefone.replace(/\D/g, '');
    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
      return { valido: false, mensagem: CONFIG_FORM.MENSAGENS.TELEFONE_INVALIDO };
    }
    return { valido: true, mensagem: '' };
  }

  #validarCPF(cpf) {
    const cpfNumeros = cpf.replace(/\D/g, '');
    if (cpfNumeros.length !== 11 || /^(\d)\1+$/.test(cpfNumeros)) {
      return { valido: false, mensagem: CONFIG_FORM.MENSAGENS.CPF_INVALIDO };
    }
    return { valido: true, mensagem: '' };
  }

  #validarURL(url) {
    if (!CONFIG_FORM.VALIDACAO.URL_REGEX.test(url)) {
      return { valido: false, mensagem: CONFIG_FORM.MENSAGENS.URL_INVALIDA };
    }
    return { valido: true, mensagem: '' };
  }

  #validarSenha(senha, campo) {
    const minLength = campo.min || 6;
    if (senha.length < minLength) {
      return { valido: false, mensagem: CONFIG_FORM.MENSAGENS.SENHA_CURTA.replace('{min}', minLength) };
    }
    return { valido: true, mensagem: '' };
  }

  calcularForcaSenha(senha) {
    if (!senha) return { nivel: 0, texto: '', classe: '' };
    let forca = 0;
    if (senha.length >= 8) forca++;
    if (senha.length >= 12) forca++;
    if (/[a-z]/.test(senha)) forca++;
    if (/[A-Z]/.test(senha)) forca++;
    if (/[0-9]/.test(senha)) forca++;
    if (/[^A-Za-z0-9]/.test(senha)) forca++;

    if (forca <= 2) return { nivel: 1, texto: 'Fraca', classe: 'fraca' };
    if (forca <= 4) return { nivel: 2, texto: 'Média', classe: 'media' };
    return { nivel: 3, texto: 'Forte', classe: 'forte' };
  }
}

class GerenciadorDOMForm {
  #host;
  #raiz;
  #refs = {};

  constructor(host, raiz) {
    this.#host = host;
    this.#raiz = raiz;
  }

  montar(modo) {
    const container = modo === 'inline' ? this.#montarInline() : this.#montarPopup();
    this.#raiz.appendChild(container);

    const regiaoAnuncio = this.#criarElemento('div', 'sr-only');
    regiaoAnuncio.setAttribute('role', 'status');
    regiaoAnuncio.setAttribute('aria-live', 'polite');
    this.#raiz.appendChild(regiaoAnuncio);
    this.#refs.regiaoAnuncio = regiaoAnuncio;

    return this.#refs;
  }

  #montarPopup() {
    const overlay = this.#criarElemento('div', 'form-overlay');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    const modal = this.#criarElemento('div', 'form-modal');
    modal.append(this.#montarCabecalho(true), this.#montarCorpo(), this.#montarRodape());
    overlay.appendChild(modal);

    this.#refs.overlay = overlay;
    this.#refs.container = modal;
    return overlay;
  }

  #montarInline() {
    const container = this.#criarElemento('div', 'form-container form-inline');
    container.append(this.#montarCabecalho(false), this.#montarCorpo(), this.#montarRodape());
    this.#refs.container = container;
    return container;
  }

  #montarCabecalho(comBotaoFechar) {
    const cabecalho = this.#criarElemento('div', 'form-cabecalho');
    const titulo = this.#criarElemento('h2', 'form-titulo');
    titulo.textContent = 'Formulário';
    cabecalho.appendChild(titulo);

    if (comBotaoFechar) {
      const btnFechar = this.#criarElemento('button', 'btn-fechar');
      btnFechar.type = 'button';
      btnFechar.innerHTML = '&times;';
      btnFechar.setAttribute('aria-label', 'Fechar');
      cabecalho.appendChild(btnFechar);
      this.#refs.btnFechar = btnFechar;
    }

    this.#refs.titulo = titulo;
    return cabecalho;
  }

  #montarCorpo() {
    const corpo = this.#criarElemento('div', 'form-corpo');
    const form = document.createElement('form');
    form.className = 'formulario';
    form.noValidate = true;

    const camposContainer = this.#criarElemento('div', 'campos-container');
    form.appendChild(camposContainer);

    const paginacaoContainer = this.#criarElemento('div', 'paginacao-container');
    paginacaoContainer.style.display = 'none';

    const paginacaoInfo = this.#criarElemento('div', 'paginacao-info');
    const paginacaoBotoes = this.#criarElemento('div', 'paginacao-botoes');

    const btnAnterior = this.#criarElemento('button', 'btn btn-secundario');
    btnAnterior.type = 'button';
    btnAnterior.textContent = 'Anterior';

    const btnProximo = this.#criarElemento('button', 'btn btn-secundario');
    btnProximo.type = 'button';
    btnProximo.textContent = 'Próximo';

    paginacaoBotoes.append(btnAnterior, btnProximo);
    paginacaoContainer.append(paginacaoInfo, paginacaoBotoes);
    corpo.append(form, paginacaoContainer);

    this.#refs.corpo = corpo;
    this.#refs.form = form;
    this.#refs.camposContainer = camposContainer;
    this.#refs.paginacaoContainer = paginacaoContainer;
    this.#refs.paginacaoInfo = paginacaoInfo;
    this.#refs.btnAnterior = btnAnterior;
    this.#refs.btnProximo = btnProximo;

    return corpo;
  }

  #montarRodape() {
    const rodape = this.#criarElemento('div', 'form-rodape');
    const botoesContainer = this.#criarElemento('div', 'botoes-container');

    const btnCancelar = this.#criarElemento('button', 'btn btn-secundario');
    btnCancelar.type = 'button';
    btnCancelar.textContent = 'Cancelar';

    const btnSubmit = this.#criarElemento('button', 'btn btn-primario');
    btnSubmit.type = 'submit';
    btnSubmit.textContent = 'Enviar';

    botoesContainer.append(btnCancelar, btnSubmit);
    rodape.appendChild(botoesContainer);

    this.#refs.btnCancelar = btnCancelar;
    this.#refs.btnSubmit = btnSubmit;
    return rodape;
  }

  renderizarCampos(campos) {
    if (!this.#refs.camposContainer) return;
    
    this.#refs.camposContainer.innerHTML = '';
    this.#refs.inputs = {};
    this.#refs.erros = {};

    campos.forEach(campo => {
      const elemento = this.#criarCampoPorTipo(campo);
      if (elemento) this.#refs.camposContainer.appendChild(elemento);
    });
  }

  #criarCampoPorTipo(campo) {
    switch (campo.tipo) {
      case 'select': return this.#criarSelect(campo);
      case 'textarea': return this.#criarTextarea(campo);
      case 'checkbox': return this.#criarCheckbox(campo);
      case 'radio': return this.#criarRadio(campo);
      case 'password':
      case 'senha': return this.#criarCampoSenha(campo);
      default: return this.#criarCampoTexto(campo);
    }
  }

  #criarCampoTexto(campo) {
    const grupo = this.#criarElemento('div', 'form-grupo');
    if (campo.oculto) grupo.style.display = 'none';

    const label = this.#criarLabel(campo);
    const input = document.createElement('input');
    input.type = campo.tipo || 'text';
    input.id = campo.id;
    input.name = campo.id;
    input.className = 'form-input';
    input.placeholder = campo.placeholder || '';
    
    if (campo.valor) input.value = campo.valor;
    if (campo.desabilitado) input.disabled = true;
    if (campo.somenteLeitura) input.readOnly = true;

    const erro = this.#criarErro();
    grupo.append(label, input, erro);

    if (campo.dica) grupo.appendChild(this.#criarDica(campo.dica));

    this.#refs.inputs[campo.id] = input;
    this.#refs.erros[campo.id] = erro;
    return grupo;
  }

  #criarCampoSenha(campo) {
    const grupo = this.#criarElemento('div', 'form-grupo');
    const label = this.#criarLabel(campo);
    const wrapper = this.#criarElemento('div', 'input-senha-wrapper');

    const input = document.createElement('input');
    input.type = 'password';
    input.id = campo.id;
    input.name = campo.id;
    input.className = 'form-input';
    input.placeholder = campo.placeholder || '';

    const btnToggle = this.#criarElemento('button', 'btn-toggle-senha');
    btnToggle.type = 'button';
    btnToggle.innerHTML = '👁️';
    btnToggle.setAttribute('aria-label', 'Mostrar senha');
    btnToggle.dataset.inputId = campo.id;

    wrapper.append(input, btnToggle);
    const erro = this.#criarErro();
    grupo.append(label, wrapper, erro);

    if (campo.mostrarForca) {
      const indicador = this.#criarIndicadorForca(campo.id);
      grupo.appendChild(indicador);
    }

    this.#refs.inputs[campo.id] = input;
    this.#refs.erros[campo.id] = erro;
    return grupo;
  }

  #criarSelect(campo) {
    const grupo = this.#criarElemento('div', 'form-grupo');
    const label = this.#criarLabel(campo);
    const select = document.createElement('select');
    select.id = campo.id;
    select.name = campo.id;
    select.className = 'form-input';

    if (campo.placeholder) {
      const opt = document.createElement('option');
      opt.value = '';
      opt.textContent = campo.placeholder;
      opt.disabled = true;
      opt.selected = true;
      select.appendChild(opt);
    }

    (campo.opcoes || []).forEach(opcao => {
      const opt = document.createElement('option');
      opt.value = opcao.valor || opcao;
      opt.textContent = opcao.texto || opcao;
      if (opcao.valor === campo.valor) opt.selected = true;
      select.appendChild(opt);
    });

    const erro = this.#criarErro();
    grupo.append(label, select, erro);

    this.#refs.inputs[campo.id] = select;
    this.#refs.erros[campo.id] = erro;
    return grupo;
  }

  #criarTextarea(campo) {
    const grupo = this.#criarElemento('div', 'form-grupo');
    const label = this.#criarLabel(campo);
    const textarea = document.createElement('textarea');
    textarea.id = campo.id;
    textarea.name = campo.id;
    textarea.className = 'form-input';
    textarea.placeholder = campo.placeholder || '';
    textarea.rows = campo.linhas || 4;
    if (campo.valor) textarea.value = campo.valor;

    const erro = this.#criarErro();
    grupo.append(label, textarea, erro);

    this.#refs.inputs[campo.id] = textarea;
    this.#refs.erros[campo.id] = erro;
    return grupo;
  }

  #criarCheckbox(campo) {
    const grupo = this.#criarElemento('div', 'form-grupo form-grupo-checkbox');
    const wrapper = this.#criarElemento('div', 'checkbox-wrapper');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = campo.id;
    input.name = campo.id;
    input.className = 'form-checkbox';
    if (campo.valor) input.checked = true;

    const label = document.createElement('label');
    label.htmlFor = campo.id;
    label.textContent = campo.label || campo.id;

    wrapper.append(input, label);
    const erro = this.#criarErro();
    grupo.append(wrapper, erro);

    this.#refs.inputs[campo.id] = input;
    this.#refs.erros[campo.id] = erro;
    return grupo;
  }

  #criarRadio(campo) {
    const grupo = this.#criarElemento('div', 'form-grupo');
    const legend = document.createElement('legend');
    legend.textContent = campo.label || campo.id;
    if (campo.obrigatorio) legend.appendChild(this.#criarAsterisco());
    grupo.appendChild(legend);

    const radiosContainer = this.#criarElemento('div', 'radios-container');
    (campo.opcoes || []).forEach((opcao, i) => {
      const wrapper = this.#criarElemento('div', 'radio-wrapper');
      const input = document.createElement('input');
      input.type = 'radio';
      input.id = `${campo.id}-${i}`;
      input.name = campo.id;
      input.value = opcao.valor || opcao;
      input.className = 'form-radio';
      if (opcao.valor === campo.valor) input.checked = true;

      const label = document.createElement('label');
      label.htmlFor = `${campo.id}-${i}`;
      label.textContent = opcao.texto || opcao;

      wrapper.append(input, label);
      radiosContainer.appendChild(wrapper);
    });

    grupo.appendChild(radiosContainer);
    const erro = this.#criarErro();
    grupo.appendChild(erro);

    this.#refs.inputs[campo.id] = radiosContainer;
    this.#refs.erros[campo.id] = erro;
    return grupo;
  }

  #criarLabel(campo) {
    const label = document.createElement('label');
    label.htmlFor = campo.id;
    label.textContent = campo.label || campo.id;
    if (campo.obrigatorio) label.appendChild(this.#criarAsterisco());
    return label;
  }

  #criarAsterisco() {
    const span = document.createElement('span');
    span.className = 'obrigatorio';
    span.textContent = ' *';
    return span;
  }

  #criarErro() {
    const erro = this.#criarElemento('span', 'form-erro');
    erro.setAttribute('role', 'alert');
    erro.style.display = 'none';
    return erro;
  }

  #criarDica(texto) {
    const dica = this.#criarElemento('small', 'form-dica');
    dica.textContent = texto;
    return dica;
  }

  #criarIndicadorForca(campoId) {
    const container = this.#criarElemento('div', 'forca-senha');
    const label = this.#criarElemento('span', 'forca-label');
    label.textContent = 'Força da senha:';
    const texto = this.#criarElemento('span', 'forca-texto');
    const barra = this.#criarElemento('div', 'forca-barra');
    const preenchimento = this.#criarElemento('div', 'forca-preenchimento');
    barra.appendChild(preenchimento);
    container.append(label, texto, barra);

    if (!this.#refs.forcaSenha) this.#refs.forcaSenha = {};
    this.#refs.forcaSenha[campoId] = { texto, preenchimento };
    return container;
  }

  #criarElemento(tag, classe) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    return el;
  }

  obterReferencias() {
    return this.#refs;
  }
}

class GerenciadorPaginacao {
  #campos = [];
  #camposPorPagina = 5;
  #paginaAtual = 0;
  #refs;

  constructor(refs) {
    this.#refs = refs;
  }

  configurar(campos, camposPorPagina) {
    this.#campos = campos;
    this.#camposPorPagina = camposPorPagina;
    this.#paginaAtual = 0;
  }

  obterCamposPagina() {
    const inicio = this.#paginaAtual * this.#camposPorPagina;
    return this.#campos.slice(inicio, inicio + this.#camposPorPagina);
  }

  proximaPagina() {
    if (!this.temProxima()) return false;
    this.#paginaAtual++;
    this.#atualizarInterface();
    return true;
  }

  paginaAnterior() {
    if (!this.temAnterior()) return false;
    this.#paginaAtual--;
    this.#atualizarInterface();
    return true;
  }

  temProxima() {
    return (this.#paginaAtual + 1) * this.#camposPorPagina < this.#campos.length;
  }

  temAnterior() {
    return this.#paginaAtual > 0;
  }

  #atualizarInterface() {
    if (!this.#refs.paginacaoInfo) return;
    const total = Math.ceil(this.#campos.length / this.#camposPorPagina);
    this.#refs.paginacaoInfo.textContent = `Página ${this.#paginaAtual + 1} de ${total}`;
    if (this.#refs.btnAnterior) this.#refs.btnAnterior.disabled = !this.temAnterior();
    if (this.#refs.btnProximo) this.#refs.btnProximo.disabled = !this.temProxima();
  }

  mostrarControles() {
    if (this.#refs.paginacaoContainer) {
      this.#refs.paginacaoContainer.style.display = 'flex';
      this.#atualizarInterface();
    }
  }

  ocultarControles() {
    if (this.#refs.paginacaoContainer) {
      this.#refs.paginacaoContainer.style.display = 'none';
    }
  }
}

class GerenciadorAtualizacoesForm {
  #host;
  #refs;
  #estado;
  #validador;
  #campos = [];
  #paginacao;
  #domManager;

  constructor(host, refs, domManager) {
    this.#host = host;
    this.#refs = refs;
    this.#domManager = domManager;
    this.#estado = new GerenciadorEstadoForm(host);
    this.#validador = new GerenciadorValidacao();
    this.#paginacao = new GerenciadorPaginacao(refs);
  }

  atualizarTitulo() {
    this.#refs.titulo.textContent = this.#estado.obter('titulo', 'Formulário');
  }

  atualizarBotaoSubmit() {
    this.#refs.btnSubmit.textContent = this.#estado.obter('texto-botao', 'Enviar');
  }

  atualizarVisibilidade() {
    if (!this.#refs.overlay) return;
    const visivel = this.#estado.obterBooleano('visivel', false);
    if (visivel) {
      this.#refs.overlay.classList.add('visivel');
      this.#focarPrimeiroCampo();
    } else {
      this.#refs.overlay.classList.remove('visivel');
    }
  }

  aplicarAlturaMaxima() {
    const altura = this.#estado.obter('altura-maxima', '');
    if (altura && this.#refs.corpo) {
      this.#refs.corpo.style.maxHeight = altura;
      this.#refs.corpo.style.overflowY = 'auto';
    }
  }

  carregarCampos() {
    this.#campos = this.#estado.obterJSON('campos', []);
    return this.#campos;
  }

  configurarPaginacao() {
    const usarPaginacao = this.#estado.obterBooleano('paginacao', false);
    if (!usarPaginacao) {
      this.#paginacao.ocultarControles();
      return false;
    }
    const porPagina = parseInt(this.#estado.obter('campos-por-pagina', '5'));
    this.#paginacao.configurar(this.#campos, porPagina);
    this.#paginacao.mostrarControles();
    return true;
  }

  renderizarPaginaAtual() {
    return this.#paginacao.obterCamposPagina();
  }

  proximaPagina() {
    const camposPagina = this.#paginacao.obterCamposPagina();
    let valido = true;
    camposPagina.forEach(campo => {
      if (!this.validarCampo(campo.id)) valido = false;
    });
    if (!valido) return false;
    
    if (this.#paginacao.proximaPagina()) {
      this.#domManager.renderizarCampos(this.#paginacao.obterCamposPagina());
      this.#refs = this.#domManager.obterReferencias();
      this.#focarPrimeiroCampo();
      return true;
    }
    return false;
  }

  paginaAnterior() {
    if (this.#paginacao.paginaAnterior()) {
      this.#domManager.renderizarCampos(this.#paginacao.obterCamposPagina());
      this.#refs = this.#domManager.obterReferencias();
      this.#focarPrimeiroCampo();
      return true;
    }
    return false;
  }

  atualizarForcaSenha(campoId, senha) {
    const indicador = this.#refs.forcaSenha?.[campoId];
    if (!indicador) return;
    const forca = this.#validador.calcularForcaSenha(senha);
    indicador.texto.textContent = forca.texto;
    indicador.preenchimento.className = `forca-preenchimento ${forca.classe}`;
    indicador.preenchimento.style.width = `${(forca.nivel / 3) * 100}%`;
  }

  mostrarErro(campoId, mensagem) {
    const input = this.#refs.inputs[campoId];
    const erro = this.#refs.erros[campoId];
    if (input && erro) {
      input.classList.add('invalido');
      input.setAttribute('aria-invalid', 'true');
      erro.textContent = mensagem;
      erro.style.display = '';
    }
  }

  limparErro(campoId) {
    const input = this.#refs.inputs[campoId];
    const erro = this.#refs.erros[campoId];
    if (input && erro) {
      input.classList.remove('invalido');
      input.removeAttribute('aria-invalid');
      erro.style.display = 'none';
    }
  }

  validarCampo(campoId) {
    const campo = this.#campos.find(c => c.id === campoId);
    if (!campo) return true;

    const input = this.#refs.inputs[campoId];
    if (!input) return true;

    let valor;
    if (campo.tipo === 'checkbox') {
      valor = input.checked;
    } else if (campo.tipo === 'radio') {
      const selecionado = input.querySelector('input[type="radio"]:checked');
      valor = selecionado ? selecionado.value : '';
    } else {
      valor = input.value;
    }

    const resultado = this.#validador.validarCampo(valor, campo);
    if (!resultado.valido) {
      this.mostrarErro(campoId, resultado.mensagem);
      return false;
    }

    this.limparErro(campoId);
    return true;
  }

  validarFormulario() {
    let valido = true;
    this.#campos.forEach(campo => {
      if (!this.validarCampo(campo.id)) valido = false;
    });
    return valido;
  }

  obterDadosFormulario() {
    const dados = {};
    this.#campos.forEach(campo => {
      const input = this.#refs.inputs[campo.id];
      if (!input) return;

      if (campo.tipo === 'checkbox') {
        dados[campo.id] = input.checked;
      } else if (campo.tipo === 'radio') {
        const selecionado = input.querySelector('input[type="radio"]:checked');
        dados[campo.id] = selecionado ? selecionado.value : null;
      } else if (campo.tipo === 'number') {
        dados[campo.id] = input.value ? parseFloat(input.value) : null;
      } else {
        dados[campo.id] = input.value;
      }
    });
    return dados;
  }

  preencherFormulario(dados) {
    Object.keys(dados).forEach(campoId => {
      const input = this.#refs.inputs[campoId];
      const valor = dados[campoId];
      if (!input) return;

      const campo = this.#campos.find(c => c.id === campoId);
      if (campo && campo.tipo === 'checkbox') {
        input.checked = !!valor;
      } else if (campo && campo.tipo === 'radio') {
        const radio = input.querySelector(`input[value="${valor}"]`);
        if (radio) radio.checked = true;
      } else {
        input.value = valor || '';
      }
    });
  }

  limparFormulario() {
    this.#refs.form.reset();
    Object.keys(this.#refs.inputs).forEach(id => this.limparErro(id));
    if (this.#refs.forcaSenha) {
      Object.values(this.#refs.forcaSenha).forEach(ind => {
        ind.preenchimento.style.width = '0%';
        ind.texto.textContent = '';
      });
    }
  }

  #focarPrimeiroCampo() {
    const primeiro = Object.values(this.#refs.inputs)[0];
    setTimeout(() => primeiro?.focus(), 100);
  }
}

class GerenciadorEstilosForm {
  #raiz;

  constructor(raiz) {
    this.#raiz = raiz;
  }

  carregar() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        --form-cor-primaria: #3b82f6;
        --form-cor-primaria-hover: #2563eb;
        --form-cor-secundaria: #6b7280;
        --form-cor-fundo: #ffffff;
        --form-cor-texto: #1f2937;
        --form-cor-borda: #d1d5db;
        --form-cor-erro: #ef4444;
        --form-cor-sucesso: #10b981;
        --form-raio: 0.5rem;
        --form-sombra: 0 10px 25px rgba(0, 0, 0, 0.1);
        display: block;
      }
      
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
      
      .form-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
      }
      
      .form-overlay.visivel {
        opacity: 1;
        visibility: visible;
      }
      
      .form-modal {
        background: var(--form-cor-fundo);
        border-radius: var(--form-raio);
        box-shadow: var(--form-sombra);
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
      }
      
      .form-overlay.visivel .form-modal {
        transform: scale(1);
      }
      
      .form-container.form-inline {
        background: var(--form-cor-fundo);
        border-radius: var(--form-raio);
        border: 1px solid var(--form-cor-borda);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
      
      .form-cabecalho {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.5rem;
        border-bottom: 1px solid var(--form-cor-borda);
      }
      
      .form-titulo {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--form-cor-texto);
      }
      
      .btn-fechar {
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #6b7280;
        padding: 0;
        width: 2rem;
        height: 2rem;
        border-radius: 0.25rem;
        transition: background 0.2s ease;
      }
      
      .btn-fechar:hover {
        background: #f3f4f6;
      }
      
      .form-corpo {
        padding: 1.5rem;
      }
      
      .campos-container {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }
      
      .paginacao-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 1px solid var(--form-cor-borda);
      }
      
      .paginacao-info {
        font-size: 0.875rem;
        color: var(--form-cor-secundaria);
        font-weight: 500;
      }
      
      .paginacao-botoes {
        display: flex;
        gap: 0.5rem;
      }
      
      .form-grupo {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .form-grupo label,
      .form-grupo legend {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--form-cor-texto);
      }
      
      .obrigatorio {
        color: var(--form-cor-erro);
      }
      
      .input-senha-wrapper {
        position: relative;
      }
      
      .form-input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid var(--form-cor-borda);
        border-radius: 0.375rem;
        font-size: 1rem;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
        box-sizing: border-box;
        font-family: inherit;
      }
      
      .input-senha-wrapper .form-input {
        padding-right: 3rem;
      }
      
      .form-input:focus {
        outline: none;
        border-color: var(--form-cor-primaria);
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
      
      .form-input.invalido {
        border-color: var(--form-cor-erro);
      }
      
      textarea.form-input {
        resize: vertical;
        min-height: 80px;
      }
      
      .btn-toggle-senha {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        font-size: 1.25rem;
        opacity: 0.6;
        transition: opacity 0.2s ease;
      }
      
      .btn-toggle-senha:hover {
        opacity: 1;
      }
      
      .form-erro {
        font-size: 0.875rem;
        color: var(--form-cor-erro);
      }
      
      .form-dica {
        font-size: 0.875rem;
        color: #6b7280;
      }
      
      .checkbox-wrapper,
      .radio-wrapper {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .radios-container {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .form-checkbox,
      .form-radio {
        width: 1.25rem;
        height: 1.25rem;
        cursor: pointer;
      }
      
      .forca-senha {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-size: 0.875rem;
      }
      
      .forca-barra {
        height: 0.5rem;
        background: #e5e7eb;
        border-radius: 0.25rem;
        overflow: hidden;
      }
      
      .forca-preenchimento {
        height: 100%;
        width: 0;
        transition: width 0.3s ease, background-color 0.3s ease;
      }
      
      .forca-preenchimento.fraca { background: var(--form-cor-erro); }
      .forca-preenchimento.media { background: #f59e0b; }
      .forca-preenchimento.forte { background: var(--form-cor-sucesso); }
      
      .form-rodape {
        padding: 1.5rem;
        border-top: 1px solid var(--form-cor-borda);
      }
      
      .botoes-container {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
      }
      
      .btn {
        padding: 0.75rem 1.5rem;
        border-radius: 0.375rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
      }
      
      .btn-primario {
        background: var(--form-cor-primaria);
        color: white;
      }
      
      .btn-primario:hover:not(:disabled) {
        background: var(--form-cor-primaria-hover);
      }
      
      .btn-secundario {
        background: transparent;
        color: var(--form-cor-secundaria);
        border: 1px solid var(--form-cor-borda);
      }
      
      .btn-secundario:hover:not(:disabled) {
        background: #f3f4f6;
      }
      
      .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      @media (max-width: 480px) {
        .form-modal { width: 95%; }
        .form-cabecalho, .form-corpo, .form-rodape { padding: 1rem; }
        .botoes-container { flex-direction: column-reverse; }
        .btn { width: 100%; }
      }
    `;
    this.#raiz.appendChild(style);
  }
}

class FormularioGenerico extends HTMLElement {
  #estado;
  #dom;
  #atualizador;
  #estilos;
  #refs = {};
  #montado = false;

  static get observedAttributes() {
    return ['campos', 'visivel', 'titulo', 'texto-botao', 'modo', 'paginacao', 'campos-por-pagina', 'altura-maxima'];
  }

  constructor() {
    super();
    const raiz = this.attachShadow({ mode: 'open' });
    this.#estado = new GerenciadorEstadoForm(this);
    this.#dom = new GerenciadorDOMForm(this, raiz);
    this.#estilos = new GerenciadorEstilosForm(raiz);
    this.#estilos.carregar();
  }

  connectedCallback() {
    if (this.#montado) return;
    const modo = this.#estado.obter('modo', 'popup');
    this.#refs = this.#dom.montar(modo);
    this.#atualizador = new GerenciadorAtualizacoesForm(this, this.#refs, this.#dom);
    this.#configurarEventos();
    this.#aplicarEstadoInicial();
    this.#montado = true;
    this.dispatchEvent(new CustomEvent('form-pronto', { bubbles: true, composed: true }));
  }

  attributeChangedCallback(nome, anterior, novo) {
    if (!this.#montado || anterior === novo) return;
    const acoes = {
      campos: () => this.#renderizarCampos(),
      visivel: () => this.#atualizador.atualizarVisibilidade(),
      titulo: () => this.#atualizador.atualizarTitulo(),
      'texto-botao': () => this.#atualizador.atualizarBotaoSubmit(),
      paginacao: () => this.#renderizarCampos(),
      'campos-por-pagina': () => this.#renderizarCampos(),
      'altura-maxima': () => this.#atualizador.aplicarAlturaMaxima(),
    };
    acoes[nome]?.();
  }

  #aplicarEstadoInicial() {
    this.#atualizador.atualizarTitulo();
    this.#atualizador.atualizarBotaoSubmit();
    this.#atualizador.aplicarAlturaMaxima();
    this.#renderizarCampos();
    this.#atualizador.atualizarVisibilidade();
  }

  #renderizarCampos() {
    const campos = this.#atualizador.carregarCampos();
    const usaPaginacao = this.#atualizador.configurarPaginacao();
    if (usaPaginacao) {
      this.#dom.renderizarCampos(this.#atualizador.renderizarPaginaAtual());
    } else {
      this.#dom.renderizarCampos(campos);
    }
    this.#refs = this.#dom.obterReferencias();
  }

  #configurarEventos() {
    if (this.#refs.btnFechar) {
      this.#refs.btnFechar.addEventListener('click', () => this.fechar());
    }

    this.#refs.btnCancelar.addEventListener('click', () => {
      const modo = this.#estado.obter('modo', 'popup');
      if (modo === 'popup') {
        this.fechar();
      } else {
        this.limparFormulario();
        this.dispatchEvent(new CustomEvent('cancelou', { bubbles: true, composed: true }));
      }
    });

    if (this.#refs.overlay) {
      this.#refs.overlay.addEventListener('click', (e) => {
        if (e.target === this.#refs.overlay) this.fechar();
      });
    }

    this.#refs.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.#handleSubmit();
    });

    if (this.#refs.btnAnterior) {
      this.#refs.btnAnterior.addEventListener('click', () => this.#atualizador.paginaAnterior());
    }

    if (this.#refs.btnProximo) {
      this.#refs.btnProximo.addEventListener('click', () => this.#atualizador.proximaPagina());
    }

    this.#refs.camposContainer.addEventListener('click', (e) => {
      if (e.target.closest('.btn-toggle-senha')) {
        const btn = e.target.closest('.btn-toggle-senha');
        const input = this.#refs.inputs[btn.dataset.inputId];
        if (input) {
          const ehSenha = input.type === 'password';
          input.type = ehSenha ? 'text' : 'password';
          btn.innerHTML = ehSenha ? '🙈' : '👁️';
        }
      }
    });

    this.#refs.camposContainer.addEventListener('input', (e) => {
      const input = e.target;
      if (input.type === 'password' && input.classList.contains('form-input')) {
        this.#atualizador.atualizarForcaSenha(input.id, input.value);
      }
      if (input.classList.contains('invalido')) {
        this.#atualizador.limparErro(input.id);
      }
    });

    this.#refs.camposContainer.addEventListener('blur', (e) => {
      const input = e.target;
      if (input.classList?.contains('form-input') && input.value) {
        this.#atualizador.validarCampo(input.id);
      }
    }, true);
  }

  #handleSubmit() {
    if (!this.#atualizador.validarFormulario()) return;
    const dados = this.#atualizador.obterDadosFormulario();
    this.dispatchEvent(new CustomEvent('submit', { detail: dados, bubbles: true, composed: true }));
    const modo = this.#estado.obter('modo', 'popup');
    if (modo === 'popup') this.fechar();
  }

  // API Pública
  abrir() {
    this.setAttribute('visivel', 'true');
  }

  fechar() {
    this.setAttribute('visivel', 'false');
    this.dispatchEvent(new CustomEvent('fechou', { bubbles: true, composed: true }));
  }

  obterDados() {
    return this.#atualizador.obterDadosFormulario();
  }

  preencherDados(dados) {
    this.#atualizador.preencherFormulario(dados);
  }

  limparFormulario() {
    this.#atualizador.limparFormulario();
  }

  validar() {
    return this.#atualizador.validarFormulario();
  }
}

customElements.define('formulario-generico', FormularioGenerico);