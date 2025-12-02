import express from "express";
import * as substageController from "../controllers/substageController.js";

const router = express.Router();

router.post("/register", substageController.createSubstage);

router.get("/list/:id", substageController.listAllSubstageByIdStage);

router.put("/update/:id", substageController.updateSubstage);

router.delete("/delete/:id", substageController.deleteSubstage);

export default router;