// CORREÇÃO: Importa o novo model renomeado
var dashTecnicoModel = require("../models/dashTecnicoModel");

function buscarZonasDoTecnico(req, res) {
  var idUsuario = req.params.idUsuario;
  // CORREÇÃO: Chama a função do model correto
  dashTecnicoModel
    .buscarZonasDoTecnico(idUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

function buscarAlertasDaZona(req, res) {
  var idZona = req.params.idZona;
  // CORREÇÃO: Chama a função do model correto
  dashTecnicoModel
    .buscarAlertasDaZona(idZona)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarZonasDoTecnico,
  buscarAlertasDaZona,
};
