var express = require("express");
var router = express.Router();

var empresaDadosController = require("../controllers/empresaDadosController");

router.get("/formulario/:idEmpresa", function (req, res) {
    empresaDadosController.buscarDadosFormulario(req, res);
});

module.exports = router;