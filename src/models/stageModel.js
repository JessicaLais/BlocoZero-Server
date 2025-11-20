import prisma from "./connectionModel.js";

export const findStageByName = async ({ name }) => {
    return await prisma.stage.findFirst({
        where: {
            name: name,
        }
    });
};

export const createStage = async ({ data }) => {
    return await prisma.stage.create({
        data: {
            name: data.name,
            progress: data.progress,
            expStartDate: data.expStartDate,
            expEndDate: data.expEndDate,
            exeStartDate: data.exeStartDate,
            exeEndDate: data.exeEndDate,
        }
    });
};


export const allStages = async () => {
    return await prisma.stage.findMany(); 
};

export const updateStage = async ({ data, id }) => {
    return await prisma.stage.update({
        where: {
            id_stage: id
        },
        data: {
            name: data.name,
            progress: data.progress,
            expStartDate: data.expStartDate,
            expEndDate: data.expEndDate,
            exeStartDate: data.exeStartDate,
            exeEndDate: data.exeEndDate
        }
    });
};

export const deleteStage = async ({ id }) => {
    return await prisma.stage.delete({
        where: { 
            id_stage: id, 
        }
    });
};

export const getStageById = async ({ id }) => {
    return await prisma.stage.findUnique({
        where: { 
            id_stage: id, 
        },
        include: {
            // Se necessário, inclua WorkStages, StageSubstages etc.
        }
    });
};