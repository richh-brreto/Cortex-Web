var express = require("express");
var router = express.Router();


var dashTecnicoController = require("../controllers/dashTecnicoController");


router.get("/tecnico/zonas/:idUsuario", function (req, res) {
    dashTecnicoController.buscarZonasDoTecnico(req, res);
});

router.get("/tecnico/alertas/:idZona", function (req, res) {
    dashTecnicoController.buscarAlertasDaZona(req, res);
});

module.exports = router;