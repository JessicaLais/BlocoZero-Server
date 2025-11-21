/*import * as workScheduleService from "../services/workScheduleService.js";

export const createInitialScheduleItem = async (req, res) => {
    try {
        const { workId } = req.params;
        const { id_stage, substageName, previsaoInicio, previsaoFim } = req.body; 

        if (!id_stage || !substageName || !previsaoInicio || !previsaoFim) {
             return res.status(400).json({ error: "Missing required schedule fields." });
        }

        const newScheduleItem = await workScheduleService.registerInitialSchedule({
            workId: Number(workId),
            stageId: Number(id_stage),
            substageName: substageName,
            startDate: previsaoInicio,
            endDate: previsaoFim
        });

        res.status(200).json({ 
            response: "success", 
            message: newScheduleItem.message,
            data: {
                substageName: newScheduleItem.substageName,
                stageId: newScheduleItem.stageId,
                startDate: newScheduleItem.startDate,
                endDate: newScheduleItem.endDate
            }
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};*/