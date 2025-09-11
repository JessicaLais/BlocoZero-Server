//MODEL'S
import * as usagesModel from "../models/usagesModel.js"
import {getSpecificWork} from "../models/worksModel.js"
import {verifyQuantityByItemId, updateQuantityItem} from "../models/itemsModel.js"

//POO'S
import Usage from "../entitys/usagesEntity.js"
import Item from "../entitys/itemEntity.js"




export const createUsage = async ({data}) => { 
    const itemData = await verifyQuantityByItemId({itemId:data.itemId})
    
    if(!itemData || itemData.length === 0){
        throw new Error("Item not found");
    }

    const item = new Item(itemData[0])

    item.updateQuantity(data.quantity)

    const usage = new Usage(data)
    usage.updateDate(new Date(usage.usedAt))

    
    const createUsage = await usagesModel.createUsage({data:usage})


    return await updateQuantityItem({itemId:item.id, quantity:item.quantity})

    // AVALIAR SE VALE APENA USAR O PRISMA TRANSACTION
    
}




export const listUsageByWorkId = async ({workId}) => {
    if (isNaN(Number(workId))){
        throw new Error("Invalid ID: please provide a numeric value");
    }
    
    const getSpecificWorkByWorkid = await getSpecificWork({id:Number(workId)})

    if (!getSpecificWorkByWorkid){
        throw new Error("No usages found with this work id");
    }

    const usage = await usagesModel.listUsageByWorkId({workId:Number(workId)})
    
    return usage.map(item => new Usage(item))
    
}