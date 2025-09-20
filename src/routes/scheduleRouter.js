// src/routes/scheduleRouter.js
import express from "express";
import * as scheduleController from "../controllers/scheduleController.js";

const router = express.Router();

router.post('/cronograma', scheduleController.createSchedule);
router.put('/:idSchedule', scheduleController.updateSchedule);
router.delete('/:idSchedule', scheduleController.deleteSchedule);
router.get('/:workId', scheduleController.listSchedulesByWorkId);

export default router;
