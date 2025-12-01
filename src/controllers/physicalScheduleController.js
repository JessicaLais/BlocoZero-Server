import * as physicalScheduleService from "../services/physicalScheduleService.js";

export const getSchedule = async (req, res) => {
    try {
        const {id_work} = req.params;
        if (isNaN(Number(id_work))) {
            return res.status(400).json({ error: "Invalid Work ID provided." });
        }
        const schedule = await physicalScheduleService.getWorkSchedule(id_work);
        res.status(200).json(schedule);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
