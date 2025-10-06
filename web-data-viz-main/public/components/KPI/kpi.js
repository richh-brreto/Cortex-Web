/**
 * ============================================================================
 * CARTÃO KPI
 * ============================================================================
 *
 * @version 1.0.0
 * @author Grupo01-Cortex
 * @license Cortex
 *
 * CARACTERÍSTICAS:
 * Privacidade real com campos privados (#)
 * CSS Custom Properties para tematização
 * Eventos customizados para comunicação
 * Lazy loading de Chart.js
 * Respeita prefers-reduced-motion
 * Modo desenvolvimento/produção
 *
 * EXEMPLO DE USO:
 * <cartao-kpi
 *   obrigatorio="12345"
 *   titulo="Vendas"
 *   variacao="8.4"
 *   tipo-grafico="line"
 *   dados-grafico='{"labels":["Jan","Fev"],"values":[10,20]}'
 * >
 *   <button slot="acoes">Ver Detalhes</button>
 * </cartao-kpi>
 *
 * DEPENDÊNCIAS:
 * - Chart.js 4.5 (carregado automaticamente quando necessário)
 *
 * NAVEGADORES SUPORTADOS:
 * - Chrome 90+
 * - Firefox 88+
 * - Edge 90+
 * ============================================================================
 */

// CONFIGURAÇÃO GLOBAL
const CONFIG = {
  // URLs de CDN para dependências
  CDN: {
    CHARTJS:
      "https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.min.js",
  },

  // Cores padrão
  CORES: {
    PRIMARIA: "#3b82f6",
    PROGRESSO_FUNDO: "#e2e8f0",
  },

  // Breakpoints de dispositivos
  DISPOSITIVOS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1440,
  },

  // Configurações de animação
  ANIMACAO: {
    DURACAO: 1000,
    PASSOS: 30,
  },
};

/**
 * @class GerenciadorEstado
 * @classdesc
 * Classe responsável por gerenciar o estado de um componente HTML customizado.
 * Permite ler e escrever atributos diretamente no elemento host, garantindo
 */
class GerenciadorEstado {
  /**
   * Referência privada ao elemento host (componente HTML).
   * @type {HTMLElement}
   * @private
   */
  #host;

  /**
   * Cria uma nova instância do GerenciadorEstado.
   * @param {HTMLElement} host - Elemento host ao qual o estado está vinculado.
   */
  constructor(host) {
    this.#host = host;
  }

  /**
   * Obtém o valor de um atributo como string.
   * Retorna o valor padrão caso o atributo não exista ou esteja vazio.
   * @param {string} nome - Nome do atributo a ser lido.
   * @param {string} [padrao=''] - Valor padrão retornado caso o atributo não exista.
   * @returns {string} Valor do atributo ou o valor padrão.
   */
  obter(nome, padrao = "") {
    const valor = this.#host.getAttribute(nome);
    return valor == null || valor === "" ? padrao : valor;
  }

  /**
   * Obtém o valor de um atributo numérico.
   * Faz parsing seguro e retorna o valor padrão se o atributo não for numérico.
   *
   * @param {string} nome - Nome do atributo.
   * @param {number} [padrao=0] - Valor padrão caso o atributo não exista ou não seja válido.
   * @returns {number} Valor numérico do atributo ou o valor padrão.
   */
  obterNumero(nome, padrao = 0) {
    const numero = parseFloat(this.#host.getAttribute(nome));
    return Number.isFinite(numero) ? numero : padrao;
  }

  /**
   * Define ou atualiza o valor de um atributo no elemento host.
   *
   * @param {string} nome - Nome do atributo.
   * @param {string|number|boolean} valor - Valor a ser definido.
   * @returns {void}
   */
  definir(nome, valor) {
    this.#host.setAttribute(nome, valor);
  }

  /**
   * Verifica se o elemento possui um determinado atributo.
   *
   * @param {string} nome - Nome do atributo.
   * @returns {boolean} `true` se o atributo existir, `false` caso contrário.
   */
  tem(nome) {
    return this.#host.hasAttribute(nome);
  }

  /**
   * Obtém o valor de um atributo booleano.
   * Considera verdadeiro se o atributo existir, independente do valor.
   *
   * @param {string} nome - Nome do atributo booleano.
   * @returns {boolean} `true` se o atributo estiver presente, `false` caso contrário.
   */
  obterBooleano(nome) {
    return this.#host.hasAttribute(nome);
  }
}

/**
 * @class GerenciadorFormatacao
 * @classdesc
 * Classe responsável por formatar valores numéricos e representar variações e progressos.
 * Atua em conjunto com o {@link GerenciadorEstado} para recuperar configurações de prefixos e sufixos.
 */
class GerenciadorFormatacao {
  /**
   * Referência privada ao elemento host (componente HTML).
   * @type {HTMLElement}
   * @private
   */
  #host;

  /**
   * Cria uma nova instância do GerenciadorFormatacao.
   * @param {HTMLElement} host - Elemento host ao qual o formatador está vinculado.
   */
  constructor(host) {
    this.#host = host;
  }

  /**
   * Formata um número de forma legível, aplicando abreviações (K, M) e localidade brasileira.
   * Também aplica prefixo e sufixo definidos via atributos do host (ex: "R$", "%").
   *
   * @example
   * // Supondo <meu-elemento prefixo="R$" sufixo="">
   * const f = new GerenciadorFormatacao(el);
   * f.formatarNumero(1500); // "R$1,5K"
   *
   * @param {number|string} valor - Valor a ser formatado.
   * @returns {string} Valor formatado, incluindo prefixo e sufixo.
   */
  formatarNumero(valor) {
    // Se o valor contiver caracteres não numéricos (ex: texto), retorna como string literal
    if (/\D/.test(String(valor))) return String(valor);

    const numero = parseFloat(valor) || 0;
    const estado = new GerenciadorEstado(this.#host);
    const prefixo = estado.obter("prefixo");
    const sufixo = estado.obter("sufixo");

    let texto;

    // Regras de abreviação: M (milhões), K (milhares)
    if (numero >= 1e6) texto = (numero / 1e6).toFixed(1) + "M";
    else if (numero >= 1e3) texto = (numero / 1e3).toFixed(1) + "K";
    else texto = Math.trunc(numero).toLocaleString("pt-BR");

    return prefixo + texto + sufixo;
  }

  /**
   * Formata uma variação percentual, retornando um objeto contendo texto e polaridade.
   * Exibe uma seta ↑ ou ↓ conforme o sinal do número.
   *
   * @example
   * f.formatarVariacao(2.3);  // { texto: "↑ 2.3%", ehPositivo: true }
   * f.formatarVariacao(-1.7); // { texto: "↓ 1.7%", ehPositivo: false }
   *
   * @param {number|string} valor - Valor percentual a ser formatado.
   * @returns {{texto: string, ehPositivo: boolean} | null}
   * Objeto com o texto formatado e o indicador de positividade, ou `null` se inválido ou zero.
   */
  formatarVariacao(valor) {
    const numero = parseFloat(valor);
    if (!Number.isFinite(numero) || numero === 0) return null;

    const ehPositivo = numero >= 0;
    const seta = ehPositivo ? "↑" : "↓";

    return {
      texto: `${seta} ${Math.abs(numero).toFixed(1)}%`,
      ehPositivo,
    };
  }

  /**
   * Calcula o progresso percentual de um valor em relação a um máximo.
   * Retorna tanto o percentual textual (ex: "75") quanto a largura numérica
   * (útil para representar barras de progresso visuais).
   *
   * @example
   * f.calcularProgresso(50, 200);
   * // { percentual: "25", largura: 25 }
   *
   * @param {number} valor - Valor atual.
   * @param {number} maximo - Valor máximo possível.
   * @returns {{percentual: string, largura: number} | null}
   * Objeto contendo percentual textual e largura numérica, ou `null` se o valor for inválido.
   */
  calcularProgresso(valor, maximo) {
    if (!Number.isFinite(valor)) return null;

    const percentual = Math.max(0, Math.min(100, (valor / maximo) * 100));
    return {
      percentual: percentual.toFixed(0),
      largura: percentual,
    };
  }
}

/**
 * @class GerenciadorDOM
 * @classdesc
 * Classe responsável por construir dinamicamente a estrutura HTML de um componente KPI (indicador de desempenho).
 */
class GerenciadorDOM {
  /**
   * Elemento host associado ao componente (custom element).
   * @type {HTMLElement}
   * @private
   */
  #host;

