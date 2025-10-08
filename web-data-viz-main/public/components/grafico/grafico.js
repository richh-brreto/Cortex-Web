/**
 * ============================================================================
 * COMPONENTE GRÁFICO
 * ============================================================================
 *
 * @version 1.0.0
 * @author Grupo01-Cortex
 * @license Cortex
 *
 * CARACTERÍSTICAS:
 * - Privacidade real com campos privados (#)
 * - CSS Custom Properties para tematização
 * - Eventos customizados para comunicação
 * - Lazy loading de Chart.js
 * - Respeita prefers-reduced-motion
 * - Modo desenvolvimento/produção
 * - Múltiplos tipos de gráfico
 * - Exportação de imagem
 *
 * EXEMPLO DE USO:
 * <grafico-dados
 *   tipo="line"
 *   titulo="Vendas Mensais"
 *   dados='{"labels":["Jan","Fev"],"datasets":[{"label":"Vendas","data":[10,20]}]}'
 *   mostrar-legenda="true"
 * ></grafico-dados>
 *
 * DEPENDÊNCIAS:
 * - Chart.js 4.4.6 (carregado automaticamente quando necessário)
 *
 * NAVEGADORES SUPORTADOS:
 * - Chrome 90+
 * - Firefox 88+
 * - Edge 90+
 * ============================================================================
 */

// ============================================================================
// CONFIGURAÇÃO GLOBAL
// ============================================================================

const CONFIG_GRAFICO = {
  // URLs de CDN para dependências
  CDN: {
    CHARTJS:
      "https://cdn.jsdelivr.net/npm/chart.js@4.5.0/dist/chart.umd.min.js",
  },

  // Paleta de cores padrão
  CORES: {
    PRIMARIA: "#3b82f6",
    PALETA: [
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#ec4899",
      "#06b6d4",
      "#84cc16",
      "#f97316",
      "#6366f1",
    ],
  },

  // Breakpoints de dispositivos
  DISPOSITIVOS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1440,
  },

  // Dimensões padrão
  DIMENSOES: {
    ALTURA: "300px",
    LARGURA: "100%",
  },
};

/**
 * @class GerenciadorEstadoGrafico
 * @classdesc
 * Gerencia o estado do componente de gráfico, centralizando acesso a atributos
 * e garantindo validação e parsing consistente.
 */
class GerenciadorEstadoGrafico {
  /**
   * Referência privada ao elemento host.
   * @type {HTMLElement}
   * @private
   */
  #host;

  /**
   * Cria uma nova instância do GerenciadorEstadoGrafico.
   * @param {HTMLElement} host - Elemento host ao qual o estado está vinculado.
   */
  constructor(host) {
    this.#host = host;
  }

  /**
   * Obtém o valor de um atributo como string.
   * @param {string} nome - Nome do atributo a ser lido.
   * @param {string} [padrao=''] - Valor padrão retornado caso o atributo não exista.
   * @returns {string} Valor do atributo ou o valor padrão.
   */
  obter(nome, padrao = "") {
    const valor = this.#host.getAttribute(nome);
    return valor == null || valor === "" ? padrao : valor;
  }

  /**
   * Obtém o valor de um atributo booleano.
   * @param {string} nome - Nome do atributo booleano.
   * @param {boolean} [padrao=false] - Valor padrão.
   * @returns {boolean} `true` se o atributo estiver presente ou for "true".
   */
  obterBooleano(nome, padrao = false) {
    const valor = this.#host.getAttribute(nome);
    if (valor === null) return padrao;
    return valor !== "false";
  }

  /**
   * Obtém e faz parse de um atributo JSON.
   * @param {string} nome - Nome do atributo.
   * @param {*} [padrao=null] - Valor padrão caso o parse falhe.
   * @returns {*} Objeto parseado ou valor padrão.
   */
  obterJSON(nome, padrao = null) {
    const valor = this.#host.getAttribute(nome);
    if (!valor) return padrao;

    try {
      return JSON.parse(valor);
    } catch (erro) {
      console.warn(
        `[GerenciadorEstadoGrafico] Erro ao parsear JSON do atributo "${nome}":`,
        erro
      );
      return padrao;
    }
  }

  /**
   * Define ou atualiza o valor de um atributo no elemento host.
   * @param {string} nome - Nome do atributo.
   * @param {string|number|boolean} valor - Valor a ser definido.
   * @returns {void}
   */
  definir(nome, valor) {
    this.#host.setAttribute(nome, valor);
  }

  /**
   * Verifica se o elemento possui um determinado atributo.
   * @param {string} nome - Nome do atributo.
   * @returns {boolean} `true` se o atributo existir.
   */
  tem(nome) {
    return this.#host.hasAttribute(nome);
  }
}

