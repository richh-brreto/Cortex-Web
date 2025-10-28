var database = require("../database/config");

function infoModeloGet(idModelo) {

    var instrucao = `
      SELECT 
    m.id_modelo, 
    m.nome AS nome_modelo, 
    m.descricao, 
    m.ip, 
    m.hostname, 
    m.tempo_parametro_min, 
    m.limite_cpu, 
    m.limite_disco, 
    m.limite_ram, 
    m.limite_gpu,
    c.nome AS cliente_nome, 
    z.nome AS zona_nome,
    a.id_arquitetura,
    a.nome AS nome_arquitetura,
    a.modelo_cpu, 
    a.qtd_cpu, 
    a.qtd_ram, 
    a.modelo_gpu, 
    a.so, 
    a.maxDisco
FROM 
    modelo AS m

INNER JOIN 
    arquitetura AS a ON m.fk_arquitetura = a.id_arquitetura
INNER JOIN 
    cliente AS c ON m.fk_cliente = c.id_cliente
INNER JOIN 
    zonadisponibilidade AS z ON m.fk_zona_disponibilidade = z.id_zona
WHERE 
    m.id_modelo = ${idModelo};
    `;


    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    infoModeloGet
};