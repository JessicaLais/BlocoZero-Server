//Models
import * as workModel from "../models/worksModel.js";
import { findTenderById } from "../models/usersModel.js";
//POO
import Work from "../entitys/workEntity.js";
import User from "../entitys/userEntity.js";

//CREATE WORK
export const createWork = async (data) => {
  const work = new Work(data);
  const searchTender = await findTenderById({ user_id: data.tender_id });
  if (!searchTender) {
    return await workModel.createWork({ data: work });
  }

  const newCreateWork = await workModel.createWork({ data: work });
  return await workModel.createWorkTender({
    work_id: newCreateWork.id_work,
    tender_id: searchTender.id,
  });
};

// GET ALL WORKES
export const getAllWorks = async ({ enterprise_id }) => {
  enterprise_id = Number(enterprise_id);
  const works = await workModel.getAllWorks({ enterprise_id });
  return works.slice(0, 3).map((item) => new Work(item).smallInformation());
};

//Get workes by number page
export const getWorksPageId = async ({ pageNumber, enterprise_id }) => {
  enterprise_id = Number(enterprise_id);
  const works = await workModel.getAllWorks({ enterprise_id });

  const limit = 3;
  const startIndex = (Number(pageNumber) - 1) * limit;
  const endIndex = startIndex + limit;

  return works
    .slice(startIndex, endIndex)
    .map((item) => new Work(item).smallInformation());
};

//Get all works tender
export const getAllWorkTender = async ({ tender_Id }) => {
  tender_Id = Number(tender_Id);
  const searchTender = await findTenderById({ user_id: tender_Id });
  if (!searchTender) {
    throw new Error("Tender not found");
  }
  const works = await workModel.getAllWorkTender({
    tender_id: searchTender.id,
  });
  return works
    .slice(0, 3)
    .map((work) => new Work(work.work).smallInformation());
};

export const getWorksTenderPageId = async ({ pageNumber, tender_Id }) => {
  tender_Id = Number(tender_Id);
  const searchTender = await findTenderById({ user_id: tender_Id });
  if (!searchTender) {
    throw new Error("Tender not found");
  }
  const works = await workModel.getAllWorkTender({
    tender_id: searchTender.id,
  });

  const limit = 3;
  const startIndex = (Number(pageNumber) - 1) * limit;
  const endIndex = startIndex + limit;

  return works
    .slice(startIndex, endIndex)
    .map((item) => new Work(item.work).smallInformation());
};

//GET SPECIFIC WORK BY USER ID
export const getSpecificWork = async ({ id }) => {
  const getSpecificWork = await workModel.getSpecificWork({ id: Number(id) });
  if (!getSpecificWork) {
    throw new Error("No work found with this id");
  }
  const work = new Work(getSpecificWork);

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
