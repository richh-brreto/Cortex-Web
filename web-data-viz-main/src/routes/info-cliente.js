var express = require("express");
var router = express.Router();


var infoClienteController = require("../controllers/infoClienteController");

router.get("/info-cliente-rota/:idcliente", function (req, res) {
    infoClienteController.infoClienteInfo(req, res)
});

router.get("/info-cliente-possibilidades/:idcliente", function (req,res) {
    infoClienteController.possibilidadesPesquisa(req, res)
});

router.get("/info-cliente-infoModelo/:idcliente", function (req,res) {
    infoClienteController.infoModelosClientes(req, res)
});

router.get("/info-cliente-kpi/:idcliente", function (req,res) {
    infoClienteController.clienteKpi(req, res)
});

router.get("/info-cliente-grafico/:idcliente", function (req,res) {
    infoClienteController.clienteGrafico(req, res)
});

module.exports = router;