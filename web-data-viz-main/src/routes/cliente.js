var express = require("express");
var router = express.Router();

var clienteController = require("../controllers/clienteController");

// Rotas de cliente
router.get("/listar/:fkEmpresa", clienteController.listar);
router.post("/cadastrar", clienteController.cadastrar);
router.put("/atualizar/:id", clienteController.atualizar);
router.delete("/deletar/:id", clienteController.deletar);

module.exports = router;