
var infoModeloModel = require("../models/infoModeloModel")

function infoModeloGet(req, res) {
    var idModelo = req.params.idmodelo

    if (idModelo == undefined){
        res.status(400).send("idModelo indefinido")
    } else {

        infoModeloModel.infoModeloGet(idModelo)
            .then(
                function(resultado) {
                    console.log("Tudo certo no controller")

                    res.status(200).json(resultado)
                }
            ).catch(
                function(erro){
                    console.log(erro)
                    console.log("\nErro ao buscar informações do modelo", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            )
    }
}

module.exports = {
    infoModeloGet
}