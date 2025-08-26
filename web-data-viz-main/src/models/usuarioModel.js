var database = require("../database/config")




// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarUsuario(idEmpresa,nome, email, senha) {

    var instrucaoSql = `
        INSERT INTO usuario (idempresa,nome,email,senha) VALUES ('${idEmpresa}','${nome}','${email}','${senha}');
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEmpresa(cnpj,nome){
    var instrucaoSql = `
        INSERT INTO empresa (cnpj,nome) VALUES ('${cnpj}','${nome}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarId(cnpj) {

    var instrucaoSql = `
    select idempresa from empresa
    where cnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function login(email, senha) {

    var instrucaoSql = `
    select email, nome, idusuario, administrador from usuario
    where email = '${email}' and senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrarEmpresa,
    buscarId,
    cadastrarUsuario,
    login
};