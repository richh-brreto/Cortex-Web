var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/login", function (req, res) {
    usuarioController.login(req, res);
})

router.post("/cadastrarEmpresa", function (req, res) {
    usuarioController.cadastrarEmpresa(req, res);
})

router.post('/alterarSenha', function (req, res) {
    usuarioController.alterarSenha(req, res);
});

router.get('/dados/:id', function (req, res) {
    usuarioController.buscarPorId(req, res);
});

router.get("/buscarId/:cnpjVar", function (req, res) {
    usuarioController.buscarId(req, res);
})

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

router.get("/contarFuncionarios/:fk_empresa", function (req, res) {
    usuarioController.contarFuncionarios(req, res);
});

module.exports = router;