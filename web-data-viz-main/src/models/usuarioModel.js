var database = require("../database/config")




// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, cnpj, senha) {

    var instrucaoSql = `
        INSERT INTO empresa (nome, email, cnpj, senha) VALUES ('${nome}', '${email}', '${cnpj}', '${senha}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function login(email, senha) {

    var instrucaoSql = `
    select email, nome, idusuario, cnpj from usuario
    where email = '${email}' and senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrar,
    login
};