import { getUserId } from "../models/usersModel.js";
import { getSpecificWork } from "../models/worksModel.js";

import * as budgetModel from "../models/budgetModel.js";

import Budget from "../entitys/budgetEntity.js";
import User from "../entitys/userEntity.js";

export const createBudgetLabor = async ({ data }) => {
  const searchWork = await getSpecificWork({ id: data.work_id });

  if (!searchWork) {
    throw new Error("Work not found");
  }
  console.log(searchWork);

  const searchManager = await getUserId({ id: data.manager_id });

  if (!searchManager || !searchManager.userFunction === "manager") {
    throw new Error("Manager not found or invalid function type");
  }

  const searchEmployee = await getUserId({ id: data.employee_id });
  if (!searchEmployee || searchEmployee.userFunction === "manager") {
    throw new Error("Employee not found or invalid function type");
  }

  let differenceHoursExtra = 0;
  if (data.hoursWorked > 8) {
    differenceHoursExtra = data.hoursWorked - 8;
  }
  const totalCost = data.hoursWorked * searchEmployee.hourlyRate;
  const budgetData = {
    code: "TRB - ",
    name: searchEmployee.name,
    user_id: searchEmployee.id,
    type: "Trabalho",
    category: "Trabalho de instalação",
    unitMeasure: "H",
    cost: "",
    stockQuantity: "",
    hoursWorked: data.hoursWorked,
    costHours: searchEmployee.hourlyRate,
    extraHours: differenceHoursExtra,
    total: totalCost,
    allocatedStage: data.allocatedStage,
    userFunction: searchEmployee.userFunction,
  };

  const budget = await budgetModel.createBudgetLabor({
    data: new Budget(budgetData),
  });

  console.log(searchWork);
  return await budgetModel.createRelationBudgetManagerWork({
    id_manager: searchManager.id,
    id_budget: budget.id_budget,
    id_work: searchWork.id_work,
  });

  //Precisa fazer a lógica de buscar a etapa da obra para preencher category e allocatedStage,
  //const newBudgetLabor = new Budget({ ...data });
};

/*
{
  "code":"TRB-CL-111",
  "user_id":0,
  "type":"Trabalho",
  "category":"",
  "unitMeasure":"h",
  "cost":0,
  "stockQuantity":"0",
  "hours":0,
  "extraHours":0,
  "total":0,
  "allocatedStage":"",
  "function":""
}
*/

export const listBudgetsByWorkId = async ({ id }) => {
  const searchWork = await getSpecificWork({ id: Number(id) });
  if (!searchWork) {
    throw new Error("Work not found");
  }
  const getRelations = await budgetModel.getRelationBudgetManagerWorkByWorkId({
    id_work: searchWork.id_work,
  });
  let total = getRelations.reduce((sum, { budget }) => {
    return sum + budget.total;
  }, 0);
  console.log(total);
  return getRelations.map(({ budget, manager, ...relation }) => {
    return {
      ...relation,
      budget: new Budget(budget),
      manager: new User(manager),
      totalBudgetByWork: total,
    };
  });
};
