import express from "express";
import * as physicalScheduleController from "../controllers/physicalScheduleController.js";

const router = express.Router();

router.get("/list/:id_work", physicalScheduleController.getSchedule);

export default router;