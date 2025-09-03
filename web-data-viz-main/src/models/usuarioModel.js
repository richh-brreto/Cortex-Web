var database = require("../database/config")

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarUsuario(idEmpresa, nome, email, senha) {

    var instrucaoSql = `
        INSERT INTO Usuario (FK_empresa, Nome, Email, Senha) VALUES ('${idEmpresa}','${nome}','${email}','${senha}');
        
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarEmpresa(cnpj, nomeEmpresa, telefoneResponsavel, nomeResponsavel){
    var instrucaoSql = `
        INSERT INTO Empresa (CNPJ, Nome, Nome_responsavel, Telefone_responsavel) VALUES ('${cnpj}','${nomeEmpresa}','${nomeResponsavel}','${telefoneResponsavel}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function buscarId(cnpj) {

    var instrucaoSql = `
    select idEmpresa from Empresa
    where CNPJ = '${cnpj}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function login(email, senha) {

    var instrucaoSql = `
    select Email, Nome, idUsuario, Administrador from Usuario
    where Email = '${email}' and Senha = '${senha}';
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