var funcionarioModel = require("../models/funcionarioModel");

function listar(req, res) {
    var fk_empresa = req.params.fkEmpresa;

    if (!fk_empresa) {
        return res.status(400).json({ erro: "ID da empresa não fornecido" });
    }

    funcionarioModel.listar(fk_empresa)
        .then(resultado => {
            console.log("Funcionários encontrados:", resultado);
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.error("Erro ao listar funcionários:", erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro ao listar funcionários" });
        });
}

function cadastrar(req, res) {
    var { nome, email, senha, cargo, telefone, status} = req.body;
    var fk_empresa = req.params.fkEmpresa;

    if (!nome || !email || !cargo || !fk_empresa || !senha) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, email, cargo, senha, departamento, fk_empresa" });
    }

    funcionarioModel.cadastrar(nome, email, senha, cargo, telefone, status, fk_empresa)
        .then(() => {
            console.log("Funcionário cadastrado com sucesso!");
            res.status(201).json({ mensagem: "Funcionário cadastrado com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao cadastrar funcionário:", erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro ao cadastrar funcionário" });
        });
}

function atualizar(req, res) {
    var id_funcionario = req.params.id;
    var foto = req.file.filename;
    var { nome, email, senha, cargo, telefone, status} = req.body;
    
    if (!id_funcionario) {
        return res.status(400).json({ erro: "ID do funcionário não fornecido" });
    }

    if (!nome || !email || !senha || !cargo ) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, email, cargo, departamento" });
    }

    status = status || 'ativo';

    console.log("Atualizando funcionário:", { id_funcionario, nome, email, senha, cargo, telefone, foto, status});

    funcionarioModel.atualizar(id_funcionario, nome, email, senha, cargo, telefone, foto, status)
        .then(() => {
            console.log("Funcionário atualizado com sucesso!");
            res.status(200).json({ mensagem: "Funcionário atualizado com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao atualizar funcionário:", erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro ao atualizar funcionário" });
        });
}

function deletar(req, res) {
    var id_funcionario = req.params.id;

    if (!id_funcionario) {
        return res.status(400).json({ erro: "ID do funcionário não fornecido" });
    }

    console.log("Deletando funcionário:", id_funcionario);

    funcionarioModel.deletar(id_funcionario)
        .then(() => {
            console.log("Funcionário removido com sucesso!");
            res.status(200).json({ mensagem: "Funcionário removido com sucesso!" });
        })
        .catch(erro => {
            console.error("Erro ao deletar funcionário:", erro);
            res.status(500).json({ erro: erro.sqlMessage || "Erro ao deletar funcionário" });
        });
}

module.exports = {
    listar,
    cadastrar,
    atualizar,
    deletar
};