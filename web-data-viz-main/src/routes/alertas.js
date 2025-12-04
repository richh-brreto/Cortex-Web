const express = require("express");
const axios = require("axios");
const router = express.Router();

const muralController = require("../controllers/mural.js");
const alertasController = require("../controllers/alertasController.js");

require("dotenv").config();

router.get("/mural/:idEmpresa?", (req, res) => {
  muralController.listar(req, res);
});

router.get("/mural/alertas/breakdown", (req, res) => {
  alertasController.obterBreakdownAlertas(req, res);
});

router.get("/mural/alertas/slack", (req, res) => {
  alertasController.obterBreakdownSlack(req, res);
});

router.get("/overview", (req, res) => {
  alertasController.overview(req, res);
});

router.get("/", (req, res) => {
  alertasController.overview(req, res);
});

module.exports = router;
