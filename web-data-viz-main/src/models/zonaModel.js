var database = require("../database/config");

function cadastrarzona(nomeZona, idEmpresa) {
   
     var instrucao = `
        INSERT INTO 
            zonadisponibilidade (nome, fk_empresa) 
        VALUES
            ('${nomeZona}',${idEmpresa});
    `;
    
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function carregarAbas(idEmpresa) {
   
     var instrucao = `
        SELECT
            nome, id_zona
        FROM
            zonadisponibilidade
        WHERE
            fk_empresa = ${idEmpresa};
    `;
    
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function qtdModelo(idZona) {
   
     var instrucao = `
        SELECT
            count(id_modelo) as qtd
        FROM
            modelo
        WHERE
            fk_zona_disponibilidade = ${idZona};
    `;
    
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function info_usuario(idZona) {
   
     var instrucao = `
        SELECT 
            u.nome as nome_usuario, u.email as email, c.nome as cargo 
        FROM 
            acesso_zona as az 
        INNER JOIN 
            usuario as u on u.id = az.fk_usuario 
        INNER JOIN 
            cargo as c on u.fk_cargo =  c.id 
        WHERE 
            az.fk_zona = ${idZona};
    `;
    
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    cadastrarzona,
    carregarAbas,
    qtdModelo,
    info_usuario
};