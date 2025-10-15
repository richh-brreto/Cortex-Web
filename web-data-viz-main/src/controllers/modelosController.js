var modelosModel = require("../models/modelosModel");

function cadastrar(req, res) {
    
    var dados = {
        nome: req.body.nomeServer,
        descricao: req.body.descricaoServer,
        zona: req.body.zonaServer,
        cliente: req.body.clienteServer,
        ip: req.body.ipServer,
        hostname: req.body.hostnameServer,
        tempo: req.body.tempoServer,
        limiteCpu: req.body.limiteCpuServer,
        limiteDisco: req.body.limiteDiscoServer,
        limiteRam: req.body.limiteRamServer,
        limiteGpu: req.body.limiteGpuServer
    };

   
    if (!dados.nome) {
        res.status(400).send("O nome do modelo é obrigatório!");
    } else {
        modelosModel.cadastrar(dados)
            .then(
                function (resultado) {
                    res.status(201).json(resultado); 
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    cadastrar
}