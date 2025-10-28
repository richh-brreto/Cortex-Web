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

function listarArq(fk_zona) {

    var instrucao = `
    SELECT 
        a.nome, a.modelo_cpu, a.qtd_cpu, a.qtd_ram,
        a.modelo_gpu, a.so, a.maxDisco, a.qtd
    FROM 
        arquitetura as a
    WHERE
        a.fk_zona = ${fk_zona};
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarModelos(fk_zona) {

    var instrucao = `
    SELECT 
       m.nome, m.qtd_disco, m.ip, m.hostname, m.tempo_parametro_min as tempo,
       m.limite_cpu as cpu ,m.limite_disco as disco ,
       m.limite_ram as ram , m.limite_gpu as gpu,
       c.nome as nome_cliente, a.nome as nome_arq
    FROM 
        modelo as m
    LEFT JOIN 
        arquitetura as a
    ON 
        a.id_arquitetura = m.fk_arquitetura
    LEFT JOIN 
        cliente as c 
    ON 
        c.id_cliente = m.fk_cliente
    WHERE
        m.fk_zona_disponibilidade = ${fk_zona};
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarFuncionario(fk_zona) {

    var instrucao = `
    SELECT 
       f.foto, f.nome, f.email, f.telefone, c.nome as cargo, f.ativo
    FROM 
        usuario as f
    INNER JOIN 
        acesso_zona az 
    ON 
        f.id = az.fk_usuario
    INNER JOIN
        cargo as c
    ON
        c.id = f.fk_cargo
    WHERE
        az.fk_zona = ${fk_zona};
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
    atualizar,
    listarArq,
    listarFuncionario,
    listarModelos
};