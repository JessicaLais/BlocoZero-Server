import { getUserId } from "../models/usersModel.js";
import { getSpecificWork } from "../models/worksModel.js";
import { getById } from "../models/typeModel.js";
import { searchCategoryById } from "../models/categoryModel.js";
import { getStageById } from "../models/stageModel.js";

import * as budgetModel from "../models/budgetModel.js";

import Budget from "../entitys/budgetEntity.js";
import User from "../entitys/userEntity.js";

export const createBudgetLabor = async ({ data }) => {
  const searchEmployee = await getUserId({ id: data.employee_id });
  if (!searchEmployee) {
    throw new Error("User not found");
  }
  let newData = {
    code: "TRAB - " + searchEmployee.id_user,
    name: searchEmployee.name,
    Userfunction: data.function,
  };

  const searchType = await getById({ id: data.id_type });
  if (!searchType || searchType.name !== "Trabalho") {
    throw new Error("Type not found or type incorret");
  }
  newData.id_type = searchType.id_type;

  const searchCategory = await searchCategoryById({
    id_category: data.id_category,
  });
  if (!searchCategory || !searchCategory.name.includes("Trabalho")) {
    throw new Error("Category not found or category incorret");
  }
  newData.id_category = searchCategory.id_category;

  const searchStage = await getStageById({ id: data.allocated_stage_id });
  if (!searchStage) {
    throw new Error("Stage not found");
  }
  newData.allocatedStage = searchStage.name;
  const searchWork = await getSpecificWork({ id: data.id_work });
  if (!searchWork) {
    throw new Error("Work not found");
  }
  newData.id_work = searchWork.id_work;
  newData.cost = searchEmployee.hourlyRate;

  if (data.hours_worked <= 8) {
    newData.hours = data.hours_worked;
  } else {
    newData.hours = 8;
    newData.extraHours = data.hours_worked - 8;
  }
  newData.total = searchEmployee.hourlyRate * data.hours_worked;

  const budget = new Budget(newData);

  return budgetModel.createBudgetLabor({ data: budget });

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

export const listAllBudget = async () => {
  const listAllBudget = await budgetModel.listAllBudget();
  return listAllBudget.map((item) => new Budget(item));
};

export const updateBudget = async ({ id, data }) => {
  id = Number(id);
  const searchBudget = await budgetModel.getBudgetById({ id });
  if (!searchBudget) {
    throw new Error("Budget not found");
  }
  const searchEmployee = await getUserId({ id: data.employee_id });
  if (!searchEmployee) {
    throw new Error("User not found");
  }
  let newData = {
    code: "TRAB - " + searchEmployee.id_user,
    name: searchEmployee.name,
    Userfunction: data.function,
  };

  const searchType = await getById({ id: data.id_type });
  if (!searchType || searchType.name !== "Trabalho") {
    throw new Error("Type not found or type incorret");
  }
  newData.id_type = searchType.id_type;

  const searchCategory = await searchCategoryById({
    id_category: data.id_category,
  });
  if (!searchCategory || !searchCategory.name.includes("Trabalho")) {
    throw new Error("Category not found or category incorret");
  }
  newData.id_category = searchCategory.id_category;

  const searchStage = await getStageById({ id: data.allocated_stage_id });
  if (!searchStage) {
    throw new Error("Stage not found");
  }
  newData.allocatedStage = searchStage.name;
  const searchWork = await getSpecificWork({ id: data.id_work });
  if (!searchWork) {
    throw new Error("Work not found");
  }
  newData.id_work = searchWork.id_work;
  newData.cost = searchEmployee.hourlyRate;

  if (data.hours_worked <= 8) {
    newData.hours = data.hours_worked;
  } else {
    newData.hours = 8;
    newData.extraHours = data.hours_worked - 8;
  }
  newData.total = searchEmployee.hourlyRate * data.hours_worked;

  const budget = new Budget(newData);

  return budgetModel.updateBudget({ data: budget, id });
};

export const deleteBudget = async ({ id }) => {
  id = Number(id);
  const searchBudget = await budgetModel.getBudgetById({ id });
  if (!searchBudget) {
    throw new Error("Budget not found");
  }

  return budgetModel.deleteBudget({ id });
};
