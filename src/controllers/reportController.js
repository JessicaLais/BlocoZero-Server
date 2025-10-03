import * as reportService from "../services/reportService.js"
// Em src/controllers/reportController.js
export const createReport = async (req, res) => {
    try {
        // Lógica original que você tinha antes
        const data = req.body;
        const createdReport = await reportService.createReport(data);
        res.status(201).json({ message: "Relatório criado com sucesso!", report: createdReport });
    } catch(error){
        // ESTE BLOCO VAI NOS DAR A RESPOSTA
        console.error("ERRO AO CRIAR RELATÓRIO:", error); // Adicione este log
        res.status(400).json({ error: error.message });
    }
}
/*
export const createReport = async (req, res) => {
    console.log("----------------- NOVA REQUISIÇÃO -----------------");
    console.log("HEADERS DA REQUISIÇÃO:", req.headers);
    console.log("CORPO DA REQUISIÇÃO (req.body):", req.body);
    console.log("---------------------------------------------------");

    // Validação crucial: O corpo está chegando vazio?
    if (!req.body || Object.keys(req.body).length === 0) {
        console.log("ERRO: O corpo da requisição está vazio!");
        return res.status(400).json({ 
            error: "O servidor não recebeu nenhum dado no corpo da requisição (req.body)." 
        });
    }

    // Se chegou até aqui, o corpo não está vazio.
    res.status(200).json({ 
        message: "Teste do controller bem-sucedido. O servidor recebeu os seguintes dados:",
        data_recebida: req.body 
    });
}

/*export const createReport = async (req, res) => {
    try {
        const data = req.body
        const createReport = await reportService.createReport({data})
        res.status(200).json({response:"sucess"})
    } catch(error){
        res.status(400).json({error:error.message})
    }
}
*/
/*export async function uploadImagem(req, res) {
  try {
    const data = req.body;
    const imagem = req.file ? req.file.filename : null; 

    const relatorio = await relatorioService.uploadImagem(data, imagem);
    res.status(200).json("Relatorio enviado com sucesso");
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}*/



