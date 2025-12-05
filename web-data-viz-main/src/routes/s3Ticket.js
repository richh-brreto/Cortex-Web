const express = require('express');
const router = express.Router();
const path = require('path');

const s3Controller = require('../controllers/s3TicketController');

router.get('/dadosDash/:pasta/:arquivo', (req, res) => {
  s3Controller.lerArquivo(req, res);
});


module.exports = router;