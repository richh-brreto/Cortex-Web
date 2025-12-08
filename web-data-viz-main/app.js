var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

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
var dashInfraestruturaRoute = require("./src/routes/dashInfraestrutura")
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
app.use("/mural",muralRoute)
app.use("/dashinfra", dashInfraestruturaRoute)

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
