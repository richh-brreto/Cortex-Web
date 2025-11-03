var express = require("express");
var router = express.Router();



var zonaController = require("../controllers/zonaController");


router.get("/posibilidadesModelo/:fk_empresa", function (req, res) {
    zonaController.posibilidadesModelo(req, res);
});

router.get("/posibilidadesArq/:fk_empresa/:fk_zona", function (req, res) {
    zonaController.posibilidadesArq(req, res);
});

router.get("/posibilidadesFunc/:fk_empresa/:id_zona", function (req, res) {
    zonaController.posibilidadesFunc(req, res);
});

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

router.post("/vincularArquitetura/:id_zona", function (req, res) {
    zonaController.vincularArquitetura(req, res);
});

router.put("/vincularModelo/:id_zona", function (req, res) {
    zonaController.vincularModelo(req, res);
});

router.post("/vincularFuncionario/:id_zona", function (req, res) {
    zonaController.vincularFuncionario(req, res);
});

router.post("/cadastrar/:fkEmpresa", function (req, res) {
    zonaController.cadastrar(req, res);
});

router.delete("/deletar/:idZona", function (req, res) {
    zonaController.deletar(req, res);
});

router.delete("/desvincularArquitetura/:id/:id_zona", function (req, res) {
    zonaController.desvincularArquitetura(req, res);
});

router.put("/desvincularModelo/:id", function (req, res) {
    zonaController.desvincularModelo(req, res);
});

router.delete("/desvincularFuncionario/:id/:id_zona", function (req, res) {
    zonaController.desvincularFuncionario(req, res);
});

router.put("/atualizar/:idZona", function (req, res) {
    zonaController.atualizar(req, res);
});

router.get("/contarZonas/:fk_empresa", function (req, res) {
    zonaController.contarZonas(req, res);
});

module.exports = router; 