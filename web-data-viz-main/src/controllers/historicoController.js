// src/controllers/jiraController.js

const historicoModel = require("../models/historicoModel");

async function listarAlertasHistorico(req, res) {

    try {
  
        const tickets = await historicoModel.buscarTicketsHistorico();

        if (tickets.length > 0) {
            return res.status(200).json(tickets);
        } else {
           
            return res.status(204).send(); 
        }

    } catch (erro) {
        return res.status(500).json({ erro: "Erro interno do servidor ao processar a requisição." });
    }
}

function bancoInfos(req, res){
     var idModelo = req.params.IdModelo

    if (idModelo == undefined){
        res.status(400).send("idModelo indefinido para pesquisa")
    } else {

        historicoModel.bancoInfos(idModelo)
            .then(
                function(resultado) {

                    res.status(200).json(resultado)
                }
            ).catch(
                function(erro){
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}


module.exports = {
    listarAlertasHistorico,
    bancoInfos
};