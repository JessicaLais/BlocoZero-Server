
import * as stageModel from "../models/stageModel.js";
import Stage from "../entitys/stageEntity.js";

export const createStage = async ({ data }) => {
    
    const stageExisting = await stageModel.findStageByName({
        name: data.name,
    });
    
    if (stageExisting) {
        throw new Error(`The Stage name "${data.name}" already exists`);
    }

    const fullStageData = {
        ...data,
        progress: data.progress !== undefined ? data.progress : 0.0, 
    };

    const stage = new Stage({
        ...fullStageData,
        expStartDate: new Date(fullStageData.expStartDate),
        expEndDate: new Date(fullStageData.expEndDate),
        exeStartDate: fullStageData.exeStartDate ? new Date(fullStageData.exeStartDate) : null,
        exeEndDate: fullStageData.exeEndDate ? new Date(fullStageData.exeEndDate) : null,
    });
    
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

    const updatedData = {
        ...findStage, 
        ...data, 
        id_stage: id,
        expStartDate: data.expStartDate ? new Date(data.expStartDate) : findStage.expStartDate,
        expEndDate: data.expEndDate ? new Date(data.expEndDate) : findStage.expEndDate,
        exeStartDate: data.exeStartDate ? new Date(data.exeStartDate) : findStage.exeStartDate,
        exeEndDate: data.exeEndDate ? new Date(data.exeEndDate) : findStage.exeEndDate,
    };
    
    const stage = new Stage(updatedData); 
    
    return await stageModel.updateStage({ data: stage, id: id });
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