const db = require('../database/config.js');

async function listarZonasPorEmpresa(idEmpresa) {
  console.log(`MODEL (listarZonasPorEmpresa): Buscando zonas por empresa: ${idEmpresa}`);

  let instrucao = `
    SELECT id_zona, nome 
        FROM zonadisponibilidade
        WHERE fk_empresa = ${idEmpresa};
  `;
  console.log("Executando a instrução SQL: \n" + instrucao);
  return db.executar(instrucao);
}

async function listarTop4PorZona(idEmpresa, idZona) {
  console.log("MODEL executando consulta TOP4 por zona");
  var instrucao = `
        SELECT
            a.id_arquitetura as id,
            a.nome AS arquitetura,
            COUNT(m.id_modelo) AS totalArquitetura,
            (
                SELECT COUNT(id_modelo)
                FROM modelo
                WHERE fk_zona_disponibilidade = ${idZona}
            ) AS totalZona
        FROM modelo AS m
        INNER JOIN arquitetura AS a ON a.id_arquitetura = m.fk_arquitetura
        WHERE a.fk_empresa = ${idEmpresa} AND m.fk_zona_disponibilidade = ${idZona}
        GROUP BY a.id_arquitetura
        ORDER BY totalArquitetura DESC
        LIMIT 4;
    `;
  console.log("Executando SQL Top4Zona:", instrucao);
  return db.executar(instrucao);
}

async function listarTop4Global(idEmpresa) {
  console.log("MODEL executando consulta TOP4 geral");
  var instrucao = `
        SELECT
            a.id_arquitetura as id,
            a.nome AS arquitetura,
            COUNT(m.id_modelo) AS totalArquitetura,
            (
                SELECT COUNT(id_modelo)
                FROM modelo
                WHERE fk_arquitetura IN (
                    SELECT id_arquitetura
                    FROM arquitetura
                    WHERE fk_empresa = ${idEmpresa}
                )
            ) AS totalGlobal
        FROM modelo AS m
        INNER JOIN arquitetura AS a ON a.id_arquitetura = m.fk_arquitetura
        WHERE a.fk_empresa = ${idEmpresa}
        GROUP BY a.id_arquitetura
        ORDER BY totalArquitetura DESC
        LIMIT 4;
    `;
  console.log("Executando SQL Top4Global:", instrucao);
  return db.executar(instrucao);
}

async function listarUtilizacaoMensalGlobal(idEmpresa) {
  console.log(`MODEL executando consulta do gráfico mensal global`);

  const instrucao = `
          SELECT 
            a.nome AS arquitetura,
            COUNT(m.id_modelo) AS utilizacoes,
            UPPER(DATE_FORMAT(p.data_mes, '%b/%Y')) AS periodo
          FROM  
            arquitetura a
          INNER JOIN 
            arquitetura_zona az ON a.id_arquitetura = az.fk_arquitetura
          CROSS JOIN 
            (SELECT DATE_SUB(CURDATE(), INTERVAL n MONTH) AS data_mes 
            FROM (SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL 
              SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL 
              SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11) AS nums) p
          LEFT JOIN 
            modelo m ON a.id_arquitetura = m.fk_arquitetura 
            AND DATE_FORMAT(m.data_cadastro, '%Y-%m') = DATE_FORMAT(p.data_mes, '%Y-%m')
          WHERE a.fk_empresa = ${idEmpresa}
          GROUP BY 
              a.id_arquitetura, p.data_mes
          ORDER BY 
              a.nome, p.data_mes;
      `;

  console.log("Executando SQL listarUtilizacaoMensalGlobal:", instrucao);
  return db.executar(instrucao);

}

async function listarUtilizacaoMensalPorZona(idEmpresa, idZona) {
  console.log(`MODEL executando consulta do gráfico mensal por zona: ${idZona}`);

  const instrucao = `
        SELECT 
            a.nome AS arquitetura,
            COUNT(m.id_modelo) AS utilizacoes,
            UPPER(DATE_FORMAT(p.data_mes, '%b/%Y')) AS periodo
        FROM arquitetura a
        INNER JOIN arquitetura_zona az ON a.id_arquitetura = az.fk_arquitetura AND az.fk_zona = ${idZona}
        CROSS JOIN (
            SELECT DATE_SUB(CURDATE(), INTERVAL n MONTH) AS data_mes
            FROM (
                SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL
                SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL
                SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11
            ) AS nums
        ) p
        LEFT JOIN modelo m ON a.id_arquitetura = m.fk_arquitetura
            AND DATE_FORMAT(m.data_cadastro, '%Y-%m') = DATE_FORMAT(p.data_mes, '%Y-%m')
            AND m.fk_zona_disponibilidade = ${idZona}
        WHERE a.fk_empresa = ${idEmpresa}
        AND az.fk_zona = ${idZona}
        GROUP BY a.nome, p.data_mes
        ORDER BY a.nome, p.data_mes;
    `;

  console.log("Executando SQL listarUtilizacaoMensalPorZona:", instrucao);
  return db.executar(instrucao);
}

