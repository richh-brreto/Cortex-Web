// Em: src/models/dashTecnicoModel.js

var database = require("../database/config");

// Função para buscar as ZONAS que um técnico tem acesso (AGORA CORRETA)
function buscarZonasDoTecnico(idUsuario) {
    console.log("MODEL: Buscando zonas para o técnico (lógica correta):", idUsuario);
    
    // A consulta agora é muito mais simples e direta!
    var instrucao = `
        SELECT 
            z.id_zona,
            z.nome
        FROM acesso_zona AS az
        JOIN zonadisponibilidade AS z ON az.fk_zona = z.id_zona
        WHERE az.fk_usuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// A função de buscar alertas por zona NÃO MUDA, pois ela já estava correta.
// Ela recebe um idZona e busca os alertas daquela zona.
function buscarAlertasDaZona(idZona) {
    console.log("MODEL: Buscando alertas para a zona:", idZona);
    var instrucao = `
        SELECT 
            a.tipo,
            a.data_hora,
            a.componente,
            a.descricao,
            a.status,
            m.nome as nome_modelo
        FROM alerta as a
        JOIN modelo as m ON a.fk_modelo = m.id_modelo
        WHERE m.fk_zona_disponibilidade = ${idZona}
        ORDER BY a.data_hora DESC;
    `;
    return database.executar(instrucao);
}

module.exports = {
    buscarZonasDoTecnico,
    buscarAlertasDaZona
};