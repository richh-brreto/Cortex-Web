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
        COUNT(DISTINCT a.fk_arquitetura) AS qtd_arquiteturas
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
        arquitetura_zona a 
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
        a.id_arquitetura, a.nome, a.modelo_cpu, a.qtd_cpu, a.qtd_ram,
        a.modelo_gpu, a.so, a.maxDisco, az.qtd
    FROM 
        arquitetura as a
	INNER JOIN
		arquitetura_zona as az
	ON
		az.fk_arquitetura = a.id_arquitetura
    WHERE
        az.fk_zona = ${fk_zona};
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listarModelos(fk_zona) {

    var instrucao = `
    SELECT 
       m.id_modelo, m.nome, m.descricao, m.qtd_disco, m.ip, m.hostname, m.tempo_parametro_min as tempo,
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
       f.id, f.foto, f.nome, f.email, f.telefone, c.nome as cargo, f.ativo
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

function posibilidadesModelo(fk_empresa) {

    var instrucao = `
    SELECT 
       m.id_modelo as id, m.nome
    FROM
       modelo as m
	INNER JOIN
		cliente as c
	ON
		m.fk_cliente = c.id_cliente
    WHERE
        m.fk_zona_disponibilidade IS NULL 
    AND 
        c.fk_empresa = ${fk_empresa}
     ;

    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function posibilidadesArq(fk_empresa, fk_zona) {

    var instrucao = `
    SELECT 
        a.id_arquitetura as id, a.nome
    FROM
        arquitetura AS a
    WHERE
        a.fk_empresa = ${fk_empresa}
    AND a.id_arquitetura
    NOT IN (
        SELECT a.id_arquitetura
        FROM arquitetura_zona AS az
        WHERE az.fk_arquitetura = a.id_arquitetura
        AND az.fk_zona = ${fk_zona}
    );
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function posibilidadesFunc(fk_empresa,id_zona) {

    var instrucao = `
      SELECT 
       f.id, f.nome
    FROM 
        usuario as f
    WHERE
        f.fk_empresa = ${fk_empresa} AND f.id NOT IN (
        SELECT f.id FROM usuario as f 
        Left Join acesso_zona as az on f.id = az.fk_usuario
        WHERE az.fk_zona = ${id_zona}
    );
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function vincularArquitetura(idArq, id_zona,qtdArq) {

    var instrucao = `
        INSERT INTO 
            arquitetura_zona (fk_arquitetura, fk_zona, qtd) 
        VALUES
            (${idArq},${id_zona},${qtdArq});
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function vincularModelo(idModelo, id_zona) {

    var instrucao = `
        UPDATE  
            modelo
        SET
            fk_zona_disponibilidade = ${id_zona}
        WHERE
            id_modelo = ${idModelo};
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function vincularFuncionario(idFunc, id_zona) {

    var instrucao = `
        INSERT INTO 
            acesso_zona (fk_usuario, fk_zona) 
        VALUES
            (${idFunc},${id_zona});
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function desvincularArquitetura(id,id_zona) {

    var instrucao = `
        DELETE FROM arquitetura_zona WHERE fk_arquitetura = ${id} AND fk_zona = ${id_zona};
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function desvincularModelo(id) {

    var instrucao = `
        UPDATE modelo SET fk_zona = null WHERE id_modelo = ${id};
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function desvincularFuncionario(id,id_zona) {

    var instrucao = `
        DELETE FROM acesso_zona WHERE fk_zona = ${id_zona} AND fk_usuario = ${id};
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
    listarModelos,
    posibilidadesFunc,
    posibilidadesArq,
    posibilidadesModelo,
    vincularArquitetura,
    vincularModelo,
    vincularFuncionario,
    desvincularArquitetura,
    desvincularModelo,
    desvincularFuncionario
};