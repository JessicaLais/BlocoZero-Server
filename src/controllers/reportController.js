import { createReport } from "../models/reportModel.js"
import * as reportService from "../services/reportService.js"

export const createReport = async (req, res) => {
    try {
        const data = req.body
        const createReport = await reportService.createReport({data})
        res.status(200).json({response:"sucess"})
    } catch(error){
        res.status(400).json({error:error.message})
    }
}

export async function uploadImagem(req, res) {
  try {
    const data = req.body;
    const imagem = req.file ? req.file.filename : null; 

    const relatorio = await relatorioService.uploadImagem(data, imagem);
    res.status(200).json("Relatorio enviado com sucesso");
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
}