/**
 * @class GerenciadorDOMGrafico
 * @classdesc
 * Responsável por construir e gerenciar a estrutura DOM do componente de gráfico.
 */
class GerenciadorDOMGrafico {
  /**
   * Elemento host associado ao componente.
   * @type {HTMLElement}
   * @private
   */
  #host;

  /**
   * Raiz onde a estrutura será montada.
   * @type {ShadowRoot|HTMLElement}
   * @private
   */
  #raiz;

  /**
   * Cache interno de referências a elementos DOM.
   * @type {Object<string, HTMLElement>}
   * @private
   */
  #refs = {};

  /**
   * Cria uma nova instância do GerenciadorDOMGrafico.
   * @param {HTMLElement} host - Elemento host do componente.
   * @param {ShadowRoot|HTMLElement} raiz - Raiz onde os elementos serão montados.
   */
  constructor(host, raiz) {
    this.#host = host;
    this.#raiz = raiz;
  }

  /**
   * Monta toda a estrutura do componente de gráfico.
   * @returns {Object<string, HTMLElement>} Objeto com referências DOM.
   */
  montar() {
    const wrapper = this.#criarElemento("div", "grafico-wrapper");

    // Título
    const titulo = this.#criarElemento("div", "grafico-titulo");
    titulo.style.display = "none";

    // Container do canvas
    const container = this.#criarElemento("div", "grafico-container");
    container.style.position = "relative";

    // Canvas
    const canvas = document.createElement("canvas");
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", "Gráfico de dados");

    // Região para anúncios (acessibilidade)
    const regiaoAnuncio = this.#criarElemento("div", "sr-only");
    regiaoAnuncio.setAttribute("role", "status");
    regiaoAnuncio.setAttribute("aria-live", "polite");
    regiaoAnuncio.setAttribute("aria-atomic", "true");

    // Montagem
    container.appendChild(canvas);
    wrapper.append(titulo, container, regiaoAnuncio);
    this.#raiz.appendChild(wrapper);

    this.#refs = {
      wrapper,
      titulo,
      container,
      canvas,
      regiaoAnuncio,
    };

    return this.#refs;
  }

  /**
   * Cria um elemento HTML com uma classe opcional.
   * @param {string} tag - Nome da tag.
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
   * Retorna todas as referências DOM armazenadas.
   * @returns {Object<string, HTMLElement>} Dicionário de referências DOM.
   */
  obterReferencias() {
    return this.#refs;
  }
}

/**
 * @class GerenciadorAtualizacoesGrafico
 * @classdesc
 * Responsável por atualizar dinamicamente a interface do componente de gráfico.
 */
class GerenciadorAtualizacoesGrafico {
  /**
   * Elemento host do componente.
   * @type {HTMLElement}
   * @private
   */
  #host;

  /**
   * Cache de referências DOM.
   * @type {Object<string, HTMLElement>}
   * @private
   */
  #refs;

  /**
   * Instância de gerenciamento de estado.
   * @type {GerenciadorEstadoGrafico}
   * @private
   */
  #estado;

  /**
   * Cria uma nova instância do GerenciadorAtualizacoesGrafico.
   * @param {HTMLElement} host - Elemento host do componente.
   * @param {Object<string, HTMLElement>} refs - Referências DOM.
   */
  constructor(host, refs) {
    this.#host = host;
    this.#refs = refs;
    this.#estado = new GerenciadorEstadoGrafico(host);
  }

  /**
   * Atualiza o título do gráfico.
   * @returns {void}
   */
  atualizarTitulo() {
    const titulo = this.#estado.obter("titulo");
    this.#refs.titulo.textContent = titulo;
    this.#refs.titulo.style.display = titulo ? "" : "none";
  }

  /**
   * Atualiza as dimensões do container.
   * @returns {void}
   */
  atualizarDimensoes() {
    const altura = this.#estado.obter(
      "altura",
      CONFIG_GRAFICO.DIMENSOES.ALTURA
    );
    const largura = this.#estado.obter(
      "largura",
      CONFIG_GRAFICO.DIMENSOES.LARGURA
    );

    this.#refs.container.style.height = altura;
    this.#refs.wrapper.style.width = largura;
  }

  /**
   * Anuncia mensagens para leitores de tela.
   * @param {string} mensagem - Texto a ser anunciado.
   * @private
   */
  #anunciar(mensagem) {
    if (this.#refs.regiaoAnuncio) {
      this.#refs.regiaoAnuncio.textContent = mensagem;
    }
  }

  /**
   * Emite um evento customizado.
   * @param {string} nome - Nome do evento.
   * @param {object} dados - Dados do evento.
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

  /**
   * Notifica atualização de dados.
   * @param {string} tipo - Tipo do gráfico.
   * @returns {void}
   */
  notificarAtualizacao(tipo) {
    this.#anunciar(`Gráfico de ${tipo} atualizado`);
    this.#emitirEvento("grafico-atualizado", { tipo });
  }
}

