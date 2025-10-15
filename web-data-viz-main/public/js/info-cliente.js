function possibilidadesModelos() {
    const idcliente = 1
    fetch('info-cliente/info-cliente-possibilidades/' + idcliente)
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error('Falha ao buscar os dados das possibilidades.');
            }
        })
        .then(function (info2) {
            console.log(info2)
            var possibilidades = []

            for (let i = 0; i < info2.length; i++) {
                possibilidades.push(info2[i].nome)
            }

            pesquisar(possibilidades)
        })
        .catch(function (error) {
            console.error('Erro ao buscar dados das possibilidades:', error);
        });

}

function pesquisar(possibilidades) {

    var input = document.getElementById("pesquisar")
    var divSugestao = document.getElementById("sugestao")

    input.addEventListener("input", function () {
        const sugestao = []
        const digitado = this.value.toLocaleLowerCase();
        divSugestao.innerHTML = ""


        if (digitado.length === 0) {
            return
        }

        for (let i = 0; i < possibilidades.length; i++) {
            if (possibilidades[i].toLowerCase().startsWith(digitado)) {
                sugestao.push(possibilidades[i])
            }
        }

        for (let j = 0; j < sugestao.length; j++) {
            const div = document.createElement("div")
            div.textContent = sugestao[j]
            div.style.cursor = "pointer"

            div.addEventListener("click", () => {
                input.value = sugestao[j]
                divSugestao.innerHTML = ""
            })

            divSugestao.appendChild(div)
        }

    })



}

possibilidadesModelos()

function infoClienteExibicao() {
    // vai ser passado um parâmetro com o id do modelo, enquanto isso irei criar algo mocado
    const idcliente = 1

    fetch('info-cliente/info-cliente-rota/' + idcliente)
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error('Falha ao buscar os dados do cliente.');
            }
        })
        .then(function (info) {


            const divTitulo = document.getElementById("titulo_cliente")
            const nomeCliente = document.createElement("h2")
            nomeCliente.textContent = info[0].nome
            divTitulo.appendChild(nomeCliente)

            const divDescricao = document.getElementById("divDescricao")
            const descricaoTag = document.createElement("h5")
            descricaoTag.textContent = "Descrição:"
            divDescricao.appendChild(descricaoTag)

            const descricao = document.createElement("h6")
            descricao.textContent = info[0].descricao
            divDescricao.appendChild(descricao)

            const divTel = document.getElementById("telefone")
            const telTag = document.createElement("h5")
            telTag.textContent = "Telefone:"
            divTel.appendChild(telTag)

            const tel = document.createElement("h6")
            tel.textContent = info[0].telefone_contato
            divTel.appendChild(tel)

            const divEmail = document.getElementById("email")
            const emailTag = document.createElement("h5")
            emailTag.textContent = "Email:"
            divEmail.appendChild(emailTag)

            const email = document.createElement("h6")
            email.textContent = info[0].email_contato
            divEmail.appendChild(email)

            const divCnpj = document.getElementById("cnpj")
            const cnpjTag = document.createElement("h5")

            cnpjTag.textContent = "CNPJ:"
            divCnpj.appendChild(cnpjTag)

            const cnpj = document.createElement("h6")
            cnpj.textContent = info[0].cnpj
            divCnpj.appendChild(cnpj)

        })
        .catch(function (error) {
            console.error('Erro ao buscar dados do formulário:', error);
        });

}

