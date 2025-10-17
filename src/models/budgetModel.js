import prisma from "./connectionModel.js";

export const createBudgetLabor = async ({ data }) => {
  return await prisma.budget.create({
    data: {
      code: data.code,
      name: data.name,
      user_id: data.user_id,
      type: data.type,
      category: data.category,
      unitMeasure: data.unitMeasure,
      cost: data.cost || 0,
      stockQuantity: data.stockQuantity || 0,
      hoursWorked: data.hoursWorked || 0,
      costHours: data.costHours || 0,
      extraHours: data.extraHours || 0,
      total: data.total || 0,
      allocatedStage: data.allocatedStage,
      function: data.userFunction,
    },
  });
};

export const createRelationBudgetManagerWork = async ({
  id_manager,
  id_budget,
  id_work,
}) => {
  return await prisma.budgetManagerWork.create({
    data: {
      id_manager,
      id_work,
      id_budget,
      actionType: "create",
    },
  });
};

export const getRelationBudgetManagerWorkByWorkId = async ({ id_work }) => {
  return await prisma.budgetManagerWork.findMany({
    where: {
      id_work,
    },
    include: {
      budget: true,
      manager: true,
    },
  });
};
