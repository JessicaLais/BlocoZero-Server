import prisma from "./connectionModel.js";

export const createBudgetLabor = async ({ data }) => {
  return prisma.resource.create({
    data: {
      id_work: data.id_work,
      id_category: data.id_category,
      id_type: data.id_type,
      code: data.code,
      name: data.name,
      unitMeasure: data.unitMeasure,
      cost: data.cost,
      stockQuantity: data.stockQuantity,
      hours: data.hours,
      extraHours: data.extraHours,
      total: data.total,
      allocatedStage: data.allocatedStage,
      Userfunction: data.Userfunction,
      weightLength: data.weightLength,
    },
  });
};

export const listAllBudget = async () => {
  return prisma.resource.findMany();
};

export const getBudgetById = async ({ id }) => {
  return prisma.resource.findFirst({
    where: {
      id_budget: id,
    },
  });
};

export const updateBudget = async ({ id, data }) => {
  return prisma.resource.update({
    where: {
      id_budget: id,
    },
    data: {
      id_work: data.id_work,
      id_category: data.id_category,
      id_type: data.id_type,
      code: data.code,
      name: data.name,
      unitMeasure: data.unitMeasure,
      cost: data.cost,
      stockQuantity: data.stockQuantity,
      hours: data.hours,
      extraHours: data.extraHours,
      total: data.total,
      allocatedStage: data.allocatedStage,
      Userfunction: data.Userfunction,
      weightLength: data.weightLength,
    },
  });
};

export const deleteBudget = async ({ id }) => {
  return prisma.resource.delete({
    where: {
      id_budget: id,
    },
  });
};
