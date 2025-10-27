import prisma from "./connectionModel.js";

export const findStageByNameAndSubstage = async ({ name, substage }) => {
  return await prisma.stage.findFirst({
    where: {
      name: name,
      substage: substage,
    }
  });
};

export const createStage = async ({ data }) => {
  return await prisma.stage.create({
    data: {
      name: data.name,
      substage: data.substage,
      progress: data.progress,
      expStartDate: data.expStartDate,
      expEndDate: data.expEndDate,
      exeStartDate: data.exeStartDate,
      exeEndDate: data.exeEndDate,
    }
  });
};


export const allStages = async () => {
  return await prisma.stage.findMany(); 
};

export const updateStage = async ({ data, id }) => {
  return await prisma.stage.update({
    where: {
      id_stage: id
    },
    data: {
      name: data.name,
      substage: data.substage,
      progress: data.progress,
      expStartDate: data.expStartDate,
      expEndDate: data.expEndDate,
      exeStartDate: data.exeStartDate,
      exeEndDate: data.exeEndDate
    }
  });
};

export const deleteStage = async ({ id }) => {
  return await prisma.stage.delete({
    where: { 
      id_stage: id, 
    }
  });
};

export const getStageById = async ({ id }) => {
  return await prisma.stage.findUnique({
    where: { 
      id_stage: id, 
    },
    include: {
      // você pode incluir as conexões (ex: PhysicalSchedule) aqui se precisar
    }
  });
};