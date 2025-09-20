import * as scheduleService from '../services/scheduleService.js';

export const createSchedule= async (req, res) => {
    try {
        const data = req.body
        const scheduleData = await scheduleService.createSchedule(data);
        res.status(200).json(scheduleData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const updateSchedule = async (req, res) => {
  try {
    const { idSchedule } = req.params;
    const data = req.body;

    const updatedSchedule = await scheduleService.updateSchedule(idSchedule, data);
    const scheduleList = await scheduleService.listSchedulesByWorkId(data.work_id);
    res.status(200).json(scheduleList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export const deleteSchedule = async (req, res) => {
  try {
    const { idSchedule, workId } = req.params;
    await scheduleService.deleteSchedule(idSchedule);

    const scheduleList = await scheduleService.listSchedulesByWorkId(workId);
    res.status(200).json(scheduleList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const listSchedulesByWorkId = async (req, res) => {
  try {
    const { workId } = req.params;
    const schedules = await scheduleService.listSchedulesByWorkId(workId);
    res.status(200).json(schedules);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}