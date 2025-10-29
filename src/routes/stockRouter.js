import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as stockController from "../controllers/stockController.js";

const router = express.Router();

router.get("/", stockController.getAllStockItems);

router.get("/disponiveis", stockController.getAvailableStockItems);

router.get("/:id", stockController.getStockItemById);

router.post("/", verifyBody, stockController.createStockItem);

router.put("/:id", verifyBody, stockController.updateStockItem);

router.delete("/:id", stockController.deleteStockItem);

export default router;
