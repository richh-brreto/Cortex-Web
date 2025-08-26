var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/login", function (req, res) {
    usuarioController.login(req, res);
})

router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})


router.get("/buscarId/:cnpjVar", function (req, res) {
    usuarioController.buscarId(req, res);
})

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

module.exports = router;