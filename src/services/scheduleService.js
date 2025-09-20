import * as scheduleModel from '../models/scheduleModel.js'; 
import Schedule from "../entitys/scheduleEntity.js"


export const  createSchedule = async(data) => {
    data.date_start = new Date(data.date_start)
    data.date_end = new Date (data.date_end)
    data.progress = parseFloat(data.progress.replace("%", ""))

    const schedule = new Schedule(data)
    return await (scheduleModel.createSchedule(schedule))

}

export const updateSchedule = async (idSchedule, data) => {
    const schedule = new Schedule(data);
    return await scheduleModel.updateScheduleTask(idSchedule, data);
}

export const deleteSchedule = async (idSchedule) => {
    return await scheduleModel.deleteScheduleTask(idSchedule);
}

export const listSchedulesByWorkId = async (workId) => {
    return await scheduleModel.findScheduleByWorkId(workId);
}