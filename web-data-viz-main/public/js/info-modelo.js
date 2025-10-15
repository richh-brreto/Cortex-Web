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
                    console.log(info[0])

                    const divTitulo = document.getElementById("titulo_topo")
                    const nomeModelo = document.createElement("h2")
                    nomeModelo.textContent = info[0].nomeModelo
                    divTitulo.appendChild(nomeModelo)

                    const divDescricao = document.getElementById("divDescricao")
                    const descricaoTag =  document.createElement("h5")
                    descricaoTag.textContent = "Descrição:"
                    divDescricao.appendChild(descricaoTag)

                    const descricao = document.createElement("h6")
                    descricao.textContent = info[0].descricao
                    divDescricao.appendChild(descricao)

                    const ipTag = document.createElement("h5")
                    ipTag.textContent = "IP:"
                    divDescricao.appendChild(ipTag)

                    const ip = document.createElement("h6")
                    ip.textContent = info[0].ip
                    divDescricao.appendChild(ip)

                    const hostTag = document.createElement("h5")
                    hostTag.textContent = "Hostname:"
                    divDescricao.appendChild(hostTag)

                    const hostname = document.createElement("h6")
                    hostname.textContent = info[0].hostname
                    divDescricao.appendChild(hostname)


                    const divZona = document.getElementById("info-linha-zona")
                    const zonaTag = document.createElement("h5")
                    zonaTag.textContent = "Zona Atual:"
                    divZona.appendChild(zonaTag)

                    const zona = document.createElement("h6")
                    zona.textContent = info[0].zona
                    divZona.appendChild(zona)

                    const divCliente = document.getElementById("info-linha-cliente")
                    const clienteTag = document.createElement("h5")
                    clienteTag.textContent = "Cliente:"
                    divCliente.appendChild(clienteTag)

                    const cliente = document.createElement("h6")
                    cliente.textContent = info[0].cliente
                    divCliente.appendChild(cliente)

                    const divTempo = document.getElementById("info-linha-tempo")
                    const tempoTag = document.createElement("h5")
                    tempoTag.textContent = "Tempo Parâmetros:"
                    divTempo.appendChild(tempoTag)

                    const tempo = document.createElement("h6")
                    tempo.textContent = info[0].tempo_parametro_min + "min"
                    divTempo.appendChild(tempo)

                    const divPar = document.getElementById("tituloPar")
                    const parTag = document.createElement("h4")
                    parTag.textContent = "Parâmetros:"
                    divPar.appendChild(parTag)

                    const divCpu = document.getElementById("cpu")
                    const cpuTag = document.createElement("h5")
                    cpuTag.textContent = "CPU:"
                    divCpu.appendChild(cpuTag)

                    const cpu = document.createElement("h6")
                    cpu.textContent = info[0].limite_cpu  + "%"
                    divCpu.appendChild(cpu)

                    const divRam = document.getElementById("ram")
                    const ramTag = document.createElement("h5")
                    ramTag.textContent = "RAM:"
                    divRam.appendChild(ramTag)

                    const ram = document.createElement("h6")
                    ram.textContent = info[0].limite_ram  + "%"
                    divRam.appendChild(ram)

                    const divDisco = document.getElementById("disco")
                    const discoTag = document.createElement("h5")
                    discoTag.textContent = "Disco:"
                    divDisco.appendChild(discoTag)

                    const disco = document.createElement("h6")
                    disco.textContent = info[0].limite_disco  + "%"
                    divDisco.appendChild(disco)

                    const divGpu = document.getElementById("gpu")
                    const gpuTag = document.createElement("h5")
                    gpuTag.textContent = "GPU:"
                    divGpu.appendChild(gpuTag)

                    const gpu = document.createElement("h6")
                    gpu.textContent = info[0].limite_gpu + "%"
                    divGpu.appendChild(gpu)
                })
                .catch(function(error) {
                    console.error('Erro ao buscar dados do formulário:', error);
                });


    
}

window.onload = function () {
    exibicaoFront();
};