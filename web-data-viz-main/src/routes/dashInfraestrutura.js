var express = require("express");
var router = express.Router();


var dashInfraController = require("../controllers/dashInfraController");


router.get("/zonas/:idEmpresa", function (req, res) {
    dashInfraController.listar(req, res);
});

router.get("/top4/:idEmpresa", function (req, res) {
    dashInfraController.listarTop4(req, res);
});

router.get("/grafico-mensal/:idEmpresa", function (req, res) {
    dashInfraController.listarUtilizacaoMensal(req, res);
});

router.get("/grafico-mensal-filtrado/:idEmpresa", function (req, res) {
    dashInfraController.listarMensalFiltrado(req, res);
});

router.get("/arquiteturas/:idEmpresa", function (req, res) {
    dashInfraController.listarArquiteturas(req, res);
});

module.exports = router;