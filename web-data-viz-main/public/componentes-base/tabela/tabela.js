/**
 * ============================================================================
 * COMPONENTE TABELA DE DADOS
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
 * - Respeita prefers-reduced-motion
 * - Modo desenvolvimento/produção
 * - Ordenação, filtros e paginação
 * - Seleção de linhas (simples/múltipla)
 * - Exportação CSV/JSON
 *
 * EXEMPLO DE USO:
 * <tabela-dados
 *   dados='[{"id":1,"nome":"João","idade":28}]'
 *   colunas='[{"campo":"nome","titulo":"Nome","ordenavel":true}]'
 *   mostrar-busca="true"
 *   mostrar-paginacao="true"
 *   linhas-por-pagina="10"
 * ></tabela-dados>
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

const CONFIG_TABELA = {
  // Breakpoints de dispositivos
  DISPOSITIVOS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1440,
  },

  // Paginação padrão
  PAGINACAO: {
    LINHAS_POR_PAGINA: 10,
    MAX_BOTOES_VISIVEIS: 5,
  },

  // Formatação
  FORMATOS: {
    MOEDA: { style: "currency", currency: "BRL" },
    NUMERO: {},
    DATA: { dateStyle: "short" },
    DATA_HORA: { dateStyle: "short", timeStyle: "short" },
  },
};

/**
 * @class GerenciadorEstadoTabela
 * @classdesc
 * Gerencia o estado do componente de tabela.
 */
class GerenciadorEstadoTabela {
  #host;

  constructor(host) {
    this.#host = host;
  }

  obter(nome, padrao = "") {
    const valor = this.#host.getAttribute(nome);
    return valor == null || valor === "" ? padrao : valor;
  }

  obterBooleano(nome, padrao = false) {
    const valor = this.#host.getAttribute(nome);
    if (valor === null) return padrao;
    return valor !== "false";
  }

  obterNumero(nome, padrao = 0) {
    const numero = parseFloat(this.#host.getAttribute(nome));
    return Number.isFinite(numero) ? numero : padrao;
  }

  obterJSON(nome, padrao = null) {
    const valor = this.#host.getAttribute(nome);
    if (!valor) return padrao;

    try {
      return JSON.parse(valor);
    } catch (erro) {
      console.warn(
        `[GerenciadorEstadoTabela] Erro ao parsear JSON "${nome}":`,
        erro
      );
      return padrao;
    }
  }

  definir(nome, valor) {
    this.#host.setAttribute(nome, valor);
  }

  tem(nome) {
    return this.#host.hasAttribute(nome);
  }
}

/**
 * @class GerenciadorFormatacaoTabela
 * @classdesc
 * Responsável por formatar valores de células.
 */
class GerenciadorFormatacaoTabela {
  #host;

  constructor(host) {
    this.#host = host;
  }

  formatarCelula(valor, formato) {
    if (valor === null || valor === undefined) return "-";

    switch (formato) {
      case "moeda":
        return new Intl.NumberFormat(
          "pt-BR",
          CONFIG_TABELA.FORMATOS.MOEDA
        ).format(valor);

      case "numero":
        return new Intl.NumberFormat("pt-BR").format(valor);

      case "percentual":
        return `${Number(valor).toFixed(1)}%`;

      case "data":
        return new Date(valor).toLocaleDateString("pt-BR");

      case "data-hora":
        return new Date(valor).toLocaleString("pt-BR");

      case "badge":
        return this.#criarBadge(valor);

      default:
        return String(valor);
    }
  }

  #criarBadge(valor) {
    const badgeClass = valor ? "badge-sucesso" : "badge-erro";
    const badgeTexto = valor ? "Ativo" : "Inativo";
    return {
      html: true,
      content: `<span class="badge ${badgeClass}">${badgeTexto}</span>`,
    };
  }
}

/**
 * @class GerenciadorDOMTabela
 * @classdesc
 * Constrói e gerencia a estrutura DOM da tabela.
 */
class GerenciadorDOMTabela {
  #host;
  #raiz;
  #refs = {};

  constructor(host, raiz) {
    this.#host = host;
    this.#raiz = raiz;
  }

  montar() {
    const wrapper = this.#criarElemento("div", "tabela-wrapper");

    // Toolbar (busca + ações)
    const toolbar = this.#montarToolbar();

    // Container da tabela
    const tabelaContainer = this.#montarTabelaContainer();

    // Rodapé (info + paginação)
    const rodape = this.#montarRodape();

    // Região para anúncios (acessibilidade)
    const regiaoAnuncio = this.#criarElemento("div", "sr-only");
    regiaoAnuncio.setAttribute("role", "status");
    regiaoAnuncio.setAttribute("aria-live", "polite");
    regiaoAnuncio.setAttribute("aria-atomic", "true");

    wrapper.append(toolbar, tabelaContainer, rodape, regiaoAnuncio);
    this.#raiz.appendChild(wrapper);

    this.#refs.regiaoAnuncio = regiaoAnuncio;

    return this.#refs;
  }

