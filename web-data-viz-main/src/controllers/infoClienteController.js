
var infoClienteModel = require("../models/infoClienteModel")

function possibilidadesPesquisa(req, res){
     var idcliente = req.params.idcliente

    if (idcliente == undefined){
        res.status(400).send("idcliente indefinido para pesquisa")
    } else {

        infoClienteModel.possibilidadesPesquisa(idcliente)
            .then(
                function(resultado) {
                    console.log("Tudo certo no controller")

                    res.status(200).json(resultado)
                }
            ).catch(
                function(erro){
                    console.log(erro)
                    console.log("\nErro ao buscar possibilidades de pesquisa", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

function infoClienteInfo(req, res) {
    var idcliente = req.params.idcliente

    if (idcliente == undefined){
        res.status(400).send("idcliente indefinido para info cliente")
    } else {

        infoClienteModel.infoClienteInfo(idcliente)
            .then(
                function(resultado) {
                    console.log("Tudo certo no controller")

                    res.status(200).json(resultado)
                }
            ).catch(
                function(erro){
                    console.log(erro)
                    console.log("\nErro ao buscar informações do cliente", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}


function infoModelosClientes(req, res){
     var idcliente = req.params.idcliente

    if (idcliente == undefined){
        res.status(400).send("idcliente indefinido para info modelos")
    } else {

        infoClienteModel.infoModelosClientes(idcliente)
            .then(
                function(resultado) {
                    console.log("Tudo certo no controller")

                    res.status(200).json(resultado)
                }
            ).catch(
                function(erro){
                    console.log(erro)
                    console.log("\nErro ao buscar info modelos", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

function clienteKpi(req, res){
     var idcliente = req.params.idcliente

    if (idcliente == undefined){
        res.status(400).send("idcliente indefinido para dash")
    } else {

        infoClienteModel.clienteKpi(idcliente)
            .then(
                function(resultado) {
                    console.log("Tudo certo no controller")

                    res.status(200).json(resultado)
                }
            ).catch(
                function(erro){
                    console.log(erro)
                    console.log("\nErro ao buscar info da dash", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

function clienteGrafico(){
    var idcliente = req.params.idcliente

    if (idcliente == undefined){
        res.status(400).send("idcliente indefinido para dash")
    } else {

        infoClienteModel.clienteGrafico(idcliente)
            .then(
                function(resultado) {
                    console.log("Tudo certo no controller")

                    res.status(200).json(resultado)
                }
            ).catch(
                function(erro){
                    console.log(erro)
                    console.log("\nErro ao buscar info da dash", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

module.exports = {
    infoClienteInfo,
    possibilidadesPesquisa,
    infoModelosClientes,
    clienteKpi
}