/**
 * @class GerenciadorChartJS
 * @classdesc
 * Responsável pela criação, atualização e destruição de gráficos Chart.js.
 */
class GerenciadorChartJS {
  /**
   * Elemento host do componente.
   * @type {HTMLElement}
   * @private
   */
  #host;

  /**
   * Cache de referências DOM.
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
   * Flag indicando se Chart.js foi carregado.
   * @type {boolean}
   * @private
   */
  #chartJsCarregado = false;

  /**
   * Flag de controle de carregamento.
   * @type {boolean}
   * @private
   */
  #carregando = false;

  /**
   * Paleta de cores atual.
   * @type {string[]}
   * @private
   */
  #cores = [...CONFIG_GRAFICO.CORES.PALETA];

  /**
   * Cria uma nova instância do GerenciadorChartJS.
   * @param {HTMLElement} host - Elemento host do componente.
   * @param {Object<string, HTMLElement>} refs - Referências DOM.
   */
  constructor(host, refs) {
    this.#host = host;
    this.#refs = refs;
  }

  /**
   * Atualiza o gráfico.
   * @async
   * @param {boolean} [forcarRecriacao=false] - Se verdadeiro, força recriação.
   * @returns {Promise<void>}
   */
  async atualizar(forcarRecriacao = false) {
    const estado = new GerenciadorEstadoGrafico(this.#host);
    const tipo = estado.obter("tipo");
    const dados = estado.obterJSON("dados");

    if (!tipo || !dados) {
      this.#remover();
      return;
    }

    await this.#garantirChartJS();

    if (!globalThis.Chart) {
      console.error("[GerenciadorChartJS] Chart.js não disponível");
      return;
    }

    // Atualiza cores se fornecidas
    const coresCustom = estado.obterJSON("cores");
    if (coresCustom && Array.isArray(coresCustom)) {
      this.#cores = coresCustom;
    }

    if (this.#deveRecriar(tipo, forcarRecriacao)) {
      this.#criar(tipo, dados);
    } else {
      this.#atualizarExistente(dados);
    }
  }

  /**
   * Atualiza cores do gráfico.
   * @param {string[]} cores - Array de cores.
   * @returns {void}
   */
  atualizarCores(cores) {
    if (!Array.isArray(cores)) return;

    this.#cores = cores;
    this.#aplicarCores();
  }

  /**
   * Destrói a instância atual do gráfico.
   * @returns {void}
   */
  destruir() {
    if (this.#instancia) {
      this.#instancia.destroy();
      this.#instancia = null;
    }
  }

  /**
   * Exporta o gráfico como imagem base64.
   * @returns {string|null} URL da imagem ou null.
   */
  exportarImagem() {
    if (!this.#instancia) return null;
    return this.#refs.canvas.toDataURL("image/png");
  }

  /**
   * Garante que Chart.js esteja carregado.
   * @private
   * @async
   * @returns {Promise<void>}
   */
  async #garantirChartJS() {
    // Se Chart.js já está disponível globalmente, usar diretamente
    if (globalThis.Chart) {
      this.#chartJsCarregado = true;
      return;
    }

    if (this.#chartJsCarregado) {
      return;
    }

    if (this.#carregando) {
      // Aguarda carregamento em andamento
      while (this.#carregando && !globalThis.Chart) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      return;
    }

    this.#carregando = true;

    try {
      await this.#carregarScript(CONFIG_GRAFICO.CDN.CHARTJS);
      // Aguarda Chart.js estar realmente disponível
      let tentativas = 0;
      while (!globalThis.Chart && tentativas < 100) {
        await new Promise((resolve) => setTimeout(resolve, 50));
        tentativas++;
      }

      if (globalThis.Chart) {
        this.#chartJsCarregado = true;
        console.log("[GerenciadorChartJS] Chart.js carregado com sucesso");
      } else {
        throw new Error("Chart.js não ficou disponível após carregamento");
      }
    } catch (erro) {
      console.error("[GerenciadorChartJS] Falha ao carregar Chart.js:", erro);
    } finally {
      this.#carregando = false;
    }
  }

  /**
   * Carrega um script dinamicamente.
   * @private
   * @param {string} url - URL do script.
   * @returns {Promise<void>}
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
   * Remove o gráfico.
   * @private
   * @returns {void}
   */
  #remover() {
    this.destruir();
  }

  /**
   * Verifica se deve recriar o gráfico.
   * @private
   * @param {string} tipo - Tipo do gráfico.
   * @param {boolean} forcar - Se deve forçar.
   * @returns {boolean}
   */
  #deveRecriar(tipo, forcar) {
    return !this.#instancia || (forcar && this.#instancia.config.type !== tipo);
  }

