import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as stageController from "../controllers/stageController.js";

const router = express.Router();

router.post("/register", verifyBody, stageController.createStage);
router.get("/", stageController.getAllStages);
router.get("/:id", stageController.getStageById);
router.put("/:id", verifyBody, stageController.updateStage);
router.delete("/:id", stageController.deleteStage);

export default router;
