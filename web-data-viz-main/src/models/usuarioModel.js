var database = require("../database/config")

function cadastrarUsuario(idEmpresa, nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (fk_empresa, nome, email, senha) VALUES ('${idEmpresa}','${nome}','${email}','${senha}');
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
        SELECT id_empresa FROM empresa
        WHERE cnpj = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function login(email, senha) {
    var instrucaoSql = `
        SELECT id_usuario, email, nome, administrador, fk_empresa 
        FROM usuario
        WHERE email = '${email}' AND senha = '${senha}';
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