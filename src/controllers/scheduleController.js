
import * as scheduleService from '../services/scheduleService.js';

export const getSchedule = async (req, res) => {
    try {
        const { workId } = req.params;
        const scheduleData = await scheduleService.getScheduleData(workId);
        res.status(200).json(scheduleData);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
