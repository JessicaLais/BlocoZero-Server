import express from "express";
import * as enterpriseController from "../controllers/enterpriseController.js";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";

const router = express.Router();

router.post("/register", verifyBody, enterpriseController.createEnterprise);

router.get("/list", enterpriseController.listAllEnterprises);

export default router;
