import * as itemsModel from "../models/itemsModel.js"
import {getSpecificWork} from "../models/worksModel.js"


export const createItems = async ({data}) => {
    if ( !data.work_id || !data.code || !data.name || !data.type || !data.quantity || !data.unit || !data.lote ){
        throw new Error ("Missing required fields")
    }
    return await itemsModel.createItems({data})
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
    

    
    return itemsByWorkId
}
