import { getSpecificWork } from "../models/worksModel.js";
import * as damagedEquipamentModel from "../models/damagedEquipamentModel.js"

//Entitys
import DamagedEquipament from "../entitys/damagedEquipamenteEntity.js"

export const getAllDamagedEquipament = async ({ id }) => {
     if (isNaN(id)){
        throw new Error("Invalid ID: please provide a numeric value");
    }
    const getWork = await getSpecificWork({id:Number(id)});
    if (!getWork) {
        throw new Error("No work found with this id");
    }
    const damagedEquipament = await damagedEquipamentModel.getAllDamagedEquipament({workId: id});
    return damagedEquipament.map(damagedEquipament => new DamagedEquipament(damagedEquipament))
};


export const registerDamagedEquipament = async ({data}) => {
    const newDamagedEquipament = new DamagedEquipament(data)
    return await damagedEquipamentModel.registerDamagedEquipament({data:newDamagedEquipament})
    
}
