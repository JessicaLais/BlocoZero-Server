import prisma from "./connectionModel.js"

export const createUsage = async ({data, dataFormatted}) => {
    return await prisma.usage.create({
        data:{
            itemId:data.itemId,
            userId:data.userId,
            quantity:data.quantity,
            workId:data.workId,
            lote:data.lote,
            usedAt:dataFormatted,
            purpose:data.purpose

        }
    })
}


export const listUsageByWorkId = async ({workId}) => {
    return await prisma.usage.findMany({
        where:{
            workId
        }
    })

    
}