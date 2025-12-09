var database = require("../database/config");

function listarPorEmpresa(idEmpresa) {


  var instrucaoSql = `
        SELECT 
            m.*, 
            c.nome AS cliente_nome, 
            z.nome AS zona_nome,
            a.nome AS arquitetura_nome 
        FROM modelo AS m
        LEFT JOIN cliente AS c ON m.fk_cliente = c.id_cliente
        LEFT JOIN zonadisponibilidade AS z ON m.fk_zona_disponibilidade = z.id_zona
        INNER JOIN arquitetura AS a ON m.fk_arquitetura = a.id_arquitetura
        WHERE a.fk_empresa = ${idEmpresa};
    `;

  return database.executar(instrucaoSql);
}

function contarModelos(fk_empresa) {
  var instrucaoSql = `
        SELECT COUNT(*) as total 
        FROM modelo AS m  
        INNER JOIN arquitetura AS a ON m.fk_arquitetura = a.id_arquitetura
        WHERE a.fk_empresa = ${fk_empresa};
    `;

  return database.executar(instrucaoSql);
}

function cadastrar(dados) {
  var instrucaoSql = `
        INSERT INTO modelo (
            nome, descricao, ip, hostname, 
            tempo_parametro_min, limite_cpu, limite_disco, limite_ram, limite_gpu, 
            fk_cliente, fk_zona_disponibilidade, fk_arquitetura,nome_processo 
        ) VALUES (
            '${dados.nome}', '${dados.descricao || ""}', '${
    dados.ip || ""
  }', '${dados.hostname || ""}', 
            ${dados.tempo_parametro_min || "NULL"}, ${
    dados.limite_cpu || "NULL"
  }, ${dados.limite_disco || "NULL"}, ${dados.limite_ram || "NULL"}, ${
    dados.limite_gpu || "NULL"
  },
            ${dados.fk_cliente}, ${dados.fk_zona_disponibilidade}, ${
    dados.fk_arquitetura
  }, '${dados.nome_processo || ""}'
        );
    `;

  return database.executar(instrucaoSql);
}

function atualizar(idModelo, dados) {
  var instrucaoSql = `
        UPDATE modelo 
        SET nome = '${dados.nome}', 
            descricao = '${dados.descricao || ""}', 
            ip = '${dados.ip || ""}', 
            hostname = '${dados.hostname || ""}', 
            tempo_parametro_min = ${dados.tempo_parametro_min || "NULL"}, 
            limite_cpu = ${dados.limite_cpu || "NULL"}, 
            limite_disco = ${dados.limite_disco || "NULL"}, 
            limite_ram = ${dados.limite_ram || "NULL"}, 
            limite_gpu = ${dados.limite_gpu || "NULL"}, 
            fk_cliente = ${dados.fk_cliente}, 
            fk_zona_disponibilidade = ${dados.fk_zona_disponibilidade}, 
            fk_arquitetura = ${dados.fk_arquitetura},
            nome_processo = '${dados.nome_processo || ""}'
        WHERE id_modelo = ${idModelo};
    `;

  return database.executar(instrucaoSql);
}

function deletar(idModelo) {
  var instrucaoSql = `
        DELETE FROM modelo WHERE id_modelo = ${idModelo};
    `;

  return database.executar(instrucaoSql);
}

module.exports = {
  listarPorEmpresa,
  cadastrar,
  atualizar,
  deletar,
  contarModelos,
};
