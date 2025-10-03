import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
//import upload from "../middlewares/multer.js";
//import {Imagem} from "../controllers/reportController.js"
import * as reportController from "../controllers/reportController.js";


const router = express.Router();

router.post("/relatorio", verifyBody, reportController.createReport);


export default router;
