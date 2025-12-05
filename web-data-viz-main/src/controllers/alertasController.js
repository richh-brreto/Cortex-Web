const alertasModel = require("../models/alertasModel");

async function dadosJira(req, res) {
  try {
    var key = req.params.key
    const tickets = await alertasModel.dadosJira(key);
    if (tickets.length > 0) {
      console.log(`[CONTROLLER] Total de tickets encontrados: ${tickets.length}`);
      return res.status(200).json(tickets);
    } else {
      return res.status(204).send();
    }
  } catch (erro) {
    console.error(`Erro ao listar alertas: ${erro.message} (Controller)`);
    res.status(500).send({
      message: "Erro interno no servidor ao processar a busca no Jira.",
      details: erro.message
    });
  }
}

async function dadosSlack(req, res) {
  try {
    var key = req.params.key
    const mensagens = await alertasModel.dadosSlack(key);
    if (mensagens.length > 0) {
      console.log(`Total de mensagens encontradas: ${mensagens.length} (Controller)`);
      return res.status(200).json(mensagens);
    } else {
      return res.status(204).send();
    }
  } catch (erro) {
    console.error(`Erro ao listar alertas: ${erro.message} (Controller)`);
    res.status(500).send({
      message: "Erro interno no servidor ao processar a busca no Jira.",
      details: erro.message
    });
  }
  return mensagens;
}

async function alertasPorCategoria(req, res) {
  try {
    var key = req.params.key
    const mensagens = await alertasModel.dadosSlack(key);
    if (mensagens.length > 0) {
      console.log(`Total de mensagens encontradas: ${mensagens.length} (Controller)`);
      return res.status(200).json(mensagens);
    } else {
      return res.status(204).send();
    }
  } catch (erro) {
    console.error(`Erro ao listar alertas: ${erro.message} (Controller)`);
    res.status(500).send({
      message: "Erro interno no servidor ao processar a busca no Jira.",
      details: erro.message
    });
  }
  return mensagens;
}

async function alertasPorIntervalo(req, res) {
  try {
    var key = req.params.key
    const mensagens = await alertasModel.dadosSlack(key);
    if (mensagens.length > 0) {
      console.log(`Total de mensagens encontradas: ${mensagens.length} (Controller)`);
      return res.status(200).json(mensagens);
    } else {
      return res.status(204).send();
    }
  } catch (erro) {
    console.error(`Erro ao listar alertas: ${erro.message} (Controller)`);
    res.status(500).send({
      message: "Erro interno no servidor ao processar a busca no Jira.",
      details: erro.message
    });
  }
  return mensagens;
}

function buscarModelos(req, res) {
  var idModelo = req.params.IdModelo

  if (idModelo == undefined) {
    res.status(400).send("idModelo indefinido para pesquisa")
  } else {

    alertasModel.buscarModelos(idModelo)
      .then(
        function (resultado) {
          console.log("Tudo certo no controller")

          res.status(200).json(resultado)
        }
      ).catch(
        function (erro) {
          console.log(erro)
          console.log("\nErro ao buscar possibilidades de pesquisa", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
        }
      )
  }
}

module.exports = {
  dadosJira,
  dadosSlack,
  alertasPorCategoria,
  alertasPorIntervalo,
  buscarModelos
};