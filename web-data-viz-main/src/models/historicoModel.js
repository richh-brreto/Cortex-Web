

const axios = require("axios");


const JIRA_BASE_URL="https://cortexsptech.atlassian.net";
const JIRA_EMAIL="cortexsptech@gmail.com";
const JIRA_API_TOKEN="ATATT3xFfGF0ed2_1_3-kTBPO5vHSW_KC-Zdb1O0r1Ft3hoLQvTcZWdmhQEho3_liRdu0kao0kPs1Z5YtxwyeXMMeb1vdt0L44i-8E7uLm0DjwmYFnmRuxf32W53sFcLA23aXP0UKwuaYrwMliHv8402BLs2ZoIYTculT1fnmP_xZ0vw4h-PRJY=921F878C"
const JIRA_AUTH_HEADER = `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64")}`;
var database = require("../database/config");


async function buscarTicketsHistorico() {
    console.log(`[MODEL] Buscando todos os tickets abertos...`);

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

function bancoInfos(idmodelo) {
    console.log(`Model: Listando modelos para a empresa: ${idmodelo}. ACESSEI O MODELO MODEL`);

    var instrucaoSql = `
        SELECT 
            m.nome, m.hostname 
        FROM 
            modelo m 
        WHERE 
            m.id_modelo = ${idmodelo};

    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

module.exports = {
    buscarTicketsHistorico,
    bancoInfos
};