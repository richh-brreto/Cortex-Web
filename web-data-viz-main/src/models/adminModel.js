var database = require("../database/config");


function listarPendentes() {
    var instrucao = `
        SELECT id, nome, email FROM usuario WHERE ativo = 0;
    `;
    return database.executar(instrucao);
}


function ativarUsuario(idUsuario) {
    var instrucao = `
        UPDATE usuario SET ativo = 1 WHERE id = ${idUsuario};
    `;
    return database.executar(instrucao);
}


function recusarUsuario(idUsuario) {
    var instrucao = `
        DELETE FROM usuario WHERE id = ${idUsuario};
    `;
    return database.executar(instrucao);
}

module.exports = {
    listarPendentes,
    ativarUsuario,
    recusarUsuario
};