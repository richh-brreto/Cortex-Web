

const axios = require("axios");

var database = require("../database/config");
const url = process.env.JIRA_BASE_URL
const email = process.env.JIRA_EMAIL
const token = process.env.JIRA_API_TOKEN
const JIRA_AUTH_HEADER = `Basic ${Buffer.from(`${email}:${token}`).toString("base64")}`;

async function jiraInfos(key) {
    console.log(`[MODEL] Buscando todos os tickets abertos...`);

    const jql = `key = ${key}`;
    
    const body = {
        jql,
        expand: "changelog",
        fields: [
            "customfield_10060", // maquina
            "labels",
            "assignee",
            "status",
            "created",
            "customfield_10093", // identificador
            "customfield_10059",  // problema ou incidente
            "priority",
            "customfield_10004" // impacto
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
             changelog : issue.changelog})) || [];

    } catch (error) {
        console.error("Erro na integração com o Jira:", error.response?.data || error.message);
        throw new Error("Falha ao buscar tickets na API do Jira.");
    }
}

function bancoInfos(idmodelo) {
    console.log(`Model: Listando modelos para a empresa: ${idmodelo}. ACESSEI O MODELO MODEL`);

    var instrucaoSql = `
        SELECT
			m.id_modelo as idModelo, m.nome as nomeModelo, m.descricao, m.nome_processo, m.ip, m.hostname, 
            z.nome as zona, m.qtd_disco, m.tempo_parametro_min as tempo, m.limite_cpu as limCpu, m.limite_ram as limRam, 
            m.limite_gpu as limGpu, m.limite_disco as limDisco, a.nome as arquitetura, a.so, a.modelo_cpu, a.modelo_gpu, 
            a.qtd_cpu, a.qtd_ram, a.maxDisco
		FROM 
			modelo m 
		INNER JOIN 
			zonadisponibilidade z 
		ON 
			m.fk_zona_disponibilidade = z.id_zona 
		INNER JOIN 
			arquitetura a 
		ON 
			m.fk_arquitetura = a.id_arquitetura 
		WHERE 
			m.id_modelo = ${idmodelo};

    `;
    
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

module.exports = {
    jiraInfos,
    bancoInfos
};