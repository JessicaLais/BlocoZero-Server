import express from "express";
import * as obrasController from "../controllers/workController.js";


const router = express.Router();

// Rota GET para listar todas as obras
router.get("/", obrasController.getWorks);
// Rota GET para obter uma obra específica pelo ID
router.get("/:id", obrasController.getSpecificWork);

export default router;
