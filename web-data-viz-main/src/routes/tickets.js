

var express = require("express");
var router = express.Router();

var ticktesController = require("../controllers/ticketsController");


router.get("/jira/:key", (req, res) => {
    ticktesController.jiraInfos(req, res);
});

router.get("/banco/:IdModelo", (req, res) => {
    ticktesController.bancoInfos(req, res);
});



module.exports = router;