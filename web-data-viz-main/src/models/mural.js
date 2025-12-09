const axios = require("axios");
const url = process.env.JIRA_BASE_URL || process.env.JIRA_URL;
const email = process.env.JIRA_EMAIL;
const token = process.env.JIRA_API_TOKEN;
const JIRA_AUTH_HEADER = `Basic ${Buffer.from(`${email}:${token}`).toString(
  "base64"
)}`;
async function buscarTodosTickets() {
  const jql = 'project = "CTX" AND status = "1" ORDER BY created DESC';

  const body = {
    jql,
    fields: [
      "summary",
      "customfield_10060", // maquina
      "labels",
      "assignee",
      "status",
      "customfield_10093",
    ],
  };

  try {
    const response = await axios.post(`${url}/rest/api/3/search/jql`, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: JIRA_AUTH_HEADER,
      },
    });

    return (
      response.data.issues.map((issue) => ({
        fields: issue.fields,
        key: issue.key,
      })) || []
    );
  } catch (error) {
    throw new Error("Falha ao buscar tickets na API do Jira.");
  }
}

module.exports = {
  buscarTodosTickets,
};
