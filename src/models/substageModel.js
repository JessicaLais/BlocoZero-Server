import prisma from "./connectionModel.js";

export const findSubstageByName = async ({ name }) => {
  return await prisma.substage.findFirst({
    where: { name: name },
  });
};

export const createSubstage = async ({ data }) => {
  return await prisma.substage.create({
    data: {
      name: data.name,
      expDuration: data.expDuration,
      progress: data.progress,
    },
  });
};

export const createRelationSubstageWithStage = async ({
  id_stage,
  id_substage,
}) => {
  return await prisma.stageSubstage.create({
    data: {
      stage: {
        connect: { id_stage: id_stage },
      },
      substage: {
        connect: { id_substage: id_substage },
      },
    },
  });
};

export const createRelationSubstageWithUser = async ({
  id_substage,
  id_user,
}) => {
  return await prisma.substageEmploye.create({
    data: {
      substage: {
        connect: {
          id_substage: id_substage,
        },
      },
      user: {
        connect: {
          id_user: id_user,
        },
      },
    },
    include: {
      user: true,
    },
  });
};

export const createRelationSubstageWithItem = async ({
  id_substage,
  id_stock,
  quantity,
}) => {
  return await prisma.substageStock.create({
    data: {
      substage: {
        connect: { id_substage },
      },
      materialStock: {
        connect: { id_stock }, // <-- nome do relation field correto
      },
      quantityUsed: quantity,
    },
  });
};

export const getSubstageById = async ({ id }) => {
  return await prisma.substage.findFirst({
    where: {
      id_substage: id,
    },
  });
};

export const allSubstagesByStageId = async ({ id }) => {
  return await prisma.stageSubstage.findMany({
    where: {
      stageId: id,
    },
    include: {
      substage: true,
    },
  });
};

export const updateSubstage = async ({ data, id }) => {
  return await prisma.substage.update({
    where: {
      id_substage: id,
    },
    data: {
      name: data.name,
      expDuration: data.expDuration,
      progress: data.progress,
    },
  });
};

export const deleteSubstage = async ({ id }) => {
  return await prisma.substage.delete({
    where: {
      id_substage: id,
    },
  });
};
