var infoModeloModel = require("../models/infoModeloModel");

function infoModeloGet(req, res) {
  var idModelo = req.params.idmodelo;

  if (idModelo == undefined) {
    res.status(400).send("idModelo indefinido");
  } else {
    infoModeloModel
      .infoModeloGet(idModelo)
      .then(function (resultado) {
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function atualizarStatusAutokill(req, res) {
  var idProcesso = req.body.id_processo;
  var novoStatus = req.body.novo_status;

  infoModeloModel
    .atualizarStatus(idProcesso, novoStatus)
    .then(function (resultado) {
      res.json({ mensagem: "Atualizado com sucesso" });
    })
    .catch(function (erro) {
      res.status(500).send(erro.message);
    });
}

function listarBlacklist(req, res) {
  var idModelo = req.params.idmodelo;
  if (idModelo == undefined) {
    res.status(400).send("idModelo indefinido");
  } else {
    infoModeloModel
      .listarBlacklist(idModelo)
      .then(function (resultado) {
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function adicionarProcessoProibido(req, res) {
  const { fk_modelo, nome } = req.body;
  if (!fk_modelo || !nome) {
    return res.status(400).send("Dados incompletos (fk_modelo, nome).");
  }

  infoModeloModel
    .adicionarBlacklist(fk_modelo, nome)
    .then(function (resultado) {
      res
        .status(201)
        .json({
          mensagem: "Processo adicionado como proibido (Autokill=OFF).",
        });
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage || "Erro interno.");
    });
}

function registrarProcessoNeutro(req, res) {
  const { fk_modelo, nome } = req.body;
  if (!fk_modelo || !nome) {
    return res.status(400).send("Dados incompletos (fk_modelo, nome).");
  }
  infoModeloModel
    .matarProcesso(fk_modelo, nome)
    .then(function (resultado) {
      res
        .status(201)
        .json({ mensagem: "Processo registrado como neutro (Kill acionado)." });
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage || "Erro interno.");
    });
}

function removerDaBlacklist(req, res) {
  var idProcesso = req.params.idProcesso;

  // Validação básica para garantir que o ID é um número válido
  if (idProcesso == undefined || isNaN(idProcesso)) {
    return res.status(400).send("ID do processo inválido!"); // Retorna erro 400 Bad Request
  }

  infoModeloModel
    .removerDaBlacklist(idProcesso)
    .then(function (resultado) {
      if (resultado && resultado.affectedRows > 0) {
        res
          .status(200)
          .json({ mensagem: "Processo removido da blacklist com sucesso!" });
      } else {
        res
          .status(404)
          .send("Processo não encontrado na blacklist com o ID fornecido.");
      }
    })
    .catch(function (erro) {
      res
        .status(500)
        .json(
          erro.sqlMessage || "Erro interno do servidor ao remover da blacklist."
        ); // Retorna
    });
}

function procMortos(req, res) {
  var idModelo = req.params.idModelo;

  if (idModelo == undefined) {
    return res.status(400).send("ID do modelo inválido!"); // Retorna erro 400 Bad Request
  }

  infoModeloModel
    .procMortos(idModelo)
    .then(function (resultado) {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res
        .status(500)
        .json(
          erro.sqlMessage ||
            "Erro interno do servidor ao listar log de processos."
        );
    });
}

module.exports = {
  infoModeloGet,
  adicionarProcessoProibido,
  registrarProcessoNeutro,
  listarBlacklist,
  removerDaBlacklist,
  atualizarStatusAutokill,
  procMortos,
};
