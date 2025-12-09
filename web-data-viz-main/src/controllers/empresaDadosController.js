var empresaDadosModel = require("../models/empresaDadosModel");

function buscarDadosFormulario(req, res) {

    var idEmpresa = req.params.idEmpresa;

    if (idEmpresa == undefined) {
        res.status(400).send("O idEmpresa está indefinido!");
    } else {
        
        empresaDadosModel.buscarDadosFormulario(idEmpresa)
            .then(
                function (resultado) {
                    
                    res.status(200).json(resultado);
                }
            ).catch(
                function (erro) {
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    buscarDadosFormulario
}