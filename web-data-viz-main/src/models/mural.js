var database = require("../database/config");


function buscar(id) {
    var instrucao = `select nome from empresa where id = ${id};`;
    return database.executar(instrucao);
}

module.exports = {
    buscar
};