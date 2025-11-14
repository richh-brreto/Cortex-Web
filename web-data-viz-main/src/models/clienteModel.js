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
        FROM 
            cliente AS c
        LEFT JOIN 
            modelo as m on m.fk_cliente = c.id_cliente
        WHERE 
            c.fk_empresa = ${fk_empresa}
        GROUP BY 
            c.id_cliente
        ORDER BY 
            c.id_cliente;
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, descricao, telefone, cnpj, email, fk_empresa) {
    var instrucao = `
        INSERT INTO cliente (nome, descricao, telefone, cnpj, email, fk_empresa)
        VALUES ('${nome}', '${descricao}', '${telefone}', '${cnpj}', "${email}" ,${fk_empresa});
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

function contarClientes(fk_empresa) {
    var instrucaoSql = `
        SELECT COUNT(*) as total 
        FROM cliente 
        WHERE fk_empresa = ${fk_empresa};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar,
    contarClientes
};