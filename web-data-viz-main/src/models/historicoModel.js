

const axios = require("axios");

const url = process.env.JIRA_BASE_URL || process.env.JIRA_URL;
const email = process.env.JIRA_EMAIL
const token = process.env.JIRA_API_TOKEN
const JIRA_AUTH_HEADER = `Basic ${Buffer.from(`${email}:${token}`).toString("base64")}`;

var database = require("../database/config");


async function buscarTicketsHistorico() {

    const jql = 'project = "CTX" ORDER BY created DESC';
    
    const body = {
        jql,
        fields: [
            "customfield_10060", // maquina
            "labels",
            "assignee",
            "status",
            "created",
            "customfield_10093", // identificador
            "customfield_10059"  // problema ou incidente
        ],
    };
    try {
        const response = await axios.post(
            `${url}/rest/api/3/search/jql`,
            body,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: JIRA_AUTH_HEADER,
                },
            }
        );
        return response.data.issues.map(issue =>({fields : issue.fields, 
            key: issue.key})) || [];

    } catch (error) {
        throw new Error("Falha ao buscar tickets na API do Jira.");
    }
}

function bancoInfos(idmodelo) {

    var instrucaoSql = `
        SELECT 
            m.nome, m.hostname 
        FROM 
            modelo m 
        WHERE 
            m.id_modelo = ${idmodelo};

    `;
    
    return database.executar(instrucaoSql); 
}

module.exports = {
    buscarTicketsHistorico,
    bancoInfos
};