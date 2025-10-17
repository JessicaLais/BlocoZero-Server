import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as budgetController from "../controllers/budgetController.js";

const router = express.Router();

router.post("/registerLabor", verifyBody, budgetController.createBudgetLabor);

router.get("/list/:id", budgetController.listBudgetsByWorkId);

export default router;
