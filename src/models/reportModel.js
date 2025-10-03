import prisma from "./connectionModel.js"

export const createReport = async (data) => {
    return await prisma.report.create({
        data:{
            //progress:data.progress,
            manager_id: data.manager_id,
            work_id: data.work_id,
            date_register:data.date_register,
            percentual:data.percentual,
            qtd_work:data.qtd_work,
            weather:data.weather,
            ocurrence:data.ocurrence,
            stage:data.stage,
            //status : "pendente"
        }
    })
}

export const findReportByWorkId = async (work_id) => {
  return await prisma.report.findMany({
    where: {
      work_id: work_id,
    }
  })
}

/*export const listAllReportsByManagerId = async (managerId) => {
  return await prisma.report.findMany({
    where: {
      manager_id: managerId
    }
  });
};*/

/*export const updateStatus = async({data}) => {
    return await prisma.report.update({
        where:{
            
            }
        }
    )
}

/*export const updateStage = async ({stage }) => {
    return await prisma.progress.update({
        where:{
            stage:stage
        }
    })
}*/


 