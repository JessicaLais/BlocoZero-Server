import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as typeController from "../controllers/typeController.js";

const router = express.Router();

//Register Usages System
router.post("/register", verifyBody, typeController.createType);

router.get("/list", typeController.listAllTypes);

router.put("/update/:id", verifyBody, typeController.updateType);

router.delete("/delete/:id", typeController.deleteType);

export default router;
