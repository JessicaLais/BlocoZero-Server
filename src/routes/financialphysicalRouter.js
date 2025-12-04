import express from "express";
import * as financialphysicalController from "../controllers/financialphysicalController.js";

const router = express.Router();

router.get(
  "/list/:workId",
  financialphysicalController.getFinancialReportController
);

export default router;