var usuarioModel = require("../models/usuarioModel");



function cadastrarEmpresa(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html;
    var cnpj = req.body.cnpjServer;
    var nomeEmpresa = req.body.nomeEmpresaServer;
    var telefoneResponsavel = req.body.telefoneResponsavelServer;
    var nomeResponsavel = req.body.nomeResponsavelServer

    if (nomeEmpresa == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (telefoneResponsavel == undefined) {
        res.status(400).send("Seu telefoneResponsavel está undefined!");
    } else if (nomeResponsavel == undefined) {
        res.status(400).send("Seu nomeResponsavel está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarEmpresa(cnpj, nomeEmpresa, telefoneResponsavel, nomeResponsavel)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarUsuario(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idEmpresa = req.body.idEmpresaServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tel = req.body.telServer


    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (idEmpresa == undefined) {
        res.status(400).send("o idEmpresa está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarUsuario(idEmpresa, nome, email, senha, tel)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarId(req, res) {
    var cnpj = req.params.cnpjVar;
    console.log(`controller`);

    usuarioModel.buscarId(cnpj).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as medidas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}




function login(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;


    // Faça as validações dos valores
    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.login(email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o login! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarPorId(req, res) {
    var idUsuario = parseInt(req.params.id);
    if (isNaN(idUsuario)) {
        res.status(400).json({ message: 'ID inválido' });
        return;
    }

    usuarioModel.buscarPorId(idUsuario).then((resultado) => {
        if (resultado.length > 0) {
            const usuario = resultado[0];
            // monta URL da imagem de avatar
            const avatar = usuario.foto && String(usuario.foto).trim() !== ''
                ? `/assets/imgs/${usuario.foto}`
                : '/assets/icon/sem-foto.png';
            // devolve os dados junto com a URL do avatar
            const resposta = Object.assign({}, usuario, { avatar });
            res.status(200).json(resposta);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o usuário: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function alterarSenha(req, res) {
    var idUsuario = parseInt(req.body.idUsuario);
    var senhaAtual = req.body.senhaAtual;
    var senhaNova = req.body.senhaNova;

    if (isNaN(idUsuario) || !senhaAtual || !senhaNova) {
        res.status(400).json({ message: 'Parâmetros inválidos' });
        return;
    }

    usuarioModel.verificarSenha(idUsuario, senhaAtual).then(function (resultado) {
        if (resultado.length == 0) {
            res.status(403).json({ message: 'Senha atual incorreta' });
            return;
        }

        usuarioModel.alterarSenha(idUsuario, senhaNova).then(function (resultadoUpdate) {
            res.status(200).json({ message: 'Senha alterada com sucesso' });
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });

    }).catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    });

}

function contarFuncionarios(req, res) {
    var fk_empresa = req.params.fk_empresa;

    if (fk_empresa == undefined) {
        res.status(400).send("fk_empresa está undefined!");
    } else {
        usuarioModel.contarFuncionarios(fk_empresa)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao contar funcionários: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrarUsuario,
    buscarId,
    cadastrarEmpresa,
    login,
    buscarPorId, 
    alterarSenha,
    contarFuncionarios 
}