// src/routes/scheduleRouter.js
import express from "express";
import * as scheduleController from "../controllers/scheduleController.js";

const router = express.Router();

router.get("/:workId", scheduleController.getSchedule);

export default router;