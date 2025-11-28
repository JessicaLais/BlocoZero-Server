import prisma from "./connectionModel.js";

export const createWork = async ({ data, file }) => {
  return await prisma.work.create({
    data: {
      id_entreprise: data.id_entreprise,
      id_manager: data.id_manager,
      id_tender: data.tender_id,
      title: data.title,
      cnpj: data.cnpj,
      address: data.address,
      cep: data.cep,
      budget: data.budget,
      start_time: data.start_time,
      end_time: data.end_time,
      describe: data.description,
      photo: file,
      isActive: true,
    },
  });
};

export const getAllWorks = async ({ enterprise_id }) => {
  return prisma.work.findMany({
    where: {
      id_entreprise: enterprise_id,
    },
  });
};

export const getPhotosByWorkId = async ({ id }) => {
  return prisma.work.findUnique({
    where: {
      id_work: id,
    },
    select: {
      photo: true,
    },
  });
};

export const getSpecificWork = async ({ id }) => {
  return await prisma.work.findUnique({
    where: {
      id_work: id,
    },
  });
};

export const updateWorkById = ({ data, work_id, file }) => {
  return prisma.work.update({
    where: {
      id_work: work_id,
    },
    data: {
      id_entreprise: data.id_entreprise,
      id_manager: data.id_manager,
      id_tender: data.id_tender,
      title: data.title,
      cnpj: data.cnpj,
      address: data.address,
      cep: data.cep,
      budget: data.budget,
      start_time: data.start_time,
      end_time: data.end_time,
      describe: data.describe,
      photo: file,
      isActive: true,
    },
  });
};

export const deleteWorkById = async ({ id }) => {
  return prisma.work.update({
    where: { id_work: id },
    data: {
      isActive: false,
    },
  });
};
