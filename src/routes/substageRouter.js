import express from "express";
import * as substageController from "../controllers/substageController.js";

const router = express.Router();

router.post("/register", substageController.createSubstage);

export default router;
