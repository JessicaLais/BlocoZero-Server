import express from "express";
import * as userController from "../controllers/userController.js";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";

const router = express.Router();

//List all User  System
router.get("/list", userController.getAllUsers);

//Create new User
router.post("/register", verifyBody, userController.createUser)

//Login User
router.post("/login", verifyBody, userController.login);

export default router;