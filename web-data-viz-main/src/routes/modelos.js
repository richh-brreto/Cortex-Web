var express = require("express");
var router = express.Router();

var modelosController = require("../controllers/modelosController");

router.get("/listar/:idEmpresa", function (req, res) {
    modelosController.listarPorEmpresa(req, res);
});


router.post("/cadastrar", function (req, res) {
    modelosController.cadastrar(req, res);
});


router.post("/atualizar/:idModelo", function (req, res) {
    modelosController.atualizar(req, res);
});


router.post("/deletar/:idModelo", function (req, res) {
    modelosController.deletar(req, res);
});

module.exports = router;