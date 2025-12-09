var zonaModel = require("../models/zonaModel");

function cadastrarzona(req, res) {
  var nomeZona = req.params.nome;
  var idEmpresa = req.params.idEmpresa;

  if (nomeZona == undefined || idEmpresa == undefined) {
    res.status(400).send("Algum parêmetro indefinido");
  } else {
    zonaModel
      .cadastrarzona(nomeZona, idEmpresa)
      .then(function (resultado) {
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function carregarAbas(req, res) {
  var idEmpresa = req.params.idEmpresa;

  if (idEmpresa == undefined) {
    res.status(400).send("Algum parêmetro indefinido");
  } else {
    zonaModel
      .carregarAbas(idEmpresa)
      .then(function (resultado) {
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function info_usuario(req, res) {
  var idZona = req.params.idZona;

  if (idZona == undefined) {
    res.status(400).send("Algum parêmetro indefinido");
  } else {
    zonaModel
      .info_usuario(idZona)
      .then(function (resultado) {
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function qtdModelo(req, res) {
  var idZona = req.params.idZona;

  if (idZona == undefined) {
    res.status(400).send("Algum parêmetro indefinido");
  } else {
    zonaModel
      .qtdModelo(idZona)
      .then(function (resultado) {
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  cadastrarzona,
  carregarAbas,
  qtdModelo,
  info_usuario,
};
