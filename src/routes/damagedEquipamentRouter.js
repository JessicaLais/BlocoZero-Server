import express from "express";
import * as damagedEquipamentController from "../controllers/damagedEquipamentController.js";

//Middleware
import { verifyBody } from "../middlewares/verifyMiddlewares.js";

const router = express.Router();

router.get(
  "/list/:workId",
  damagedEquipamentController.getAllDamagedEquipament
);

router.post(
  "/register",
  verifyBody,
  damagedEquipamentController.registerDamagedEquipament
);

export default router;
