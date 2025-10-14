var adminModel = require("../models/adminModel");

function listarPendentes(req, res) {
    adminModel.listarPendentes().then(r => res.json(r)).catch(e => res.status(500).json(e));
}

function ativarUsuario(req, res) {
    var idUsuario = req.body.idUsuario;
    adminModel.ativarUsuario(idUsuario).then(r => res.json(r)).catch(e => res.status(500).json(e));
}

function recusarUsuario(req, res) {
    var idUsuario = req.body.idUsuario;
    adminModel.recusarUsuario(idUsuario).then(r => res.json(r)).catch(e => res.status(500).json(e));
}

module.exports = {
    listarPendentes,
    ativarUsuario,
    recusarUsuario
};