  /**
   * Raiz (root) onde a estrutura será montada — geralmente o Shadow DOM.
   * @type {ShadowRoot|HTMLElement}
   * @private
   */
  #raiz;

  /**
   * Cache interno de referências a elementos DOM criados.
   * @type {Object<string, HTMLElement>}
   * @private
   */
  #refs = {};

  /**
   * Cria uma nova instância do GerenciadorDOM.
   *
   * @param {HTMLElement} host - Elemento host do componente.
   * @param {ShadowRoot|HTMLElement} raiz - Raiz onde os elementos serão montados.
   */
  constructor(host, raiz) {
    this.#host = host;
    this.#raiz = raiz;
  }

  /**
   * Monta toda a estrutura do componente KPI dentro da raiz.
   * Cria e organiza elementos como cabeçalho, corpo, gráfico, progresso e rodapé,
   *
   * @returns {Object<string, HTMLElement>} Objeto com referências DOM para manipulação posterior.
   */
  montar() {
    const container = this.#criarElemento("div", "kpi-container");

    // Cabeçalho
    const cabecalho = this.#montarCabecalho();

    // Corpo principal (valor + variação)
    const corpo = this.#montarCorpo();

    // Barra de progresso
    const progresso = this.#montarProgresso();

    // Gráfico
    const grafico = this.#montarGrafico();

    // Slot para ações personalizadas (ex: botões, menus)
    const slotAcoes = document.createElement("slot");
    slotAcoes.name = "acoes";
    slotAcoes.className = "kpi-acoes";

    // Rodapé
    const rodape = this.#montarRodape();

    // Região para anúncios (usada por leitores de tela)
    const regiaoAnuncio = this.#criarElemento("div", "sr-only");
    regiaoAnuncio.setAttribute("role", "status");
    regiaoAnuncio.setAttribute("aria-live", "polite");
    regiaoAnuncio.setAttribute("aria-atomic", "true");

    // Montagem hierárquica
    container.append(
      cabecalho,
      corpo,
      progresso,
      grafico,
      slotAcoes,
      rodape,
      regiaoAnuncio
    );

    this.#raiz.appendChild(container);
    this.#refs.regiaoAnuncio = regiaoAnuncio;

    return this.#refs;
  }

  /**
   * Cria um elemento HTML com uma classe opcional.
   *
   * @param {string} tag - Nome da tag (ex: 'div', 'span').
   * @param {string} [classe] - Classe CSS a ser atribuída.
   * @returns {HTMLElement} Elemento criado.
   * @private
   */
  #criarElemento(tag, classe) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    return el;
  }

  /**
   * Constrói a seção de cabeçalho do KPI.
   * Inclui título, subtítulo e ícone (visualmente separado e oculto para leitores de tela).
   *
   * @returns {HTMLElement} Elemento de cabeçalho.
   * @private
   */
  #montarCabecalho() {
    const cabecalho = this.#criarElemento("div", "kpi-cabecalho");
    const esquerda = this.#criarElemento("div", "kpi-textos");

    const titulo = this.#criarElemento("h3", "kpi-titulo");
    titulo.id = "kpi-titulo-" + Math.random().toString(36).substr(2, 9);

    const subtitulo = this.#criarElemento("p", "kpi-subtitulo");
    subtitulo.style.display = "none";

    esquerda.append(titulo, subtitulo);

    const icone = this.#criarElemento("div", "kpi-icone");
    icone.setAttribute("aria-hidden", "true");

    cabecalho.append(esquerda, icone);

    this.#refs.titulo = titulo;
    this.#refs.subtitulo = subtitulo;
    this.#refs.icone = icone;

    return cabecalho;
  }

  /**
   * Constrói a seção principal (corpo) do KPI, exibindo o valor e a variação.
   *
   * @returns {HTMLElement} Elemento do corpo.
   * @private
   */
  #montarCorpo() {
    const corpo = this.#criarElemento("div", "kpi-corpo");

    const valor = this.#criarElemento("div", "kpi-valor");
    valor.textContent = "0";
    valor.setAttribute("aria-label", "Valor principal");

    const variacao = this.#criarElemento("div", "kpi-variacao");
    variacao.style.display = "none";

    corpo.append(valor, variacao);

    this.#refs.valor = valor;
    this.#refs.variacao = variacao;

    return corpo;
  }

  /**
   * Constrói a seção de progresso (barra e percentual).
   * Contém rótulos acessíveis e estrutura semântica ARIA.
   *
   * @returns {HTMLElement} Contêiner da barra de progresso.
   * @private
   */
  #montarProgresso() {
    const container = this.#criarElemento("div", "kpi-progresso");
    container.style.display = "none";
    container.setAttribute("role", "progressbar");
    container.setAttribute("aria-valuemin", "0");
    container.setAttribute("aria-valuemax", "100");

    const topo = this.#criarElemento("div", "kpi-progresso-topo");
    const rotulo = this.#criarElemento("span");
    rotulo.textContent = "Progresso";
    const percentual = this.#criarElemento("span", "kpi-progresso-percentual");

    topo.append(rotulo, percentual);

    const barra = this.#criarElemento("div", "kpi-progresso-barra");
    const preenchimento = this.#criarElemento(
      "div",
      "kpi-progresso-preenchimento"
    );
    preenchimento.style.width = "0%";

    barra.appendChild(preenchimento);
    container.append(topo, barra);

    this.#refs.progressoContainer = container;
    this.#refs.progressoPercentual = percentual;
    this.#refs.progressoPreenchimento = preenchimento;

    return container;
  }

  /**
   * Constrói a região do gráfico, incluindo um elemento `<canvas>`.
   * A seção é inicialmente oculta e possui atributos de acessibilidade.
   *
   * @returns {HTMLElement} Contêiner do gráfico.
   * @private
   */
  #montarGrafico() {
    const container = this.#criarElemento("div", "kpi-grafico");
    container.style.display = "none";
    container.setAttribute("role", "img");
    container.setAttribute("aria-label", "Gráfico de dados");

    const canvas = document.createElement("canvas");
    container.appendChild(canvas);

    this.#refs.graficoContainer = container;
    this.#refs.graficoCanvas = canvas;

    return container;
  }

  /**
   * Constrói o rodapé do KPI.
   * Inclui um slot com conteúdo de fallback.
   *
   * @returns {HTMLElement} Elemento de rodapé.
   * @private
   */
  #montarRodape() {
    const rodape = this.#criarElemento("div", "kpi-rodape");

    // Slot com fallback
    const slot = document.createElement("slot");
    slot.name = "rodape";

    const fallback = this.#criarElemento("p", "kpi-rodape-texto");
    fallback.style.display = "none";

    slot.appendChild(fallback);
    rodape.appendChild(slot);

    this.#refs.rodape = fallback;

    return rodape;
  }

  /**
   * Retorna todas as referências DOM armazenadas.
   * Útil para manipulação posterior (ex: atualização de valores ou estilos).
   *
   * @returns {Object<string, HTMLElement>} Dicionário de referências DOM.
   */
  obterReferencias() {
    return this.#refs;
  }
}

