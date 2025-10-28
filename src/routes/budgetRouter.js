import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as budgetController from "../controllers/budgetController.js";

const router = express.Router();

router.post("/registerLabor", verifyBody, budgetController.createBudgetLabor);

router.get("/list", budgetController.listAllBudget);

router.put("/update/:id", verifyBody, budgetController.updateBudget);

router.delete("/delete/:id", budgetController.deleteBudget);

export default router;
