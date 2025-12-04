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

export default router;
