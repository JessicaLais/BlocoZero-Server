import express from "express";
import * as userController from "../controllers/userController.js";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";

const router = express.Router();

router.post("/register", verifyBody, userController.createUser);

router.post(
  "/register/managerTender",
  verifyBody,
  userController.registerManagerTender
);

router.post("/login", verifyBody, userController.login);

router.get("/list/:enterprise_id", userController.getAllUsers);

router.get("/listManagers/:enterprise_id", userController.getAllManagers);

router.get("/listTenders/:enterprise_id", userController.getAllTenders);

router.get("/listSpecificUser/:id", userController.getUserId);

router.put("/updateUser/:id", verifyBody, userController.updateUser);

router.delete("/deleteUser/:id", userController.deleteUser);
export default router;
