var database = require("../database/config");

function listar(fk_empresa) {
    var instrucao = `
        SELECT 
            c.id_cliente, 
            c.nome, 
            c.descricao, 
            c.telefone, 
            c.cnpj,
            c.qtd_modelos
        FROM cliente AS c
        WHERE c.fk_empresa = ${fk_empresa}
        ORDER BY c.nome;
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, descricao, telefone, cnpj, qtd_modelos, fk_empresa) {
    var instrucao = `
        INSERT INTO cliente (nome, descricao, telefone, cnpj, qtd_modelos, fk_empresa)
        VALUES ('${nome}', '${descricao}', '${telefone}', '${cnpj}', ${qtd_modelos}, ${fk_empresa});
    `;
    return database.executar(instrucao);
}

function atualizar(id_cliente, nome, descricao, telefone, cnpj, qtd_modelos) {
    var instrucao = `
        UPDATE cliente
        SET nome = '${nome}', 
            descricao = '${descricao}', 
            telefone = '${telefone}', 
            cnpj = '${cnpj}',
            qtd_modelos = ${qtd_modelos}
        WHERE id_cliente = ${id_cliente};
    `;
    return database.executar(instrucao);
}

function deletar(id_cliente) {
    var instrucao = `
        DELETE FROM cliente WHERE id_cliente = ${id_cliente};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar
};