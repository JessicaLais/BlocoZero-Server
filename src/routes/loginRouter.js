import express from "express";
import * as loginController from "../controllers/loginController.js";

const router = express.Router();

// Rota GET de teste (lista usuários)
router.get("/", loginController.getAllUsers);

// Rota POST para login
router.post("/", loginController.login);

export default router;
