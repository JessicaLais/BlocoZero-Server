import express from "express";
import * as userController from "../controllers/userController.js";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";

const router = express.Router();

router.post("/register", verifyBody, userController.createUser);

router.get("/list/:enterprise_id", userController.getAllUsers);

router.get("/specific/:id", userController.getUserId);

router.post("/login", verifyBody, userController.login);

router.put("/update/:id", verifyBody, userController.updateUser);

router.delete("/delete/:id", userController.deleteUser);
export default router;
