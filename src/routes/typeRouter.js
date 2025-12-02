import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as typeController from "../controllers/typeController.js";

const router = express.Router();

router.post("/register", verifyBody, typeController.createType);

router.get("/list/:id", typeController.listAllTypesByWorkId);

router.put("/update/:id", verifyBody, typeController.updateType);

router.delete("/delete/:id", typeController.deleteType);

export default router;
