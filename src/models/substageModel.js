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

export const createRelationSubstageWithStage = async ({ id_stage, id_substage }) => {
  return await prisma.stageSubstage.create({
    data: {
      stage: { connect: { id_stage: id_stage } },
      substage: { connect: { id_substage: id_substage } },
    },
  });
};

export const createRelationSubstageWithUser = async ({ id_substage, id_user, hours_worked, userfunction }) => {
  return await prisma.substageEmploye.create({
    data: {
      hours: hours_worked,
      userFunction: userfunction,
      substage: { connect: { id_substage: id_substage } },
      user: { connect: { id_user: id_user } },
    },
    include: { user: true },
  });
};

export const createRelationSubstageWithItem = async ({ id_substage, id_stock, quantity }) => {
  return await prisma.substageStock.create({
    data: {
      substage: { connect: { id_substage } },
      materialStock: { connect: { id_stock } },
      quantityUsed: quantity,
    },
  });
};

export const findOrCreatePhysicalSchedule = async ({ id_stage, id_work }) => {
  let physicalSchedule = await prisma.physicalSchedule.findFirst({
    where: { id_stage, id_work },
  });

  if (!physicalSchedule) {
    physicalSchedule = await prisma.physicalSchedule.create({
      data: {
        stage: { connect: { id_stage } },
        work: { connect: { id_work } },
      },
    });
  }
  return physicalSchedule;
};

export const createSubstageSchedule = async (data) => {
  return await prisma.substageSchedule.create({
    data: {
      substage: { connect: { id_substage: data.id_substage } },
      physicalSchedule: { connect: { id_physicalSchedule: data.id_physicalSchedule } },
      expStartDate: data.expStartDate,
      expEndDate: data.expEndDate,
      expDuration: data.expDuration,
      progress: data.progress || 0.0,
    },
  });
};

export const getSubstageById = async ({ id }) => {
  return await prisma.substage.findFirst({
    where: { id_substage: Number(id) },
  });
};

export const allSubstagesByStageId = async ({ id }) => {
  return await prisma.stageSubstage.findMany({
    where: { stageId: Number(id) },
    include: {
      substage: {
        include: {
          substageEmployes: true,
          substageStocks: true,
          substageSchedules: true,
        },
      },
    },
  });
};

export const findScheduleBySubstageId = async (id_substage) => {
  return await prisma.substageSchedule.findFirst({
    where: { id_substage: Number(id_substage) }
  });
};

export const updateSubstageFull = async ({ id_substage, id_schedule, dataSubstage, dataSchedule }) => {
  return await prisma.$transaction([
    prisma.substage.update({
      where: { id_substage: Number(id_substage) },
      data: dataSubstage,
    }),
    prisma.substageSchedule.update({
      where: { id_substageSchedule: Number(id_schedule) },
      data: dataSchedule,
    })
  ]);
};

export const updateSubstage = async ({ data, id }) => {
  return await prisma.substage.update({
    where: { id_substage: Number(id) },
    data: {
      name: data.name,
      expDuration: data.expDuration,
      progress: data.progress,
    },
  });
};

export const deleteFullSubstage = async ({ id }) => {
  const idSubstage = Number(id);
  return await prisma.$transaction([
    prisma.substageSchedule.deleteMany({
      where: { id_substage: idSubstage } 
    }),
    prisma.stageSubstage.deleteMany({
      where: { substageId: idSubstage } 
    }),
    prisma.substageEmploye.deleteMany({
      where: { substageId: idSubstage } 
    }),
    prisma.substageStock.deleteMany({
      where: { substageId: idSubstage } 
    }),
    prisma.substage.delete({
      where: { id_substage: idSubstage },
    })
  ]);
};