const DashboardModel = require("../models/dashInfraModel");

async function listar(req, res) {
  const idEmpresa = req.params.idEmpresa;

  try {
    const zonas = await DashboardModel.listarZonasPorEmpresa(idEmpresa);
    res.status(200).json(zonas);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar as zonas da empresa", detalhe: error });
  }
}

async function listarTop4(req, res) {
  const idEmpresa = req.params.idEmpresa;
  let idZona = req.query.idZona;

  if (!idEmpresa) {
    res.status(400).send("ID da empresa indefinido");
    return;
  }

  const consultaGlobal =
    !idZona || idZona === "todas" || idZona === "undefined";

  if (!consultaGlobal) {
    DashboardModel.listarTop4PorZona(idEmpresa, idZona)
      .then(function (resultado) {
        if (resultado.length > 0) {
          var resposta = [];

          for (var i = 0; i < resultado.length; i++) {
            var porc =
              (resultado[i].totalArquitetura / resultado[i].totalZona) * 100;
            resposta.push({
              id: resultado[i].id,
              arquitetura: resultado[i].arquitetura,
              totalArquitetura: resultado[i].totalArquitetura,
              totalZona: resultado[i].totalZona,
              porcentagem: porc.toFixed(2),
            });
          }

          res.status(200).json(resposta);
        } else {
          res.status(204).send("Nenhum resultado encontrado");
        }
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  } else {
    idZona = null;

    DashboardModel.listarTop4Global(idEmpresa)
      .then(function (resultado) {
        if (resultado.length > 0) {
          var resposta = [];

          for (var i = 0; i < resultado.length; i++) {
            var porc =
              (resultado[i].totalArquitetura / resultado[i].totalGlobal) * 100;
            resposta.push({
              id: resultado[i].id,
              arquitetura: resultado[i].arquitetura,
              totalArquitetura: resultado[i].totalArquitetura,
              totalGlobal: resultado[i].totalGlobal,
              porcentagem: porc.toFixed(2),
            });
          }

          res.status(200).json(resposta);
        } else {
          res.status(204).send("Nenhum resultado encontrado");
        }
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

async function listarUtilizacaoMensal(req, res) {
  const idEmpresa = req.params.idEmpresa;
  let idZona = req.query.idZona;

  try {
    const global = !idZona || idZona === "todas";
    let resultadoTop4;
    let dadosMensais;

    if (global) {
      resultadoTop4 = await DashboardModel.listarTop4Global(idEmpresa);
      dadosMensais = await DashboardModel.listarUtilizacaoMensalGlobal(
        idEmpresa
      );
    } else {
      resultadoTop4 = await DashboardModel.listarTop4PorZona(idEmpresa, idZona);
      dadosMensais = await DashboardModel.listarUtilizacaoMensalPorZona(
        idEmpresa,
        idZona
      );
    }

    const arquiteturas = [];
    for (let i = 0; i < resultadoTop4.length; i++) {
      arquiteturas.push(resultadoTop4[i].arquitetura);
    }

    res.status(200).json({
      arquiteturas,
      dados: dadosMensais,
    });
  } catch (erro) {
    res.status(500).json(erro.sqlMessage);
  }
}

async function listarMensalFiltrado(req, res) {
  const idEmpresa = req.params.idEmpresa;
  const { idArquiteturas, idZona } = req.query;
  if (!idArquiteturas) {
    return res.status(400).send("IDs não enviados");
  }
  const lista = idArquiteturas.split(",").map(Number);
  const consultaGlobal =
    !idZona || idZona === "todas" || idZona === "undefined";
  try {
    let dados;
    if (consultaGlobal) {
      dados = await DashboardModel.listarUtilizacaoMensalFiltradoGlobal(
        idEmpresa,
        lista
      );
    } else {
      dados = await DashboardModel.listarUtilizacaoMensalFiltradoPorZona(
        idEmpresa,
        idZona,
        lista
      );
    }
    // precisa devolver também a lista de arquiteturas para o frontend montar datasets
    const arqs = [...new Set(dados.map((x) => x.arquitetura))];
    res.json({
      arquiteturas: arqs,
      dados,
    });
  } catch (e) {
    res.status(500).send("Erro no servidor");
  }
}

async function listarArquiteturas(req, res) {
  const idEmpresa = req.params.idEmpresa;
  let idZona = req.query.idZona;

  if (!idEmpresa) {
    res.status(400).send("ID da empresa indefinido");
    return;
  }

  try {
    const global = !idZona || idZona === "todas";
    let resultadoArquitetura;

    if (global) {
      resultadoArquitetura = await DashboardModel.listarArquiteturasGlobais(
        idEmpresa
      );
    } else {
      resultadoArquitetura = await DashboardModel.listarArquiteturasPorZona(
        idEmpresa,
        idZona
      );
    }

    res.status(200).json(resultadoArquitetura);
  } catch (error) {
    res.status(500).json(erro.sqlMessage);
  }
}

module.exports = {
  listar,
  listarTop4,
  listarUtilizacaoMensal,
  listarArquiteturas,
  listarMensalFiltrado,
};
