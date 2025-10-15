import prisma from "./connectionModel.js";

export const createWork = async ({ data }) => {
  return await prisma.work.create({
    data: {
      id_enterprise: data.id_enterprise,
      title: data.title,
      cnpj: data.cnpj,
      address: data.address,
      cep: data.cep,
      budget: data.budget,
      start_time: data.start_time,
      end_time: data.end_time,
      description: data.description,
      photo_url: data.photo_url,
    },
  });
};

export const createWorkTender = async ({ work_id, tender_id }) => {
  return await prisma.workTender.create({
    data: {
      id_work: work_id,
      id_tender: tender_id,
    },
  });
};

export const getAllWorks = async ({ enterprise_id }) => {
  return await prisma.work.findMany({
    where: {
      id_enterprise: enterprise_id,
    },
  });
};

export const getAllWorkTender = async ({ tender_id }) => {
  return prisma.workTender.findMany({
    where: {
      id_tender: tender_id,
    },
    include: {
      work: true,
    },
  });
};

export const getSpecificWork = async ({ id }) => {
  return await prisma.work.findUnique({
    where: {
      id_work: id,
    },
    include: {
      workTenders: {
        include: {
          tender: {
            include: {
              user: true, // dados do encarregado
            },
          },
        },
      },
    },
  });
};

export const getRelationWorkAndUser = ({ tender_id, work_id }) => {
  return prisma.workTender.findFirst({
    where: {
      id_tender: tender_id,
      id_work: work_id,
    },
  });
};

export const updateWorkById = ({ data, work_id }) => {
  return prisma.work.update({
    where: {
      id_work: work_id,
    },
    data: {
      id_enterprise: data.id_enterprise,
      title: data.title,
      cnpj: data.cnpj,
      address: data.address,
      cep: data.cep,
      budget: data.budget,
      start_time: data.start_time,
      end_time: data.end_time,
      description: data.description,
      photo_url: data.photo_url,
    },
  });
};

export const deleteWorkById = async ({ work_id }) => {
  return prisma.work.update({
    where: { id_work: work_id },
    data: {
      isActive: false,
    },
  });
};
