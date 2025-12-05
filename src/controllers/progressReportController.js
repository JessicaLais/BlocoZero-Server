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
