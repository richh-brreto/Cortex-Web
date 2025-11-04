
var mural = require("../models/mural");
const axios = require("axios");
// const JIRA_BASE_URL = "https://sptech-hydroscan.atlassian.net";
// const JIRA_EMAIL = "guilherme.conceicao@sptech.school";
const JIRA_API_TOKEN =
 // "ATATT3xFfGF03TBjFa2CcibRwtCKdCuTVniBCr27eL50F5iAs8dhz4XZBxTpfgpRqOL3PCzo6mxifJGq-skD69jCw5qlgdAGq-6C36HxXBd2DpCa3yG4qKQv5KKVyKz-KeeTF1_7T1do5IvfWzGBqu40afd5h7MHP4pH8gP8tSDu5G38dhdr2dg=100B3E50";

async function buscarTickets(nome) {
  try {
    const jql =
      'project = "CTX" AND status = "Waiting for support" ORDER BY created DESC';
    const body = {
      jql,
      maxResults: 50,
      fields: [
        "summary",
        "status",
        "assignee",
        "reporter",
        "created",
        "updated",
        "priority",
        "issuetype",
        "project",
      ],
    };

    const response = await axios.post(
      `${JIRA_BASE_URL}/rest/api/3/search/jql`,
      body,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${JIRA_EMAIL}:${JIRA_API_TOKEN}`
          ).toString("base64")}`,
        },
      }
    );

    const tickets = []
    const issues = response.data.issues || [];

    issues.forEach((issue) => {
      const f = issue.fields;
      if(f.summary.includes(nome.nome)){
        tickets.push(f)
      }
    });

    return tickets
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
}
async function listar(req, res) {
  var idEmpresa = req.params.idEmpresa;
  let nomeEmpresa = await mural.buscar(idEmpresa)
  let tickets = await buscarTickets(nomeEmpresa[0])
  //res.send(tickets)
  res.status(200).json(tickets);
}

module.exports = {
  listar,
};
