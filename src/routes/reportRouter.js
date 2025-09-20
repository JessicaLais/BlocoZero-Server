import express from "express";
//import upload from "../middlewares/multer.js";
//import {Imagem} from "../controllers/reportController.js"
import * as reportController from "../controllers/reportController.js";


const router = express.Router();

router.post("/relatorio", reportController.createReport);


export default router;
