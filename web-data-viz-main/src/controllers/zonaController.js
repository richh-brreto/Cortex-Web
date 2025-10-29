var zonaModel = require("../models/zonaModel");

function cadastrar(req, res) {
    
    var fkEmpresa = req.params.fkEmpresa
    var nome = req.body.nome
   
   if (nome == undefined || fkEmpresa == undefined){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.cadastrar(nome,fkEmpresa)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao cadastrar zona", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}

function listarFuncionario(req, res) {

    var fk_zona = req.params.fk_zona
   
   if (!fk_zona){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.listarFuncionario(fk_zona)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao carregar funcionarios", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}

function listarModelos(req, res) {

    var fk_zona = req.params.fk_zona
   
   if (!fk_zona){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.listarModelos(fk_zona)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao carregar modelos", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}

function listarArq(req, res) {

    var fk_zona = req.params.fk_zona
   
   if (!fk_zona){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.listarArq(fk_zona)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao carregar arquiteturas", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}


function listar(req, res) {

    var fkEmpresa = req.params.fkEmpresa
   
   if (!fkEmpresa){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.listar(fkEmpresa)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao carregar zonas", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}

function deletar(req, res) {

    var idZona = req.params.idZona
   
   if (idZona == undefined){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.deletar(idZona)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao deletar zona", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}

function atualizar(req, res) {

    var idZona = req.params.idZona
    var nome = req.body.nome
   
   if (idZona == undefined){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.atualizar(idZona,nome)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao cadastrar zona", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}

function posibilidadesModelo(req, res) {

    var fk_empresa = req.params.fk_empresa
   
   if (!fk_empresa){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.listarFuncionario(fk_empresa)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao carregar possibilidades modelos", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}

function posibilidadesArq(req, res) {

    var fk_empresa = req.params.fk_empresa
    var fk_zona = req.params.fk_zona
   
   if (!fk_empresa || !fk_zona){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.listarFuncionario(fk_empresa,fk_zona)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao carregar possibilidades arquiteturas", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}

function posibilidadesFunc(req, res) {

    var fk_empresa = req.params.fk_empresa
    var fk_zona = req.params.fk_zona
   
   if (!fk_empresa || !fk_zona){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.listarFuncionario(fk_empresa,fk_zona)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao carregar possibilidades funcionarios", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}

module.exports = {
    cadastrar,
    listar,
    atualizar,
    deletar,
    listarFuncionario,
    listarArq,
    listarModelos,
    posibilidadesFunc,
    posibilidadesArq,
    posibilidadesModelo
}