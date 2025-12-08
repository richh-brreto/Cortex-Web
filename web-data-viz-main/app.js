var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;
const { GoogleGenerativeAI } = require("@google/generative-ai");

var app = express();

// 2. INICIALIZAÇÃO CORRETA
// ERRO COMUM: Passar { apiKey: ... } aqui. NÃO FAÇA ISSO.
// CORRETO: Passe a variável de ambiente DIRETO como argumento.
const chatIA = new GoogleGenerativeAI(process.env.CHAVE_BOBIA);

var app = express();


var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuario");
var infoModeloRouter = require("./src/routes/info-modelo")
var empresaDadosRouter = require("./src/routes/empresaDados");
var modelosRouter = require("./src/routes/modelos");
var adminRouter = require("./src/routes/admin");
var dashTecnicoRouter = require("./src/routes/dashTecnico");
var clienteRouter = require("./src/routes/info-cliente")
var clienteRouter = require("./src/routes/cliente");
var funcionarioRouter = require("./src/routes/funcionario");
var zonaRouter = require("./src/routes/zona");
var arquiteturaRouter = require("./src/routes/arquiteturas");
var muralRoute = require("./src/routes/mural");
const s3Router = require('./src/routes/s3Route');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use('/s3Route', s3Router);
app.use("/empresaDados", empresaDadosRouter);
app.use("/modelos", modelosRouter);
app.use("/admin", adminRouter);
app.use("/dashTecnico", dashTecnicoRouter);
app.use(cors());
app.use("/", indexRouter);
app.use("/usuario", usuarioRouter);
app.use("/info-modelo", infoModeloRouter)
app.use("/info-cliente", clienteRouter)
app.use("/cliente", clienteRouter);
app.use("/funcionario", funcionarioRouter);
app.use("/zona", zonaRouter);
app.use("/arquiteturas", arquiteturaRouter);
app.use("/mural", muralRoute)
app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####           ####      ##    ######    ##            ##  ##    ####    ######  
    ##   ##  ##       ##  ##          ## ##    ####      ##    ####            ##  ##     ##         ##  
    ##   ##  ##       ##  ##          ##  ##  ##  ##     ##   ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####   ######  ##  ##  ######     ##   ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##          ##  ##  ##  ##     ##   ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##          ## ##   ##  ##     ##   ##  ##             ####      ##     ##      
    ##   ##  ######   #####           ####    ##  ##     ##   ##  ##               ##     ####    ######  
    \n\n\n                                                                                                
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
 
app.post("/perguntar", async function (req, res) {
    try {
        const { pergunta, dados } = req.body;
        const dadosTexto = JSON.stringify(dados);

        const prompt = `
        Você é um Especialista em Capacity Planning do sistema Cortex.
        
        DADOS HISTÓRICOS (Últimos 3 meses e detalhes atuais):
        ${dadosTexto}

        SOLICITAÇÃO DO USUÁRIO:
        "${pergunta}"

        DIRETRIZES DE ANÁLISE:
        1. ANÁLISE DE TENDÊNCIA: Olhe os arrays 'evolucaoCPU' e 'evolucaoRAM'.
           - Se houver zeros (0) no histórico, ignore-os ou trate como "sem dados anteriores".
           - Se subir mês a mês, alerte upgrade.
        
        2. ANÁLISE DE DETALHE: Cite picos específicos do 'detalhesUltimoMes'.

        3. FORMATAÇÃO DE DADOS (CRUCIAL):
           - Se encontrar valores decimais entre 0 e 1 (ex: 0.92, 0.814), multiplique por 100 e exiba com "%" (ex: 92%, 81.4%).
           - Nunca exiba números como "0.92" no texto final.

        4. RESPOSTA:
           - Seja direto, profissional e use no máximo 1 parágrafo.
        `;

        // Configura o modelo
        const model = chatIA.getGenerativeModel({ model: "gemini-2.5-flash" });


        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("Resposta IA:", text);
        res.json({ resultado: text });
    } catch (error) {
        console.error("Erro no Gemini:", error);
        res.status(500).json({ erro: "Erro ao processar a solicitação." });
    }
});