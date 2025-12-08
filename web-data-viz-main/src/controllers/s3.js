const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  region: "us-east-1",
  accessKeyId: "ASIARFLCETINJE3X7NTK",
  secretAccessKey: "T7YE1gHEohvGiISJqxiwu9kUdC7PeKBiY5bWjyEW",
  sessionToken: `IQoJb3JpZ2luX2VjENv//////////wEaCXVzLXdlc3QtMiJHMEUCIBmaKs+xQBZ7A8bNA+lrLl2reMKaCKcPIC0WIa5tZv1MAiEA9yvBshhuC+IzE9h3qlRvG6XokbLEBEvP+51DJQ2jelAqugIIpP//////////ARAAGgwwODAxOTk1ODgzNzgiDAmA4bjiTxmrUBvQLiqOAoCzrWaDFgGJ7wInW2Pzm2UwlryfzXDuWcfdvcDHRtSHv4rBhtD9WZGtCHe2tSxEQIlwJ8myapT8CRGRkf+ODI+BKrh06/pi0KIh2l1yRzYrMcz6IEWH9qBu0MtAMj7jv2tj/42LLHKt65zre0fPNUveKXdSu6DznQhWYlDl6hRHFmOSyF7t2Ia+iHxn8v+FblAE1VX4hKsjMWANwwLBZjYsF69Peae0ktl/E3WApsJcXCRZcfzsS3RF6tOEf5CuaCZN5pcQpsHoHVP80IQjHbe6cKrIROHGANUASQuojZY5iNKARx3+vuj9zP74gVKElQx2IY9ly0K+VhcjYDHhFdDxEkF1aFOsaK7TN13v+zCL19rJBjqdATpSoGB0FZSzSPL7w77NzMv4ykp4v0XzyyFiXSZVz3yTRP2Kyw7szXHU5jsaGgPTtlAcXmU2sTVHttOYDhGcurZWqRHcMt9oFQ/N4I8+vncbvtSyTXVEW8dSgSUUGJD4bNujgriC2lqHxGw6qrnujQJYSQCwWu3J7uUFfY0HOsisP3RMMi4p2mZDAZWnYU1GhOMdDWSzcSPUEYQWnUo=`,
});

async function lerArquivo(req, res) {
  try {
<<<<<<< HEAD
    console.log(12)
    const fileKey = req.params.pasta
      ? `${req.params.pasta}/${req.params.arquivo}`
      : `${req.params.arquivo}`;

=======
    const fileKey = req.params.pasta + "/" +  req.params.arquivo;
    

    console.log(process.env,fileKey);
    
>>>>>>> 8bc9f836c8317b1cb785a63138f2addcbf91f631
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
