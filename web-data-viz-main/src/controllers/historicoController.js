// src/controllers/jiraController.js

const historicoModel = require("../models/historicoModel");

async function listarAlertasHistorico(req, res) {

    try {
  
        const tickets = await historicoModel.buscarTicketsHistorico();


        if (tickets.length > 0) {
            console.log(`[CONTROLLER] Total de tickets encontrados: ${tickets.length}`);
            return res.status(200).json(tickets);
        } else {
           
            return res.status(204).send(); 
        }

    } catch (erro) {
        console.error(`[CONTROLLER] Erro ao listar alertas: ${erro.message}`);
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


module.exports = {
    listarAlertasHistorico,
    bancoInfos
};