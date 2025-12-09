const AWS = require("aws-sdk");

AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  sessionToken: process.env.aws_session_token,
});

async function lerArquivo(req, res) {
  try {
    const fileKey = req.params.pasta + "/" + req.params.arquivo;
    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: fileKey,
    };

    const data = await s3.getObject(params).promise();
    const text = data.Body.toString("utf-8").trim();
    res.json(JSON.parse(text));
  } catch (err) {
    res.status(500).send("Erro ao buscar arquivo: " + err.message);
  }
}

module.exports = {
  lerArquivo,
};
