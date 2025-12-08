const alertasModel = require("../models/alertasModel");

async function dadosSlack(req, res) {
  try {
    const modelo = req.params.modelo;
    const mensagens = await alertasModel.dadosSlack(modelo);
    if (!mensagens) {
      return res.status(200).json([]);
    }
    console.log(`Total de mensagens encontradas: ${mensagens.length} (Controller)`);
    return res.status(200).json(mensagens);
  } catch (erro) {
    console.error(`Erro ao listar alertas: ${erro.message} (Controller)`);
    res.status(500).send({
      message: "Erro interno no servidor ao processar a busca Slack.",
      details: erro.message
    });
  }
}

async function listarModelosUsuario(req, res) {
  try {
    const fk_usuario = req.params.fk_usuario;
    const fk_empresa = req.params.fk_empresa;

    if (!fk_usuario || !fk_empresa) {
      return res.status(400).json({ message: "fk_usuario ou fk_empresa indefinido" });
    }

    const modelos = await alertasModel.listarModelosParaUsuario(fk_usuario, fk_empresa);
    return res.status(200).json(modelos);
  } catch (erro) {
    console.error("Erro ao listar modelos para usuário:", erro);
    return res.status(500).json({ message: "Erro interno", details: erro.sqlMessage || erro.message });
  }
}

module.exports = {
  dadosSlack,
  listarModelosUsuario
};