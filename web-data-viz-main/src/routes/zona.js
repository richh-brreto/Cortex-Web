var express = require("express");
var router = express.Router();



var zonaController = require("../controllers/zonaController");

router.get("/listarArq/:fk_zona", function (req, res) {
    zonaController.listarArq(req, res);
});

router.get("/listarModelos/:fk_zona", function (req, res) {
    zonaController.listarModelos(req, res);
});

router.get("/listarFuncionario/:fk_zona", function (req, res) {
    zonaController.listarFuncionario(req, res);
});

router.get("/listar/:fkEmpresa", function (req, res) {
    zonaController.listar(req, res);
});

router.post("/cadastrar/:fkEmpresa", function (req, res) {
    zonaController.cadastrar(req, res);
});

router.delete("/deletar/:idZona", function (req, res) {
    zonaController.deletar(req, res);
});

router.put("/atualizar/:idZona", function (req, res) {
    zonaController.atualizar(req, res);
});
module.exports = router; 