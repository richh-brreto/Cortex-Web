// src/controllers/jiraController.js

const jiraModel = require("../models/mural");

async function listarTodosAlertas(req, res) {
  try {
    const tickets = await jiraModel.buscarTodosTickets();

    if (tickets.length > 0) {
      return res.status(200).json(tickets);
    } else {
      return res.status(204).send();
    }
  } catch (erro) {
    return res
      .status(500)
      .json({ erro: "Erro interno do servidor ao processar a requisição." });
  }
}

module.exports = {
  listarTodosAlertas,
};
