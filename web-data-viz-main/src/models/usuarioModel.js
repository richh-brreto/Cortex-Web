var database = require("../database/config")

function cadastrarUsuario(idEmpresa, nome, email, senha, tel) {
    var instrucaoSql = `
        INSERT INTO usuario (fk_empresa, nome, email, senha,telefone) 
        VALUES ('${idEmpresa}','${nome}','${email}','${senha}','${tel}');
        
    `;
    return database.executar(instrucaoSql);
}

function cadastrarEmpresa(cnpj, nomeEmpresa, telefoneResponsavel, nomeResponsavel) {
    var instrucaoSql = `
        INSERT INTO empresa (cnpj, nome, nome_responsavel, telefone_responsavel) VALUES ('${cnpj}','${nomeEmpresa}','${nomeResponsavel}','${telefoneResponsavel}');
    `;
    return database.executar(instrucaoSql);
}

function buscarId(cnpj) {
    var instrucaoSql = `
        SELECT id FROM empresa
        WHERE cnpj = '${cnpj}';
    `;
    return database.executar(instrucaoSql);
}

function login(email, senha) {
    var instrucaoSql = `
    select u.email, u.nome, u.id, u.fk_cargo, u.fk_empresa, u.ativo, u.foto, e.ativo as ativoE from usuario as u  
    inner join empresa as e on e.id = u.fk_empresa
    where u.email = '${email}' and u.senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

function buscarPorId(idUsuario) {
    var instrucaoSql = `
        SELECT id, nome, email, fk_cargo AS fk_cargo, fk_empresa, ativo, telefone, foto
        FROM usuario
        WHERE id = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function verificarSenha(idUsuario, senha) {
    var instrucaoSql = `
        SELECT id FROM usuario
        WHERE id = ${idUsuario} AND senha = '${senha}';
    `;
    return database.executar(instrucaoSql);
}

function alterarSenha(idUsuario, novaSenha) {
    var instrucaoSql = `
        UPDATE usuario SET senha = '${novaSenha}' WHERE id = ${idUsuario};
    `;
    return database.executar(instrucaoSql);
}

function contarFuncionarios(fk_empresa) {
    var instrucaoSql = `
        SELECT COUNT(*) as total 
        FROM usuario 
        WHERE fk_empresa = ${fk_empresa};
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarEmpresa,
    buscarId,
    cadastrarUsuario,
    login,
    buscarPorId,
    verificarSenha,
    alterarSenha,
    contarFuncionarios 
}