async function listarUtilizacaoMensalFiltradoGlobal(idEmpresa, listaIds) {
  console.log("MODEL: gráfico filtrado global por arquiteturas:", listaIds);
  const instrucao = `
      SELECT 
          a.nome AS arquitetura,
          COUNT(m.id_modelo) AS utilizacoes,
          UPPER(DATE_FORMAT(p.data_mes, '%b/%Y')) AS periodo
      FROM arquitetura a
      INNER JOIN arquitetura_zona az 
          ON a.id_arquitetura = az.fk_arquitetura
      CROSS JOIN (
          SELECT DATE_SUB(CURDATE(), INTERVAL n MONTH) AS data_mes
          FROM (
              SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL
              SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL
              SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11
          ) AS nums
      ) p
      LEFT JOIN modelo m 
          ON a.id_arquitetura = m.fk_arquitetura
         AND DATE_FORMAT(m.data_cadastro, '%Y-%m') = DATE_FORMAT(p.data_mes, '%Y-%m')
      WHERE a.fk_empresa = ${idEmpresa}
      AND a.id_arquitetura IN (${listaIds.join(",")})
      GROUP BY a.id_arquitetura, p.data_mes
      ORDER BY a.nome, p.data_mes;
  `;
  console.log("SQL listarUtilizacaoMensalFiltradoGlobal:", instrucao);
  return db.executar(instrucao);
}

async function listarUtilizacaoMensalFiltradoPorZona(idEmpresa, idZona, listaIds) {
  console.log("MODEL: gráfico filtrado por zona e arquiteturas:", idZona, listaIds);
  const instrucao = `
      SELECT 
          a.nome AS arquitetura,
          COUNT(m.id_modelo) AS utilizacoes,
          UPPER(DATE_FORMAT(p.data_mes, '%b/%Y')) AS periodo
      FROM arquitetura a
      INNER JOIN arquitetura_zona az 
          ON a.id_arquitetura = az.fk_arquitetura AND az.fk_zona = ${idZona}
      CROSS JOIN (
          SELECT DATE_SUB(CURDATE(), INTERVAL n MONTH) AS data_mes
          FROM (
              SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL
              SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL
              SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11
          ) AS nums
      ) p
      LEFT JOIN modelo m 
          ON a.id_arquitetura = m.fk_arquitetura
         AND DATE_FORMAT(m.data_cadastro, '%Y-%m') = DATE_FORMAT(p.data_mes, '%Y-%m')
         AND m.fk_zona_disponibilidade = ${idZona}
      WHERE a.fk_empresa = ${idEmpresa}
      AND a.id_arquitetura IN (${listaIds.join(",")})
      GROUP BY a.id_arquitetura, p.data_mes
      ORDER BY a.nome, p.data_mes;
  `;
  console.log("SQL listarUtilizacaoMensalFiltradoPorZona:", instrucao);
  return db.executar(instrucao);
}

async function listarArquiteturasGlobais(idEmpresa) {
  console.log(`MODEL executando consulta da lista de arquiteturas globais`);

  const instrucao = `
    SELECT a.id_arquitetura as id, a.nome 
      FROM arquitetura a
    WHERE fk_empresa = ${idEmpresa};
  `;

  console.log("Executando SQL listarArquiteturasGlobais:", instrucao);
  return db.executar(instrucao);
}

async function listarArquiteturasPorZona(idEmpresa, idZona) {
  console.log(`MODEL executando consulta da lista de arquiteturas por zona: ${idZona}`);

  const instrucao = `
    SELECT a.id_arquitetura as id, a.nome 
      FROM arquitetura a
    INNER JOIN arquitetura_zona az ON az.fk_arquitetura = a.id_arquitetura
    WHERE fk_empresa = ${idEmpresa} AND az.fk_zona = ${idZona};
  `;

  console.log("Executando SQL listarArquiteturasPorZona:", instrucao);
  return db.executar(instrucao);
}

module.exports = {
  listarZonasPorEmpresa,
  listarTop4PorZona,
  listarTop4Global,
  listarUtilizacaoMensalPorZona,
  listarUtilizacaoMensalGlobal,
  listarArquiteturasPorZona,
  listarArquiteturasGlobais,
  listarUtilizacaoMensalFiltradoGlobal,
  listarUtilizacaoMensalFiltradoPorZona
};