  #montarToolbar() {
    const toolbar = this.#criarElemento("div", "tabela-toolbar");
    const estado = new GerenciadorEstadoTabela(this.#host);

    // Container de busca
    const buscaContainer = this.#criarElemento("div", "busca-container");

    if (estado.obterBooleano("mostrar-busca", true)) {
      const inputBusca = document.createElement("input");
      inputBusca.type = "text";
      inputBusca.className = "input-busca";
      inputBusca.placeholder = "Buscar...";
      inputBusca.setAttribute("aria-label", "Buscar na tabela");

      buscaContainer.appendChild(inputBusca);
      this.#refs.inputBusca = inputBusca;
    }

    // Container de ações
    const acoesContainer = this.#criarElemento("div", "acoes-container");

    if (estado.obterBooleano("mostrar-exportar", true)) {
      const btnCSV = this.#criarBotao("CSV", "btn btn-secundario");
      const btnJSON = this.#criarBotao("JSON", "btn btn-secundario");

      acoesContainer.append(btnCSV, btnJSON);
      this.#refs.btnCSV = btnCSV;
      this.#refs.btnJSON = btnJSON;
    }

    toolbar.append(buscaContainer, acoesContainer);
    this.#refs.toolbar = toolbar;

    return toolbar;
  }

  #montarTabelaContainer() {
    const estado = new GerenciadorEstadoTabela(this.#host);
    const container = this.#criarElemento("div", "tabela-container");

    const tabela = document.createElement("table");
    tabela.className = "tabela";
    tabela.setAttribute("role", "table");

    if (estado.obterBooleano("zebrada", true)) {
      tabela.classList.add("zebrada");
    }
    if (estado.obterBooleano("compacta", false)) {
      tabela.classList.add("compacta");
    }

    const thead = document.createElement("thead");
    thead.setAttribute("role", "rowgroup");

    const tbody = document.createElement("tbody");
    tbody.setAttribute("role", "rowgroup");

    tabela.append(thead, tbody);
    container.appendChild(tabela);

    this.#refs.tabela = tabela;
    this.#refs.thead = thead;
    this.#refs.tbody = tbody;
    this.#refs.container = container;

    return container;
  }

  #montarRodape() {
    const estado = new GerenciadorEstadoTabela(this.#host);
    const rodape = this.#criarElemento("div", "tabela-rodape");

    const info = this.#criarElemento("div", "tabela-info");
    info.setAttribute("role", "status");
    info.setAttribute("aria-live", "polite");

    const paginacao = this.#criarElemento("div", "tabela-paginacao");
    paginacao.setAttribute("role", "navigation");
    paginacao.setAttribute("aria-label", "Paginação da tabela");

    rodape.append(info, paginacao);

    this.#refs.info = info;
    this.#refs.paginacao = paginacao;
    this.#refs.rodape = rodape;

    if (!estado.obterBooleano("mostrar-paginacao", true)) {
      rodape.style.display = "none";
    }

    return rodape;
  }

  #criarElemento(tag, classe) {
    const el = document.createElement(tag);
    if (classe) el.className = classe;
    return el;
  }

  #criarBotao(texto, classe) {
    const btn = document.createElement("button");
    btn.className = classe;
    btn.textContent = texto;
    btn.type = "button";
    return btn;
  }

  obterReferencias() {
    return this.#refs;
  }
}

/**
 * @class GerenciadorDadosTabela
 * @classdesc
 * Gerencia os dados da tabela (filtros, ordenação, paginação).
 */
class GerenciadorDadosTabela {
  #host;
  #dadosOriginais = [];
  #dadosFiltrados = [];
  #dadosVisiveis = [];
  #paginaAtual = 1;
  #ordenacao = { campo: null, direcao: "asc" };
  #filtroTexto = "";
  #linhasSelecionadas = new Set();

  constructor(host) {
    this.#host = host;
  }

  carregarDados(dados) {
    this.#dadosOriginais = Array.isArray(dados) ? dados : [];
    this.#dadosFiltrados = [...this.#dadosOriginais];
    this.#paginaAtual = 1;
  }

  filtrar(texto) {
    this.#filtroTexto = texto.toLowerCase().trim();
    this.#aplicarFiltrosEOrdenacao();
    this.#paginaAtual = 1;
  }

  ordenar(campo) {
    if (this.#ordenacao.campo === campo) {
      this.#ordenacao.direcao =
        this.#ordenacao.direcao === "asc" ? "desc" : "asc";
    } else {
      this.#ordenacao.campo = campo;
      this.#ordenacao.direcao = "asc";
    }

    this.#aplicarFiltrosEOrdenacao();
    this.#paginaAtual = 1;
  }

  #aplicarFiltrosEOrdenacao() {
    const estado = new GerenciadorEstadoTabela(this.#host);
    const colunas = estado.obterJSON("colunas", []);

    // Filtrar
    if (this.#filtroTexto) {
      this.#dadosFiltrados = this.#dadosOriginais.filter((linha) => {
        return colunas.some((coluna) => {
          const valor = linha[coluna.campo];
          if (valor === null || valor === undefined) return false;
          return String(valor).toLowerCase().includes(this.#filtroTexto);
        });
      });
    } else {
      this.#dadosFiltrados = [...this.#dadosOriginais];
    }

