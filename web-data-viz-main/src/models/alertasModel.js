const axios = require("axios");
const JIRA_BASE_URL = "https://cortexsptech.atlassian.net";
const JIRA_EMAIL = "cortexsptech@gmail.com";
const JIRA_API_TOKEN =
    "ATATT3xFfGF0JcXq9KwvyMr5OGnI9q1yhsctTTDijkp33MFOMhbV3FBYMJf7Z24X464Vg9t6lZxlFt6iW9G9CNtkvuVs0KRgSoVPD4f-DMs8EqhIpbdcOU7WW49psWmuWwsjQk1COR8oHqqmDks_y20EsROhIRCcIJ1bAjOjg1eWVK3sLu2HPZw=4752F0D9";
const JIRA_AUTH_HEADER = `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString("base64")}`;

async function dadosJira(key) {
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
            "customfield_10004"
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
        return response.data.issues.map(issue => ({
            fields: issue.fields,
            changelog: issue.changelog
        })) || [];
    } catch (error) {
        console.error("Erro na integração com o Jira:", error.response?.data || error.message);
        throw new Error("Falha ao buscar tickets na API do Jira.");
    }
}

// Helpers para integração com Slack
async function encontrarChannelId(channelName, token) {
    if (!channelName) return null;
    const name = channelName.replace(/^#/, '');
    const url = 'https://slack.com/api/conversations.list?limit=1000&types=public_channel,private_channel';
    const resp = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!resp.data || !resp.data.ok) return null;
    const channel = (resp.data.channels || []).find(c => c.name === name || c.name_normalized === name);
    return channel ? channel.id : null;
}

async function dadosSlack(channelName = "alertas") {
    const token = process.env.SLACK_BOT_TOKEN;
    if (!token) throw new Error("SLACK_BOT_TOKEN não configurado");

    // busca o canal
    const channelId = await encontrarChannelId(channelName, token);
    if (!channelId) {
        throw new Error(`Canal Slack '${channelName}' não encontrado`);
    }

    // busca mensagens 
    const mensagens = [];
    let cursor = null;
    do {
        const params = new URLSearchParams({
            channel: channelId,
            limit: "200"
        });
        if (cursor) params.append("cursor", cursor);
        const resp = await fetch(`https://slack.com/api/conversations.history?${params}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = await resp.json();
        if (!data.ok) {
            throw new Error(`Erro Slack: ${JSON.stringify(data)}`);
        }
        mensagens.push(...data.messages);
        cursor = data.response_metadata?.next_cursor;
    } while (cursor && cursor.length > 0);
    return mensagens;
}

async function alertasPorCategoria(req, res) {
    try {
        const { modelo } = req.query;
        const mensagens = await dadosSlack(modelo);
        const categorias = ["cpu", "ram", "disco", "gpu"];

        const resultado = {
            cpu: 0,
            ram: 0,
            disco: 0,
            gpu: 0
        };

        mensagens.forEach(msg => {
            const texto = msg.text.toLowerCase();
            categorias.forEach(cat => {
                if (texto.includes(cat)) resultado[cat]++;
            });
        });

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar alertas por categoria" });
    }
}

async function alertasPorIntervalo(req, res) {
    try {
        const { modelo } = req.query;
        const mensagens = await pegarMensagensSlackSimples(modelo);
        const intervalos = {};

        mensagens.forEach(msg => {
            const dt = new Date(msg.timestamp * 1000);
            const hora = dt.getHours().toString().padStart(2, "0");
            const minuto = dt.getMinutes();
            const faixa = minuto < 30 ? `${hora}:00` : `${hora}:30`;

            if (!intervalos[faixa]) intervalos[faixa] = 0;
            intervalos[faixa]++;
        });

        res.json(intervalos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar alertas por intervalo" });
    }
}

function buscarModelos(idmodelo) {
    console.log(`Model: Listando modelos para a empresa: ${idmodelo}.`);
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
    dadosJira,
    encontrarChannelId,
    dadosSlack,
    alertasPorCategoria,
    alertasPorIntervalo,
    buscarModelos
};