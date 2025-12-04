import prisma from "./connectionModel.js";

export const createBudget = async ({ data }) => {
  return prisma.budget.create({
    data: {
      id_work: data.id_work,
      id_category: data.id_category,
      id_type: data.id_type,
      id_stage: data.id_stage,
      id_substage: data.id_substage,
      code: data.code,
      name: data.name,
      unitMeasure: data.unitMeasure,
      cost: data.cost,
      quantityUsage: data.quantityUsage,
      hours: data.hours,
      extraHours: data.extraHours,
      total: data.total,
      Userfunction: data.Userfunction,
      weightLength: data.weightLength,
    },
  });
};

export const getAllBudgetsByWorkId = async ({ id }) => {
  return await prisma.budget.findMany({
    where: {
      id_work: id,
    },
    include: {
      type: true,
      category: true,
      stage: true,
      substage: true,
    },
  });
};
