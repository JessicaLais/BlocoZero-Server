import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as stockController from "../controllers/stockController.js";

const router = express.Router();

<<<<<<< HEAD
router.get("/", stockController.getAllStockItems);

router.get("/disponiveis", stockController.getAvailableStockItems);

router.get("/:id", stockController.getStockItemById);

router.post("/", verifyBody, stockController.createStockItem);

router.put("/:id", verifyBody, stockController.updateStockItem);

router.delete("/:id", stockController.deleteStockItem);
=======
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
>>>>>>> b039a7a138f71e707de9e528a956cc38df61f1ef

export default router;
