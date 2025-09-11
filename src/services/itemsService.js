//MODELS
import * as itemsModel from "../models/itemsModel.js"
import {getSpecificWork} from "../models/worksModel.js"


//POO
import Item from "../entitys/itemEntity.js"

export const createItems = async ({data}) => {
    const item = new Item(data)
    
    return await itemsModel.createItems({data:item})
}


export const listAllItemsByWorkId = async ({workId}) => {
    if (isNaN(workId)){
        throw new Error("Invalid ID: please provide a numeric value");
    }
    const getSpecificWorkById = await getSpecificWork({id:Number(workId)})

    if (!getSpecificWorkById){
        throw new Error("No items found with this work id");
    }

    const itemsByWorkId = await itemsModel.listAllItemsByWorkId({workId: Number(workId)})
    

    
    return itemsByWorkId.map(item => new Item(item))
}
