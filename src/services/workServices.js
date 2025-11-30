//Models
import * as workModel from "../models/worksModel.js";

import { findEntrepriseById } from "../models/enterpriseModel.js";
import { getUserId } from "../models/usersModel.js";
//POO
import Work from "../entitys/workEntity.js";

const limit = 5;

//CREATE WORK
export const createWork = async ({ data, fileBuffer }) => {
  const searchEnterprise = await findEntrepriseById({
    id: Number(data["id_entreprise"]),
  });
  if (!searchEnterprise) {
    throw new Error("Enterprise not found or not exist");
  }
  const id = Number(data["id_manager"]);

  const searchManager = await getUserId({ id: Number(data["id_manager"]) });

  if (searchManager.userFunction !== "manager") {
    throw new Error("User is not a manager");
  }
  const searchTender = await getUserId({ id: Number(data["tender_id"]) });

  if (searchTender.userFunction !== "tender") {
    throw new Error("User is not a tender");
  }

  const work = new Work(data);

  return await workModel.createWork({ data: work, file: fileBuffer });
};

// GET ALL WORKES
export const getAllWorks = async ({ enterprise_id }) => {
  enterprise_id = Number(enterprise_id);

  const allWorks = await workModel.getAllWorks({ enterprise_id });

  const works = allWorks
    .slice(0, limit)
    .map((item) => new Work(item).smallInformation());
  if (allWorks.length > limit) {
    return {
      works,
      page: "1 of " + Math.ceil(allWorks.length / limit),
    };
  }
  return { works, page: "1 of 1" };
};

export const getWorkById = async ({ id }) => {
  const searchWorkById = await workModel.getSpecificWork({ id });

  if (!searchWorkById) throw new Error("Work not found");

  return new Work(searchWorkById);
};

export const getPhotosByWorkId = async ({ id }) => {
  id = Number(id);
  const photo = await workModel.getPhotosByWorkId({ id });
  if (!photo) {
    throw new Error("Photo not found");
  }

  return photo;
};

//Get workes by number page
export const getWorksPageId = async ({ pageNumber, enterprise_id }) => {
  enterprise_id = Number(enterprise_id);
  const limit = 10; // defina ou use variável global, se já existir
  const startIndex = (Number(pageNumber) - 1) * limit;
  const endIndex = startIndex + limit;

  const allWorks = await workModel.getAllWorks({ enterprise_id });

  // Validação de página
  if (
    Math.ceil(allWorks.length / limit) < Number(pageNumber) ||
    Number(pageNumber) < 1
  ) {
    throw new Error("Page number not exist");
  }

  // Pega as obras da página e adiciona fotos em base64
  const works = await Promise.all(
    allWorks.slice(startIndex, endIndex).map(async (item) => {
      const work = new Work(item).smallInformation();

      // Busca fotos
      const photoData = await workModel.getPhotosByWorkId({ id: item.id_work });

      if (photoData && photoData.photo) {
        work.photo = photoData.photo;
      } else {
        work.photo = null;
      }

      return work;
    })
  );

  return {
    works,
    page: `${pageNumber} of ${Math.ceil(allWorks.length / limit)}`,
  };
};

//GET SPECIFIC WORK BY USER ID
export const getSpecificWork = async ({ id }) => {
  const getSpecificWork = await workModel.getSpecificWork({ id: Number(id) });
  if (!getSpecificWork) {
    throw new Error("No work found with this id");
  }

  return new Work(getSpecificWork);
};

//Update work using work id and create relationship with work and tender, if it does not exist
export const updateWorkById = async ({ id, data, file }) => {
  id = Number(id);
  const findWorkById = await workModel.getSpecificWork({ id });
  if (!findWorkById) {
    throw new Error("Work not found");
  }
  const searchManager = await getUserId({ id: Number(data["id_manager"]) });

  if (searchManager.userFunction !== "manager") {
    throw new Error("User is not a manager");
  }
  const searchTender = await getUserId({ id: Number(data["id_tender"]) });
  if (searchTender.userFunction !== "tender") {
    throw new Error("User is not a tender");
  }

  const work = new Work(data);
  return workModel.updateWorkById({ data: work, work_id: id, file });
};

//Delete work by id (disable)
export const deleteWorkById = async ({ id }) => {
  id = Number(id);
  const findWorkById = await workModel.getSpecificWork({ id });
  if (!findWorkById) {
    throw new Error("Work not found");
  }
  return await workModel.deleteWorkById({ id });
};