    // Ordenar
    if (this.#ordenacao.campo) {
      const campo = this.#ordenacao.campo;
      this.#dadosFiltrados.sort((a, b) => {
        const valorA = a[campo];
        const valorB = b[campo];

        if (valorA === valorB) return 0;

        const comparacao = valorA > valorB ? 1 : -1;
        return this.#ordenacao.direcao === "asc" ? comparacao : -comparacao;
      });
    }
  }

  paginar() {
    const estado = new GerenciadorEstadoTabela(this.#host);
    const linhasPorPagina = estado.obterNumero(
      "linhas-por-pagina",
      CONFIG_TABELA.PAGINACAO.LINHAS_POR_PAGINA
    );
    const mostrarPaginacao = estado.obterBooleano("mostrar-paginacao", true);

    if (mostrarPaginacao) {
      const inicio = (this.#paginaAtual - 1) * linhasPorPagina;
      const fim = inicio + linhasPorPagina;
      this.#dadosVisiveis = this.#dadosFiltrados.slice(inicio, fim);
    } else {
      this.#dadosVisiveis = this.#dadosFiltrados;
    }
  }

  irParaPagina(pagina) {
    this.#paginaAtual = pagina;
  }

  toggleSelecao(indice, selecionado) {
    const estado = new GerenciadorEstadoTabela(this.#host);

    if (selecionado) {
      if (!estado.obterBooleano("multipla-selecao", false)) {
        this.#linhasSelecionadas.clear();
      }
      this.#linhasSelecionadas.add(indice);
    } else {
      this.#linhasSelecionadas.delete(indice);
    }
  }

  selecionarTodas(selecionar, indices) {
    if (selecionar) {
      indices.forEach((i) => this.#linhasSelecionadas.add(i));
    } else {
      indices.forEach((i) => this.#linhasSelecionadas.delete(i));
    }
  }

  limparSelecao() {
    this.#linhasSelecionadas.clear();
  }

  obterDadosOriginais() {
    return [...this.#dadosOriginais];
  }

  obterDadosFiltrados() {
    return [...this.#dadosFiltrados];
  }

  obterDadosVisiveis() {
    return this.#dadosVisiveis;
  }

  obterPaginaAtual() {
    return this.#paginaAtual;
  }

  obterOrdenacao() {
    return { ...this.#ordenacao };
  }

  obterSelecionados() {
    return Array.from(this.#linhasSelecionadas)
      .map((indice) => this.#dadosFiltrados[indice])
      .filter(Boolean);
  }

  estaSelecionado(indice) {
    return this.#linhasSelecionadas.has(indice);
  }

  getTotalPaginas() {
    const estado = new GerenciadorEstadoTabela(this.#host);
    const linhasPorPagina = estado.obterNumero(
      "linhas-por-pagina",
      CONFIG_TABELA.PAGINACAO.LINHAS_POR_PAGINA
    );
    return Math.ceil(this.#dadosFiltrados.length / linhasPorPagina);
  }

  limparFiltros() {
    this.#filtroTexto = "";
    this.#ordenacao = { campo: null, direcao: "asc" };
    this.#aplicarFiltrosEOrdenacao();
    this.#paginaAtual = 1;
  }
}

/**
 * @class GerenciadorRenderizacaoTabela
 * @classdesc
 * Renderiza a tabela e seus elementos visuais.
 */
class GerenciadorRenderizacaoTabela {
  #host;
  #refs;
  #gerenciadorDados;
  #formatador;

  constructor(host, refs, gerenciadorDados) {
    this.#host = host;
    this.#refs = refs;
    this.#gerenciadorDados = gerenciadorDados;
    this.#formatador = new GerenciadorFormatacaoTabela(host);
  }

  renderizarCabecalho() {
    const estado = new GerenciadorEstadoTabela(this.#host);
    const colunas = estado.obterJSON("colunas", []);
    const selecionavel = estado.obterBooleano("selecionavel", false);

    const tr = document.createElement("tr");
    tr.setAttribute("role", "row");

    // Coluna de seleção
    if (selecionavel) {
      const th = this.#criarCelulaCabecalho("", "40px");

      if (estado.obterBooleano("multipla-selecao", false)) {
        const checkbox = this.#criarCheckbox(false, "Selecionar todas");
        th.appendChild(checkbox);
        th.checkbox = checkbox;
      }

      tr.appendChild(th);
    }

    // Colunas de dados
    colunas.forEach((coluna) => {
      const th = this.#criarCelulaCabecalho(
        coluna.titulo || coluna.campo,
        coluna.largura,
        coluna.alinhamento
      );

      if (coluna.ordenavel !== false) {
        th.classList.add("ordenavel");
        th.setAttribute("aria-sort", "none");
        th.campo = coluna.campo;
      }

      tr.appendChild(th);
    });

    this.#refs.thead.innerHTML = "";
    this.#refs.thead.appendChild(tr);
  }

  renderizarDados() {
    const estado = new GerenciadorEstadoTabela(this.#host);
    const colunas = estado.obterJSON("colunas", []);
    const selecionavel = estado.obterBooleano("selecionavel", false);
    const linhasPorPagina = estado.obterNumero(
      "linhas-por-pagina",
      CONFIG_TABELA.PAGINACAO.LINHAS_POR_PAGINA
    );

    this.#gerenciadorDados.paginar();
    const dadosVisiveis = this.#gerenciadorDados.obterDadosVisiveis();
    const dadosFiltrados = this.#gerenciadorDados.obterDadosFiltrados();

    this.#refs.tbody.innerHTML = "";

    // Verifica se há dados
    if (dadosVisiveis.length === 0) {
      this.#renderizarLinhaVazia(
        colunas.length + (selecionavel ? 1 : 0),
        dadosFiltrados.length
      );
      this.#atualizarRodape();
      return;
    }

    // Renderizar linhas
    const paginaAtual = this.#gerenciadorDados.obterPaginaAtual();

    dadosVisiveis.forEach((linha, indice) => {
      const indiceGlobal = (paginaAtual - 1) * linhasPorPagina + indice;
      const tr = this.#criarLinha(linha, indiceGlobal, colunas, selecionavel);
      this.#refs.tbody.appendChild(tr);
    });

    this.#atualizarRodape();
    this.#atualizarIndicadoresOrdenacao();
  }

  #criarCelulaCabecalho(texto, largura, alinhamento) {
    const th = document.createElement("th");
    th.setAttribute("role", "columnheader");
    th.textContent = texto;

    if (largura) th.style.width = largura;
    if (alinhamento === "centro") th.classList.add("centro");
    if (alinhamento === "direita") th.classList.add("direita");

    return th;
  }

  #criarCheckbox(checked, ariaLabel) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = checked;
    if (ariaLabel) checkbox.setAttribute("aria-label", ariaLabel);
    return checkbox;
  }

  #criarLinha(linha, indiceGlobal, colunas, selecionavel) {
    const tr = document.createElement("tr");
    tr.setAttribute("role", "row");

    if (this.#gerenciadorDados.estaSelecionado(indiceGlobal)) {
      tr.classList.add("selecionada");
    }

    // Coluna de seleção
    if (selecionavel) {
      const td = document.createElement("td");
      td.setAttribute("role", "cell");

      const checkbox = this.#criarCheckbox(
        this.#gerenciadorDados.estaSelecionado(indiceGlobal),
        `Selecionar linha ${indiceGlobal + 1}`
      );

      checkbox.indice = indiceGlobal;
      td.appendChild(checkbox);
      tr.appendChild(td);
    }

    // Colunas de dados
    colunas.forEach((coluna) => {
      const td = document.createElement("td");
      td.setAttribute("role", "cell");

      const valor = linha[coluna.campo];
      const valorFormatado = this.#formatador.formatarCelula(
        valor,
        coluna.formato
      );

      if (valorFormatado && valorFormatado.html) {
        td.innerHTML = valorFormatado.content;
      } else {
        td.textContent = valorFormatado;
      }

      if (coluna.alinhamento === "centro") td.classList.add("centro");
      if (coluna.alinhamento === "direita") td.classList.add("direita");

      tr.appendChild(td);
    });

    return tr;
  }

  #renderizarLinhaVazia(colspan, totalFiltrados) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = colspan;
    td.className = "vazio";
    td.setAttribute("role", "cell");
    td.textContent =
      totalFiltrados === 0
        ? "Nenhum dado encontrado"
        : "Nenhum resultado para sua busca";

    tr.appendChild(td);
    this.#refs.tbody.appendChild(tr);
  }

  #atualizarRodape() {
    const estado = new GerenciadorEstadoTabela(this.#host);

    if (!estado.obterBooleano("mostrar-paginacao", true)) return;

    const dadosFiltrados = this.#gerenciadorDados.obterDadosFiltrados();
    const linhasPorPagina = estado.obterNumero(
      "linhas-por-pagina",
      CONFIG_TABELA.PAGINACAO.LINHAS_POR_PAGINA
    );
    const paginaAtual = this.#gerenciadorDados.obterPaginaAtual();
    const totalPaginas = this.#gerenciadorDados.getTotalPaginas();

    const inicio = (paginaAtual - 1) * linhasPorPagina + 1;
    const fim = Math.min(paginaAtual * linhasPorPagina, dadosFiltrados.length);

    // Atualizar info
    this.#refs.info.textContent = `Exibindo ${inicio}-${fim} de ${dadosFiltrados.length} registros`;

    // Atualizar paginação
    this.#renderizarPaginacao(paginaAtual, totalPaginas);
  }

  #renderizarPaginacao(paginaAtual, totalPaginas) {
    this.#refs.paginacao.innerHTML = "";

    // Botão anterior
    const btnAnterior = this.#criarBotaoPaginacao("‹", paginaAtual === 1);
    btnAnterior.setAttribute("aria-label", "Página anterior");
    btnAnterior.pagina = paginaAtual - 1;
    this.#refs.paginacao.appendChild(btnAnterior);

    // Números das páginas
    const maxBotoes = CONFIG_TABELA.PAGINACAO.MAX_BOTOES_VISIVEIS;
    let inicioP = Math.max(1, paginaAtual - Math.floor(maxBotoes / 2));
    let fimP = Math.min(totalPaginas, inicioP + maxBotoes - 1);

    if (fimP - inicioP < maxBotoes - 1) {
      inicioP = Math.max(1, fimP - maxBotoes + 1);
    }

    for (let i = inicioP; i <= fimP; i++) {
      const btn = this.#criarBotaoPaginacao(String(i), false);
      btn.pagina = i;
      if (i === paginaAtual) {
        btn.classList.add("ativa");
        btn.setAttribute("aria-current", "page");
      }
      btn.setAttribute("aria-label", `Página ${i}`);
      this.#refs.paginacao.appendChild(btn);
    }

    // Botão próximo
    const btnProximo = this.#criarBotaoPaginacao(
      "›",
      paginaAtual === totalPaginas
    );
    btnProximo.setAttribute("aria-label", "Próxima página");
    btnProximo.pagina = paginaAtual + 1;
    this.#refs.paginacao.appendChild(btnProximo);
  }

  #criarBotaoPaginacao(texto, desabilitado) {
    const btn = document.createElement("button");
    btn.className = "pagina-btn";
    btn.textContent = texto;
    btn.disabled = desabilitado;
    btn.type = "button";
    return btn;
  }

  #atualizarIndicadoresOrdenacao() {
    const ordenacao = this.#gerenciadorDados.obterOrdenacao();
    const estado = new GerenciadorEstadoTabela(this.#host);
    const colunas = estado.obterJSON("colunas", []);
    const selecionavel = estado.obterBooleano("selecionavel", false);

    // Limpar indicadores anteriores
    this.#refs.thead.querySelectorAll("th").forEach((th) => {
      th.classList.remove("ordenado-asc", "ordenado-desc");
      th.setAttribute("aria-sort", "none");
    });

    if (!ordenacao.campo) return;

    // Adicionar novo indicador
    const indiceColuna = colunas.findIndex((c) => c.campo === ordenacao.campo);
    if (indiceColuna !== -1) {
      const thIndice = indiceColuna + (selecionavel ? 1 : 0);
      const th = this.#refs.thead.querySelectorAll("th")[thIndice];

      if (th) {
        th.classList.add(
          ordenacao.direcao === "asc" ? "ordenado-asc" : "ordenado-desc"
        );
        th.setAttribute(
          "aria-sort",
          ordenacao.direcao === "asc" ? "ascending" : "descending"
        );
      }
    }
  }

  anunciar(mensagem) {
    if (this.#refs.regiaoAnuncio) {
      this.#refs.regiaoAnuncio.textContent = mensagem;
    }
  }
}

