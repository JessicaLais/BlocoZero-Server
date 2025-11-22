import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as stockController from "../controllers/stockController.js";

const router = express.Router();

// Listar todos os itens do estoque
router.get("/stockGetAll", stockController.getAllStockItems);

// Listar itens disponíveis (em estoque > 0)
router.get("/stockGetAvailable", stockController.getAvailableStockItems);

// Buscar item por ID
router.get("/stockGetById/:id", stockController.getStockItemById);

// Criar novo item no estoque
router.post("/stockCreate", verifyBody, stockController.createStockItem);

// Atualizar item existente
router.put("/stockUpdate/:id", verifyBody, stockController.updateStockItem);

// Deletar item do estoque
router.delete("/stockDelete/:id", stockController.deleteStockItem);

export default router;
