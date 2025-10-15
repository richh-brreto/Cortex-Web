var database = require("../database/config");

function buscarDadosFormulario(idEmpresa) {
    console.log("ACESSEI O EMPRESADADOS MODEL para buscar dados do formulário da empresa: ", idEmpresa);
   
     var instrucao = `
        SELECT 
            'zona' AS tipo, 
            id_zona AS id, 
            nome 
        FROM zonadisponibilidade WHERE fk_empresa = ${idEmpresa}
        
        UNION ALL
        
        SELECT 
            'cliente' AS tipo, 
            id_cliente AS id, 
            nome 
        FROM cliente WHERE fk_empresa = ${idEmpresa};
    `;
    
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarDadosFormulario
};