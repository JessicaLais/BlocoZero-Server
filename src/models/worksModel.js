import prisma from "./connectionModel.js"

export const createWork = async (data, startDate, endDate) => {
    return await prisma.work.create({
        data: {
            enterprise_id: data.enterprise_id,
            enterprise_name: data.enterprise_name,
            title: data.title,
            location: data.location,
            employees: data.employees,
            budget: data.budget,
            start_date: startDate,
            end_date: endDate,
            progress: data.progress,
            description: data.description,
            status: data.status,
            photo_url: data.photoUrl
        }
})
}

export const getAllWorks = async () => {
    return await prisma.work.findMany();
}

export const getSpecificWork = async ({id}) => {
    return await prisma.work.findUnique({
        where:{
            id: id
        }
    })
}