var express = require("express");
var upload = require("../config/configUpload");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.get("/listar/:fkEmpresa", funcionarioController.listar);
router.post("/cadastrar/:fkEmpresa", funcionarioController.cadastrar);
router.put("/atualizar/:id", upload.single("foto"), funcionarioController.atualizar);
router.delete("/deletar/:id", funcionarioController.deletar);

module.exports = router;