/**
 * @class GerenciadorAtualizacoes
 * @classdesc
 * Classe responsável por atualizar dinamicamente a interface do usuário (UI) de um componente KPI, reagindo a mudanças de estado e
 * formatando dados de forma acessível
 *
 * Atua como a camada de "ViewModel" no padrão MVVM (Model-View-ViewModel),
 * intermediário entre a interface do usuário (View) e os dados (Model) ou seja orquestrando a comunicação entre {@link GerenciadorEstado}, {@link GerenciadorFormatacao}
 * e as referências DOM providas por {@link GerenciadorDOM}.
 */
class GerenciadorAtualizacoes {
  /**
   * Elemento host (Custom Element) que representa o componente.
   * @type {HTMLElement}
   * @private
   */
  #host;

  /**
   * Cache de referências a elementos DOM (provenientes do GerenciadorDOM).
   * @type {Object<string, HTMLElement>}
   * @private
   */
  #refs;

  /**
   * Instância de gerenciamento de estado.
   * @type {GerenciadorEstado}
   * @private
   */
  #estado;

  /**
   * Instância de formatação de dados numéricos e textuais.
   * @type {GerenciadorFormatacao}
   * @private
   */
  #formatador;

  /**
   * Cria uma nova instância do GerenciadorAtualizacoes.
   *
   * @param {HTMLElement} host - Elemento host do componente.
   * @param {Object<string, HTMLElement>} refs - Referências DOM criadas pelo GerenciadorDOM.
   */
  constructor(host, refs) {
    this.#host = host;
    this.#refs = refs;
    this.#estado = new GerenciadorEstado(host);
    this.#formatador = new GerenciadorFormatacao(host);
  }

  // =============================
  // === MÉTODOS DE ATUALIZAÇÃO ===
  // =============================

  /**
   * Atualiza o título principal do KPI.
   * Define também o atributo `aria-labelledby` para acessibilidade.
   *
   * @example
   * // <meu-kpi titulo="Teste">
   * atualizarTitulo(); // exibe "Teste" e atualiza aria-labelledby
   *
   * @returns {void}
   */
  atualizarTitulo() {
    const titulo = this.#estado.obter("titulo", "KPI");
    this.#refs.titulo.textContent = titulo;
    this.#host.setAttribute("aria-labelledby", this.#refs.titulo.id);
  }

  /**
   * Atualiza o subtítulo do KPI, exibindo-o apenas se houver conteúdo.
   *
   * @returns {void}
   */
  atualizarSubtitulo() {
    this.#atualizarTextoOpcional(
      this.#refs.subtitulo,
      this.#estado.obter("subtitulo")
    );
  }

  /**
   * Atualiza o ícone do KPI.
   * Oculta o elemento se o atributo `icone` não estiver presente.
   *
   * @returns {void}
   */
  atualizarIcone() {
    const icone = this.#estado.obter("icone");
    this.#refs.icone.textContent = icone;
    this.#refs.icone.style.display = icone ? "" : "none";
  }

  /**
   * Atualiza o valor principal da KPI.
   * Formata o valor numericamente, reinicia a animação de transição,
   * anuncia a mudança para leitores de tela e emite um evento customizado.
   *
   * @fires GerenciadorAtualizacoes#kpi-valor-mudou
   * @returns {void}
   */
  atualizarValor() {
    const valor = this.#estado.obter("obrigatorio", "0");
    const valorFormatado = this.#formatador.formatarNumero(valor);

    this.#refs.valor.textContent = valorFormatado;
    this.#reiniciarAnimacao(this.#refs.valor);

    // Acessibilidade: notifica leitores de tela
    this.#anunciar(`Valor atualizado para ${valorFormatado}`);

    // Evento customizado (para integração externa)
    this.#emitirEvento("kpi-valor-mudou", {
      valor,
      valorFormatado,
    });
  }

  /**
   * Atualiza a variação percentual do KPI (ex: “↑ 2.5%”).
   * Aplica classes de estilo para positivo/negativo e ajusta descrições ARIA.
   *
   * @returns {void}
   */
  atualizarVariacao() {
    const variacao = this.#estado.obter("variacao");
    const formatado = this.#formatador.formatarVariacao(variacao);

    if (!formatado) {
      this.#refs.variacao.style.display = "none";
      this.#refs.variacao.classList.remove("positivo", "negativo");
      this.#refs.variacao.removeAttribute("aria-label");
      return;
    }

    this.#refs.variacao.textContent = formatado.texto;
    this.#refs.variacao.classList.toggle("positivo", formatado.ehPositivo);
    this.#refs.variacao.classList.toggle("negativo", !formatado.ehPositivo);
    this.#refs.variacao.style.display = "";

    const descricao = formatado.ehPositivo
      ? `Aumento de ${Math.abs(parseFloat(variacao))} por cento`
      : `Diminuição de ${Math.abs(parseFloat(variacao))} por cento`;
    this.#refs.variacao.setAttribute("aria-label", descricao);
  }

  /**
   * Atualiza a barra de progresso, percentual e rótulos ARIA.
   * Oculta o progresso se os dados forem inválidos.
   *
   * @returns {void}
   */
  atualizarProgresso() {
    const valor = this.#estado.obterNumero("progresso");
    const maximo = this.#estado.obterNumero("progresso-maximo", 100);
    const formatado = this.#formatador.calcularProgresso(valor, maximo);

    if (!formatado) {
      this.#refs.progressoContainer.style.display = "none";
      return;
    }

    this.#refs.progressoPercentual.textContent = `${formatado.percentual}%`;
    this.#refs.progressoPreenchimento.style.width = `${formatado.largura}%`;

    // Atualiza atributos ARIA dinamicamente
    this.#refs.progressoContainer.setAttribute(
      "aria-valuenow",
      formatado.percentual
    );
    this.#refs.progressoContainer.setAttribute(
      "aria-label",
      `Progresso: ${formatado.percentual} por cento de ${maximo}`
    );

    this.#refs.progressoContainer.style.display = "";
  }

  /**
   * Atualiza o texto do rodapé, exibindo apenas se houver conteúdo.
   *
   * @returns {void}
   */
  atualizarRodape() {
    this.#atualizarTextoOpcional(
      this.#refs.rodape,
      this.#estado.obter("rodape")
    );
  }

  /**
   * Atualiza a cor principal do componente, aplicando-a via CSS custom property.
   * Usa o valor padrão `CONFIG.CORES.PRIMARIA` se nenhum for definido.
   *
   * @returns {void}
   */
  atualizarCor() {
    this.#host.style.setProperty(
      "--kpi-cor",
      this.#estado.obter("cor", CONFIG.CORES.PRIMARIA)
    );
  }

  // ============================
  // === MÉTODOS AUXILIARES ====
  // ============================

  /**
   * Exibe ou oculta um elemento dependendo da presença de texto.
   *
   * @param {HTMLElement} elemento - Elemento DOM a ser atualizado.
   * @param {string} texto - Conteúdo textual opcional.
   * @private
   */
  #atualizarTextoOpcional(elemento, texto) {
    const temConteudo = !!(texto && String(texto).trim());
    elemento.style.display = temConteudo ? "" : "none";
    if (temConteudo) elemento.textContent = texto;
  }

  /**
   * Reinicia a animação CSS de um elemento.
   * Técnica comum para reanimar transições controladas via classe.
   *
   * @param {HTMLElement} elemento - Elemento alvo da animação.
   * @private
   */
  #reiniciarAnimacao(elemento) {
    elemento.classList.remove("animar");
    requestAnimationFrame(() => elemento.classList.add("animar"));
  }

  /**
   * Anuncia mensagens para a região de acessibilidade (screen readers).
   *
   * @param {string} mensagem - Texto a ser anunciado.
   * @private
   */
  #anunciar(mensagem) {
    if (this.#refs.regiaoAnuncio) {
      this.#refs.regiaoAnuncio.textContent = mensagem;
    }
  }

  /**
   * Emite um evento customizado no host, permitindo integração com listeners externos.
   *
   * @event GerenciadorAtualizacoes#eventoCustomizado
   * @param {string} nome - Nome do evento customizado.
   * @param {object} dados - Dados a serem incluídos no `event.detail`.
   * @private
   */
  #emitirEvento(nome, dados) {
    this.#host.dispatchEvent(
      new CustomEvent(nome, {
        detail: dados,
        bubbles: true,
        composed: true,
        cancelable: false,
      })
    );
  }
}