function infoModelo() {
    const idcliente = 1
    fetch('info-cliente/info-cliente-infoModelo/' + idcliente)
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error('Falha ao buscar os dados dos modelos.');
            }
        })
        .then(function (info3) {
            console.log(info3)


            for (let i = 0; i < info3.length; i++) {
                if (i == 0 || i % 3 == 0) {
                    var linhaHist = document.createElement("div");
                    linhaHist.classList.add("linha-hist");
                    var divHist = document.getElementById("modelo-hist")
                    divHist.appendChild(linhaHist)
                }


                const cardModelo = document.createElement("div");
                cardModelo.classList.add("card-modelo");

                const canto = document.createElement("div");
                canto.classList.add("canto");

                const titulo = document.createElement("h2");
                titulo.textContent = info3[i].nome;

                const descricaoCard = document.createElement("div");
                descricaoCard.classList.add("descricao_card");

                const descTitulo = document.createElement("h4");
                descTitulo.textContent = "Descrição:";

                const descTexto = document.createElement("p");
                descTexto.textContent = info3[i].descricao;

                descricaoCard.appendChild(descTitulo);
                descricaoCard.appendChild(descTexto);

                canto.appendChild(titulo);
                canto.appendChild(descricaoCard);

                // Coluna do meio - colum
                const colum1 = document.createElement("div");
                colum1.classList.add("colum");

                const linhaParametros = document.createElement("div");
                linhaParametros.classList.add("linha_card");

                const parametrosTitulo = document.createElement("h4");
                parametrosTitulo.textContent = "Parâmetros:";
                linhaParametros.appendChild(parametrosTitulo);

                colum1.appendChild(linhaParametros);

                const parametros = [
                    { nome: "Tempo", valor: info3[i].tempo_parametro_min + "min"},
                    { nome: "CPU", valor: info3[i].limite_cpu },
                    { nome: "RAM", valor: info3[i].limite_ram },
                    { nome: "Disco", valor: info3[i].limite_disco },
                    { nome: "GPU", valor: info3[i].limite_gpu }
                ];

                for (let j = 0; j < parametros.length; j++) {
                    const linha = document.createElement("div");
                    linha.classList.add("linha_card");

                    const h5Nome = document.createElement("h5");
                    h5Nome.textContent = parametros[j].nome + ":";

                    const h5Valor = document.createElement("h5");
                    h5Valor.textContent = parametros[j].valor;

                    linha.appendChild(h5Nome);
                    linha.appendChild(h5Valor);

                    colum1.appendChild(linha);
                }


                const colum2 = document.createElement("div");
                colum2.classList.add("colum");

                const infos = [
                    { titulo: "Zona", valor: info3[i].zona },
                    { titulo: "Cliente", valor: info3[i].cliente },
                    { titulo: "IP", valor: info3[i].ip },
                    { titulo: "Hostname", valor: info3[i].hostname }
                ];

                for (let k = 0; k < infos.length; k++) {
                    const linha = document.createElement("div");
                    linha.classList.add("linha_card");

                    const h4 = document.createElement("h4");
                    h4.textContent = infos[k].titulo;

                    const h5 = document.createElement("h5");
                    h5.textContent = infos[k].valor;

                    linha.appendChild(h4);
                    linha.appendChild(h5);

                    colum2.appendChild(linha);
                }


                const botoesFinal = document.createElement("div");
                botoesFinal.classList.add("botoes-final");

                for (let l = 0; l < 2; l++) {
                    const botao = document.createElement("button");
                    botao.textContent = "A";

                    const img = document.createElement("img");
                    img.src = ""; 

                    botao.appendChild(img);
                    botoesFinal.appendChild(botao);
                }

                colum2.appendChild(botoesFinal);

          
                cardModelo.appendChild(canto);
                cardModelo.appendChild(colum1);
                cardModelo.appendChild(colum2);
                linhaHist.appendChild(cardModelo);

              

            }

        })
        .catch(function (error) {
            console.error('Erro ao buscar dados dos modelos:', error);
        });

}

function kpi() {
    const idcliente = 1
    fetch('info-cliente/info-cliente-kpi/' + idcliente)
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error('Falha ao buscar os dados das possibilidades.');
            }
        })
        .then(function (info4) {
            console.log(info4)

            const kpi1 = document.getElementById("kpi")
            const qtdTag = document.createElement("h4")
            qtdTag.textContent = "Qtd. Modelos:"
            kpi1.appendChild(qtdTag)

            const qtd = document.createElement("h4")
            qtd.textContent = info4[0].qtdModelo
            kpi1.appendChild(qtd)

            const kpi2 = document.getElementById("kpi2")
            const zonaDiv = document.createElement("h4")
            zonaDiv.textContent = "Distribuição por zona:"
            kpi2.appendChild(zonaDiv)

            const zona = document.createElement("h4")
            zona.textContent = info4[0].zona
            kpi2.appendChild(zona)
        })
        .catch(function (error) {
            console.error('Erro ao buscar dados das possibilidades:', error);
        });

}

function grafico(){
        const idcliente = 1
    fetch('info-cliente/info-cliente-grafico/' + idcliente)
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error('Falha ao buscar os dados das possibilidades.');
            }
        })
        .then(function (info2) {
            console.log(info2)
            var possibilidades = []

            for (let i = 0; i < info2.length; i++) {
                possibilidades.push(info2[i].nome)
            }

            pesquisar(possibilidades)
        })
        .catch(function (error) {
            console.error('Erro ao buscar dados das possibilidades:', error);
        });
}

window.onload = function () {
    infoClienteExibicao(),
        infoModelo(),
        kpi()
};