/**
 * @class GerenciadorExportacaoTabela
 * @classdesc
 * Gerencia exportação de dados (CSV/JSON).
 */
class GerenciadorExportacaoTabela {
  #host;
  #gerenciadorDados;

  constructor(host, gerenciadorDados) {
    this.#host = host;
    this.#gerenciadorDados = gerenciadorDados;
  }

  exportarCSV() {
    const estado = new GerenciadorEstadoTabela(this.#host);
    const colunas = estado.obterJSON("colunas", []);
    const dados = this.#gerenciadorDados.obterDadosFiltrados();

    // Cabeçalho
    let csv = colunas.map((c) => `"${c.titulo || c.campo}"`).join(",") + "\n";

    // Dados
    dados.forEach((linha) => {
      const valores = colunas.map((coluna) => {
        const valor = linha[coluna.campo];
        if (valor === null || valor === undefined) return '""';
        return `"${String(valor).replace(/"/g, '""')}"`;
      });
      csv += valores.join(",") + "\n";
    });

    this.#downloadArquivo(csv, "dados.csv", "text/csv");

    return { tipo: "csv", registros: dados.length };
  }

  exportarJSON() {
    const dados = this.#gerenciadorDados.obterDadosFiltrados();
    const json = JSON.stringify(dados, null, 2);

    this.#downloadArquivo(json, "dados.json", "application/json");

    return { tipo: "json", registros: dados.length };
  }

  obterJSON() {
    const dados = this.#gerenciadorDados.obterDadosFiltrados();
    return JSON.stringify(dados, null, 2);
  }

  #downloadArquivo(conteudo, nomeArquivo, tipoMIME) {
    const blob = new Blob([conteudo], { type: tipoMIME });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nomeArquivo;
    link.click();
    URL.revokeObjectURL(url);
  }
}

