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
    res.status(201).json({ response: "success" });
  } catch (error) {
    if (file && file.path) {
      fs.unlinkSync(file.path);
    }
    res.status(400).json({ error: error.message });
  }
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
    const { pageNumber, enterprise_id } = req.params;

    const works = await workServices.getWorksPageId({
      pageNumber,
      enterprise_id,
    });

    const worksWithPhotos = works.works.map((work) => {
      if (work.photo) {
        const photoBuffer = Buffer.from(work.photo);
        return {
          ...work,
          photo: photoBuffer.toString("base64"),
        };
      }
      return work;
    });

    res.status(200).json({
      ...works,
      works: worksWithPhotos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar obras." });
  }
};

export const getSpecificWork = async (req, res) => {
  try {
    const { id } = req.params;
    const specificWork = await workServices.getSpecificWork({ id });

    if (!specificWork) {
      return res.status(404).json({ error: "Obra não encontrada." });
    }

    // Corrigido: variável e nome consistente
    let workWithPhoto = specificWork;
    if (specificWork.photo) {
      const photoBuffer = Buffer.from(specificWork.photo);
      workWithPhoto = {
        ...specificWork,
        photo: photoBuffer.toString("base64"),
      };
    }

    res.status(200).json({ work: workWithPhoto });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

export const getAllWorks = async (req, res) => {
  try {
    const { enterprise_id } = req.params;
    const works = await workServices.getAllWorks({ enterprise_id });

    // Corrigido: usar "works.works" se o retorno for paginado
    const worksWithPhotos = works.works.map((work) => {
      if (work.photo) {
        const photoBuffer = Buffer.from(work.photo);
        return {
          ...work,
          photo: photoBuffer.toString("base64"),
        };
      }
      return work;
    });

    res.status(200).json({
      ...works,
      works: worksWithPhotos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar obras." });
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
