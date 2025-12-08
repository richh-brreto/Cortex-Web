

const axios = require("axios");

async function buscarTodosTickets() {
    console.log(`[MODEL] Buscando todos os tickets abertos...`);


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