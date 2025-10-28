import * as workServices from "../services/workServices.js";
import fs from "fs";

export const createWork = async (req, res) => {
  let file;
  try {
    file = req.file;
    const data = req.body;

    if (!file) {
      throw new Error("Arquivo não enviado");
    }

    const fileBuffer = fs.readFileSync(file.path);
    await workServices.createWork({ data, fileBuffer });

    fs.unlinkSync(file.path);
    res.status(200).json({ response: "success" });
  } catch (error) {
    if (file && file.path) {
      fs.unlinkSync(file.path);
    }
    res.status(400).json({ error: error.message });
  }
};

export const getAllWorks = async (req, res) => {
  const enterprise_id = req.params.enterprise_id;
  const works = await workServices.getAllWorks({ enterprise_id });
  res.status(200).json(works);
};

export const getPhotosByWorkId = async (req, res) => {
  try {
    const id = req.params.id;
    const photo = await workServices.getPhotosByWorkId({ id });
    const photoBuffer = Buffer.from(photo.photo); // converte para Buffer

    res.set("Content-Type", "image/jpeg"); // ou "image/png" conforme sua imagem
    res.send(photoBuffer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getWorksPageId = async (req, res) => {
  try {
    const pageNumber = req.params.pageNumber;
    const enterprise_id = req.params.enterprise_id;
    const works = await workServices.getWorksPageId({
      pageNumber,
      enterprise_id,
    });
    res.status(200).json({ works });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSpecificWork = async (req, res) => {
  try {
    const id = req.params.id;
    const getSpecificWork = await workServices.getSpecificWork({ id });

    res.status(200).json({ getSpecificWork });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateWorkById = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const file = req.file;
    const fileBuffer = fs.readFileSync(file.path);
    const updateWork = await workServices.updateWorkById({
      id,
      data,
      file: fileBuffer,
    });
    fs.unlinkSync(file.path);
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteWorkById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteWork = await workServices.deleteWorkById({ id });
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
