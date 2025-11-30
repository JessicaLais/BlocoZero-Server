import prisma from "./connectionModel.js";

export const findStageByName = async ({ name }) => {
  return await prisma.stage.findFirst({
    where: {
      name: name,
    },
  });
};

export const createStage = async ({ data }) => {
  return await prisma.stage.create({
    data: {
      name: data.name,
      progress: data.progress,
      expStartDate: data.expStartDate,
      expEndDate: data.expEndDate,
      exeStartDate: data.exeStartDate,
      exeEndDate: data.exeEndDate,
    },
  });
};

export const createRelationStageWithWork = async ({ id_stage, id_work }) => {
  return await prisma.workStage.create({
    data: {
      work: {
        connect: { id_work: id_work },
      },
      stage: {
        connect: { id_stage: id_stage },
      },
    },
  });
};

export const listAllStageByWorkId = async ({ id_work }) => {
  return await prisma.workStage.findMany({
    where: {
      workId: id_work,
    },
    include: {
      stage: true,
    },
  });
};

export const stageByid = async ({ id }) => {
  return await prisma.stage.findFirst({
    where: {
      id_stage: id,
    },
  });
};

export const updateStageById = async ({ id_stage, data }) => {
  return await prisma.stage.update({
    where: {
      id_stage,
    },
    data: {
      name: data.name,
      progress: data.progress,
      expStartDate: data.exp_start,
      expEndDate: data.exp_end,
      exeStartDate: data.exe_start,
      exeEndDate: data.exe_end,
    },
  });
};

export const deleteStageById = async ({ id_stage }) => {
  const deleteRelation = await prisma.workStage.deleteMany({
    where: { stageId: id_stage },
  });

  return await prisma.stage.deleteMany({
    where: { id_stage: id_stage },
  });
};

export const allStages = async () => {
  return await prisma.stage.findMany();
};

export const updateStage = async ({ data, id }) => {
  return await prisma.stage.update({
    where: {
      id_stage: id,
    },
    data: {
      name: data.name,
      progress: data.progress,
      expStartDate: data.expStartDate,
      expEndDate: data.expEndDate,
      exeStartDate: data.exeStartDate,
      exeEndDate: data.exeEndDate,
    },
  });
};

export const deleteStage = async ({ id }) => {
  return await prisma.stage.delete({
    where: {
      id_stage: id,
    },
  });
};

export const getStageById = async ({ id }) => {
  return await prisma.stage.findUnique({
    where: {
      id_stage: id,
    },
    include: {},
  });
};
