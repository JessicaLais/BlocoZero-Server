import * as workServices from "../services/workServices.js";
import fs from "fs";

export const createWork = async (req, res) => {
  try {
    const file = req.file;
    const data = req.body;
    const fileBuffer = fs.readFileSync(file.path);
    const createWork = await workServices.createWork({ data, fileBuffer });
    fs.unlinkSync(file.path); // Remove o arquivo temporário após a leitura
    res.status(200).json({ response: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllWorks = async (req, res) => {
  const enterprise_id = req.params.enterprise_id;
  const works = await workServices.getAllWorks({ enterprise_id });
  res.status(200).json(works);
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

export const getAllWorkTender = async (req, res) => {
  try {
    const tender_Id = req.params.tender_id;
    const works = await workServices.getAllWorkTender({
      tender_Id,
    });
    res.status(200).json({ works });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getWorksTenderPageId = async (req, res) => {
  try {
    const pageNumber = req.params.pageNumber;
    const tender_Id = req.params.tender_id;
    const works = await workServices.getWorksTenderPageId({
      pageNumber,
      tender_Id,
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
    const work_id = req.params.id;
    const data = req.body;
    const updateWork = await workServices.updateWorkById({ work_id, data });
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteWorkById = async (req, res) => {
  try {
    const work_id = req.params.id;
    const deleteWork = await workServices.deleteWorkById({ work_id });
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
