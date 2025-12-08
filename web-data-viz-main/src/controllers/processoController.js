var processoModel = require("../models/processoModel.js");

function listarPorModelo(req, res) {
    var idModelo = req.params.idModelo;         
    console.log(`Controller: Listando processo para o modelo ID: ${idModelo}`);

    if (idModelo == undefined) {                
        res.status(400).send("O idModelo está indefinido!");
    } else {
        processoModel.listarPorModelo(idModelo)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao buscar os processos! Erro: ", erro.sqlMessage || erro);
                res.status(500).json(erro.sqlMessage || erro);
            });
    }
}

module.exports = {
    listarPorModelo
};