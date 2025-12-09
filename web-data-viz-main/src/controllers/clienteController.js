var clienteModel = require("../models/clienteModel");

function listar(req, res) {
  var fk_empresa = req.params.fkEmpresa;

  if (!fk_empresa) {
    return res.status(400).json({ erro: "ID da empresa não fornecido" });
  }

  clienteModel
    .listar(fk_empresa)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      res
        .status(500)
        .json({ erro: erro.sqlMessage || "Erro ao listar clientes" });
    });
}

function cadastrar(req, res) {
  var { nome, descricao, telefone, cnpj, email, fk_empresa } = req.body;

  if (!nome || !cnpj || !fk_empresa) {
    return res
      .status(400)
      .json({ erro: "Campos obrigatórios: nome, cnpj, fk_empresa" });
  }

  clienteModel
    .cadastrar(nome, descricao, telefone, cnpj, email, fk_empresa)
    .then(() => {
      res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!" });
    })
    .catch((erro) => {
      res
        .status(500)
        .json({ erro: erro.sqlMessage || "Erro ao cadastrar cliente" });
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

  clienteModel
    .atualizar(id_cliente, nome, descricao, telefone, cnpj, email)
    .then(() => {
      res.status(200).json({ mensagem: "Cliente atualizado com sucesso!" });
    })
    .catch((erro) => {
      res
        .status(500)
        .json({ erro: erro.sqlMessage || "Erro ao atualizar cliente" });
    });
}

function deletar(req, res) {
  var id_cliente = req.params.id;

  if (!id_cliente) {
    return res.status(400).json({ erro: "ID do cliente não fornecido" });
  }

  clienteModel
    .deletar(id_cliente)
    .then(() => {
      res.status(200).json({ mensagem: "Cliente removido com sucesso!" });
    })
    .catch((erro) => {
      res
        .status(500)
        .json({ erro: erro.sqlMessage || "Erro ao deletar cliente" });
    });
}

module.exports = {
  listar,
  cadastrar,
  atualizar,
  deletar,
};
