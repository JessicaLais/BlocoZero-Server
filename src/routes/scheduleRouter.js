import express from "express";
import * as physicalScheduleController from "../controllers/physicalScheduleController.js";

const router = express.Router();

router.get("/physicalSchedule/:id_work", physicalScheduleController.getSchedule);

export default router;