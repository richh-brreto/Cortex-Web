var express = require("express");
var router = express.Router();


var arquiteturaController = require("../controllers/arquiteturaController");


// Rota para LISTAR
router.get("/listar/:idEmpresa", function (req, res) {
    arquiteturaController.listar(req, res);
});

// Rota para CADASTRAR
router.post("/cadastrar", function (req, res) {
    arquiteturaController.cadastrar(req, res);
});

// Rota para ATUALIZAR
router.post("/atualizar/:id", function (req, res) {
    arquiteturaController.atualizar(req, res);
});

// Rota para DELETAR
router.post("/deletar/:id", function (req, res) {
    arquiteturaController.deletar(req, res);
});

router.get("/contarArquiteturas/:fk_empresa", function (req, res) {
    arquiteturaController.contarArquiteturas(req, res);
});

module.exports = router;