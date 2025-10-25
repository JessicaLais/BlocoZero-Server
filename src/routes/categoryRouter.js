import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as categoryController from "../controllers/categoryController.js";

const router = express.Router();

//Register Usages System
router.post("/register", verifyBody, categoryController.register);

export default router;
