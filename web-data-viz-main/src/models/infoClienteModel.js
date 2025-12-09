var database = require("../database/config");

function possibilidadesPesquisa(idcliente) {
  var instrucao = `
        SELECT 
            nome
        FROM 
            modelo 
        WHERE
            fk_cliente = ${idcliente};
    `;

  return database.executar(instrucao);
}

function infoClienteInfo(idcliente) {
  var instrucao = `
        SELECT 
            nome, email_contato, telefone_contato, cnpj, descricao
        FROM 
            cliente 
        WHERE
            id_cliente = ${idcliente};
    `;

  return database.executar(instrucao);
}

function infoModelosClientes(idcliente) {
  var instrucao = `
        SELECT 
            m.nome, m.descricao, m.ip, m.hostname, m.tempo_parametro_min ,
		    m.limite_cpu, m.limite_disco, m.limite_ram, m.limite_gpu, c.nome as cliente, z.nome as zona 
        FROM 
            modelo as m
        INNER JOIN 
            cliente as c on m.fk_cliente = c.id_cliente
        INNER JOIN 
            zonadisponibilidade as z on z.id_zona = m.fk_zona_disponibilidade
        WHERE 
            m.fk_cliente = ${idcliente};
    `;

  return database.executar(instrucao);
}

function clienteKpi(idcliente) {
  var instrucao = `
        SELECT 
            count(id_modelo) as qtdModelo, count(distinct fk_zona_disponibilidade) as zona
        FROM 
            modelo 
        WHERE 
            fk_cliente = ${idcliente};
    `;

  return database.executar(instrucao);
}

module.exports = {
  infoClienteInfo,
  possibilidadesPesquisa,
  infoModelosClientes,
  clienteKpi,
};
