const express = require("express");
const axios = require("axios");
const router = express.Router();

const alertasController = require("../controllers/alertasController.js");

require("dotenv").config();

router.get("/jira/:key", (req, res) => {
    alertasController.dadosJira(req, res);
});

router.get("/slack", (req, res) => {
    alertasController.dadosSlack(req, res);
});

router.get("/categorias", alertasController.alertasPorCategoria);

router.get("/intervalos", alertasController.alertasPorIntervalo);

router.get("/banco/:IdModelo", (req, res) => {
    alertasController.buscarModelos(req, res);
});

module.exports = router;
