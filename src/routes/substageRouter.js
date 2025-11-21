import express from "express";
import * as substageController from "../controllers/substageController.js";

const router = express.Router();


router.post("/cadastro", substageController.createSubstage);

router.get("/list", substageController.getAllSubstages);

router.get("/list/:id", substageController.getSubstageById);

router.put("/update/:id", substageController.updateSubstage);

router.delete("/delete/:id", substageController.deleteSubstage);

export default router;