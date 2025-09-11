import prisma from "./connectionModel.js"

export const createUsage = async ({data}) => {
    return await prisma.usage.create({
        data:{
            itemId:data.itemId,
            userId:data.userId,
            quantity:data.quantity,
            workId:data.workId,
            lote:data.lote,
            usedAt:data.usedAt,
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