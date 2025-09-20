import prisma from "./connectionModel.js"



export const getAllDamagedEquipament = async ({workId}) => {
    return await prisma.defectReport.findMany({
        where: {
            workId: Number(workId)
        }
    })
}

export const registerDamagedEquipament = async ({data} ) => {
    return await prisma.defectReport.create({
        data:{
            itemId:data.itemId,
            userId:data.userId,
            workId:data.workId,
            note:data.note
        }
    })
}