/**
 * @class GerenciadorGrafico
 * @classdesc
 * Responsável pela criação, atualização e destruição de gráficos Chart.js dentro do componente KPI.
 * Carregamento eficiente apenas quando necessário. Também gerencia atualização incremental de dados e controle de cores.
 *
 * Atua como uma camada de visualização numérica e visual (data visualization layer),
 * conectando o estado do componente com representações gráficas dinâmicas.
 */
class GerenciadorGrafico {
  /**
   * Elemento host do componente.
   * @type {HTMLElement}
   * @private
   */
  #host;

  /**
   * Cache de referências DOM relevantes ao gráfico.
   * @type {Object<string, HTMLElement>}
   * @private
   */
  #refs;

  /**
   * Instância atual do gráfico Chart.js.
   * @type {Chart|null}
   * @private
   */
  #instancia = null;

  /**
   * Flag de controle para indicar se Chart.js já foi carregado.
   * @type {boolean}
   * @private
   */
  #chartJsCarregado = false;

  /**
   * Flag de controle de carregamento para evitar chamadas concorrentes de importação.
   * @type {boolean}
   * @private
   */
  #carregando = false;

  /**
   * Cria uma nova instância do GerenciadorGrafico.
   *
   * @param {HTMLElement} host - Elemento host do componente.
   * @param {Object<string, HTMLElement>} refs - Referências aos elementos DOM do gráfico.
   */
  constructor(host, refs) {
    this.#host = host;
    this.#refs = refs;
  }

  /**
   * Atualiza o gráfico com base nos atributos `tipo-grafico` e `dados-grafico`.
   * Garante que o Chart.js seja carregado sob demanda e atualiza ou recria a instância conforme necessário.
   *
   * @async
   * @param {boolean} [forcarRecriacao=false] - Se verdadeiro, força a recriação completa do gráfico.
   * @returns {Promise<void>}
   */
  async atualizar(forcarRecriacao = false) {
    const tipo = this.#host.getAttribute("tipo-grafico");
    const dadosJson = this.#host.getAttribute("dados-grafico");

    if (!tipo || !dadosJson) {
      this.#remover();
      return;
    }

    // Lazy loading do Chart.js
    await this.#garantirChartJS();

    if (!globalThis.Chart) {
      this.#refs.graficoContainer.style.display = "none";
      return;
    }

    const dados = this.#parsearDados(dadosJson);
    const cor = this.#obterCor();

    if (this.#deveRecriar(tipo, forcarRecriacao)) {
      this.#criar(tipo, dados, cor);
    } else {
      this.#atualizarExistente(tipo, dados, cor);
    }

    this.#refs.graficoContainer.style.display = "";
  }

  /**
   * Destroi a instância atual do gráfico, liberando memória.
   *
   * @returns {void}
   */
  destruir() {
    if (this.#instancia) {
      this.#instancia.destroy();
      this.#instancia = null;
    }
  }

  /**
   * Garante que a biblioteca Chart.js esteja carregada, evitando duplicidade.
   * Caso já esteja em processo de carregamento, aguarda a conclusão.
   *
   * @private
   * @async
   * @returns {Promise<void>}
   */
  async #garantirChartJS() {
    if (this.#chartJsCarregado || globalThis.Chart) {
      this.#chartJsCarregado = true;
      return;
    }

    if (this.#carregando) {
      // Aguarda carregamento em andamento
      while (this.#carregando) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return;
    }

    this.#carregando = true;

    try {
      await this.#carregarScript(CONFIG.CDN.CHARTJS);
      this.#chartJsCarregado = true;
      console.log("[GerenciadorGrafico] Chart.js carregado com sucesso");
    } catch (erro) {
      console.error("Falha ao carregar Chart.js:", erro);
    } finally {
      this.#carregando = false;
    }
  }

  /**
   * Carrega dinamicamente um script JS a partir de uma URL.
   *
   * @private
   * @param {string} url - URL do script a ser carregado.
   * @returns {Promise<void>} Resolve quando o script for carregado com sucesso.
   */
  #carregarScript(url) {
    return new Promise((resolver, rejeitar) => {
      const existente = document.querySelector(`script[src="${url}"]`);
      if (existente) {
        resolver();
        return;
      }

      const script = document.createElement("script");
      script.src = url;
      script.onload = () => resolver();
      script.onerror = () => rejeitar(new Error(`Falha ao carregar ${url}`));
      document.head.appendChild(script);
    });
  }

  /**
   * Remove o gráfico atual e oculta o container visual.
   *
   * @private
   * @returns {void}
   */
  #remover() {
    this.destruir();
    this.#refs.graficoContainer.style.display = "none";
  }

  /**
   * Faz o parse dos dados JSON do atributo `dados-grafico`.
   *
   * @private
   * @param {string} json - String JSON contendo labels e values.
   * @returns {{labels: string[], values: number[]}} Estrutura de dados do gráfico.
   */
  #parsearDados(json) {
    try {
      return JSON.parse(json) || { labels: [], values: [] };
    } catch {
      console.warn("[GerenciadorGrafico] Dados de gráfico inválidos");
      return { labels: [], values: [] };
    }
  }

  /**
   * Obtém a cor atual do componente a partir da variável CSS `--kpi-cor`.
   *
   * @private
   * @returns {string} Cor principal a ser usada no gráfico.
   */
  #obterCor() {
    return (
      getComputedStyle(this.#host).getPropertyValue("--kpi-cor").trim() ||
      CONFIG.CORES.PRIMARIA
    );
  }

  /**
   * Verifica se o gráfico precisa ser recriado (por tipo diferente ou forçamento manual).
   *
   * @private
   * @param {string} tipo - Tipo do gráfico (ex: 'line', 'doughnut').
   * @param {boolean} forcar - Se verdadeiro, força recriação.
   * @returns {boolean} Verdadeiro se deve recriar o gráfico.
   */
  #deveRecriar(tipo, forcar) {
    return !this.#instancia || (forcar && this.#instancia.config.type !== tipo);
  }

  /**
   * Cria uma nova instância de gráfico Chart.js.
   *
   * @private
   * @param {string} tipo - Tipo do gráfico.
   * @param {{labels: string[], values: number[]}} dados - Dados a serem exibidos.
   * @param {string} cor - Cor principal do gráfico.
   * @returns {void}
   */
  #criar(tipo, dados, cor) {
    this.destruir();

    this.#instancia = new Chart(this.#refs.graficoCanvas, {
      type: tipo,
      data: {
        labels: dados.labels || [],
        datasets: [
          {
            data: dados.values || [],
            borderColor: cor,
            backgroundColor: this.#obterCorFundo(tipo, cor),
            fill: tipo === "line",
            tension: 0.4,
            borderWidth: 2,
          },
        ],
      },
      options: this.#obterOpcoes(tipo),
    });
  }

  /**
   * Atualiza uma instância existente de gráfico sem recriá-la.
   *
   * @private
   * @param {string} tipo - Tipo do gráfico.
   * @param {{labels: string[], values: number[]}} dados - Novos dados.
   * @param {string} cor - Nova cor principal.
   * @returns {void}
   */
  #atualizarExistente(tipo, dados, cor) {
    const dataset = this.#instancia.data.datasets[0];

    this.#instancia.data.labels = dados.labels || [];
    dataset.data = dados.values || [];
    dataset.borderColor = cor;
    dataset.backgroundColor = this.#obterCorFundo(tipo, cor);

    this.#instancia.update("none");
  }

  /**
   * Retorna a cor de fundo apropriada para o tipo de gráfico.
   *
   * @private
   * @param {string} tipo - Tipo de gráfico (ex: 'line', 'doughnut').
   * @param {string} cor - Cor principal.
   * @returns {string|string[]} Cor de fundo (ou array de cores para gráficos de pizza/doughnut).
   */
  #obterCorFundo(tipo, cor) {
    const cores = {
      line: `${cor}20`,
      doughnut: [cor, CONFIG.CORES.PROGRESSO_FUNDO],
    };
    return cores[tipo] || cor;
  }

  /**
   * Retorna o objeto de opções do Chart.js conforme o tipo de gráfico.
   *
   * @private
   * @param {string} tipo - Tipo do gráfico (ex: 'line', 'doughnut').
   * @returns {object} Objeto de configuração Chart.js.
   */
  #obterOpcoes(tipo) {
    const base = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
    };

    if (tipo === "doughnut") return base;

    return {
      ...base,
      scales: {
        x: { display: false, grid: { display: false } },
        y: { display: false, grid: { display: false } },
      },
    };
  }
}

