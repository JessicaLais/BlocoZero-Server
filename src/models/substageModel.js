import prisma from "./connectionModel.js";

export const findSubstageByName = async ({ name }) => {
    return await prisma.substage.findFirst({
        where: { name: name }
    });
};

export const createSubstage = async ({ data }) => {
    return await prisma.substage.create({
        data: {
            name: data.name,
            expDuration: data.expDuration,
            progress: data.progress,
        }
    });
};;


export const allSubstages = async () => {
    return await prisma.substage.findMany(); 
};

export const updateSubstage = async ({ data, id }) => {
    return await prisma.substage.update({
        where: {
            id_substage: id
        },
        data: {
            name: data.name,
            expDuration: data.expDuration,
            progress: data.progress,
        }
    });
};

export const deleteSubstage = async ({ id }) => {

    return await prisma.substage.delete({
        where: { 
            id_substage: id, 
        }
    });
};

export const getSubstageById = async ({ id }) => {
    return await prisma.substage.findUnique({
        where: { 
            id_substage: id, 
        },
        include: {
            stageSubstages: true, 
            substageEmployes: true,
        }
    });
};