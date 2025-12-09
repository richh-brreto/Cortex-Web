const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();

// >>> NOVA FUNÇÃO: só arquivo, sem pasta
async function lerArquivoRoot(req, res) {
  try {
    const fileKey = req.params.arquivo; // ex.: "tickets.json"

    console.log('Lendo do S3 (root):', process.env.S3_BUCKET, fileKey);

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileKey
    };

    const data = await s3.getObject(params).promise();
    const text = data.Body.toString('utf-8').trim();

    res.json(JSON.parse(text));
  } catch (err) {
    console.error('Erro ao buscar arquivo no S3 (root):', err.message);
    res.status(500).send('Erro ao buscar arquivo: ' + err.message);
  }
}

module.exports = {
  lerArquivoRoot
};
