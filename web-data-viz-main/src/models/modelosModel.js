var database = require("../database/config"); 


function listarPorEmpresa(idEmpresa) {
    console.log(`Model: Listando modelos para a empresa: ${idEmpresa}. ACESSEI O MODELO MODEL`);

    var instrucaoSql = `
        SELECT 
            m.*, 
            c.nome AS cliente_nome, 
            z.nome AS zona_nome,
            a.nome AS arquitetura_nome 
            -- Adicione aqui o nome de status se ele vier de outra tabela
        FROM modelo AS m
        LEFT JOIN cliente AS c ON m.fk_cliente = c.id_cliente
        LEFT JOIN zonadisponibilidade AS z ON m.fk_zona_disponibilidade = z.id_zona
        INNER JOIN arquitetura AS a ON m.fk_arquitetura = a.id_arquitetura -- INNER JOIN para garantir a ligação
        WHERE a.fk_empresa = ${idEmpresa}; -- Filtra pela fk_empresa na tabela arquitetura
    `;
    

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function cadastrar(dados) { 
    console.log("Model: Cadastrando novo modelo:", dados.nome, ". ACESSEI O MODELO MODEL");
    
    var instrucaoSql = `
        INSERT INTO modelo (
            nome, descricao, ip, hostname, 
            tempo_parametro_min, limite_cpu, limite_disco, limite_ram, limite_gpu, 
            fk_cliente, fk_zona_disponibilidade, fk_arquitetura 
            -- status -- Adicione status se necessário
        ) VALUES (
            '${dados.nome}', '${dados.descricao || null}', '${dados.ip || null}', '${dados.hostname || null}', 
            ${dados.tempo_parametro_min || null}, ${dados.limite_cpu || null}, ${dados.limite_disco || null}, ${dados.limite_ram || null}, ${dados.limite_gpu || null},
            ${dados.fk_cliente}, ${dados.fk_zona_disponibilidade}, ${dados.fk_arquitetura}
            -- Adicione o valor do status aqui se necessário
        );
    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizar(idModelo, dados) {
    console.log(`Model: Atualizando modelo ID: ${idModelo}. ACESSEI O MODELO MODEL`);

    var instrucaoSql = `
        UPDATE modelo 
        SET nome = '${dados.nome}', 
            descricao = '${dados.descricao || null}', 
            ip = '${dados.ip || null}', 
            hostname = '${dados.hostname || null}', 
            tempo_parametro_min = ${dados.tempo_parametro_min || null}, 
            limite_cpu = ${dados.limite_cpu || null}, 
            limite_disco = ${dados.limite_disco || null}, 
            limite_ram = ${dados.limite_ram || null}, 
            limite_gpu = ${dados.limite_gpu || null}, 
            fk_cliente = ${dados.fk_cliente}, 
            fk_zona_disponibilidade = ${dados.fk_zona_disponibilidade}, 
            fk_arquitetura = ${dados.fk_arquitetura}
        WHERE id_modelo = ${idModelo};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function deletar(idModelo) {
    console.log(`Model: Deletando modelo ID: ${idModelo}. ACESSEI O MODELO MODEL`);

  
    var instrucaoSql = `
        DELETE FROM modelo WHERE id_modelo = ${idModelo};
    `;


    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listarPorEmpresa,
    cadastrar,
    atualizar,
    deletar
};

