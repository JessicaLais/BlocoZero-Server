import * as substageModel from "../models/substageModel.js";
import { listStageById } from "./stageService.js";
import { getUserId } from "./userService.js";
import { getItemInStockById } from "./stockService.js";
import { registerExit } from "./stockService.js";
import { createBudgetStock } from "./budgetService.js";
import { getTypeByName } from "./typeService.js";
import { listAllCategoryByIdType } from "./categoryService.js";
import { createBudgetWorked } from "./budgetService.js";
import { getTypeById } from "./typeService.js";
import { listAllTypesByWorkId } from "./typeService.js";
import Substage from "../entitys/substageEntitys.js";

export const createSubstage = async ({ data }) => {
  const searchSubstageByName = await substageModel.findSubstageByName({
    name: data.name,
  });
  //if (searchSubstageByName) throw new Error("Name already usage");
  if (!data.expDuration) {
    throw new Error("The expDuration is required.");
  }
  const startDate = new Date();
  const endDate = new Date(data.expDuration);
  if (endDate < startDate) {
    throw new Error("The expDuration cannot be less than today.");
  }
  const searchStageById = await listStageById({ id: data.stage_id });

  for (const user of data.employees) {
    const verifyUser = await getUserId({ user_id: user.user_id });
  }

  for (const item of data.items_usage) {
    const verifyItem = await getItemInStockById({ id: item.item_id });
  }

  const substage = new Substage(data);

  const newSubstage = await substageModel.createSubstage({ data: substage });

  const createRelationSubstageWithStage =
    await substageModel.createRelationSubstageWithStage({
      id_stage: searchStageById.id_stage,
      id_substage: newSubstage.id_substage,
    });

  const searchTypeWorked = await getTypeByName({ name: "Trabalho" });

  const searchCaterogyWorked = await listAllCategoryByIdType({
    id: searchTypeWorked.id_type,
  });

  console.log();

  for (const user of data.employees) {
    const createRelationSubstageWithUser =
      await substageModel.createRelationSubstageWithUser({
        id_substage: newSubstage.id_substage,
        id_user: user.user_id,
        hours_worked: user.hours_worked,
        userfunction: user.userfunction,
      });

    let hours = 0;
    let extraHours = 0;
    if (user.hours_worked > 8) {
      hours = 8;
      extraHours = user.hours_worked - 8;
    } else {
      hours = user.hours_worked;
    }

    const budgetWorkedData = {
      id_work: searchTypeWorked.work_id,
      id_category: searchCaterogyWorked[0].id,
      id_type: searchTypeWorked.id_type,
      id_stage: searchStageById.id_stage,
      id_substage: newSubstage.id_substage,
      code: "TRAB",
      name: createRelationSubstageWithUser.user.name,
      unitMeasure: "",
      cost: createRelationSubstageWithUser.user.hourlyRate,
      quantityUsage: 0,
      hours: hours,
      extraHours: extraHours,
      Userfunction: user.userfunction,
      weightLength: 0,
    };

    const createBudgetWorke = await createBudgetWorked({
      data: budgetWorkedData,
    });
  }

  for (const item of data.items_usage) {
    const createRelationSubstageWithItem =
      await substageModel.createRelationSubstageWithItem({
        id_substage: newSubstage.id_substage,
        id_stock: item.item_id,
        quantity: item.quantity_usage,
      });

    const exitStockItem = await registerExit({
      data: { id_item: item.item_id, quantity: item.quantity_usage },
    });

    const budgetStockData = {
      id_work: exitStockItem.id_work,
      id_category: exitStockItem.id_category,
      id_type: exitStockItem.id_type,
      id_stage: searchStageById.id_stage,
      id_substage: newSubstage.id_substage,
      code: exitStockItem.code,
      name: exitStockItem.name,
      unitMeasure: exitStockItem.unitMeasure,
      cost: exitStockItem.costUnit,
      quantityUsage: item.quantity_usage,
      hours: 0,
      extraHours: 0,
      Userfunction: "",
      weightLength: exitStockItem.weightLength,
    };
    const createBudgetStoc = await createBudgetStock({ data: budgetStockData });
  }

  const diffTime = Math.abs(endDate - startDate);
  const durationInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const physicalSchedule = await substageModel.findOrCreatePhysicalSchedule({
    id_stage: searchStageById.id_stage,
    id_work: searchStageById.work_id || searchTypeWorked.work_id,
  });

  await substageModel.createSubstageSchedule({
    id_substage: newSubstage.id_substage,
    id_physicalSchedule: physicalSchedule.id_physicalSchedule,
    expStartDate: startDate,
    expEndDate: endDate,
    expDuration: durationInDays,
    progress: data.progress || 0.0,
  });

  return true;
};

export const getSubstageById = async ({ id }) => {
  const searchSubstageById = await substageModel.getSubstageById({ id });
  if (!searchSubstageById) throw new Error("Substage not found");
  return searchSubstageById;
};

export const listAllSubstageByIdStage = async ({ id }) => {
  id = Number(id);

  const searchTypeByWorkId = await listAllTypesByWorkId({ id });

  const substages = await Promise.all(
    searchTypeByWorkId.map(async (type) => {
      const result = await substageModel.allSubstagesByStageId({ id: type.id });

      return result;
    })
  
  );
  
  //const searchTypeByid = await getTypeById({ id });

  const listAllSubstage = await substageModel.allSubstagesByStageId({ id });

  return listAllSubstage;

  return listAllSubstage.map((item) => new Substage(item.substage));
  
};

export const updateSubstage = async ({ id, data }) => {
  const currentSchedule = await substageModel.findScheduleBySubstageId(id);

  // Se o usuário mandou uma nova "expDuration" (Data Final), recalculamos o cronograma
  if (data.expDuration && currentSchedule) {
      const startDate = new Date(); // Mantendo sua lógica: Início é Hoje
      const endDate = new Date(data.expDuration);
      const diffTime = Math.abs(endDate - startDate);
      const durationInDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      return await substageModel.updateSubstageFull({
          id_substage: id,
          id_schedule: currentSchedule.id_substageSchedule,
          dataSubstage: { name: data.name, expDuration: data.expDuration, progress: data.progress },
          dataSchedule: { expStartDate: startDate, expEndDate: endDate, expDuration: durationInDays, progress: data.progress }
      });
  }
  
  // Se não mandou data nova, atualiza só o básico
  return await substageModel.updateSubstage({ id, data });
};

export const deleteSubstageById = async (id) => {
  const existing = await substageModel.getSubstageById({ id });
  if (!existing) throw new Error("Substage not found");
  
  // Chama a função nova do Model que deleta em cascata
  return await substageModel.deleteFullSubstage({ id });
};
