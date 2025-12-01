import prisma from "./connectionModel.js";

export const getScheduleByWorkId = async (workId) => {
  return await prisma.physicalSchedule.findMany({
    where: {
      id_work: Number(workId),
    },
    include: {
      stage: {
        select: {
          id_stage: true,
          name: true,
        },
      },
      substageSchedules: { //barras do ganndt
        include: {
          substage: {
            select: {
              id_substage: true,
              name: true,
            },
          },
        },
      },
    },
  });
};

export const createPhysicalSchedule = async (data) => {
  return await prisma.physicalSchedule.create({
    data: {
      work: { connect: { id_work: data.id_work } },
      stage: { connect: { id_stage: data.id_stage } },
    },
  });
};

export const findPhysicalSchedule = async ({ id_work, id_stage }) => {
  return await prisma.physicalSchedule.findFirst({
    where: {
      id_work: id_work,
      id_stage: id_stage,
    },
  });
};