const axios = require("axios");
var database = require("../database/config");

async function dadosSlack(channelName = "alertas") {
    const token = process.env.SLACK_BOT_TOKEN;
    if (!token) throw new Error("SLACK_BOT_TOKEN não configurado");

    // busca o canal passando o nome recebido (channelName)
    const channelId = 'C09NXDCDJN9'
    if (!channelId) {
        console.warn(`Canal Slack '${channelName}' não encontrado; retornando lista vazia`);
        return [];
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

function listarModelosParaUsuario(fk_usuario, fk_empresa) {
    var instrucaoSql = `
    SELECT DISTINCT
        m.id_modelo AS id, m.hostname, m.nome
    FROM
        modelo m
    INNER JOIN
        cliente c ON m.fk_cliente = c.id_cliente
    WHERE
        c.fk_empresa = ${fk_empresa}
    AND (
        m.fk_zona_disponibilidade IS NULL
        OR m.fk_zona_disponibilidade IN (
            SELECT az.fk_zona FROM acesso_zona az WHERE az.fk_usuario = ${fk_usuario}
        )
    );
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    dadosSlack,
    listarModelosParaUsuario,
}