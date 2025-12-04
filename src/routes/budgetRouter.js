import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as budgetController from "../controllers/budgetController.js";

const router = express.Router();

router.post("/register", verifyBody, budgetController.createBudget);

router.get("/list/:id", budgetController.getAllBudgetsByWorkId);

export default router;
