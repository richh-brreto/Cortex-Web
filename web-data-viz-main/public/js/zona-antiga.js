function cadastrarzona() {

    var nome_zona = ipt_nome_zona.value;
    var idEmpresa = sessionStorage.getItem('EMPRESA_USUARIO');


    if (nome_zona == "") {
        alert("Por favor, preencha o campo.");
        return;
    }


    fetch('/zona/cadastrarzona/' + nome_zona + "/" + idEmpresa, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (resposta) {
        if (resposta.ok) {
            alert("Zona cadastrado com sucesso!");
            window.location.reload();
        } else {
            alert("Houve um erro ao tentar cadastrar a zona!");
            console.error('Erro no cadastro, resposta do servidor:', resposta);
        }
    }).catch(function (erro) {
        console.error('Erro na requisição de cadastro:', erro);
        alert("Houve um erro na requisição!");
    });
}

function carregarAbas() {
    const idEmpresa = sessionStorage.getItem('EMPRESA_USUARIO')

    fetch('/zona/carregarAbas/' + idEmpresa)
        .then(function (resposta) {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error('Falha ao buscar os dados do formulário.');
            }
        })
        .then(function (info) {
            listaIdZona = []
            const container_abas = document.getElementById("container-abas")
            for (let i = 0; i < info.length; i++) {
                listaIdZona.push(info[i].id_zona)
                const aba = document.createElement("div")
                if (i == 0) {
                    aba.className = "aba escolhida"
                } else {
                    aba.className = "aba"
                }

                const btEditar = document.createElement("button")
                btEditar.className = "botao-editar"
                btEditar.id = "botao-editar"
                const imagemEditar = document.createElement("img")
                imagemEditar.src = "../assets/icon/1159633.png"
                btEditar.appendChild(imagemEditar)
                aba.appendChild(btEditar)

                const btDel = document.createElement("button")
                btDel.className = "botao-del"
                btDel.id = "botao-del"
                const imagemDel = document.createElement("img")
                imagemDel.src = "../assets/icon/deletar.png"
                btDel.appendChild(imagemDel)
                aba.appendChild(btDel)

                const divTexto = document.createElement("div")
                divTexto.className = "texto-aba"
                const h5 = document.createElement("h5")
                h5.textContent = info[i].nome
                divTexto.appendChild(h5)

                const idZona = info[i].id_zona

                fetch('/zona/qtdModelo/' + idZona)
                    .then(function (resposta) {
                        if (resposta.ok) {
                            return resposta.json();
                        } else {
                            throw new Error('Falha ao buscar os dados do formulário.');
                        }
                    })
                    .then(function (info2) {
                        const h6 = document.createElement("h6")
                        h6.textContent = "Qtd. Modelos: " + info2[0].qtd
                        divTexto.appendChild(h6)
                    })

                aba.appendChild(divTexto)
                container_abas.appendChild(aba)


            }
            
            botaoAba(listaIdZona)
        })
        .catch(function (error) {
            console.error('Erro ao buscar dados do formulário:', error);
        });



}

function botaoAba(listaIdZona) {
    const texto_aba = document.getElementsByClassName("texto-aba")
    const aba = document.getElementsByClassName("aba")

    info_usuario(listaIdZona[0])

    for (let i = 0; i < texto_aba.length; i++) {
        texto_aba[i].addEventListener("click", function () {
            const escolhida = document.getElementsByClassName("escolhida")
            escolhida[0].classList.remove("escolhida")
            aba[i].classList.add("escolhida")
            
            info_usuario(listaIdZona[i])
             
        })
    }
}


function info_usuario(idZona){
      fetch('/zona/info-usuario/' + idZona)
                .then(function (resposta) {
                    if (resposta.ok) {
                        return resposta.json();
                    } else {
                        throw new Error('Falha ao buscar os dados do formulário.');
                    }
                })
                .then(function (info3) {

                    const divUsuarioConteudo = document.getElementById("usuario-conteudo")
                    divUsuarioConteudo.innerHTML = ""
                    for (let i = 0; i < info3.length; i++) {
                        if (i % 3 == 0) {
                            var linhaUsuario = document.createElement("div")
                            linhaUsuario.className = "linha-usuario"
                            divUsuarioConteudo.appendChild(linhaUsuario)
                        }

                        const divCard = document.createElement("div")
                        divCard.className = "card-usuario"
                        const fotoPerfil = document.createElement("img")
                        // tem que pegar a foto do usuario
                        fotoPerfil.src = "../assets/icon/teste-perfil.webp"
                        fotoPerfil.className = "foto"
                        divCard.appendChild(fotoPerfil)

                        const divConteudo = document.createElement("div")
                        divConteudo.className = "conteudo-usuario"
                        divCard.appendChild(divConteudo)

                        const nome = document.createElement("h5")
                        nome.textContent = info3[i].nome_usuario
                        divConteudo.appendChild(nome)

                        const linha1 = document.createElement("div")
                        linha1.className = "linha-conteudo"
                        divConteudo.appendChild(linha1)

                        const emailTag = document.createElement("h6")
                        emailTag.textContent = "Email: "
                        linha1.appendChild(emailTag)

                        const emailInfo = document.createElement("h6")
                        emailInfo.textContent = info3[i].email
                        linha1.appendChild(emailInfo)

                        const linha2 = document.createElement("div")
                        linha2.className = "linha-conteudo"
                        divConteudo.appendChild(linha2)

                        const cargoTag = document.createElement("h6")
                        cargoTag.textContent = "Cargo: "
                        linha2.appendChild(cargoTag)

                        const cargoInfo = document.createElement("h6")
                        cargoInfo.textContent = info3[i].cargo
                        linha2.appendChild(cargoInfo)

                        const botaoDiv = document.createElement("div")
                        botaoDiv.className = "botao-del-usuario"
                        divCard.appendChild(botaoDiv)

                        const botao = document.createElement("button")
                        botao.className = "botao-del"
                        botaoDiv.appendChild(botao)

                        const imgDel = document.createElement("img")
                        imgDel.src = "../assets/icon/deletar.png"
                        botao.appendChild(imgDel)

                        linhaUsuario.appendChild(divCard)
                    }

                })
                .catch(function (error) {
                    console.error('Erro ao buscar dados do formulário:', error);
                });
}

window.onload = function () {
    carregarAbas();
};