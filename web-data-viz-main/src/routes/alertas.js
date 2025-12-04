const express = require("express");
const axios = require("axios");
const router = express.Router();

const alertasController = require("../controllers/alertasController.js");

require("dotenv").config();

router.get("/breakdown", (req, res) => {
  alertasController.obterBreakdownAlertas(req, res);
});

router.get("/slack", (req, res) => {
  alertasController.obterBreakdownSlack(req, res);
});

router.get("/overview", (req, res) => {
  alertasController.overview(req, res);
});

router.get("/", (req, res) => {
  alertasController.overview(req, res);
});

module.exports = router;
