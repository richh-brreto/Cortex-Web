var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/login", function (req, res) {
    usuarioController.login(req, res);
})

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

module.exports = router;