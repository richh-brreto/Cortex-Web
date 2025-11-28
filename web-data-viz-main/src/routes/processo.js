var express = require("express");
var router = express.Router();

var processo = require("../controllers/processo.js");
router.get("/:idModelo", (req, res) => {
  processo.listarPorModelo(req, res);
});

module.exports = router;