var express = require("express");
var router = express.Router();
var adminController = require("../controllers/adminController");

router.get("/pendentes", function (req, res) {
    adminController.listarPendentes(req, res);
});

router.post("/ativar", function (req, res) {
    adminController.ativarUsuario(req, res);
});

router.post("/recusar", function (req, res) {
    adminController.recusarUsuario(req, res);
});

module.exports = router;