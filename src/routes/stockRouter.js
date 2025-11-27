import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as stockController from "../controllers/stockController.js";

const router = express.Router();

router.get("/:workId", stockController.getDashboard);
router.post("/exit", stockController.registerExit);  
router.post("/entry", stockController.registerEntry); 
router.post("/create", stockController.createItem);
router.put("/update/:id", stockController.updateItem);
router.delete("/delete/:id", stockController.deleteItem);


export default router;
