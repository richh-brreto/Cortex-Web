export async function iaMichel(req, res) {
    try {
        const { pergunta, dados } = req.body;
        const dadosTexto = JSON.stringify(dados);

        const prompt = `
        Você é um Especialista em Capacity Planning do sistema Cortex.
        
        DADOS HISTÓRICOS (Últimos 3 meses e detalhes atuais):
        ${dadosTexto}

        SOLICITAÇÃO DO USUÁRIO:
        "${pergunta}"

        DIRETRIZES DE ANÁLISE:
        1. ANÁLISE DE TENDÊNCIA: Olhe os arrays 'evolucaoCPU' e 'evolucaoRAM'.
           - Se houver zeros (0) no histórico, ignore-os ou trate como "sem dados anteriores".
           - Se subir mês a mês, alerte upgrade.
        
        2. ANÁLISE DE DETALHE: Cite picos específicos do 'detalhesUltimoMes'.

        3. FORMATAÇÃO DE DADOS (CRUCIAL):
           - Se encontrar valores decimais entre 0 e 1 (ex: 0.92, 0.814), multiplique por 100 e exiba com "%" (ex: 92%, 81.4%).
           - Nunca exiba números como "0.92" no texto final.

        4. RESPOSTA:
           - Seja direto, profissional e use no máximo 1 parágrafo.
        `;

        // Configura o modelo
        const model = chatIA.getGenerativeModel({ model: "gemini-2.5-flash" });


        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("Resposta IA:", text);
        res.json({ resultado: text });
    } catch (error) {
        console.error("Erro no Gemini:", error);
        res.status(500).json({ erro: "Erro ao processar a solicitação." });
    }
}