/**
 * @class GerenciadorEstilosTabela
 * @classdesc
 * Responsável por gerenciar os estilos do componente de tabela.
 */
class GerenciadorEstilosTabela {
  #raiz;
  #nomeComponente;

  constructor(raiz, nomeComponente = "tabela") {
    this.#raiz = raiz;
    this.#nomeComponente = nomeComponente;
  }

  carregar() {
    const dispositivo = this.#detectarDispositivo();
    this.#anexarCSS("base");
    this.#anexarCSS(dispositivo);
    this.#anexarCSSInline();
  }

  #detectarDispositivo() {
    const largura = window.innerWidth;
    if (largura < CONFIG_TABELA.DISPOSITIVOS.MOBILE) return "mobile";
    if (largura < CONFIG_TABELA.DISPOSITIVOS.TABLET) return "tablet";
    if (largura < CONFIG_TABELA.DISPOSITIVOS.DESKTOP) return "desktop";
    return "large-desktop";
  }

  #anexarCSS(tipo) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `./${this.#nomeComponente}-${tipo}.css`;
    link.onerror = () => {
      console.warn(`CSS não encontrado: ${link.href}`);
    };
    this.#raiz.appendChild(link);
  }

  #anexarCSSInline() {
    const style = document.createElement("style");
    style.textContent = `
      :host {
        /* Variáveis CSS para tematização */
        --tabela-cor-primaria: #3b82f6;
        --tabela-cor-fundo: #ffffff;
        --tabela-cor-texto: #1f2937;
        --tabela-cor-borda: #e5e7eb;
        --tabela-cor-hover: #f9fafb;
        --tabela-cor-selecionada: #eff6ff;
        --tabela-espacamento: 1rem;
        --tabela-raio: 0.5rem;
        --tabela-sombra: 0 1px 3px rgba(0, 0, 0, 0.1);
        
        display: block;
        container-type: inline-size;
      }
      
      /* Classe para screen readers */
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
      
      /* Animações */
      @media (prefers-reduced-motion: no-preference) {
        .tabela tr {
          transition: background-color 0.2s ease;
        }
      }
      
      /* Container Query */
      @container (max-width: 600px) {
        .tabela-toolbar {
          flex-direction: column;
          gap: 0.5rem;
        }
      }
    `;
    this.#raiz.appendChild(style);
  }
}

