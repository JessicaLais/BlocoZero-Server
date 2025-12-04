import { getWorkById } from "./workServices.js";
import { getTypeById } from "./typeService.js";
import { getCaterogyById } from "./categoryService.js";
import { listStageById } from "./stageService.js";
import { getSubstageById } from "./substageService.js";
import * as budgetModel from "../models/budgetModel.js";

import Budget from "../entitys/budgetEntity.js";

export const createBudgetStock = async ({ data }) => {
  const searchWorkById = await getWorkById({ id: data.id_work });
  const searchTypeByid = await getTypeById({ id: data.id_type });
  const searchCategoryById = await getCaterogyById({ id: data.id_category });
  const searchStageById = await listStageById({ id: data.id_stage });
  const searchSubstageById = await getSubstageById({ id: data.id_substage });
  data.total = data.quantityUsage * data.cost;
  const budget = new Budget(data);

  return await budgetModel.createBudget({ data });
};

export const createBudgetWorked = async ({ data }) => {
  const searchWorkById = await getWorkById({ id: data.id_work });
  const searchTypeByid = await getTypeById({ id: data.id_type });
  const searchCategoryById = await getCaterogyById({ id: data.id_category });
  const searchStageById = await listStageById({ id: data.id_stage });
  const searchSubstageById = await getSubstageById({ id: data.id_substage });
  data.total = (data.hours + data.extraHours) * data.cost;
  const budget = new Budget(data);
  return await budgetModel.createBudget({ data });
};

export const getAllBudgetsByWorkId = async ({ id }) => {
  id = Number(id);
  const searchWorkById = await getWorkById({ id });

  const getAllBudgets = await budgetModel.getAllBudgetsByWorkId({ id });

  return getAllBudgets;
  //return getAllBudgets.map((budget) => new Budget(budget));
};
