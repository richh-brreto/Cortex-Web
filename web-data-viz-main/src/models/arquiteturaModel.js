var database = require("../database/config");

// Função LISTAR
function listar(idEmpresa) {
    console.log(`Model: Listando arquiteturas para a empresa: ${idEmpresa}`);
    

    var instrucaoSql = `
        SELECT * FROM arquitetura AS arq
        WHERE fk_empresa = ${idEmpresa};
    `;
    
    return database.executar(instrucaoSql); 
}

function cadastrar(dados) {
    console.log("Model: Cadastrando nova arquitetura:", dados.nome);
    
    var instrucaoSql = `
       INSERT INTO arquitetura (nome, modelo_cpu, qtd_cpu, qtd_ram, modelo_gpu, so, maxDisco, qtd, fk_zona, fk_empresa)
        VALUES ('${dados.nome}', '${dados.modelo_cpu}', ${dados.qtd_cpu}, ${dados.qtd_ram}, '${dados.modelo_gpu}', '${dados.so}', ${dados.maxDisco}, ${dados.qtd}, ${dados.fk_zona}, ${dados.fk_empresa});
    `;
    return database.executar(instrucaoSql);
}


function atualizar(idArquitetura, dados) {
    console.log(`Model: Atualizando arquitetura ID: ${idArquitetura}`);
    
    var instrucaoSql = `
        UPDATE arquitetura 
        SET nome = '${dados.nome}', 
            modelo_cpu = '${dados.modelo_cpu}', 
            qtd_cpu = ${dados.qtd_cpu}, 
            qtd_ram = ${dados.qtd_ram}, 
            modelo_gpu = '${dados.modelo_gpu}', 
            so = '${dados.so}', 
            maxDisco = ${dados.maxDisco}, 
            qtd = ${dados.qtd}, 
            fk_zona = ${dados.fk_zona}
        WHERE id_arquitetura = ${idArquitetura};
    `;
    return database.executar(instrucaoSql);
}


function deletar(idArquitetura) {
    console.log(`Model: Deletando arquitetura ID: ${idArquitetura}`);
    
    var instrucaoSql = `
        DELETE FROM arquitetura WHERE id_arquitetura = ${idArquitetura};
    `;
    return database.executar(instrucaoSql);
}

function checarLimiteZona(idZona) {
    console.log(`Model: Checando limite para a zona: ${idZona}`);
    
    var instrucaoSql = `
        SELECT 
            az.qtd as limite_maximo,
            COUNT(a.id_arquitetura) as quantidade_atual
        FROM arquitetura_zona az
        LEFT JOIN arquitetura a ON a.id_arquitetura = az.fk_arquitetura
        WHERE az.fk_zona = ${idZona}
        GROUP BY az.qtd;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar,
    checarLimiteZona
}