/**
 * @class TabelaDados
 * @classdesc
 * Componente Web nativo para exibição de dados tabulares com recursos avançados.
 *
 * @extends HTMLElement
 *
 * @example
 * <tabela-dados
 *   dados='[{"id":1,"nome":"João","idade":28}]'
 *   colunas='[{"campo":"nome","titulo":"Nome","ordenavel":true}]'
 *   mostrar-busca="true"
 * ></tabela-dados>
 */
class TabelaDados extends HTMLElement {
  static #modoDev = false;

  #estado;
  #dom;
  #gerenciadorDados;
  #renderizador;
  #exportador;
  #estilos;
  #refs = {};
  #foiMontado = false;

  static get observedAttributes() {
    return [
      "dados",
      "colunas",
      "mostrar-busca",
      "mostrar-paginacao",
      "linhas-por-pagina",
      "selecionavel",
      "multipla-selecao",
      "mostrar-exportar",
      "zebrada",
      "compacta",
    ];
  }

  static ativarModoDev() {
    this.#modoDev = true;
    console.log("[TabelaDados] Modo de desenvolvimento ativado");
  }

  static #log(...args) {
    if (this.#modoDev) {
      console.log("[TabelaDados]", ...args);
    }
  }

  constructor() {
    super();

    TabelaDados.#log("Construtor chamado");

    const raiz = this.#configurarRaiz();

    this.#estado = new GerenciadorEstadoTabela(this);
    this.#dom = new GerenciadorDOMTabela(this, raiz);
    this.#estilos = new GerenciadorEstilosTabela(raiz);
    this.#gerenciadorDados = new GerenciadorDadosTabela(this);

    this.#estilos.carregar();

    this.setAttribute("role", "region");
    this.setAttribute("aria-label", "Tabela de dados interativa");
  }

  #configurarRaiz() {
    if (this.hasAttribute("usar-sombra")) {
      const modo = this.hasAttribute("sombra-aberta") ? "open" : "closed";
      TabelaDados.#log("Usando Shadow DOM:", modo);
      return this.attachShadow({ mode: modo });
    }
    TabelaDados.#log("Usando Light DOM");
    return this;
  }

  connectedCallback() {
    if (this.#foiMontado) return;

    TabelaDados.#log("Componente conectado ao DOM");

    this.#refs = this.#dom.montar();
    this.#renderizador = new GerenciadorRenderizacaoTabela(
      this,
      this.#refs,
      this.#gerenciadorDados
    );
    this.#exportador = new GerenciadorExportacaoTabela(
      this,
      this.#gerenciadorDados
    );

    this.#configurarEventos();
    this.#carregarDadosIniciais();

    this.#foiMontado = true;

    this.dispatchEvent(
      new CustomEvent("tabela-pronta", {
        bubbles: true,
        composed: true,
      })
    );
  }

  disconnectedCallback() {
    TabelaDados.#log("Componente desconectado do DOM");
  }

  attributeChangedCallback(nome, anterior, novo) {
    if (!this.#foiMontado) return;

    TabelaDados.#log(`Atributo "${nome}" mudou:`, { anterior, novo });

    const acoes = {
      dados: () => this.#atualizarDados(),
      colunas: () => this.#renderizarCompleto(),
      "linhas-por-pagina": () => this.#renderizador.renderizarDados(),
      zebrada: () => this.#atualizarClasseTabela(),
      compacta: () => this.#atualizarClasseTabela(),
    };

    acoes[nome]?.();
  }

  #configurarEventos() {
    // Busca
    if (this.#refs.inputBusca) {
      this.#refs.inputBusca.addEventListener("input", (e) => {
        this.#gerenciadorDados.filtrar(e.target.value);
        this.#renderizador.renderizarDados();
        this.#renderizador.anunciar(
          `${
            this.#gerenciadorDados.obterDadosFiltrados().length
          } registros encontrados`
        );
      });
    }

    // Exportação
    if (this.#refs.btnCSV) {
      this.#refs.btnCSV.addEventListener("click", () => {
        const resultado = this.#exportador.exportarCSV();
        this.#emitirEvento("exportacao", resultado);
        this.#renderizador.anunciar(
          `Exportados ${resultado.registros} registros em CSV`
        );
      });
    }

    if (this.#refs.btnJSON) {
      this.#refs.btnJSON.addEventListener("click", () => {
        const resultado = this.#exportador.exportarJSON();
        this.#emitirEvento("exportacao", resultado);
        this.#renderizador.anunciar(
          `Exportados ${resultado.registros} registros em JSON`
        );
      });
    }

    // Delegação de eventos para tabela
    this.#refs.tbody.addEventListener("change", (e) => {
      if (e.target.classList.contains("checkbox")) {
        this.#gerenciadorDados.toggleSelecao(e.target.indice, e.target.checked);
        this.#renderizador.renderizarDados();
        this.#emitirEvento(
          "selecao-alterada",
          this.#gerenciadorDados.obterSelecionados()
        );
      }
    });

    this.#refs.thead.addEventListener("click", (e) => {
      const th = e.target.closest("th");
      if (th && th.classList.contains("ordenavel")) {
        this.#gerenciadorDados.ordenar(th.campo);
        this.#renderizador.renderizarDados();
        this.#renderizador.anunciar(`Ordenado por ${th.textContent}`);
      }

      if (th && th.checkbox) {
        this.#gerenciadorDados.selecionarTodas(
          th.checkbox.checked,
          this.#gerenciadorDados.obterDadosVisiveis().map((_, i) => {
            const linhasPorPagina = this.#estado.obterNumero(
              "linhas-por-pagina",
              CONFIG_TABELA.PAGINACAO.LINHAS_POR_PAGINA
            );
            return (
              (this.#gerenciadorDados.obterPaginaAtual() - 1) *
                linhasPorPagina +
              i
            );
          })
        );
        this.#renderizador.renderizarDados();
        this.#emitirEvento(
          "selecao-alterada",
          this.#gerenciadorDados.obterSelecionados()
        );
      }
    });

    this.#refs.paginacao.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (btn && btn.pagina && !btn.disabled) {
        this.#gerenciadorDados.irParaPagina(btn.pagina);
        this.#renderizador.renderizarDados();
        this.#renderizador.anunciar(`Página ${btn.pagina}`);
      }
    });
  }

  #carregarDadosIniciais() {
    const dados = this.#estado.obterJSON("dados", []);
    this.#gerenciadorDados.carregarDados(dados);
    this.#renderizarCompleto();
  }

  #renderizarCompleto() {
    this.#renderizador.renderizarCabecalho();
    this.#renderizador.renderizarDados();
  }

  #atualizarDados() {
    const dados = this.#estado.obterJSON("dados", []);
    this.#gerenciadorDados.carregarDados(dados);
    this.#renderizador.renderizarDados();
  }

  #atualizarClasseTabela() {
    const zebrada = this.#estado.obterBooleano("zebrada", true);
    const compacta = this.#estado.obterBooleano("compacta", false);

    this.#refs.tabela.classList.toggle("zebrada", zebrada);
    this.#refs.tabela.classList.toggle("compacta", compacta);
  }

  #emitirEvento(nome, dados) {
    this.dispatchEvent(
      new CustomEvent(nome, {
        detail: dados,
        bubbles: true,
        composed: true,
        cancelable: false,
      })
    );
  }

  // ========================================================================
  // API PÚBLICA
  // ========================================================================

  atualizarDados(array) {
    if (!Array.isArray(array)) {
      console.warn("[TabelaDados] atualizarDados: esperado um array");
      return;
    }
    this.setAttribute("dados", JSON.stringify(array));
  }

  ordenarPor(campo, direcao = "asc") {
    this.#gerenciadorDados.ordenar(campo);
    if (this.#gerenciadorDados.obterOrdenacao().direcao !== direcao) {
      this.#gerenciadorDados.ordenar(campo);
    }
    this.#renderizador.renderizarDados();
  }

  filtrar(texto) {
    if (this.#refs.inputBusca) {
      this.#refs.inputBusca.value = texto;
    }
    this.#gerenciadorDados.filtrar(texto);
    this.#renderizador.renderizarDados();
  }

  limparFiltros() {
    if (this.#refs.inputBusca) {
      this.#refs.inputBusca.value = "";
    }
    this.#gerenciadorDados.limparFiltros();
    this.#renderizador.renderizarDados();
  }

  exportarCSV() {
    return this.#exportador.exportarCSV();
  }

  exportarJSON() {
    return this.#exportador.obterJSON();
  }

  obterSelecionados() {
    return this.#gerenciadorDados.obterSelecionados();
  }

  limparSelecao() {
    this.#gerenciadorDados.limparSelecao();
    this.#renderizador.renderizarDados();
  }

  obterDadosFiltrados() {
    return this.#gerenciadorDados.obterDadosFiltrados();
  }

  obterTotalRegistros() {
    return this.#gerenciadorDados.obterDadosOriginais().length;
  }

  obterTotalFiltrados() {
    return this.#gerenciadorDados.obterDadosFiltrados().length;
  }

  irParaPagina(pagina) {
    const totalPaginas = this.#gerenciadorDados.getTotalPaginas();
    if (pagina >= 1 && pagina <= totalPaginas) {
      this.#gerenciadorDados.irParaPagina(pagina);
      this.#renderizador.renderizarDados();
    }
  }

  obterPaginaAtual() {
    return this.#gerenciadorDados.obterPaginaAtual();
  }

  obterTotalPaginas() {
    return this.#gerenciadorDados.getTotalPaginas();
  }
}

