import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as progressReportController from "../controllers/progressReportController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post(
  "/register",
  upload.single("photo"),
  progressReportController.createNewProgressReport
);

router.get("/list/:id", progressReportController.listAllProgressReportByWorkId);

router.put(
  "/update/:id", 
  upload.single("photo"), 
  progressReportController.updateReportEmployee
);

router.put(
  "/review/:id", 
  progressReportController.reviewReportManager
);

export default router;