var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.get("/listar/:fkEmpresa", funcionarioController.listar);
router.post("/cadastrar/:fkEmpresa", funcionarioController.cadastrar);
router.put("/atualizar/:id", funcionarioController.atualizar);
router.delete("/deletar/:id", funcionarioController.deletar);

module.exports = router;