const axios = require("axios");
var database = require("../database/config");


async function dadosSlack(modeloFiltro) {
    const token = process.env.SLACK_BOT_TOKEN;
    const channelId = "C09NXDCDJN9";

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
        if (!data.ok) throw new Error(JSON.stringify(data));

        mensagens.push(...data.messages);
        cursor = data.response_metadata?.next_cursor;

    } while (cursor);

    // filtro por modelo
    const filtradas = mensagens.filter(msg => {
        const match = msg.text.match(/Modelo:\s*([^\n]+)/i);
        if (!match) return false;

        const modeloMsg = match[1].trim().toUpperCase();
        const modeloUser = modeloFiltro.toUpperCase();

        return modeloMsg === modeloUser;
    });

    console.log(`Slack retornou ${mensagens.length}; após filtro por ${modeloFiltro}: ${filtradas.length}`);

    return filtradas;
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