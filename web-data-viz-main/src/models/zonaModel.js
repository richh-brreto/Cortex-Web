var database = require("../database/config");

function cadastrar(nome, fkEmpresa) {

    var instrucao = `
        INSERT INTO 
            zonadisponibilidade (nome, fk_empresa) 
        VALUES
            ('${nome}',${fkEmpresa});
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar(fkEmpresa) {

    var instrucao = `
    SELECT 
        z.id_zona,
        z.nome AS nome_zona,
        COUNT(DISTINCT az.fk_usuario) AS qtd_usuarios,
        COUNT(DISTINCT m.id_modelo) AS qtd_modelos,
        COUNT(DISTINCT a.id_arquitetura) AS qtd_arquiteturas
    FROM 
        zonadisponibilidade z
    LEFT JOIN 
        acesso_zona az 
    ON 
        z.id_zona = az.fk_zona
    LEFT JOIN 
        modelo m 
    ON 
        z.id_zona = m.fk_zona_disponibilidade
    LEFT JOIN 
        arquitetura a 
    ON 
        z.id_zona = a.fk_zona
    WHERE
        z.fk_empresa = ${fkEmpresa}
    GROUP BY 
        z.id_zona, z.nome
    ORDER BY 
        z.id_zona;
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar(idZona) {

    var instrucao = `
        DELETE FROM zonadisponibilidade WHERE id_zona = ${idZona};
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizar(idZona,nome) {

    var instrucao = `
        UPDATE zonadisponibilidade SET nome = '${nome}' WHERE id_zona = ${idZona};
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    cadastrar,
    listar,
    deletar,
    atualizar
};