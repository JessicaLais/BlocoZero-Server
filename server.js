import express from "express";

import userRouter from "./src/routes/userRouter.js";
import workRouter from "./src/routes/workRouter.js";
import budgetRouter from "./src/routes/budgetRouter.js";
import enterpriseRouter from "./src/routes/enterpriseRouter.js";
import typeRouter from "./src/routes/typeRouter.js";
import categoryRouter from "./src/routes/categoryRouter.js";
import stageRouter from "./src/routes/stageRouter.js";
import substage from "./src/routes/substageRouter.js";
import stockRouter from "./src/routes/stockRouter.js";
import physicalScheduleRouter from "./src/routes/scheduleRouter.js";
import financialphysicalRouter from "./src/routes/financialphysicalRouter.js";
import progressReport from "./src/routes/progressReportRouter.js";
import cors from "cors";
import * as middlewares from "./src/middlewares/verifyMiddlewares.js";

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Rota principal
app.get("/ping", (req, res) => {
  res.send("PONG");
});

app.use("/user", userRouter);
app.use("/work", workRouter);
app.use("/budget", budgetRouter);
app.use("/enterprise", enterpriseRouter);
app.use("/type", typeRouter);
app.use("/category", categoryRouter);
app.use("/stage", stageRouter);
app.use("/substage", substage);
app.use("/stock", stockRouter);
app.use("/physicalSchedule", physicalScheduleRouter);
app.use("/financialphysical", financialphysicalRouter);
app.use("/progressReport", progressReport);

app.use((req, res) => {
  middlewares.verifyRoutes(req, res);
});
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/ping`);
});
