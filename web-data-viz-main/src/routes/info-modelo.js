var express = require("express");
var router = express.Router();


var infoModeloController = require("../controllers/infoModeloController");

router.get("/info-modelo-rota/:idmodelo", function (req, res) {
    infoModeloController.infoModeloGet(req, res)
});

module.exports = router;