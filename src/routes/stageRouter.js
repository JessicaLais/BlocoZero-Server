import express from "express";
import * as stageController from "../controllers/stageController.js";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";

const router = express.Router();

router.post("/cadastro", verifyBody, stageController.createStage);

router.get("/list", stageController.getAllStages);

router.get("/list/:id", stageController.getStageById);

router.put("/update/:id", verifyBody, stageController.updateStage);

router.delete("/delete/:id", stageController.deleteStage);

export default router;