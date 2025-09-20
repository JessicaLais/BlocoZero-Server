import prisma from "./connectionModel.js"

export const createSchedule = async ({data}) => {
    return await prisma.schedule.create({
        data:{
            //manager_id: data.manager_id,
            work_id: data.work_id,
            stage:data.stage,
            responsable:data.responsable,
            progress : data.progress,
            date_start : data.date_start,
            date_end : data.date_end
        }
    })
}


export const findScheduleByWorkId = async (workId) => {
  return await prisma.schedule.findMany({
    where: { 
      work_id: workId
    }
  })
}

export const deleteScheduleTask = async(idSchedule) => {
  return await prisma.schedule.delete({
    where: {
      id : idSchedule
    }
  })
}

export const updateScheduleTask = async (idSchedule, data) => {
  return await prisma.schedule.update({
    where: { id: idSchedule },
    data: {
      stage: data.stage,
      responsable: data.responsable,
      progress: data.progress,
      date_start: data.date_start,
      date_end: data.date_end
    }
  })
}


/*export const listAllScheduleManagerByID = async (managerId) => {
  return await prisma.cronograma.findMany({
    where: {
      manager_id: managerId
    }
  })
}*/