/**
 * @class GerenciadorEstilos
 * @classdesc
 * Responsável por gerenciar os estilos do componente, garantindo responsividade, tematização e compatibilidade com múltiplos dispositivos.
 *
 * Atua como um *loader adaptativo de CSS*, capaz de:
 * - Detectar o tipo de dispositivo (mobile, tablet, desktop);
 * - Carregar folhas de estilo específicas sob demanda;
 * - Inserir CSS inline com variáveis e animações otimizadas;
 */
class GerenciadorEstilos {
  /**
   * Raiz do componente onde os estilos serão aplicados (geralmente o Shadow Root).
   * @type {ShadowRoot|HTMLElement}
   * @private
   */
  #raiz;

  /**
   * Nome base do componente, usado para compor os nomes das folhas CSS.
   * @type {string}
   * @private
   */
  #nomeComponente;

  /**
   * Cria uma nova instância do GerenciadorEstilos.
   *
   * @param {ShadowRoot|HTMLElement} raiz - Nó raiz onde os estilos serão anexados.
   * @param {string} [nomeComponente='kpi'] - Nome base para identificar os arquivos CSS.
   */
  constructor(raiz, nomeComponente = "kpi") {
    this.#raiz = raiz;
    this.#nomeComponente = nomeComponente;
  }

  /**
   * Carrega todos os estilos necessários conforme o tipo de dispositivo detectado.
   * Inclui:
   * - CSS base (`kpi-base.css`);
   * - CSS específico para o dispositivo (`kpi-mobile.css`, `kpi-desktop.css`, etc.);
   * - CSS inline (variáveis e animações padrão).
   *
   * @returns {void}
   */
  carregar() {
    const dispositivo = this.#detectarDispositivo();
    this.#anexarCSS("base");
    this.#anexarCSS(dispositivo);
    this.#anexarCSSInline();
  }

  /**
   * Detecta o tipo de dispositivo com base na largura da janela.
   * Utiliza os *breakpoints* definidos em `CONFIG.DISPOSITIVOS`.
   *
   * @private
   * @returns {'mobile'|'tablet'|'desktop'|'large-desktop'} Tipo de dispositivo detectado.
   */
  #detectarDispositivo() {
    const largura = window.innerWidth;
    if (largura < CONFIG.DISPOSITIVOS.MOBILE) return "mobile";
    if (largura < CONFIG.DISPOSITIVOS.TABLET) return "tablet";
    if (largura < CONFIG.DISPOSITIVOS.DESKTOP) return "desktop";
    return "large-desktop";
  }

  /**
   * Anexa uma folha de estilo externa ao componente com base no tipo fornecido.
   * Exemplo: `kpi-mobile.css`, `kpi-base.css`, etc.
   *
   * Caso o arquivo não exista, registra um aviso no console sem quebrar o fluxo.
   *
   * @private
   * @param {string} tipo - Tipo de CSS a ser carregado (ex: 'mobile', 'desktop', 'base').
   * @returns {void}
   */
  #anexarCSS(tipo) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `./${this.#nomeComponente}-${tipo}.css`;
    link.onerror = () => {
      console.warn(`CSS não encontrado: ${link.href}`);
    };
    this.#raiz.appendChild(link);
  }

  /**
   * Cria e anexa uma folha de estilo inline com variáveis, animações e responsividade.
   *
   * Inclui:
   * - Variáveis CSS (cores, espaçamento, raio, sombra);
   * - Classe `.sr-only` para acessibilidade (screen readers);
   * - Animações condicionais ao `prefers-reduced-motion`;
   * - Container Queries para responsividade avançada.
   *
   * @private
   * @returns {void}
   */
  #anexarCSSInline() {
    const style = document.createElement("style");
    style.textContent = `
      :host {
        /* Variáveis CSS para tematização */
        --kpi-cor: ${CONFIG.CORES.PRIMARIA};
        --kpi-cor-fundo: #ffffff;
        --kpi-cor-texto: #1f2937;
        --kpi-espacamento: 1rem;
        --kpi-raio: 0.5rem;
        --kpi-sombra: 0 1px 3px rgba(0,0,0,0.1);
        
        display: block;
        container-type: inline-size;
      }
      
      /* Classe para screen readers apenas */
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
      
      /* Animação respeitando prefers-reduced-motion */
      @media (prefers-reduced-motion: no-preference) {
        .kpi-valor.animar {
          animation: pulsar 0.3s ease-in-out;
        }
        
        @keyframes pulsar {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      }
      
      /* Container Query para responsividade */
      @container (max-width: 300px) {
        .kpi-cabecalho {
          flex-direction: column;
        }
      }
    `;
    this.#raiz.appendChild(style);
  }
}

/**
 * @class CartaoKPI
 * @classdesc
 * Componente Web nativo (Web Component) responsável por exibir indicadores-chave de desempenho (KPI) de forma visual, interativa e acessível.
 *
 * Implementa um cartão customizável que pode incluir:
 * - Título, subtítulo e ícone personalizável;
 * - Valor principal com formatação numérica e animação opcional;
 * - Indicador de variação percentual (positiva/negativa);
 * - Barra de progresso visual;
 * - Gráficos embutidos (linha, barra, área);
 * - Rodapé informativo com descrição adicional.
 *
 * Utiliza Shadow DOM (ou Light DOM sob demanda) para encapsulamento de estilos,
 * garantindo isolamento e reutilização em diferentes contextos.
 *
 * @extends HTMLElement
 * 
 * @example
 * // Uso básico em HTML
 * <cartao-kpi 
 *   titulo="Vendas Totais"
 *   obrigatorio="15420"
 *   variacao="8.5"
 *   prefixo="R$"
 *   animar="true">
 * </cartao-kpi>
 * 
 * @example
 * // Uso programático com JavaScript
 * const kpi = document.createElement('cartao-kpi');
 * kpi.setAttribute('titulo', 'Usuários Ativos');
 * kpi.atualizarValor(3420);
 * kpi.atualizarVariacao(12.3);
 * document.body.appendChild(kpi);
 */
