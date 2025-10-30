var express = require("express");
var router = express.Router();



var zonaController = require("../controllers/zonaController");



router.post("/cadastrarzona/:nome/:idEmpresa", function (req, res) {
    zonaController.cadastrarzona(req, res);
});

router.get("/carregarAbas/:idEmpresa", function (req, res) {
    zonaController.carregarAbas(req, res);
});

router.get("/qtdModelo/:idZona", function (req, res) {
    zonaController.qtdModelo(req, res);
});

router.get("/info-usuario/:idZona", function (req, res) {
    zonaController.info_usuario(req, res);
});
module.exports = router; 