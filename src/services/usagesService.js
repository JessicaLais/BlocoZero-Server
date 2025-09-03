import * as usagesModel from "../models/usagesModel.js"
import {getSpecificWork} from "../models/worksModel.js"
import {verifyQuantityByItemId, updateQuantityItem} from "../models/itemsModel.js"




export const createUsage = async ({data}) => {
    if(!data.quantity || !data.userId|| !data.workId || !data.lote || !data.usedAt || !data.purpose){
        throw new Error ("Missing required fields")
    }
    //Verificar quantidade disponível no sistema   
    const verifyQuantity = await verifyQuantityByItemId({itemId: data.itemId})
    if(verifyQuantity[0].quantity < data.quantity){
        throw new Error("Invalid quantity: the quantity available in stock is less than the quantity requested");
    }
    else{
        const updateQuantityItemByWorkId = await updateQuantityItem({itemId: data.itemId, quantity:(verifyQuantity[0].quantity - data.quantity)})
        const dataFormatted = new Date(data.usedAt)
        return await usagesModel.createUsage({data, dataFormatted })
    }
}




export const listUsageByWorkId = async ({workId}) => {
    if (isNaN(Number(workId))){
        throw new Error("Invalid ID: please provide a numeric value");
    }
    
    const getSpecificWorkByWorkid = await getSpecificWork({id:Number(workId)})

    if (!getSpecificWorkByWorkid){
        throw new Error("No usages found with this work id");
    }


    return await usagesModel.listUsageByWorkId({workId:Number(workId)})
    
}