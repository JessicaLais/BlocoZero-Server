import express from "express";

//ROUTERS
import userRouter from "./src/routes/userRouter.js";
import workRouter from "./src/routes/workRouter.js";
//import itemsRouter from "./src/routes/itemsRouter.js";
//import usagesRouter from "./src/routes/usagesRouter.js";
//import scheduleRouter from "./src/routes/scheduleRouter.js";
import stageRouter from "./src/routes/stageRouter.js";
//import damagedEquipamentRouter from "./src/routes/damagedEquipamentRouter.js";
import budgetRouter from "./src/routes/budgetRouter.js";
import enterpriseRouter from "./src/routes/enterpriseRouter.js";
import typeRouter from "./src/routes/typeRouter.js";
import categoryRouter from "./src/routes/categoryRouter.js";
import stockRouter from "./src/routes/stockRouter.js";
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

// Usando as rotas de login
app.use("/user", userRouter);
app.use("/work", workRouter);
app.use("/budget", budgetRouter);

//app.use("/items", itemsRouter);
//app.use("/usages", usagesRouter);
//app.use("/schedule", scheduleRouter);
app.use("/stage", stageRouter);
//app.use("/damagedEquipament", damagedEquipamentRouter);
app.use("/enterprise", enterpriseRouter);
app.use("/type", typeRouter);
app.use("/category", categoryRouter);
app.use("/stock", stockRouter);

//middlewares
app.use(middlewares.verifyRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}/ping`);
});
