// src/controllers/jiraController.js

const jiraModel = require("../models/mural");

async function listarTodosAlertas(req, res) {
    // 1. Não precisa mais do idEmpresa ou da lógica de buscar nome
    try {
        // 2. Chama a nova função do Model para buscar todos os tickets
        const tickets = await jiraModel.buscarTodosTickets();

        // 3. Envia a resposta UMA ÚNICA VEZ
        if (tickets.length > 0) {
            console.log(`[CONTROLLER] Total de tickets encontrados: ${tickets.length}`);
            return res.status(200).json(tickets);
        } else {
            // Sucesso, mas sem conteúdo
            return res.status(204).send(); 
        }

    } catch (erro) {
        console.error(`[CONTROLLER] Erro ao listar alertas: ${erro.message}`);
        // 4. Em caso de erro, retorna um status 500
        return res.status(500).json({ erro: "Erro interno do servidor ao processar a requisição." });
    }
}

module.exports = {
    listarTodosAlertas,
};