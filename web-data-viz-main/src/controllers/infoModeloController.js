
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

function listarBlacklist(req, res) {
    var idModelo = req.params.idmodelo
    if (idModelo == undefined){
        res.status(400).send("idModelo indefinido")
    } else {

        infoModeloModel.listarBlacklist(idModelo)
            .then(
                function(resultado) {
                    console.log("Tudo certo no controller blacklist")
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



function adicionarProcessoProibido(req, res) {
    const { fk_modelo, nome } = req.body;
    if (!fk_modelo || !nome) {
        return res.status(400).send("Dados incompletos (fk_modelo, nome).");
    }
    console.log(`Controller: Add Proibido '${nome}', matar=0 para modelo ${fk_modelo}`);


    infoModeloModel.adicionarBlacklist(fk_modelo, nome, 'proibido', 0)
        .then(function (resultado) {
            res.status(201).json({ mensagem: "Processo adicionado como proibido (Autokill=OFF)." });
        })
        .catch(function (erro) {
            console.error("Erro Controller (add Proibido):", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || "Erro interno.");
        });
}


function registrarProcessoNeutro(req, res) {
    const { fk_modelo, nome } = req.body;
    if (!fk_modelo || !nome) {
        return res.status(400).send("Dados incompletos (fk_modelo, nome).");
    }
    console.log(`Controller: Registrar Neutro '${nome}', matar=1 para modelo ${fk_modelo}`);
    infoModeloModel.adicionarBlacklist(fk_modelo, nome, 'neutro', 1)
        .then(function (resultado) {
            res.status(201).json({ mensagem: "Processo registrado como neutro (Kill acionado)." });
        })
        .catch(function (erro) {
            console.error("Erro Controller (reg Neutro):", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage || "Erro interno.");
        });
}

module.exports = {
    infoModeloGet,
    adicionarProcessoProibido,
    registrarProcessoNeutro,
    listarBlacklist
};