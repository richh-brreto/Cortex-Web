var express = require("express");
var upload = require("../config/configUpload");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.get("/listar/:fkEmpresa", funcionarioController.listar);
// Permite upload de foto no cadastro
router.post("/cadastrar/:fkEmpresa", upload.single("foto"), funcionarioController.cadastrar);
router.put("/atualizar/:id", upload.single("foto"), funcionarioController.atualizar);
router.delete("/deletar/:id", funcionarioController.deletar);
router.get("/buscar/:id", function (req, res) {funcionarioController.buscarPorId(req, res);});
router.get("/dados/:id", function (req, res) {
funcionarioController.buscarPorId(req, res);});
router.post("/alterarSenha", function (req, res) {funcionarioController.alterarSenha(req, res);});

module.exports = router;