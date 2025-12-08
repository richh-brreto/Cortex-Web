const express = require('express');
const router = express.Router();
const path = require('path');

const s3Controller = require('../controllers/s3-andre');

router.get('/dados/:pasta/:arquivo', (req, res) => {
  s3Controller.lerArquivo(req, res);
});


module.exports = router;
