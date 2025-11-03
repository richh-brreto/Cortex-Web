require("dotenv").config({ path: ".env.dev" });
var mysql = require("mysql2");

var mySqlConfig = {
    host: "localhost",
    database: "cortex",      // ← Nome do seu banco
    user: "aluno01",            // ← Seu usuário MySQL
    password: "senha123"    // ← COLOQUE A SENHA CORRETA AQUI
};
function executar(instrucao) {
    return new Promise(function (resolve, reject) {
        var conexao = mysql.createConnection(mySqlConfig);

        conexao.connect(function (erro) {
            if (erro) {
                console.error("❌ Erro de conexão com o banco:", erro.sqlMessage || erro);
                reject(erro);
                return;
            }

            conexao.query(instrucao, function (erro, resultados) {
                conexao.end();
                if (erro) {
                    console.error("❌ Erro na query:", erro.sqlMessage || erro);
                    reject(erro);
                    return;
                }
                resolve(resultados);
            });
        });
    });
}

module.exports = {
    executar
};
