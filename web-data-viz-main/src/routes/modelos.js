var express = require("express");
var router = express.Router();



var modelosController = require("../controllers/modelosController");



router.post("/cadastrar", function (req, res) {
    modelosController.cadastrar(req, res);
});

module.exports = router; 