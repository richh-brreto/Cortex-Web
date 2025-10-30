var express = require("express");
var upload = require("../config/configUpload");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.get("/listar/:fkEmpresa", funcionarioController.listar);
// Permite upload de foto no cadastro
router.post("/cadastrar/:fkEmpresa", upload.single("foto"), funcionarioController.cadastrar);
router.put("/atualizar/:id", upload.single("foto"), funcionarioController.atualizar);
router.delete("/deletar/:id", funcionarioController.deletar);

module.exports = router;