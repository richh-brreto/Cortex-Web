// Importa o seu model
var arquiteturaModel = require("../models/arquiteturaModel");

// Função LISTAR
function listar(req, res) {
    var idEmpresa = req.params.idEmpresa;

    console.log(`Controller: Recebido GET em /arquiteturas/listar para a empresa: ${idEmpresa}`);

    arquiteturaModel.listar(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as arquiteturas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// Função CADASTRAR
function cadastrar(req, res) {
    var dados = req.body;
    console.log("Controller: Recebido POST em /arquiteturas/cadastrar:", dados);
    
    if (dados.nome == undefined || dados.modelo_cpu == undefined /*...etc...*/) {
        res.status(400).send("Dados do formulário estão incompletos!");
        return;
    }

    arquiteturaModel.cadastrar(dados)
        .then(function (resultado) {
            res.status(201).json(resultado); // 201 = Criado com sucesso
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao cadastrar a arquitetura: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


function atualizar(req, res) {
    var idParaAtualizar = req.params.id;
    var dadosNovos = req.body;

    console.log(`Controller: Recebido POST (para ATUALIZAR) em /arquiteturas/atualizar/${idParaAtualizar}`);

    arquiteturaModel.atualizar(idParaAtualizar, dadosNovos)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao atualizar a arquitetura: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


function deletar(req, res) {
    var idParaDeletar = req.params.id;
    console.log(`Controller: Recebido POST (para DELETAR) em /arquiteturas/deletar/${idParaDeletar}`);

    arquiteturaModel.deletar(idParaDeletar)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao deletar a arquitetura: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar
};