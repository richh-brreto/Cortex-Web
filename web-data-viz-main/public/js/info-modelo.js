function pesquisar(){

   

    // vai ser pego do back futuramente 
    const possibilidades = ["Abacate","Banana","Batata"]

    var input = document.getElementById("pesquisar")
    var divSugestao = document.getElementById("sugestao")

    input.addEventListener("input", function (){
         const sugestao = []
        const digitado = this.value.toLocaleLowerCase();
        divSugestao.innerHTML = ""
      

        if(digitado.length === 0){
            return
        }
          
        for(let i = 0; i< possibilidades.length;i++){
            if(possibilidades[i].toLowerCase().startsWith(digitado)){
                sugestao.push(possibilidades[i])
            }
        }

        for(let j =0; j<sugestao.length;j++){
            const div = document.createElement("div")
            div.textContent = sugestao[j]
            div.style.cursor = "pointer"

            div.addEventListener("click", () =>{
                input.value = sugestao[j]
                divSugestao.innerHTML = ""
            })

            divSugestao.appendChild(div)
        }         

    })

   

}

    pesquisar()

function exibicaoFront (){
    // vai ser passado um parâmetro com o id do modelo, enquanto isso irei criar algo mocado
    const idmodelo = 4

     fetch('info-modelo/info-modelo-rota/' + idmodelo) 
                .then(function(resposta) { 
                    if (resposta.ok) {
                        return resposta.json();
                    } else {
                       throw new Error('Falha ao buscar os dados do formulário.');
                    }
                })
                .then(function(info) { 
                    console.log(info)
                })
                .catch(function(error) {
                    console.error('Erro ao buscar dados do formulário:', error);
                });


    
}

window.onload = function () {
    exibicaoFront();
};