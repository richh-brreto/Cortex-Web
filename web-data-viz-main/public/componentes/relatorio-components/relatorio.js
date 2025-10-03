
class Relatorio extends HTMLElement{
    constructor(){
        super();
        this.dados = []
    }

  static get observedAttributes(){
    return ["coluna", "chaves","tipo","gerenciador","botao-final"]
  }

  connectedCallback(){
    this.render()
  }

  render (){

    const botao_final = this.getAttribute("botao-final") || ""

    const coluna = this.getAttribute("coluna") || "Sem nome";
    const colunaSeparar = coluna.split(",")

    const divGeral = document.createElement("div")
    divGeral.className = "tabela"

    const cabecalho = document.createElement("div")
    cabecalho.className = "cabecalho"

    

    if(this.hasAttribute("gerenciador")){
        const colunaGer = document.createElement("div")
        colunaGer.className = "coluna"

        colunaGer.textContent = ''
        cabecalho.appendChild(colunaGer)
      }

    for(let i = 0; i <colunaSeparar.length;i++){
      const nome = colunaSeparar[i]

      const coluna = document.createElement("div")
      coluna.className = "coluna"
      coluna.textContent = nome

      cabecalho.appendChild(coluna)
    }
    
    const colunaFinal = document.createElement("div")
    colunaFinal.className = "coluna"
    colunaFinal.textContent = ""

    cabecalho.appendChild(colunaFinal)

    divGeral.appendChild(cabecalho)

    //linha

      const chave = this.getAttribute("chaves") || ""
      const chaveSeparada = chave.split(",")

   
   

    for(let i = 0; i < this.dados.length;i++){
      const divLinha = document.createElement("div")
      divLinha.className = "container-linha"

      if(this.hasAttribute("gerenciador")){
        const linhaGer = document.createElement("div")
        linhaGer.className = "linha"

       // const check = document.createElement("input-cortex]")
      //  check.setAttribute('config-data', JSON.stringify({
       //   type: 'checkbox'
       // }))
        const check = document.createElement("input")
        check.setAttribute("type","checkbox")
        linhaGer.appendChild(check)

        divLinha.appendChild(linhaGer)
      }
      for(let m = 0; m< chaveSeparada.length;m++){
        const chaveDaVez = chaveSeparada[m]
        const linha = document.createElement("div")
        linha.className = "linha"
        linha.textContent = this.dados[i][chaveDaVez]
        divLinha.appendChild(linha)
      }

      const linhaFinal = document.createElement("div")
      linhaFinal.className = "linha"
      const botaoFinal = document.createElement("button")
      botaoFinal.textContent = botao_final
      linhaFinal.appendChild(botaoFinal)
      divLinha.appendChild(linhaFinal)
     

      
      divGeral.appendChild(divLinha)
    }

    const divMaioral = document.createElement("div")
    divMaioral.className = "tabela-container"

    
    divMaioral.appendChild(divGeral)
    this.innerHTML = ''
    this.appendChild(divMaioral)

  }
  

}
customElements.define("meu-relatorio", Relatorio);