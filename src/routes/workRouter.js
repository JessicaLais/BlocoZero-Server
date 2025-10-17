import express from "express";
import * as workController from "../controllers/workController.js";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";

const router = express.Router();

//Create new Work
router.post("/register", verifyBody, workController.createWork);

//List all works (3) (MANAGER)
router.get("/list/:enterprise_id", workController.getAllWorks);

//List all works by page number (MANAGER)
router.get(
  "/list/:enterprise_id/page/:pageNumber",
  workController.getWorksPageId
);

router.get("/list/tender/:tender_id", workController.getAllWorkTender);

router.get(
  "/list/tender/:tender_id/page/:pageNumber",
  workController.getWorksTenderPageId
);
//List specific work by id
router.get("/list/specificWork/:id", workController.getSpecificWork);

//CALCULAR NÚMERO DE FUNCIONÁRIOS ATIVOS EM UMA OBRA

//Update specific work by id
router.put("/updateWork/:id", verifyBody, workController.updateWorkById);

//Delete specific work by id (desactived)
router.delete("/deleteWork/:id", workController.deleteWorkById);
export default router;
