const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  region: "us-east-1",
  accessKeyId: "ASIA45OQZ2J5ZRMJCP2R",
  secretAccessKey: "8sQ+mJAUBYYnxl71McryDrwuE+tJO4EMMo66l7je",
  sessionToken: `IQoJb3JpZ2luX2VjEOv//////////wEaCXVzLXdlc3QtMiJGMEQCIHAAX6xkTlUp957NltWJVxSXwLKVnvzvfgdlA58CH1MqAiAHkB+LLZxh8wEcxx0eE8mJlkDJRfM/6M6CqjErwshHjCrDAgi0//////////8BEAEaDDg4Nzg4NTUxNzQzNSIMdAVtijl+GCNQwsLuKpcC8G03wxu0h/1aPk4saCw0lgLMxy+wIs2JbyTbXYaEZmfPfr8v+W+asqVfdJ9cjn23RgGkpguTmXj6HBmks4vBhPkuhtY03HspbRXA1FKeW/Js8vsbQpM0q7RmC1HxsSfO28UkHiOguSDgfIXPUY6UZlZJ4WxGGJSFciD59ZRJiBAcfgLZ44qaHXiWu9Lg3B5HJubIV94IaSB9aIPm4KxLaYacHYrX6zH9u2ERKsZt4TZ+Hd1OWjwfb5jutA1Svp0LInsugN8AItgRdsbIH7tmtrvLLS6pKhpJdef8r9i1lPC1fuqc/yK1zDQWXTegEEKOtd80uA/5gcPMyRjmWwcGXobHkT+gDU2XOEM4Mme6YlZJ6r2GY/85MJid3skGOp4Bbp+h+vPS72Kl4aHAdps6WH86rEgYoL0CiiqGOOSR9726Lr54tXnktDpEGPFy7cAXs6MHqFSWuC4PfGzagg17XVzlQRir0+wsJFC2ZfY3W6XZTAea646tlhkQLmjxYiVeFAwmKS8bKLmBdYDly0BEhbL8z4UplleiECGVLe8xuXNOJh8CJ+ozbwgtzt86Jkdr4UJy2xmjT5QzKQcJGoo=`,
});

async function lerArquivo(req, res) {
  try {
    console.log(req.params,12);
    const fileKey = req.params.pasta
      ? `${req.params.arquivo}/${req.params.pasta}`
      : `${req.params.arquivo}`;

      console.log(fileKey,34);
    const params = {
      Bucket: "cortex-client-s3",
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
