import * as progressReportService from "../services/progressReportService.js";
import fs from "fs";

export const createNewProgressReport = async (req, res) => {
  let file;
  try {
    file = req.file;
    const data = req.body;

    if (!file) {
      throw new Error("Arquivo não enviado");
    }

    const fileBuffer = fs.readFileSync(file.path);

    const createReport = await progressReportService.createNewProgressReport({
      data,
      photo: fileBuffer,
    });

    fs.unlinkSync(file.path);
    res.status(201).json({ message: "sucess" });
  } catch (err) {
    fs.unlinkSync(file.path);
    res.status(400).json({ error: err.message });
  }
};

export const listAllProgressReportByWorkId = async (req, res) => {
  try {
    const id = req.params.id;
    const listProgressReport =
      await progressReportService.listAllProgressReportByWorkId({ id });

    const progressReports = listProgressReport.map((progressReport) => ({
      ...progressReport,
      photo: progressReport.photo
        ? Buffer.from(progressReport.photo).toString("base64")
        : null,
    }));

    res.status(200).json({ progressReports });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
export const updateReportEmployee = async (req, res) => {
  let file = req.file;
  try {
    const { id } = req.params;
    const data = req.body;
    let photoBuffer = null;
    if (file) {
      photoBuffer = fs.readFileSync(file.path);
    }
    const updatedReport = await progressReportService.updateReportByEmployee({
      id_report: id,
      id_user: data.id_user,
      data: data,
      photo: photoBuffer
    });
    if (file) {
      fs.unlinkSync(file.path);
    }
    res.status(200).json({ message: "Relatório atualizado com sucesso", updatedReport });
  } catch (err) {
    if (file && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    res.status(400).json({ error: err.message });
  }
};
export const reviewReportManager = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    
    const result = await progressReportService.managerReviewReport({id, data});
    res.status(200).json({ message: "Avaliação registrada com sucesso" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
