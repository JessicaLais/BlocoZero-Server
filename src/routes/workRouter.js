import express from "express";
import * as workController from "../controllers/workController.js";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

//npm install express multer sqlite3
//Create new Work
router.post("/register", upload.single("photo"), workController.createWork);

//List all works (3)
router.get("/list/:enterprise_id", workController.getAllWorks);

router.get("/photo/:id", workController.getPhotosByWorkId);

//List all works by page number (MANAGER)
router.get(
  "/list/:enterprise_id/page/:pageNumber",
  workController.getWorksPageId
);

//List specific work by id
router.get("/specific/:id", workController.getSpecificWork);

//CALCULAR NÚMERO DE FUNCIONÁRIOS ATIVOS EM UMA OBRA

//Update specific work by id
router.put(
  "/update/:id",
  upload.single("photo"),
  workController.updateWorkById
);

//Delete specific work by id (desactived)
router.delete("/delete/:id", workController.deleteWorkById);
export default router;
