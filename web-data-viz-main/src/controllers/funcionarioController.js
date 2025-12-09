var funcionarioModel = require("../models/funcionarioModel");

function listar(req, res) {
  var fk_empresa = req.params.fkEmpresa;

  if (!fk_empresa) {
    return res.status(400).json({ erro: "ID da empresa não fornecido" });
  }

  funcionarioModel
    .listar(fk_empresa)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      res
        .status(500)
        .json({ erro: erro.sqlMessage || "Erro ao listar funcionários" });
    });
}

function cadastrar(req, res) {
  var { nome, email, senha, cargo, telefone, status } = req.body;
  var foto = req.file ? req.file.filename : null;
  var fk_empresa = req.params.fkEmpresa;

  if (!nome || !email || !cargo || !fk_empresa || !senha) {
    return res
      .status(400)
      .json({
        erro: "Campos obrigatórios: nome, email, cargo, senha, departamento, fk_empresa",
      });
  }

  funcionarioModel
    .cadastrar(nome, email, senha, cargo, telefone, status, fk_empresa, foto)
    .then(() => {
      res.status(201).json({ mensagem: "Funcionário cadastrado com sucesso!" });
    })
    .catch((erro) => {
      res
        .status(500)
        .json({ erro: erro.sqlMessage || "Erro ao cadastrar funcionário" });
    });
}

function atualizar(req, res) {
  var id_funcionario = req.params.id;
  var foto = req.file ? req.file.filename : null;
  var { nome, email, senha, cargo, telefone, status } = req.body;

  if (!id_funcionario) {
    return res.status(400).json({ erro: "ID do funcionário não fornecido" });
  }

  if (!nome || !email || !senha || !cargo) {
    return res
      .status(400)
      .json({ erro: "Campos obrigatórios: nome, email, cargo, departamento" });
  }

  status = status || "ativo";

  funcionarioModel
    .atualizar(
      id_funcionario,
      nome,
      email,
      senha,
      cargo,
      telefone,
      foto,
      status
    )
    .then(() => {
      res.status(200).json({ mensagem: "Funcionário atualizado com sucesso!" });
    })
    .catch((erro) => {
      res
        .status(500)
        .json({ erro: erro.sqlMessage || "Erro ao atualizar funcionário" });
    });
}

function deletar(req, res) {
  var id_funcionario = req.params.id;

  if (!id_funcionario) {
    return res.status(400).json({ erro: "ID do funcionário não fornecido" });
  }

  funcionarioModel
    .deletar(id_funcionario)
    .then(() => {
      res.status(200).json({ mensagem: "Funcionário removido com sucesso!" });
    })
    .catch((erro) => {
      res
        .status(500)
        .json({ erro: erro.sqlMessage || "Erro ao deletar funcionário" });
    });
}

function buscarPorId(req, res) {
  var id_usuario = req.params.id;

  if (!id_usuario) {
    return res.status(400).json({ erro: "ID do usuário não fornecido" });
  }

  funcionarioModel
    .buscarPorId(id_usuario)
    .then((resultado) => {
      if (resultado.length > 0) {
        const usuario = resultado[0];
        res.status(200).json(usuario); // Retorna o objeto completo
      } else {
        res.status(404).json({ erro: "Usuário não encontrado" });
      }
    })
    .catch((erro) => {
      res
        .status(500)
        .json({ erro: erro.sqlMessage || "Erro ao buscar usuário" });
    });
}

function alterarSenha(req, res) {
  var { idUsuario, senhaAtual, senhaNova } = req.body;

  if (!idUsuario || !senhaAtual || !senhaNova) {
    return res.status(400).json({
      erro: true,
      message: "Todos os campos são obrigatórios",
    });
  }

  // Primeiro, verificar se a senha atual está correta
  funcionarioModel
    .buscarPorId(idUsuario)
    .then((resultado) => {
      if (resultado.length === 0) {
        return res.status(404).json({
          erro: true,
          message: "Usuário não encontrado",
        });
      }

      const usuario = resultado[0];

      // Verificar senha atual
      if (usuario.senha !== senhaAtual) {
        return res.status(401).json({
          erro: true,
          message: "Senha atual incorreta",
        });
      }

      // Atualizar apenas a senha
      return funcionarioModel.alterarSenha(idUsuario, senhaNova).then(() => {
        res.status(200).json({
          erro: false,
          message: "Senha alterada com sucesso!",
        });
      });
    })
    .catch((erro) => {
      res.status(500).json({
        erro: true,
        message: erro.sqlMessage || "Erro ao alterar senha",
      });
    });
}

module.exports = {
  listar,
  cadastrar,
  atualizar,
  deletar,
  buscarPorId,
  alterarSenha,
};
