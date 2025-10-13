var database = require("../database/config");

function infoModeloGet(idModelo) {
   
     var instrucao = `
        SELECT 
            m.nome as nomeModelo, m.descricao, m.ip, m.hostname, m.tempo_parametro_min ,
		    m.limite_cpu, m.limite_disco, m.limite_ram, m.limite_gpu, c.nome as cliente, z.nome as zona 
        FROM 
            modelo as m
        INNER JOIN 
            cliente as c 
        ON 
            m.fk_cliente = c.id_cliente
        INNER JOIN 
            zonadisponibilidade as z 
        ON 
            z.id_zona = m.fk_zona_disponibilidade
        WHERE 
            id_modelo = ${idModelo};
    `;
    
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    infoModeloGet
};