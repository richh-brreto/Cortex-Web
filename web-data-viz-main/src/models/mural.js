// src/models/jiraModel.js

const axios = require("axios");

// TODO: Substitua estas variáveis pelos seus dados reais
//const JIRA_BASE_URL = "https://cortexsptech.atlassian.net";
//const JIRA_EMAIL = "cortexsptech@gmail.com";

//const JIRA_AUTH_HEADER = `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64")}`;

/**
 * Função para buscar TODOS os tickets abertos do projeto CTX.
 * @returns {Promise<Array<Object>>} Uma promessa que resolve para todos os tickets.
 */
async function buscarTodosTickets() {
    console.log(`[MODEL] Buscando todos os tickets abertos...`);

    // JQL: Puxa todas as issues do projeto "CTX" com status "Aberto"
    const jql = 'project = "CTX" AND status = "1" ORDER BY created DESC';
    
    const body = {
        jql,
        fields: [
            "summary",
            "customfield_10060", // maquina
            "labels",
            "assignee",
            "status",
            "customfield_10093"
        ],
    };

    try {
        const response = await axios.post(
            `${JIRA_BASE_URL}/rest/api/3/search/jql`,
            body,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: JIRA_AUTH_HEADER,
                },
            }
        );

        // Retorna diretamente os campos (fields) de todas as issues
        return response.data.issues.map(issue =>({fields : issue.fields, 
            key: issue.key})) || [];

    } catch (error) {
        console.error("Erro na integração com o Jira:", error.response?.data || error.message);
        throw new Error("Falha ao buscar tickets na API do Jira.");
    }
}

module.exports = {
    buscarTodosTickets,
};