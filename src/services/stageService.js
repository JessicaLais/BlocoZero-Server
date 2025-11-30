import * as stageModel from "../models/stageModel.js";
import Stage from "../entitys/stageEntity.js";
import { getSpecificWork } from "../models/worksModel.js";

export const createStage = async ({ data }) => {
  const searchStageByName = await stageModel.findStageByName({
    name: data.name,
  });
  if (searchStageByName) {
    throw new Error("Stage already exist");
  }

  const stage = new Stage(data);

  const createNewStage = await stageModel.createStage({ data: stage });

  return await stageModel.createRelationStageWithWork({
    id_stage: createNewStage.id_stage,
    id_work: data.id_work,
  });
};

export const listAllStageByWorkId = async ({ id_work }) => {
  id_work = Number(id_work);
  const searchWorkById = await getSpecificWork({ id: id_work });

  if (!searchWorkById) {
    throw new Error("Work not found");
  }

  const searchAllStagesByWorkId = await stageModel.listAllStageByWorkId({
    id_work,
  });

  return searchAllStagesByWorkId.map((stage) => new Stage(stage.stage));
};

export const listStageById = async ({ id }) => {
  const searchStageById = await stageModel.stageByid({ id: id });

  if (!searchStageById) throw new Error("Stage not found");
  return searchStageById;
};

export const updateStage = async ({ id_stage, data }) => {
  id_stage = Number(id_stage);
  const searchStageById = await stageModel.stageByid({ id: id_stage });

  if (!searchStageById) {
    throw new Error("Work not found");
  }

  const stage = new Stage(data);

  return await stageModel.updateStageById({ id_stage, data: stage });
};

export const deleteStage = async ({ id_stage }) => {
  id_stage = Number(id_stage);
  const searchStageById = await stageModel.stageByid({ id: id_stage });

  if (!searchStageById) {
    throw new Error("Work not found");
  }

  return await stageModel.deleteStageById({ id_stage });
};
