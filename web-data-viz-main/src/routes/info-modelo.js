var express = require("express");
var router = express.Router();


var infoModeloController = require("../controllers/infoModeloController");

router.get("/info-modelo-rota/:idmodelo", function (req, res) {
    infoModeloController.infoModeloGet(req, res)
});

router.post("/blacklist/adicionarProibido", function (req, res) {
    infoModeloController.adicionarProcessoProibido(req, res);
});

router.post("/blacklist/registrarNeutro", function (req, res) {
    infoModeloController.registrarProcessoNeutro(req, res);
});

module.exports = router;