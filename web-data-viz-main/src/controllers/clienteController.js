var clienteModel = require("../models/clienteModel");

function listar(req, res) {
    var fk_empresa = req.params.fkEmpresa;

    if (!fk_empresa) {
        return res.status(400).json({ erro: "ID da empresa não fornecido" });
    }

    clienteModel.listar(fk_empresa)
        .then(resultado => {
            console.log("Clientes encontrados:", resultado);
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.error("Erro ao listar clientes:", erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro ao listar clientes" });
        });
}

function cadastrar(req, res) {
    var { nome, descricao, telefone, cnpj, email, fk_empresa} = req.body;

    if (!nome || !cnpj || !fk_empresa) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, cnpj, fk_empresa" });
    }


    console.log("Cadastrando cliente:", { nome, descricao, telefone, cnpj, email, fk_empresa});

    clienteModel.cadastrar(nome, descricao, telefone, cnpj, email, fk_empresa)
        .then(() => {
            console.log("Cliente cadastrado com sucesso!");
            res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao cadastrar cliente:", erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro ao cadastrar cliente" });
        });
}

function atualizar(req, res) {
    var id_cliente = req.params.id;
    var { nome, descricao, telefone, cnpj, email } = req.body;

    // Validações básicas
    if (!id_cliente) {
        return res.status(400).json({ erro: "ID do cliente não fornecido" });
    }

    if (!nome || !cnpj) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, cnpj" });
    }


    console.log("Atualizando cliente:", { id_cliente, nome, descricao, telefone, cnpj, email });

    clienteModel.atualizar(id_cliente, nome, descricao, telefone, cnpj, email)
        .then(() => {
            console.log("Cliente atualizado com sucesso!");
            res.status(200).json({ mensagem: "Cliente atualizado com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao atualizar cliente:", erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro ao atualizar cliente" });
        });
}

function deletar(req, res) {
    var id_cliente = req.params.id;

    if (!id_cliente) {
        return res.status(400).json({ erro: "ID do cliente não fornecido" });
    }

    console.log("Deletando cliente:", id_cliente);

    clienteModel.deletar(id_cliente)
        .then(() => {
            console.log("Cliente removido com sucesso!");
            res.status(200).json({ mensagem: "Cliente removido com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao deletar cliente:", erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro ao deletar cliente" });
        });
}

function contarClientes(req, res) {
    var fk_empresa = req.params.fk_empresa;

    if (fk_empresa == undefined) {
        res.status(400).send("fk_empresa está undefined!");
    } else {
        clienteModel.contarClientes(fk_empresa)
            .then(function (resultado) {
                console.log("Tudo certo no controller - contagem de clientes");
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao contar clientes: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar,
    contarClientes
};