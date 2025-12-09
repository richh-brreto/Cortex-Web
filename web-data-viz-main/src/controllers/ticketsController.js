const ticketsModel = require("../models/ticketsModel");

async function jiraInfos(req, res) {
  try {
    var key = req.params.key;

    const tickets = await ticketsModel.jiraInfos(key);

    if (tickets.length > 0) {
      return res.status(200).json(tickets);
    } else {
      return res.status(204).send();
    }
  } catch (erro) {
    res.status(500).send({
      message: "Erro interno no servidor ao processar a busca no Jira.",
      details: erro.message,
    });
  }
}

function bancoInfos(req, res) {
  var idModelo = req.params.IdModelo;

  if (idModelo == undefined) {
    res.status(400).send("idModelo indefinido para pesquisa");
  } else {
    ticketsModel
      .bancoInfos(idModelo)
      .then(function (resultado) {
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  jiraInfos,
  bancoInfos,
};
