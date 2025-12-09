const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  region: "us-east-1",
  accessKeyId: "ASIARFLCETINJOFOKZFL",
  secretAccessKey: "Xqo1dzbyzNrLyoj4WYi7ynit2uoF1q+khPuQAATs",
  sessionToken: `IQoJb3JpZ2luX2VjEOb//////////wEaCXVzLXdlc3QtMiJHMEUCIQCf/Y9VeqiA9GJdj5pPaYoDiW85PYA4gOecYB/lZrjyiwIgFVieneATs/Z7MZ16v8zh+Y3xmSS954g2ySkNxIc0qDsqugIIr///////////ARAAGgwwODAxOTk1ODgzNzgiDFQEo68GvwytMnYRISqOAowzRYVZUVJ5hmckWMbC5c86P62BC1yVixHSFaj2UcTy3PbljywzBdsfOW1PkU9hCiTosSfqOdDLipqJFGqcjPrcR19MLKY5avV9RQQcUvOBwpXIHAIDz/FzqwAACOmfW7teFr0EXglGxfGoEAio5pGJUGY+cEuTS9d9eqZ00/M8gRX6dFRNwJHkLdsrWjmaEibgw3FEzkiXHXSNZeLAMn9XC7ekK7mYsy8XgG2/Ug5I836WG4DEXUK9zBMJQ+A7soQJw8dflor3x8CiDXPwD23Hy1XYlFJ1VRYOjjbjk89kSfcVjZvGenUxxuEYJcwuo3bvAFBSqfmNzI56bZxL+8lSDke0kdOLgIetztizPTC4m93JBjqdAQ7F2puQs/QpXA0R/zZEUrvUCVDd/30ZdgJb2EiWY+b9OKjjW+N9PfR6dCC4ckyl7WZQLbQZl+0XypAiwZqO4JBfauB875D1HR1Iseio46XG0Fpwp2zRRrW7tcm8kqlw12TOC0j8QfcVRS87tJYQXYfYPOFRFXHg5DqW8p2WRb+3KUAI2FnwFcb9vGp+dRLLn1k2PHUMfbTzm9xPJvU=`,
});

async function lerArquivo(req, res) {
  try {
    const fileKey = req.params.pasta
      ? `${req.params.pasta}/${req.params.arquivo}`
      : `${req.params.arquivo}`;

    const params = {
      Bucket: "cortex-client-bill",
      Key: fileKey,
    };

    console.log(`📥 Lendo do S3: ${params.Bucket}/${params.Key}`);

    const data = await s3.getObject(params).promise();
    const text = data.Body.toString("utf-8").trim();

    res.json(JSON.parse(text));
  } catch (err) {
    console.error("❌ Erro ao buscar arquivo:", err.message);
    res.status(500).send("Erro ao buscar arquivo: " + err.message);
  }
}

module.exports = { lerArquivo };