/**
 * Evento emitido quando o componente está pronto.
 * @event TabelaDados#tabela-pronta
 */

/**
 * Evento emitido quando a seleção de linhas muda.
 * @event TabelaDados#selecao-alterada
 * @property {Array} detail - Array de linhas selecionadas
 */

/**
 * Evento emitido quando dados são exportados.
 * @event TabelaDados#exportacao
 * @property {object} detail - Detalhes da exportação
 * @property {string} detail.tipo - Tipo de exportação (csv/json)
 * @property {number} detail.registros - Número de registros exportados
 */

// ============================================================================
// REGISTRO DO COMPONENTE
// ============================================================================

if (!customElements.get("tabela-dados")) {
  customElements.define("tabela-dados", TabelaDados);
  console.log("✓ TabelaDados v2.0.0 registrado com sucesso");
} else {
  console.warn("TabelaDados já está registrado");
}

export { TabelaDados, CONFIG_TABELA };

/**
 * ============================================================================
 * EXEMPLOS DE USO
 * ============================================================================
 *
 * 1. TABELA BÁSICA:
 * -----------------
 * <tabela-dados
 *   dados='[{"id":1,"nome":"João Silva","idade":28}]'
 *   colunas='[{"campo":"id","titulo":"ID"},{"campo":"nome","titulo":"Nome"}]'
 * ></tabela-dados>
 *
 *
 * 2. COM ORDENAÇÃO E BUSCA:
 * -------------------------
 * <tabela-dados
 *   dados='[...]'
 *   colunas='[{"campo":"nome","titulo":"Nome","ordenavel":true}]'
 *   mostrar-busca="true"
 * ></tabela-dados>
 *
 *
 * 3. COM PAGINAÇÃO:
 * -----------------
 * <tabela-dados
 *   dados='[...]'
 *   colunas='[...]'
 *   mostrar-paginacao="true"
 *   linhas-por-pagina="20"
 * ></tabela-dados>
 *
 *
 * 4. COM SELEÇÃO:
 * ---------------
 * <tabela-dados
 *   dados='[...]'
 *   colunas='[...]'
 *   selecionavel="true"
 *   multipla-selecao="true"
 * ></tabela-dados>
 *
 *
 * 5. COM FORMATAÇÃO:
 * ------------------
 * <tabela-dados
 *   dados='[{"nome":"João","vendas":15000,"ativo":true}]'
 *   colunas='[
 *     {"campo":"nome","titulo":"Nome"},
 *     {"campo":"vendas","titulo":"Vendas","formato":"moeda"},
 *     {"campo":"ativo","titulo":"Status","formato":"badge"}
 *   ]'
 * ></tabela-dados>
 *
 *
 * 6. USANDO A API JAVASCRIPT:
 * ---------------------------
 * const tabela = document.querySelector('tabela-dados');
 *
 * // Atualizar dados
 * tabela.atualizarDados([
 *   {id: 1, nome: 'João', idade: 28},
 *   {id: 2, nome: 'Maria', idade: 34}
 * ]);
 *
 * // Filtrar
 * tabela.filtrar('João');
 *
 * // Ordenar
 * tabela.ordenarPor('nome', 'asc');
 *
 * // Obter selecionados
 * const selecionados = tabela.obterSelecionados();
 *
 * // Exportar
 * tabela.exportarCSV();
 *
 *
 * 7. ESCUTANDO EVENTOS:
 * ---------------------
 * tabela.addEventListener('tabela-pronta', () => {
 *   console.log('Tabela carregada!');
 * });
 *
 * tabela.addEventListener('selecao-alterada', (e) => {
 *   console.log('Selecionados:', e.detail);
 * });
 *
 * tabela.addEventListener('exportacao', (e) => {
 *   console.log(`Exportado ${e.detail.registros} em ${e.detail.tipo}`);
 * });
 *
 * ============================================================================
 */
