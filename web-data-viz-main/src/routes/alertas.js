const express = require("express");
const axios = require("axios");
const router = express.Router();

const alertasController = require("../controllers/alertasController.js");

require("dotenv").config();

router.get("/slack/:modelo", (req, res) => {
    alertasController.dadosSlack(req, res);
});

router.get("/modelos/:fk_usuario/:fk_empresa", (req, res) => {
    alertasController.listarModelosUsuario(req, res);
});

router.get("/banco/:IdModelo", (req, res) => {
    alertasController.buscarModelos(req, res);
});

module.exports = router;