  /**
   * Cria uma nova instância de gráfico.
   * @private
   * @param {string} tipo - Tipo do gráfico.
   * @param {object} dados - Dados do gráfico.
   * @returns {void}
   */
  #criar(tipo, dados) {
    this.destruir();

    const config = this.#obterConfiguracao(tipo, dados);
    this.#instancia = new Chart(this.#refs.canvas, config);
  }

  /**
   * Atualiza gráfico existente.
   * @private
   * @param {object} dados - Novos dados.
   * @returns {void}
   */
  #atualizarExistente(dados) {
    if (!this.#instancia) return;

    this.#instancia.data.labels = dados.labels || [];
    this.#instancia.data.datasets = this.#processarDatasets(
      dados.datasets || []
    );
    this.#instancia.update("none");
  }

  /**
   * Aplica cores aos datasets existentes.
   * @private
   * @returns {void}
   */
  #aplicarCores() {
    if (!this.#instancia) return;

    const estado = new GerenciadorEstadoGrafico(this.#host);
    const tipo = estado.obter("tipo", "line");

    this.#instancia.data.datasets = this.#instancia.data.datasets.map(
      (ds, idx) => {
        const cor = this.#cores[idx % this.#cores.length];
        return {
          ...ds,
          backgroundColor: this.#obterCorFundo(tipo, cor),
          borderColor: cor,
        };
      }
    );

    this.#instancia.update("none");
  }

  /**
   * Obtém configuração completa do gráfico.
   * @private
   * @param {string} tipo - Tipo do gráfico.
   * @param {object} dados - Dados do gráfico.
   * @returns {object} Configuração Chart.js.
   */
  #obterConfiguracao(tipo, dados) {
    const estado = new GerenciadorEstadoGrafico(this.#host);

    const config = {
      type: tipo,
      data: {
        labels: dados.labels || [],
        datasets: this.#processarDatasets(dados.datasets || []),
      },
      options: this.#obterOpcoes(tipo),
    };

    return config;
  }

  /**
   * Processa datasets aplicando cores e configurações.
   * @private
   * @param {Array} datasets - Array de datasets.
   * @returns {Array} Datasets processados.
   */
  #processarDatasets(datasets) {
    const estado = new GerenciadorEstadoGrafico(this.#host);
    const tipo = estado.obter("tipo", "line");

    return datasets.map((ds, idx) => {
      const cor = this.#cores[idx % this.#cores.length];

      return {
        label: ds.label || `Série ${idx + 1}`,
        data: ds.data || [],
        backgroundColor: ds.backgroundColor || this.#obterCorFundo(tipo, cor),
        borderColor: ds.borderColor || cor,
        borderWidth: ds.borderWidth || 2,
        fill:
          tipo === "line" ? (ds.fill !== undefined ? ds.fill : true) : false,
        tension: tipo === "line" ? ds.tension || 0.4 : 0,
      };
    });
  }

  /**
   * Obtém cor de fundo apropriada.
   * @private
   * @param {string} tipo - Tipo de gráfico.
   * @param {string} cor - Cor base.
   * @returns {string} Cor de fundo.
   */
  #obterCorFundo(tipo, cor) {
    if (tipo === "line" || tipo === "radar") {
      return `${cor}33`;
    }
    return cor;
  }

  /**
   * Obtém opções do gráfico.
   * @private
   * @param {string} tipo - Tipo do gráfico.
   * @returns {object} Opções Chart.js.
   */
  #obterOpcoes(tipo) {
    const estado = new GerenciadorEstadoGrafico(this.#host);

    const mostrarLegenda = estado.obterBooleano("mostrar-legenda", true);
    const posicaoLegenda = estado.obter("posicao-legenda", "top");
    const mostrarGrid = estado.obterBooleano("mostrar-grid", true);
    const animado = estado.obterBooleano("animado", true);
    const empilhado = estado.obterBooleano("empilhado", false);

    const opcoes = {
      responsive: true,
      maintainAspectRatio: false,
      animation: animado ? {} : false,
      plugins: {
        legend: {
          display: mostrarLegenda,
          position: posicaoLegenda,
        },
        tooltip: {
          enabled: true,
          mode: "index",
          intersect: false,
        },
      },
    };

    // Adiciona escalas para gráficos que as suportam
    if (["line", "bar", "radar"].includes(tipo)) {
      opcoes.scales = {
        x: {
          display: true,
          grid: { display: mostrarGrid },
          stacked: tipo !== "radar" ? empilhado : undefined,
        },
        y: {
          display: true,
          grid: { display: mostrarGrid },
          stacked: tipo !== "radar" ? empilhado : undefined,
          beginAtZero: true,
        },
      };
    }

    return opcoes;
  }
}

