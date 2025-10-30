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
  
          zonaModel.posibilidadesModelo(fk_empresa)
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
  
          zonaModel.posibilidadesArq(fk_empresa,fk_zona)
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
    var id_zona = req.params.id_zona
   
   if (!fk_empresa || !id_zona){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.posibilidadesFunc(fk_empresa,id_zona)
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

function vincularArquitetura(req, res) {
    
    var id_zona = req.params.id_zona
    var idArq = req.body.idModelo
    var qtdArq = req.body.qtdArq
   
   if (!id_zona || !idArq || !qtdArq){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.vincularArquitetura(idArq,id_zona,qtdArq)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao vincular arquitetura", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}

function vincularModelo(req, res) {
    
    var id_zona = req.params.id_zona
    var idModelo = req.body.idModelo
   
   if (!id_zona || !idModelo){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.vincularModelo(idModelo,id_zona)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao vincular modelo", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}

function vincularFuncionario(req, res) {
    
    var id_zona = req.params.id_zona
    var idFunc = req.body.idFunc
   
   if (!idFunc|| !id_zona){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.vincularFuncionario(idFunc,id_zona)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao vincular funcionario", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}


function desvincularArquitetura(req, res) {

    var id = req.params.id
    var id_zona = req.params.id_zona
   
   if (!id || !id_zona){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.desvincularArquitetura(id,id_zona)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao desvinvular arquitetura", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}

function desvincularModelo(req, res) {

    var id = req.params.id
   
   if (!id){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.desvincularModelo(id)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao desvinvular modelo", erro.sqlMessage);
                      res.status(500).json(erro.sqlMessage);
                  }
              )
      }

}

function desvincularFuncionario(req, res) {

    var id = req.params.id
    var id_zona = req.params.id_zona
   
   if (!id || !id_zona){
          res.status(400).send("Algum parêmetro indefinido")
      } else {
  
          zonaModel.desvincularFuncionario(id,id_zona)
              .then(
                  function(resultado) {
                      console.log("Tudo certo no controller")
  
                      res.status(200).json(resultado)
                  }
              ).catch(
                  function(erro){
                      console.log(erro)
                      console.log("\nErro ao desvinvular funcionario", erro.sqlMessage);
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
    posibilidadesModelo,
    vincularArquitetura,
    vincularModelo,
    vincularFuncionario,
    desvincularArquitetura,
    desvincularModelo,
    desvincularFuncionario,
    desvincularFuncionario
}