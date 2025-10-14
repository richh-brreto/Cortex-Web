var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarUsuario(idEmpresa, nome, email, senha) {

    var instrucaoSql = `
        INSERT INTO usuario (fk_empresa, nome, email, senha,ativo) VALUES ('${idEmpresa}','${nome}','${email}','${senha}','0');
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEmpresa(cnpj, nomeEmpresa, telefoneResponsavel, nomeResponsavel){
    var instrucaoSql = `
        INSERT INTO empresa (cnpj, nome, nome_responsavel, telefone_responsavel) VALUES ('${cnpj}','${nomeEmpresa}','${nomeResponsavel}','${telefoneResponsavel}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarId(cnpj) {

    var instrucaoSql = `
    select id from empresa
    where cnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function login(email, senha) {

    var instrucaoSql = `
    select email,nome,id, administrador,fk_empresa,ativo from usuario
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