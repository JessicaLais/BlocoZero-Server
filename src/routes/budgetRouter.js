import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as budgetController from "../controllers/budgetController.js";

const router = express.Router();

router.post("/register", verifyBody, budgetController.registerbudget);

export default router;
