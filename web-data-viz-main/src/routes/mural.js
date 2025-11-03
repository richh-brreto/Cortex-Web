var express = require("express");
var router = express.Router();

var mural = require("../controllers/mural.js");
router.get("/:idEmpresa?", (req, res) => {
  mural.listar(req, res);
});
module.exports = router;
