import prisma from "./connectionModel.js"

export const createReport = async ({data}) => {
    return await prisma.report.create({
        data:{
            //progress:data.progress,
            date_register:data.date_register,
            percentual:data.percentual,
            qtd_work:data.qtd_work,
            weather:data.weather,
            ocurrence:data.ocurrence,
            stage:data.stage,
            status : "pendente"
        }
    })
}

/*export const updateStage = async ({stage }) => {
    return await prisma.progress.update({
        where:{
            stage:stage
        }
    })
}*/


