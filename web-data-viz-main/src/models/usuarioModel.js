var database = require("../database/config")

function cadastrarUsuario(idEmpresa, nome, email, senha) {
    var instrucaoSql = `
        INSERT INTO usuario (fk_empresa, nome, email, senha,ativo) VALUES ('${idEmpresa}','${nome}','${email}','${senha}','0');
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEmpresa(cnpj, nomeEmpresa, telefoneResponsavel, nomeResponsavel) {
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
    select email,nome,id, cargo,fk_empresa,ativo from usuario
    where email = '${email}' and senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorId(idUsuario) {
    var instrucaoSql = `
        SELECT id, nome, email, cargo, fk_empresa, ativo, telefone
        FROM usuario
        WHERE id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function verificarSenha(idUsuario, senha) {
    var instrucaoSql = `
        SELECT id FROM usuario
        WHERE id = ${idUsuario} AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function alterarSenha(idUsuario, novaSenha) {
    var instrucaoSql = `
        UPDATE usuario SET senha = '${novaSenha}' WHERE id = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEmpresa,
    buscarId,
    cadastrarUsuario,
    login,
    buscarPorId,
    verificarSenha,
    alterarSenha
}