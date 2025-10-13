var database = require("../database/config");

function cadastrar(dadosModelo) {
    console.log("ACESSEI O MODELO MODEL, função cadastrar");
    
    
    var instrucao = `
        insert into modelo (nome, descricao, ip, hostname, tempo_parametro_min, limite_cpu, limite_disco, limite_ram, limite_gpu, fk_cliente, fk_zona_disponibilidade) 
        VALUES ('${dadosModelo.nome}', '${dadosModelo.descricao}', '${dadosModelo.ip}', '${dadosModelo.hostname}', ${dadosModelo.tempo}, ${dadosModelo.limiteCpu}, ${dadosModelo.limiteDisco}, ${dadosModelo.limiteRam}, ${dadosModelo.limiteGpu}, ${dadosModelo.cliente}, ${dadosModelo.zona});
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrar
};