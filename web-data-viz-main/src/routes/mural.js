

var express = require("express");
var router = express.Router();

var jiraController = require("../controllers/mural");
var historicoController = require("../controllers/historicoController");


router.get("/todos", (req, res) => {
    jiraController.listarTodosAlertas(req, res);
});

router.get("/historico", (req, res) => {
    historicoController.listarAlertasHistorico(req, res);
});

router.get("/bancoHistorico/:IdModelo", (req, res) => {
    historicoController.bancoInfos(req, res);
});

module.exports = router;