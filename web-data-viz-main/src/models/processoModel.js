var database = require("../database/config"); 

function listarPorModelo(idModelo) {
    var instrucaoSql = `
        SELECT 
            p.*, 
            m.nome AS nome_modelo, 
            c.nome AS cliente_nome  
        FROM processo AS p
        INNER JOIN modelo AS m ON p.fk_modelo = m.id_modelo
        INNER JOIN arquitetura AS a ON m.fk_arquitetura = a.id_arquitetura
        INNER JOIN cliente AS c ON a.fk_empresa = c.fk_empresa
        WHERE m.id_modelo = ${idModelo};
    `;  
    return database.executar(instrucaoSql); 
}

module.exports = {
    listarPorModelo
};