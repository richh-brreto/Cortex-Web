const express = require('express');
const router = express.Router();

const s3Controller = require('../controllers/s3-andre');

// agora NÃO tem mais :pasta, só o nome do arquivo
router.get('/dados/:arquivo', (req, res) => {
  s3Controller.lerArquivoRoot(req, res);
});

module.exports = router;