class CartaoKPI extends HTMLElement {
  /**
   * Flag que controla o modo de desenvolvimento.
   * Quando ativado, exibe logs detalhados no console para debugging.
   * 
   * @type {boolean}
   * @static
   * @private
   * @default false
   */
  static #modoDev = false;

  /**
   * Gerenciador responsável pelo controle de estado do componente.
   * Armazena e valida os valores dos atributos observados.
   * 
   * @type {GerenciadorEstado}
   * @private
   */
  #estado;

  /**
   * Gerenciador responsável pela manipulação do DOM.
   * Cria, atualiza e organiza a estrutura HTML do componente.
   * 
   * @type {GerenciadorDOM}
   * @private
   */
  #dom;

  /**
   * Gerenciador responsável pelas atualizações reativas do componente.
   * Sincroniza mudanças de atributos com a interface visual.
   * 
   * @type {GerenciadorAtualizacoes}
   * @private
   */
  #atualizador;

  /**
   * Gerenciador responsável pela renderização e atualização de gráficos.
   * Suporta múltiplos tipos de visualização (linha, barra, área).
   * 
   * @type {GerenciadorGrafico}
   * @private
   */
  #grafico;

  /**
   * Gerenciador responsável pelo carregamento e aplicação de estilos.
   * Garante responsividade e tematização do componente.
   * 
   * @type {GerenciadorEstilos}
   * @private
   */
  #estilos;

  /**
   * Referências diretas aos elementos DOM criados pelo componente.
   * Facilita o acesso rápido aos nós sem necessidade de queries repetidas.
   * 
   * @type {Object.<string, HTMLElement>}
   * @private
   * @property {HTMLElement} titulo - Elemento que exibe o título do KPI
   * @property {HTMLElement} valor - Elemento que exibe o valor principal
   * @property {HTMLElement} variacao - Elemento que exibe a variação percentual
   * @property {HTMLElement} progresso - Barra de progresso visual
   * @property {HTMLElement} grafico - Container do gráfico
   * @property {HTMLElement} rodape - Elemento de rodapé informativo
   */
  #refs = {};

  /**
   * Flag que indica se o componente já foi montado no DOM.
   * Previne execuções duplicadas do ciclo de vida.
   * 
   * @type {boolean}
   * @private
   * @default false
   */
  #foiMontado = false;

  /**
   * Lista de atributos HTML observados pelo componente.
   * Mudanças nesses atributos disparam o método `attributeChangedCallback`.
   * 
   * @static
   * @readonly
   * @returns {string[]} Array com nomes dos atributos observados
   */
  static get observedAttributes() {
    return [
      "titulo",
      "subtitulo",
      "icone",
      "obrigatorio",
      "prefixo",
      "sufixo",
      "variacao",
      "progresso",
      "progresso-maximo",
      "tipo-grafico",
      "dados-grafico",
      "rodape",
      "cor",
      "animar",
    ];
  }

  /**
   * Ativa o modo de desenvolvimento, habilitando logs detalhados no console.
   * Útil para debugging e monitoramento do comportamento do componente.
   * 
   * @static
   * @public
   * @returns {void}
   * 
   * @example
   * CartaoKPI.ativarModoDev();
   */
  static ativarModoDev() {
    this.#modoDev = true;
    console.log("[CartaoKPI] Modo de desenvolvimento ativado");
  }

