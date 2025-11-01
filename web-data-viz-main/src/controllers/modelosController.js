var modeloModel = require("../models/modelosModel");


function listarPorEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("O idEmpresa está indefinido!");
    } else {
        modeloModel.listarPorEmpresa(idEmpresa)
            .then(function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a consulta! Erro: ", erro.sqlMessage || erro); 
                res.status(500).json(erro.sqlMessage || erro);
            });
    }
}

// Função CADASTRAR
function cadastrar(req, res) {
    var dados = req.body; 
    console.log("Controller: Recebido POST em /modelos/cadastrar:", dados);

    if (dados.nome == undefined) {
        res.status(400).send("O nome do modelo está indefinido!");
    } else if (dados.fk_cliente == undefined) {
        res.status(400).send("O cliente (fk_cliente) está indefinido!");
    } else if (dados.fk_zona_disponibilidade == undefined) {
        res.status(400).send("A zona (fk_zona_disponibilidade) está indefinida!");
    } else if (dados.fk_arquitetura == undefined) {
        res.status(400).send("A arquitetura (fk_arquitetura) está indefinida!");
    } else if (dados.fk_empresa == undefined) { 
         res.status(400).send("A empresa (fk_empresa) está indefinida!");
    } else {
        
        modeloModel.cadastrar(dados)
            .then(function (resultado) {
                res.status(201).json(resultado); 
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage || erro);
                res.status(500).json(erro.sqlMessage || erro);
            });
    }
}

function atualizar(req, res) {
    var idModelo = req.params.idModelo;
    var dadosNovos = req.body;
   
    if (idModelo == undefined) {
        res.status(400).send("O idModelo está indefinido!");
    } else if (dadosNovos.nome == undefined || dadosNovos.fk_cliente == undefined /* etc */) {
         res.status(400).send("Dados para atualização estão incompletos!");
    } else {
        modeloModel.atualizar(idModelo, dadosNovos)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar a atualização! Erro: ", erro.sqlMessage || erro);
                res.status(500).json(erro.sqlMessage || erro);
            });
    }
}

function deletar(req, res) {
    var idModelo = req.params.idModelo;


    if (idModelo == undefined) {
        res.status(400).send("O idModelo está indefinido!");
    } else {
        modeloModel.deletar(idModelo)
            .then(function (resultado) {
                res.status(200).json(resultado); 
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao deletar o modelo! Erro: ", erro.sqlMessage || erro);
                res.status(500).json(erro.sqlMessage || erro);
            });
    }
}

function contarModelos(req, res) {
    var fk_empresa = req.params.fk_empresa;

    if (fk_empresa == undefined) {
        res.status(400).send("fk_empresa está undefined!");
    } else {
        modeloModel.contarModelos(fk_empresa)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao contar modelos: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    listarPorEmpresa,
    cadastrar,
    atualizar,
    deletar,
    contarModelos
};

