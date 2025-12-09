var database = require("../database/config");

// Função LISTAR
function listar(idEmpresa) {
    

    var instrucaoSql = `
        SELECT * FROM arquitetura AS arq
        WHERE fk_empresa = ${idEmpresa};
    `;
    
    return database.executar(instrucaoSql); 
}

function cadastrar(dados) {
    
    var instrucaoSql = `
       INSERT INTO arquitetura (nome, modelo_cpu, qtd_cpu, qtd_ram, modelo_gpu, so, maxDisco, fk_empresa)
        VALUES ('${dados.nome}', '${dados.modelo_cpu}', ${dados.qtd_cpu}, ${dados.qtd_ram}, '${dados.modelo_gpu}', '${dados.so}', ${dados.maxDisco}, ${dados.fk_empresa});
    `;
    return database.executar(instrucaoSql);
}


function atualizar(idArquitetura, dados) {
    
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
    
    var instrucaoSql = `
        DELETE FROM arquitetura WHERE id_arquitetura = ${idArquitetura};
    `;
    return database.executar(instrucaoSql);
}

function contarArquiteturas(fk_empresa) {
    var instrucaoSql = `
        SELECT COUNT(*) as total 
        FROM arquitetura 
        WHERE fk_empresa = ${fk_empresa};
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar,
    contarArquiteturas
}
