import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as categoryController from "../controllers/categoryController.js";

const router = express.Router();

//Register Usages System
router.post("/register", verifyBody, categoryController.register);

router.get("/list/:id", categoryController.listAllCategoryByWorkId);

router.put("/update/:id", verifyBody, categoryController.updateCategory);

router.delete("/delete/:id", categoryController.deleteCategory);

export default router;
