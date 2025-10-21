var database = require("../database/config");

function listar(fk_empresa) {
    var instrucao = `
      SELECT 
            c.id_cliente, 
            c.nome, 
            c.descricao, 
            c.telefone, 
            c.cnpj,
            c.email,
            count(m.id_modelo) as qtd
        FROM cliente AS c
        inner join modelo as m on m.fk_cliente = c.id_cliente
        WHERE c.fk_empresa = ${fk_empresa}
        group by c.id_cliente
        ORDER BY c.nome;
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, descricao, telefone, cnpj, qtd_modelos, fk_empresa) {
    var instrucao = `
        INSERT INTO cliente (nome, descricao, telefone, cnpj, email, fk_empresa)
        VALUES ('${nome}', '${descricao}', '${telefone}', '${cnpj}', '${qtd_modelos}', ${fk_empresa});
    `;
    return database.executar(instrucao);
}

function atualizar(id_cliente, nome, descricao, telefone, cnpj, email) {
    var instrucao = `
        UPDATE cliente
        SET nome = '${nome}', 
            descricao = '${descricao}', 
            telefone = '${telefone}', 
            cnpj = '${cnpj}',
            email = '${email}'
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