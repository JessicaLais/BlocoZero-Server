import * as substageModel from "../models/substageModel.js";
import Substage from "../entitys/substageEntity.js"; 

export const createSubstage = async ({ data }) => {
    const substageExisting = await substageModel.findSubstageByName({
        name: data.name,
    });
    if (substageExisting) {
        throw new Error(`The Substage "${data.name}" already exists`);
    }

    const substageEntity = new Substage(data);
    const createSubstage = await substageModel.createSubstage({ data: substageEntity });

    return createSubstage;
};

export const listAllSubstages = async () => {
    const substages = await substageModel.allSubstages();
    return substages.map((item) => new Substage(item));
};

export const getSubstageById = async ({ id_substage }) => {
    const getSubstage = await substageModel.getSubstageById({ id: Number(id_substage) }); 
    if (!getSubstage) {
        throw new Error("Substage not found");
    }
    const substage = new Substage(getSubstage);
    return substage;
};

export const updateSubstage = async ({ data, id }) => {
    id = Number(id);
    const findSubstage = await substageModel.getSubstageById({ id }); 
    if (!findSubstage) {
        throw new Error("Substage not found");
    }

    const substageEntity = new Substage({ ...findSubstage, ...data, id_substage: id });
    
    return await substageModel.updateSubstage({ data: substageEntity, id: id });
};

export const deleteSubstage = async ({ id }) => {
    id = Number(id);
    const getSubstage = await substageModel.getSubstageById({ id }); 
    if (getSubstage === null) {
        throw new Error("Substage not found");
    }
    const deleteSubstage = await substageModel.deleteSubstage({ id }); 

    return deleteSubstage;
};