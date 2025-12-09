// Importa o seu model
var arquiteturaModel = require("../models/arquiteturaModel");

// Função LISTAR
function listar(req, res) {
    var idEmpresa = req.params.idEmpresa;


    arquiteturaModel.listar(idEmpresa)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

// Função CADASTRAR
function cadastrar(req, res) {
    var dados = req.body;
    
    if (dados.nome == undefined || dados.modelo_cpu == undefined) {
        res.status(400).send("Dados do formulário estão incompletos!");
        return;
    }
    arquiteturaModel.cadastrar(dados)
        .then(function (resultado) {
            res.status(201).json(resultado); 
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}


function atualizar(req, res) {
    var idParaAtualizar = req.params.id;
    var dadosNovos = req.body;

    arquiteturaModel.atualizar(idParaAtualizar, dadosNovos)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}


function deletar(req, res) {
    var idParaDeletar = req.params.id;

    arquiteturaModel.deletar(idParaDeletar)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            res.status(500).json(erro.sqlMessage);
        });
}

function contarArquiteturas(req, res) {
    var fk_empresa = req.params.fk_empresa;

    if (fk_empresa == undefined) {
        res.status(400).send("fk_empresa está undefined!");
    } else {
        arquiteturaModel.contarArquiteturas(fk_empresa)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar,
    contarArquiteturas
};