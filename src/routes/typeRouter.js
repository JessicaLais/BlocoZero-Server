import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as typeController from "../controllers/typeController.js";

const router = express.Router();

//Register Usages System
router.post("/register", verifyBody, verifyBody, typeController.createType);

export default router;
