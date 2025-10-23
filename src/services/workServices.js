//Models
import * as workModel from "../models/worksModel.js";

import { findEntrepriseById } from "../models/enterpriseModel.js";
import { getUserId } from "../models/usersModel.js";
//POO
import Work from "../entitys/workEntity.js";
import User from "../entitys/userEntity.js";

const limit = 5;

//CREATE WORK
export const createWork = async ({ data, fileBuffer }) => {
  const searchEnterprise = await findEntrepriseById({
    id: Number(data["id_entreprise"]),
  });

  if (!searchEnterprise) {
    throw new Error("Enterprise not found or not exist");
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

  console.log(work);

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

//Get workes by number page
export const getWorksPageId = async ({ pageNumber, enterprise_id }) => {
  enterprise_id = Number(enterprise_id);
  const startIndex = (Number(pageNumber) - 1) * limit;
  const endIndex = startIndex + limit;
  const allWorks = await workModel.getAllWorks({ enterprise_id });
  const works = allWorks
    .slice(startIndex, endIndex)
    .map((work) => new Work(work).smallInformation());
  if (
    Math.ceil(allWorks.length / limit) < Number(pageNumber) ||
    Number(pageNumber) < 1
  ) {
    throw new Error("Page number not exist");
  }

  return {
    works,
    page: pageNumber + " of " + Math.ceil(allWorks.length / limit),
  };
};

//Get all works tender
export const getAllWorkTender = async ({ tender_Id }) => {
  tender_Id = Number(tender_Id);
  const searchTender = await findTenderById({ user_id: tender_Id });
  if (!searchTender) {
    throw new Error("Tender not found");
  }
  const allWorks = await workModel.getAllWorkTender({
    tender_id: searchTender.id,
  });
  const works = allWorks
    .slice(0, limit)
    .map((work) => new Work(work.work).smallInformation());

  if (allWorks.length > limit) {
    return {
      works,
      page: "1 of " + Math.ceil(allWorks.length / limit),
    };
  }

  return { works, page: "1 of 1" };
};

export const getWorksTenderPageId = async ({ pageNumber, tender_Id }) => {
  tender_Id = Number(tender_Id);
  const searchTender = await findTenderById({ user_id: tender_Id });
  if (!searchTender) {
    throw new Error("Tender not found");
  }
  const allWorks = await workModel.getAllWorkTender({
    tender_id: searchTender.id,
  });

  if (
    Math.ceil(allWorks.length / limit) < Number(pageNumber) ||
    Number(pageNumber) < 1
  ) {
    throw new Error("Page number not exist");
  }
  const startIndex = (Number(pageNumber) - 1) * limit;
  const endIndex = startIndex + limit;
  const works = allWorks
    .slice(startIndex, endIndex)
    .map((work) => new Work(work.work).smallInformation());

  return {
    works,
    page: pageNumber + " of " + Math.ceil(allWorks.length / limit),
  };
};

//GET SPECIFIC WORK BY USER ID
export const getSpecificWork = async ({ id }) => {
  const getSpecificWork = await workModel.getSpecificWork({ id: Number(id) });
  if (!getSpecificWork) {
    throw new Error("No work found with this id");
  }
  const work = new Work(getSpecificWork);
  const employees = await allUsers({ enterprise_id: work.enterprise_id });

  work.employees = employees.length;

  return {
    work: work,
    tenders: getSpecificWork.workTenders.map((tenders) => {
      const tenderUser = new User(tenders.tender.user).toPublicJson();
      return tenderUser;
    }),
  };
};

//Update work using work id and create relationship with work and tender, if it does not exist
export const updateWorkById = async ({ work_id, data }) => {
  work_id = Number(work_id);
  const findWorkById = await workModel.getSpecificWork({ id: work_id });
  if (!findWorkById) {
    throw new Error("Work not found");
  }

  const work = new Work(data);
  const updateWork = await workModel.updateWorkById({ data: work, work_id });
  const searchTender = await findTenderById({ user_id: data.tender_id });
  if (!searchTender) {
    return;
  }

  const verifyRelation = await workModel.getRelationWorkAndUser({
    tender_id: searchTender.id,
    work_id: work_id,
  });
  if (verifyRelation) {
    return;
  }
  return await workModel.createWorkTender({
    work_id: work_id,
    tender_id: searchTender.id,
  });
};

//Delete work by id (disable)
export const deleteWorkById = async ({ work_id }) => {
  work_id = Number(work_id);
  const findWorkById = await workModel.getSpecificWork({ id: work_id });
  if (!findWorkById) {
    throw new Error("Work not found");
  }
  return await workModel.deleteWorkById({ work_id });
};