/**
 * @class GerenciadorEstilosGrafico
 * @classdesc
 * Responsável por gerenciar os estilos do componente de gráfico, garantindo responsividade,
 * tematização e compatibilidade com múltiplos dispositivos.
 *
 * Atua como um loader adaptativo de CSS, capaz de:
 * - Detectar o tipo de dispositivo (mobile, tablet, desktop, large-desktop);
 * - Carregar folhas de estilo específicas sob demanda;
 * - Inserir CSS inline com variáveis e animações otimizadas.
 */
class GerenciadorEstilosGrafico {
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
   * Cria uma nova instância do GerenciadorEstilosGrafico.
   * @param {ShadowRoot|HTMLElement} raiz - Nó raiz onde os estilos serão anexados.
   * @param {string} [nomeComponente='grafico'] - Nome base para identificar os arquivos CSS.
   */
  constructor(raiz, nomeComponente = "grafico") {
    this.#raiz = raiz;
    this.#nomeComponente = nomeComponente;
  }

  /**
   * Carrega todos os estilos necessários conforme o tipo de dispositivo detectado.
   * Inclui:
   * - CSS base (`grafico-base.css`);
   * - CSS específico para o dispositivo (`grafico-mobile.css`, `grafico-desktop.css`, etc.);
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
   * Utiliza os breakpoints definidos em `CONFIG_GRAFICO.DISPOSITIVOS`.
   *
   * @private
   * @returns {'mobile'|'tablet'|'desktop'|'large-desktop'} Tipo de dispositivo detectado.
   */
  #detectarDispositivo() {
    const largura = window.innerWidth;
    if (largura < CONFIG_GRAFICO.DISPOSITIVOS.MOBILE) return "mobile";
    if (largura < CONFIG_GRAFICO.DISPOSITIVOS.TABLET) return "tablet";
    if (largura < CONFIG_GRAFICO.DISPOSITIVOS.DESKTOP) return "desktop";
    return "large-desktop";
  }

  /**
   * Anexa uma folha de estilo externa ao componente com base no tipo fornecido.
   * Exemplo: `grafico-mobile.css`, `grafico-base.css`, etc.
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
        --grafico-cor-primaria: ${CONFIG_GRAFICO.CORES.PRIMARIA};
        --grafico-cor-fundo: #ffffff;
        --grafico-cor-texto: #1f2937;
        --grafico-cor-borda: #e5e7eb;
        --grafico-espacamento: 1.25rem;
        --grafico-raio: 0.75rem;
        --grafico-sombra: 0 1px 3px rgba(0, 0, 0, 0.1);
        
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
        .grafico-wrapper {
          transition: all 0.3s ease-in-out;
        }
      }
      
      /* Container Query para responsividade */
      @container (max-width: 300px) {
        .grafico-titulo {
          font-size: 1rem;
        }
      }
    `;
    this.#raiz.appendChild(style);
  }
}

/**
 * @class GraficoDados
 * @classdesc
 * Componente Web nativo para visualização de dados com Chart.js.
 *
 * @extends HTMLElement
 *
 * @example
 * <grafico-dados
 *   tipo="line"
 *   titulo="Vendas 2025"
 *   dados='{"labels":["Jan","Fev"],"datasets":[{"label":"Vendas","data":[10,20]}]}'
 * ></grafico-dados>
 */
class GraficoDados extends HTMLElement {
  /**
   * Flag de modo de desenvolvimento.
   * @type {boolean}
   * @static
   * @private
   */
  static #modoDev = false;

  /**
   * Gerenciador de estado.
   * @type {GerenciadorEstadoGrafico}
   * @private
   */
  #estado;

  /**
   * Gerenciador de DOM.
   * @type {GerenciadorDOMGrafico}
   * @private
   */
  #dom;

  /**
   * Gerenciador de atualizações.
   * @type {GerenciadorAtualizacoesGrafico}
   * @private
   */
  #atualizador;

  /**
   * Gerenciador de Chart.js.
   * @type {GerenciadorChartJS}
   * @private
   */
  #grafico;

  /**
   * Gerenciador de estilos.
   * @type {GerenciadorEstilosGrafico}
   * @private
   */
  #estilos;

  /**
   * Referências DOM.
   * @type {Object<string, HTMLElement>}
   * @private
   */
  #refs = {};

  /**
   * Flag de montagem.
   * @type {boolean}
   * @private
   */
  #foiMontado = false;

  /**
   * Lista de atributos observados.
   * @static
   * @readonly
   * @returns {string[]}
   */
  static get observedAttributes() {
    return [
      "tipo",
      "dados",
      "titulo",
      "altura",
      "largura",
      "mostrar-legenda",
      "posicao-legenda",
      "mostrar-grid",
      "cores",
      "animado",
      "empilhado",
    ];
  }

  /**
   * Ativa o modo de desenvolvimento.
   * @static
   * @public
   * @returns {void}
   */
  static ativarModoDev() {
    this.#modoDev = true;
    console.log("[GraficoDados] Modo de desenvolvimento ativado");
  }

  /**
   * Registra logs em modo dev.
   * @static
   * @private
   * @param {...*} args
   * @returns {void}
   */
  static #log(...args) {
    if (this.#modoDev) {
      console.log("[GraficoDados]", ...args);
    }
  }

  /**
   * Construtor do componente.
   * @constructor
   */
  constructor() {
    super();

    GraficoDados.#log("Construtor chamado");

    // Configura raiz
    const raiz = this.#configurarRaiz();

    // Inicializa gerenciadores
    this.#estado = new GerenciadorEstadoGrafico(this);
    this.#dom = new GerenciadorDOMGrafico(this, raiz);
    this.#estilos = new GerenciadorEstilosGrafico(raiz);

    // Carrega estilos
    this.#estilos.carregar();

    // Configura ARIA base
    this.setAttribute("role", "img");
    this.setAttribute("aria-label", "Componente de gráfico de dados");
  }

  /**
   * Configura o tipo de DOM (Shadow ou Light).
   * @private
   * @returns {ShadowRoot|HTMLElement}
   */
  #configurarRaiz() {
    if (this.hasAttribute("usar-sombra")) {
      const modo = this.hasAttribute("sombra-aberta") ? "open" : "closed";
      GraficoDados.#log("Usando Shadow DOM:", modo);
      return this.attachShadow({ mode: modo });
    }
    GraficoDados.#log("Usando Light DOM");
    return this;
  }

  /**
   * Callback executado quando conectado ao DOM.
   * @public
   * @returns {void}
   */
  connectedCallback() {
    if (this.#foiMontado) return;

    GraficoDados.#log("Componente conectado ao DOM");

    // Monta estrutura
    this.#refs = this.#dom.montar();

    // Inicializa gerenciadores dependentes do DOM
    this.#atualizador = new GerenciadorAtualizacoesGrafico(this, this.#refs);
    this.#grafico = new GerenciadorChartJS(this, this.#refs);

    // Aplica estado inicial
    this.#aplicarEstadoInicial();

    this.#foiMontado = true;

    // Emite evento de pronto
    this.dispatchEvent(
      new CustomEvent("grafico-pronto", {
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * Callback executado quando desconectado do DOM.
   * @public
   * @returns {void}
   */
  disconnectedCallback() {
    GraficoDados.#log("Componente desconectado do DOM");
    this.#grafico?.destruir();
  }

  /**
   * Callback executado quando atributo muda.
   * @public
   * @param {string} nome - Nome do atributo.
   * @param {string|null} anterior - Valor anterior.
   * @param {string|null} novo - Novo valor.
   * @returns {void}
   */
  attributeChangedCallback(nome, anterior, novo) {
    if (!this.#foiMontado) return;

    GraficoDados.#log(`Atributo "${nome}" mudou:`, { anterior, novo });

    const acoes = {
      tipo: () => this.#grafico.atualizar(true),
      dados: () => {
        this.#grafico.atualizar(false);
        this.#atualizador.notificarAtualizacao(
          this.#estado.obter("tipo", "line")
        );
      },
      titulo: () => this.#atualizador.atualizarTitulo(),
      altura: () => this.#atualizador.atualizarDimensoes(),
      largura: () => this.#atualizador.atualizarDimensoes(),
      "mostrar-legenda": () => this.#grafico.atualizar(false),
      "posicao-legenda": () => this.#grafico.atualizar(false),
      "mostrar-grid": () => this.#grafico.atualizar(false),
      cores: () => {
        const cores = this.#estado.obterJSON("cores");
        if (cores) this.#grafico.atualizarCores(cores);
      },
      animado: () => this.#grafico.atualizar(false),
      empilhado: () => this.#grafico.atualizar(false),
    };

    acoes[nome]?.();
  }

  /**
   * Aplica estado inicial do componente.
   * @private
   * @returns {void}
   */
  #aplicarEstadoInicial() {
    this.#atualizador.atualizarTitulo();
    this.#atualizador.atualizarDimensoes();
    this.#grafico.atualizar(true);
  }

  // ========================================================================
  // API PÚBLICA
  // ========================================================================

  /**
   * Atualiza os dados do gráfico.
   * @public
   * @param {object} dados - Objeto com labels e datasets.
   * @returns {void}
   *
   * @example
   * grafico.atualizarDados({
   *   labels: ['Jan', 'Fev', 'Mar'],
   *   datasets: [{
   *     label: 'Vendas',
   *     data: [10, 20, 15]
   *   }]
   * });
   */
  atualizarDados(dados) {
    this.setAttribute("dados", JSON.stringify(dados));
  }

  /**
   * Atualiza o tipo do gráfico.
   * @public
   * @param {string} tipo - Tipo: 'line', 'bar', 'pie', 'doughnut', 'radar', 'polarArea'.
   * @returns {void}
   *
   * @example
   * grafico.atualizarTipo('bar');
   */
  atualizarTipo(tipo) {
    this.setAttribute("tipo", tipo);
  }

  /**
   * Atualiza as cores do gráfico.
   * @public
   * @param {string[]} cores - Array de cores em formato hex.
   * @returns {void}
   *
   * @example
   * grafico.atualizarCores(['#ff0000', '#00ff00', '#0000ff']);
   */
  atualizarCores(cores) {
    this.setAttribute("cores", JSON.stringify(cores));
  }

  /**
   * Exporta o gráfico como imagem base64.
   * @public
   * @returns {string|null} URL da imagem em base64 ou null.
   *
   * @example
   * const imagemBase64 = grafico.exportarImagem();
   * if (imagemBase64) {
   *   const link = document.createElement('a');
   *   link.download = 'grafico.png';
   *   link.href = imagemBase64;
   *   link.click();
   * }
   */
  exportarImagem() {
    return this.#grafico.exportarImagem();
  }

  /**
   * Obtém os dados atuais do gráfico.
   * @public
   * @returns {object|null} Objeto com dados ou null.
   *
   * @example
   * const dados = grafico.obterDados();
   * console.log(dados.labels, dados.datasets);
   */
  obterDados() {
    return this.#estado.obterJSON("dados");
  }

  /**
   * Obtém o tipo atual do gráfico.
   * @public
   * @returns {string} Tipo do gráfico.
   *
   * @example
   * const tipo = grafico.obterTipo(); // 'line', 'bar', etc.
   */
  obterTipo() {
    return this.#estado.obter("tipo", "line");
  }

  /**
   * Destrói o gráfico e limpa recursos.
   * @public
   * @returns {void}
   *
   * @example
   * grafico.destruir();
   */
  destruir() {
    this.#grafico.destruir();

    GraficoDados.#log("Componente destruído");

    this.dispatchEvent(
      new CustomEvent("grafico-destruido", {
        bubbles: true,
        composed: true,
      })
    );
  }
}

/**
 * Evento emitido quando o componente está pronto.
 * @event GraficoDados#grafico-pronto
 * @type {CustomEvent}
 */

/**
 * Evento emitido quando o gráfico é atualizado.
 * @event GraficoDados#grafico-atualizado
 * @type {CustomEvent}
 * @property {object} detail - Detalhes do evento
 * @property {string} detail.tipo - Tipo do gráfico
 */

/**
 * Evento emitido quando o gráfico é destruído.
 * @event GraficoDados#grafico-destruido
 * @type {CustomEvent}
 */

// ============================================================================
// REGISTRO DO COMPONENTE
// ============================================================================

if (!customElements.get("grafico-dados")) {
  customElements.define("grafico-dados", GraficoDados);
  console.log("✓ GraficoDados v2.0.0 registrado com sucesso");
} else {
  console.warn("GraficoDados já está registrado");
}

export { GraficoDados, CONFIG_GRAFICO };

/**
 * ============================================================================
 * EXEMPLOS DE USO
 * ============================================================================
 *
 * 1. GRÁFICO DE LINHA BÁSICO:
 * ----------------------------
 * <grafico-dados
 *   tipo="line"
 *   titulo="Vendas Mensais"
 *   dados='{"labels":["Jan","Fev","Mar"],"datasets":[{"label":"Vendas","data":[10,20,15]}]}'
 * ></grafico-dados>
 *
 *
 * 2. GRÁFICO DE BARRAS COM MÚLTIPLAS SÉRIES:
 * -------------------------------------------
 * <grafico-dados
 *   tipo="bar"
 *   titulo="Comparativo Anual"
 *   dados='{
 *     "labels":["Q1","Q2","Q3","Q4"],
 *     "datasets":[
 *       {"label":"2024","data":[100,150,120,180]},
 *       {"label":"2025","data":[120,170,140,200]}
 *     ]
 *   }'
 *   mostrar-legenda="true"
 *   posicao-legenda="bottom"
 * ></grafico-dados>
 *
 *
 * 3. GRÁFICO DE PIZZA COM CORES CUSTOMIZADAS:
 * --------------------------------------------
 * <grafico-dados
 *   tipo="pie"
 *   titulo="Distribuição de Vendas"
 *   dados='{
 *     "labels":["Produto A","Produto B","Produto C"],
 *     "datasets":[{"data":[30,50,20]}]
 *   }'
 *   cores='["#3b82f6","#10b981","#f59e0b"]'
 * ></grafico-dados>
 *
 *
 * 4. GRÁFICO EMPILHADO:
 * ---------------------
 * <grafico-dados
 *   tipo="bar"
 *   titulo="Vendas por Categoria"
 *   empilhado="true"
 *   dados='{
 *     "labels":["Jan","Fev","Mar"],
 *     "datasets":[
 *       {"label":"Online","data":[30,40,35]},
 *       {"label":"Loja","data":[20,25,30]}
 *     ]
 *   }'
 * ></grafico-dados>
 *
 *
 * 5. GRÁFICO SEM GRID E LEGENDA:
 * -------------------------------
 * <grafico-dados
 *   tipo="line"
 *   mostrar-grid="false"
 *   mostrar-legenda="false"
 *   dados='{"labels":["A","B","C"],"datasets":[{"data":[1,2,3]}]}'
 * ></grafico-dados>
 *
 *
 * 6. GRÁFICO COM DIMENSÕES CUSTOMIZADAS:
 * ---------------------------------------
 * <grafico-dados
 *   tipo="line"
 *   altura="500px"
 *   largura="800px"
 *   dados='{"labels":["Jan","Fev"],"datasets":[{"data":[10,20]}]}'
 * ></grafico-dados>
 *
 *
 * 7. USANDO A API JAVASCRIPT:
 * ---------------------------
 * const grafico = document.querySelector('grafico-dados');
 *
 * // Atualizar dados
 * grafico.atualizarDados({
 *   labels: ['Jan', 'Fev', 'Mar'],
 *   datasets: [{
 *     label: 'Vendas',
 *     data: [100, 200, 150]
 *   }]
 * });
 *
 * // Mudar tipo
 * grafico.atualizarTipo('bar');
 *
 * // Atualizar cores
 * grafico.atualizarCores(['#ff0000', '#00ff00', '#0000ff']);
 *
 * // Exportar imagem
 * const imagem = grafico.exportarImagem();
 * console.log(imagem); // data:image/png;base64,...
 *
 * // Obter dados
 * const dados = grafico.obterDados();
 * const tipo = grafico.obterTipo();
 *
 *
 * 8. ESCUTANDO EVENTOS:
 * ---------------------
 * const grafico = document.querySelector('grafico-dados');
 *
 * grafico.addEventListener('grafico-pronto', () => {
 *   console.log('Gráfico está pronto!');
 * });
 *
 * grafico.addEventListener('grafico-atualizado', (e) => {
 *   console.log('Gráfico atualizado:', e.detail.tipo);
 * });
 *
 * grafico.addEventListener('grafico-destruido', () => {
 *   console.log('Gráfico foi destruído');
 * });
 *
 *
 * 9. COM SHADOW DOM:
 * ------------------
 * <grafico-dados
 *   tipo="line"
 *   dados='{"labels":["A","B"],"datasets":[{"data":[1,2]}]}'
 *   usar-sombra
 *   sombra-aberta
 * ></grafico-dados>
 *
 *
 * 10. MODO DESENVOLVIMENTO:
 * -------------------------
 * <script>
 *   GraficoDados.ativarModoDev();
 * </script>
 *
 *
 * 11. GRÁFICO DE RADAR:
 * ---------------------
 * <grafico-dados
 *   tipo="radar"
 *   titulo="Análise de Competências"
 *   dados='{
 *     "labels":["Comunicação","Liderança","Técnico","Criatividade","Planejamento"],
 *     "datasets":[
 *       {"label":"Colaborador A","data":[8,7,9,6,8]},
 *       {"label":"Colaborador B","data":[6,8,7,9,7]}
 *     ]
 *   }'
 * ></grafico-dados>
 *
 *
 * 12. TEMATIZAÇÃO COM CSS:
 * ------------------------
 * <style>
 *   :root {
 *     --grafico-cor-primaria: #8b5cf6;
 *     --grafico-cor-fundo: #f9fafb;
 *     --grafico-cor-texto: #111827;
 *     --grafico-espacamento: 1.5rem;
 *     --grafico-raio: 1rem;
 *   }
 *
 *   grafico-dados {
 *     --grafico-cor-primaria: #ef4444;
 *   }
 * </style>
 *
 * ============================================================================
 */
