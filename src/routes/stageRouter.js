import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as stageController from "../controllers/stageController.js";

const router = express.Router();

router.post("/register", verifyBody, stageController.createStage);

router.get("/list/:id_work", stageController.listAllStageByWorkId);

router.put("/update/:id", stageController.updateStage);

router.delete("/delete/:id", stageController.deleteStage);

export default router;
