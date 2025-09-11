import prisma from "./connectionModel.js"


export const createItems = async ({data}) => {
    console.log(data)
    return await prisma.item.create({
        data: {
            enterprise_id: 0,
            work_id: data.work_id,
            code: data.code,
            name: data.name, 
            type: data.type,
            quantity: data.quantity,
            unit: data.unit,
            lote: data.lote
        }
    })
}

export const verifyQuantityByItemId = async ({itemId}) => {
    return await prisma.item.findMany({
        where:{
            id:itemId
        }
    })
}

export const updateQuantityItem = async ({itemId, quantity}) => {
    return await prisma.item.update({
        where:{
            id:itemId
        },
        data:{
            quantity:quantity
        }
    })
}


export const listAllItemsByWorkId = async ({workId}) => {
    return await prisma.item.findMany({
        where:{
            work_id:workId
        }
    })
    
}