  /**
   * Registra mensagens no console apenas quando o modo de desenvolvimento está ativo.
   * Evita poluição do console em ambiente de produção.
   * 
   * @static
   * @private
   * @param {...*} args - Argumentos a serem registrados no log
   * @returns {void}
   */
  static #log(...args) {
    if (this.#modoDev) {
      console.log("[CartaoKPI]", ...args);
    }
  }

  /**
   * Construtor do componente.
   * Inicializa todos os gerenciadores, configura o Shadow DOM e carrega os estilos base.
   * 
   * @constructor
   */
  constructor() {
    super();

    CartaoKPI.#log("Construtor chamado");

    // Configura raiz (Shadow DOM ou Light DOM)
    const raiz = this.#configurarRaiz();

    // Inicializa gerenciadores
    this.#estado = new GerenciadorEstado(this);
    this.#dom = new GerenciadorDOM(this, raiz);
    this.#estilos = new GerenciadorEstilos(raiz);

    // Carrega estilos
    this.#estilos.carregar();

    // Configura ARIA base
    this.setAttribute("role", "article");
  }

  /**
   * Configura o tipo de DOM a ser utilizado pelo componente.
   * 
   * Por padrão, usa Light DOM para maior compatibilidade.
   * Se o atributo `usar-sombra` estiver presente, cria um Shadow DOM.
   * O atributo `sombra-aberta` controla o modo do Shadow DOM (open/closed).
   * 
   * @private
   * @returns {ShadowRoot|HTMLElement} Raiz onde o conteúdo será renderizado
   */
  #configurarRaiz() {
    if (this.hasAttribute("usar-sombra")) {
      const modo = this.hasAttribute("sombra-aberta") ? "open" : "closed";
      CartaoKPI.#log("Usando Shadow DOM:", modo);
      return this.attachShadow({ mode: modo });
    }
    CartaoKPI.#log("Usando Light DOM");
    return this;
  }

  /**
   * Verifica se as animações devem ser desabilitadas.
   * 
   * Respeita tanto a preferência do sistema operacional (`prefers-reduced-motion`)
   * quanto o atributo `animar` do componente, garantindo acessibilidade.
   * 
   * @private
   * @returns {boolean} `true` se animações devem ser puladas, `false` caso contrário
   */
  #devePularAnimacao() {
    // Respeita preferência do sistema
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return true;
    }

    // Respeita atributo do componente
    return this.getAttribute("animar") === "false";
  }


  /**
   * Callback executado quando o componente é inserido no DOM.
   * 
   * Realiza a montagem completa do componente:
   * - Cria a estrutura HTML via `GerenciadorDOM`;
   * - Inicializa gerenciadores que dependem do DOM montado;
   * - Aplica o estado inicial baseado nos atributos HTML;
   * - Executa animação do valor principal (se permitido);
   * - Emite evento customizado `kpi-pronto`.
   * 
   * Previne execuções múltiplas através da flag `#foiMontado`.
   * 
   * @public
   * @returns {void}
   * 
   * @fires CartaoKPI#kpi-pronto
   */
  connectedCallback() {
    if (this.#foiMontado) return;

    CartaoKPI.#log("Componente conectado ao DOM");

    // Monta estrutura
    this.#refs = this.#dom.montar();

    // Inicializa gerenciadores que dependem do DOM
    this.#atualizador = new GerenciadorAtualizacoes(this, this.#refs);
    this.#grafico = new GerenciadorGrafico(this, this.#refs);

    // Aplica estado inicial
    this.#aplicarEstadoInicial();

    // Anima valor se permitido
    if (!this.#devePularAnimacao()) {
      this.#animarValor();
    }

    this.#foiMontado = true;

    // Emite evento de pronto
    this.dispatchEvent(
      new CustomEvent("kpi-pronto", {
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Callback executado quando o componente é removido do DOM.
   * 
   * Realiza limpeza de recursos:
   * - Destrói instâncias de gráficos para liberar memória;
   * - Remove event listeners pendentes;
   * - Evita memory leaks em aplicações SPA.
   * 
   * @public
   * @returns {void}
   */
  disconnectedCallback() {
    CartaoKPI.#log("Componente desconectado do DOM");
    this.#grafico?.destruir();
  }

  /**
   * Callback executado quando um atributo observado é modificado.
   * 
   * Implementa o sistema reativo do componente, mapeando cada atributo
   * para sua respectiva função de atualização no `GerenciadorAtualizacoes`.
   * 
   * Ignora mudanças antes do componente ser montado para evitar erros.
   * 
   * @public
   * @param {string} nome - Nome do atributo modificado
   * @param {string|null} anterior - Valor anterior do atributo
   * @param {string|null} novo - Novo valor do atributo
   * @returns {void}
   */
  attributeChangedCallback(nome, anterior, novo) {
    if (!this.#foiMontado) return;

    CartaoKPI.#log(`Atributo "${nome}" mudou:`, { anterior, novo });

    const acoes = {
      titulo: () => this.#atualizador.atualizarTitulo(),
      subtitulo: () => this.#atualizador.atualizarSubtitulo(),
      icone: () => this.#atualizador.atualizarIcone(),
      obrigatorio: () => this.#atualizador.atualizarValor(),
      prefixo: () => this.#atualizador.atualizarValor(),
      sufixo: () => this.#atualizador.atualizarValor(),
      variacao: () => this.#atualizador.atualizarVariacao(),
      progresso: () => this.#atualizador.atualizarProgresso(),
      "progresso-maximo": () => this.#atualizador.atualizarProgresso(),
      "tipo-grafico": () => this.#grafico.atualizar(true),
      "dados-grafico": () => this.#grafico.atualizar(false),
      rodape: () => this.#atualizador.atualizarRodape(),
      cor: () => this.#atualizador.atualizarCor(),
    };

    acoes[nome]?.();
  }

  /**
   * Aplica o estado inicial do componente após montagem no DOM.
   * 
   * Sincroniza todos os atributos HTML com seus respectivos elementos visuais,
   * garantindo que o componente seja renderizado corretamente na primeira exibição.
   * 
   * @private
   * @returns {void}
   */
  #aplicarEstadoInicial() {
    this.#atualizador.atualizarTitulo();
    this.#atualizador.atualizarSubtitulo();
    this.#atualizador.atualizarIcone();
    this.#atualizador.atualizarValor();
    this.#atualizador.atualizarVariacao();
    this.#atualizador.atualizarProgresso();
    this.#atualizador.atualizarRodape();
    this.#atualizador.atualizarCor();
    this.#grafico.atualizar(true);
  }

  /**
   * Anima o valor principal de zero até o número final.
   * 
   * Cria um efeito visual de "contagem progressiva", aumentando gradualmente
   * o valor exibido em pequenos incrementos durante um período definido.
   * 
   * A animação é pulada se:
   * - O valor contém letras (texto não numérico);
   * - O usuário tem `prefers-reduced-motion` ativado;
   * - O atributo `animar` está definido como `false`.
   * 
   * @private
   * @returns {void}
   */
  #animarValor() {
    const valorFinal = this.#estado.obterNumero("obrigatorio", 0);
    const contemLetras = /\D/.test(this.getAttribute("obrigatorio"));

    // Não anima texto
    if (contemLetras) return;

    let valorAtual = 0;
    const incremento = valorFinal / CONFIG.ANIMACAO.PASSOS;
    const intervalo = CONFIG.ANIMACAO.DURACAO / CONFIG.ANIMACAO.PASSOS;

    const executarPasso = () => {
      valorAtual = Math.min(valorFinal, valorAtual + incremento);

      const formatador = new GerenciadorFormatacao(this);
      this.#refs.valor.textContent = formatador.formatarNumero(valorAtual);

      if (valorAtual < valorFinal) {
        setTimeout(executarPasso, intervalo);
      }
    };

    executarPasso();
  }

  // ========================================================================
  // API PÚBLICA
  // ========================================================================

  /**
   * Atualiza o valor principal do KPI.
   * 
   * Aceita tanto valores numéricos quanto strings formatadas (ex: "15K", "2.5M").
   * O componente automaticamente formata o valor conforme configurado.
   * 
   * @public
   * @param {number|string} valor - Novo valor a ser exibido
   * @returns {void}
   * 
   * @example
   * kpi.atualizarValor(1500);
   * kpi.atualizarValor('15K');
   * kpi.atualizarValor('R$ 2.500,00');
   */
  atualizarValor(valor) {
    this.setAttribute("obrigatorio", valor);
  }

  /**
   * Atualiza o indicador de variação percentual.
   * 
   * Valores positivos exibem seta para cima (↑) e cor verde.
   * Valores negativos exibem seta para baixo (↓) e cor vermelha.
   * 
   * @public
   * @param {number} valor - Variação percentual (positiva ou negativa)
   * @returns {void}
   * 
   * @example
   * kpi.atualizarVariacao(8.4);   // ↑ 8.4% (verde)
   * kpi.atualizarVariacao(-3.2);  // ↓ 3.2% (vermelho)
   * kpi.atualizarVariacao(0);     // 0% (neutro)
   */
  atualizarVariacao(valor) {
    this.setAttribute("variacao", valor);
  }

  /**
   * Atualiza a barra de progresso visual.
   * 
   * Calcula automaticamente o percentual com base no valor e máximo fornecidos.
   * Se o máximo não for especificado, assume 100 como padrão.
   * 
   * @public
   * @param {number} valor - Valor atual do progresso
   * @param {number} [maximo] - Valor máximo (padrão: 100)
   * @returns {void}
   * 
   * @example
   * kpi.atualizarProgresso(45);       // 45% de 100
   * kpi.atualizarProgresso(45, 120);  // 37.5% de 120
   * kpi.atualizarProgresso(150, 100); // 100% (limitado ao máximo)
   */
  atualizarProgresso(valor, maximo) {
    if (valor !== undefined) {
      this.setAttribute("progresso", valor);
    }
    if (maximo !== undefined) {
      this.setAttribute("progresso-maximo", maximo);
    }
  }

  /**
   * Atualiza os dados do gráfico embutido.
   * 
   * Aceita um objeto com rótulos (labels) e valores (values).
   * O tipo de gráfico é definido pelo atributo `tipo-grafico`.
   * 
   * @public
   * @param {Object} dados - Dados do gráfico
   * @param {string[]} dados.labels - Rótulos do eixo X
   * @param {number[]} dados.values - Valores do eixo Y
   * @returns {void}
   * 
   * @example
   * kpi.atualizarGrafico({
   *   labels: ['Jan', 'Fev', 'Mar', 'Abr'],
   *   values: [10, 20, 15, 30]
   * });
   */
  atualizarGrafico(dados) {
    this.setAttribute("dados-grafico", JSON.stringify(dados));
  }

  /**
   * Obtém o valor atual do KPI.
   * 
   * Retorna o valor bruto do atributo `obrigatorio`, sem formatação.
   * 
   * @public
   * @returns {string|null} Valor atual ou null se não definido
   * 
   * @example
   * const valor = kpi.obterValor(); // "1500"
   */
  obterValor() {
    return this.getAttribute("obrigatorio");
  }

  /**
   * Obtém a variação percentual atual.
   * 
   * Converte o valor para número. Retorna `null` se não for um número válido.
   * 
   * @public
   * @returns {number|null} Variação percentual ou null
   * 
   * @example
   * const variacao = kpi.obterVariacao(); // 8.4 ou null
   */
  obterVariacao() {
    const variacao = parseFloat(this.getAttribute("variacao"));
    return Number.isFinite(variacao) ? variacao : null;
  }

  /**
   * Obtém os dados atuais da barra de progresso.
   * 
   * Retorna um objeto contendo o valor, máximo e percentual calculado.
   * O percentual é sempre limitado entre 0 e 100.
   * 
   * @public
   * @returns {Object} Dados do progresso
   * @returns {number} .valor - Valor atual
   * @returns {number} .maximo - Valor máximo
   * @returns {number} .percentual - Percentual calculado (0-100)
   * 
   * @example
   * const progresso = kpi.obterProgresso();
   * // { valor: 45, maximo: 100, percentual: 45 }
   */
  obterProgresso() {
    const valor = this.#estado.obterNumero("progresso");
    const maximo = this.#estado.obterNumero("progresso-maximo", 100);
    const percentual = Math.max(0, Math.min(100, (valor / maximo) * 100));

    return { valor, maximo, percentual };
  }

  /**
   * Redefine o componente para o estado inicial padrão.
   * 
   * Remove todos os dados opcionais e reseta o valor principal para zero.
   * Útil para limpar o estado antes de reutilizar o componente.
   * 
   * Emite o evento customizado `kpi-redefinido` após a conclusão.
   * 
   * @public
   * @returns {void}
   * 
   * @fires CartaoKPI#kpi-redefinido
   * 
   * @example
   * kpi.redefinir();
   * // KPI volta ao estado inicial: valor = 0, sem variação, sem progresso
   */
  redefinir() {
    this.setAttribute("obrigatorio", "0");
    this.removeAttribute("variacao");
    this.removeAttribute("progresso");
    this.removeAttribute("dados-grafico");

    CartaoKPI.#log("Componente redefinido");

    this.dispatchEvent(
      new CustomEvent("kpi-redefinido", {
        bubbles: true,
        composed: true,
      })
    );
  }
}

/**
 * Evento emitido quando o componente termina de montar e está pronto para uso.
 * 
 * @event CartaoKPI#kpi-pronto
 * @type {CustomEvent}
 * @property {boolean} bubbles - Sempre `true`, permite propagação no DOM
 * @property {boolean} composed - Sempre `true`, atravessa Shadow DOM boundaries
 * 
 * @example
 * kpi.addEventListener('kpi-pronto', () => {
 *   console.log('KPI está pronto!');
 * });
 */

/**
 * Evento emitido quando o componente é redefinido para o estado inicial.
 * 
 * @event CartaoKPI#kpi-redefinido
 * @type {CustomEvent}
 * @property {boolean} bubbles - Sempre `true`, permite propagação no DOM
 * @property {boolean} composed - Sempre `true`, atravessa Shadow DOM boundaries
 * 
 * @example
 * kpi.addEventListener('kpi-redefinido', () => {
 *   console.log('KPI foi redefinido');
 * });
 */

/**
 * ============================================================================
 * REGISTRO DO COMPONENTE
 * ============================================================================
 */

// Verifica se já foi registrado
if (!customElements.get("cartao-kpi")) {
  customElements.define("cartao-kpi", CartaoKPI);
  console.log("✓ CartaoKPI v2.0.0 registrado com sucesso");
} else {
  console.warn("CartaoKPI já está registrado");
}

export { CartaoKPI, CONFIG };

/**
 * ============================================================================
 * EXEMPLOS DE USO
 * ============================================================================
 *
 * 1. USO BÁSICO:
 * ---------------
 * <cartao-kpi
 *   obrigatorio="12345"
 *   titulo="Vendas Mensais"
 *   variacao="8.4"
 * ></cartao-kpi>
 *
 *
 * 2. COM GRÁFICO:
 * ---------------
 * <cartao-kpi
 *   obrigatorio="45678"
 *   titulo="Usuários Ativos"
 *   tipo-grafico="line"
 *   dados-grafico='{"labels":["Jan","Fev","Mar"],"values":[100,150,120]}'
 * ></cartao-kpi>
 *
 *
 * 3. COM PROGRESSO:
 * -----------------
 * <cartao-kpi
 *   obrigatorio="75"
 *   titulo="Meta do Trimestre"
 *   progresso="75"
 *   progresso-maximo="100"
 * ></cartao-kpi>
 *
 *
 * 4. COM SLOTS CUSTOMIZADOS:
 * --------------------------
 * <cartao-kpi obrigatorio="1000" titulo="Vendas">
 *   <button slot="acoes" onclick="alert('Detalhes!')">
 *     Ver Detalhes
 *   </button>
 *   <p slot="rodape">Atualizado há 5 minutos</p>
 * </cartao-kpi>
 *
 *
 * 5. ESCUTANDO EVENTOS:
 * ---------------------
 * const kpi = document.querySelector('cartao-kpi');
 *
 * kpi.addEventListener('kpi-pronto', () => {
 *   console.log('KPI está pronto!');
 * });
 *
 * kpi.addEventListener('kpi-valor-mudou', (e) => {
 *   console.log('Novo valor:', e.detail.valorFormatado);
 * });
 *
 *
 * 6. USANDO A API JAVASCRIPT:
 * ---------------------------
 * const kpi = document.querySelector('cartao-kpi');
 *
 * // Atualizar valores
 * kpi.atualizarValor(2500);
 * kpi.atualizarVariacao(-5.2);
 * kpi.atualizarProgresso(80, 150);
 *
 * // Atualizar gráfico
 * kpi.atualizarGrafico({
 *   labels: ['Q1', 'Q2', 'Q3', 'Q4'],
 *   values: [10, 25, 15, 30]
 * });
 *
 * // Obter valores
 * console.log(kpi.obterValor());
 * console.log(kpi.obterVariacao());
 * console.log(kpi.obterProgresso());
 *
 * // Redefinir
 * kpi.redefinir();
 *
 *
 * 7. TEMATIZAÇÃO COM CSS:
 * -----------------------
 * <style>
 *   :root {
 *     --kpi-cor: #8b5cf6;
 *     --kpi-cor-fundo: #f9fafb;
 *     --kpi-cor-texto: #111827;
 *     --kpi-espacamento: 1.5rem;
 *     --kpi-raio: 0.75rem;
 *   }
 *
 *   cartao-kpi {
 *     --kpi-cor: #ef4444;
 *   }
 * </style>
 *
 *
 * 8. MODO DESENVOLVIMENTO:
 * ------------------------
 * <script>
 *   // Ativa logs para debug
 *   CartaoKPI.ativarModoDev();
 * </script>
 *
 *
 * 9. COM SHADOW DOM:
 * ------------------
 * <cartao-kpi
 *   obrigatorio="999"
 *   usar-sombra
 *   sombra-aberta
 * ></cartao-kpi>
 *
 *
 * 10. MÚLTIPLOS KPIS EM GRID:
 * ---------------------------
 * <style>
 *   .dashboard {
 *     display: grid;
 *     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
 *     gap: 1.5rem;
 *   }
 * </style>
 *
 * <div class="dashboard">
 *   <cartao-kpi obrigatorio="12345" titulo="Vendas" variacao="8.4"></cartao-kpi>
 *   <cartao-kpi obrigatorio="789" titulo="Clientes" variacao="-2.1"></cartao-kpi>
 *   <cartao-kpi obrigatorio="45" titulo="Taxa Conv." progresso="45"></cartao-kpi>
 *   <cartao-kpi obrigatorio="98" titulo="Satisfação" variacao="12.3"></cartao-kpi>
 * </div>
 *
 * ============================================================================
 */

