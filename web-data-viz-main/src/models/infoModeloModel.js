var database = require("../database/config");

function infoModeloGet(idModelo) {
   
     var instrucao = `
        SELECT 
            m.nome AS nomeModelo,
            m.descricao,
            m.ip,
            m.hostname,
            m.tempo_parametro_min,
            ROUND(m.limite_cpu, 0) AS limite_cpu,
            ROUND(m.limite_disco, 0) AS limite_disco,
            ROUND(m.limite_ram, 0) AS limite_ram,
            ROUND(m.limite_gpu, 0) AS limite_gpu,
            c.nome AS cliente,
            z.nome AS zona
        FROM 
            modelo AS m
        INNER JOIN 
            cliente AS c ON m.fk_cliente = c.id_cliente
        INNER JOIN 
            zonadisponibilidade AS z ON z.id_zona = m.fk_zona_disponibilidade
        WHERE 
            id_modelo = ${idModelo};
    `;
    
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    infoModeloGet
};