import * as stageModel from "../models/stageModel.js";
import Stage from "../entitys/stageEntity.js";

export const createStage = async ({ data }) => {
  const stageExisting = await stageModel.findStageByNameAndSubstage({
    name: data.name,
    substage: data.substage,
  });
  if (stageExisting) {
    throw new Error(`The Stage and SubStage already exists`);
  }

  const fullStageData = {
    ...data,
    progress: data.progress !== undefined ? data.progress : 0.0, 
  };

  const stage = new Stage(fullStageData);
  const createStageDB = await stageModel.createStage({ data: stage });

  return createStageDB;
};

export const listAllStages = async () => {
  const stages = await stageModel.allStages();
  return stages.map((item) => new Stage(item));
};

export const getStageById = async ({ stage_id }) => {
  const getStage = await stageModel.getStageById({ id: Number(stage_id) }); 
  if (!getStage) {
    throw new Error("Stage not found");
  }
  const stage = new Stage(getStage);
  return stage;
};

export const updateStage = async ({ data, id }) => {
  id = Number(id);
  const findStage = await stageModel.getStageById({ id }); 
  if (!findStage) {
    throw new Error("Stage not found");
  }
  const stage = new Stage({ ...findStage, ...data, id_stage: id });
  return await stageModel.updateStage({ data: stage, id: stage.id });
};

export const deleteStage = async ({ id }) => {
  id = Number(id);
  const getStage = await stageModel.getStageById({ id }); 
  if (getStage === null) {
    throw new Error("Stage not found");
  }
  const deleteStage = await stageModel.deleteStage({ id }); 

  return deleteStage;
};