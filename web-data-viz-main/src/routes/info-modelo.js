var express = require("express");
var router = express.Router();


var infoModeloController = require("../controllers/infoModeloController");

router.get("/info-modelo-rota/:idmodelo", function (req, res) {
    infoModeloController.infoModeloGet(req, res)
});

router.post("/blacklist/adicionarProibido", function (req, res) {
    infoModeloController.adicionarProcessoProibido(req, res);
});

router.put("/blacklist/registrarNeutro", function (req, res) {
    infoModeloController.registrarProcessoNeutro(req, res);
});

router.get("/blacklist/listarBlacklist/:idmodelo",function (req, res) {
    infoModeloController.listarBlacklist(req, res)
});

router.get("/procMortos/:idModelo",function (req, res) {
    infoModeloController.procMortos(req, res)
});



router.delete("/blacklist/remover/:idProcesso",function (req, res) {
    infoModeloController.removerDaBlacklist(req, res)
});

router.post("/blacklist/atualizarStatus",function (req, res) {
    infoModeloController.atualizarStatusAutokill(req, res)
});





module.exports = router;