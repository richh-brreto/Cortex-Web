var database = require("../database/config");

function listar(fk_empresa) {
    var instrucao = `
        SELECT 
            f.id, 
            f.nome as nome, 
            f.email, 
            c.nome as cargo,
            f.telefone,
            f.ativo,
            f.senha
        FROM 
            usuario AS f
        INNER JOIN
            cargo AS c on c.id = f.id 
        WHERE 
            f.fk_empresa = ${fk_empresa}
        ORDER BY 
            f.nome;
    `;
    return database.executar(instrucao);
}

function cadastrar(nome, email, cargo, departamento, telefone, status, data_admissao, fk_empresa) {
    var instrucao = `
        INSERT INTO funcionario (nome, email, cargo, departamento, telefone, status, data_admissao, fk_empresa)
        VALUES ('${nome}', '${email}', '${cargo}', '${departamento}', '${telefone}', '${status}', '${data_admissao}', ${fk_empresa});
    `;
    return database.executar(instrucao);
}

function atualizar(id_funcionario, nome, email, cargo, departamento, telefone, status, data_admissao) {
    var instrucao = `
        UPDATE funcionario
        SET nome = '${nome}', 
            email = '${email}', 
            cargo = '${cargo}', 
            departamento = '${departamento}',
            telefone = '${telefone}',
            status = '${status}',
            data_admissao = '${data_admissao}'
        WHERE id_funcionario = ${id_funcionario};
    `;
    return database.executar(instrucao);
}

function deletar(id_funcionario) {
    var instrucao = `
        DELETE FROM funcionario WHERE id_funcionario = ${id_funcionario};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar
};