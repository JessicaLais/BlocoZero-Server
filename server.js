import express from "express";
import userController from "./src/routes/userRouter.js";
import workRouter from "./src/routes/workRouter.js";
import itemsRouter from "./src/routes/itemsRouter.js"
import usagesRouter from "./src/routes/usagesRouter.js"
import scheduleRouter from "./src/routes/scheduleRouter.js";
import cors from "cors";
import * as middlewares from "./src/middlewares/verifyMiddlewares.js"

const app = express();
const port = 8080;


app.use(cors());
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.send({"Status":"API working"});
});

// Usando as rotas de login
app.use("/user", userController);
app.use("/work", workRouter);
app.use("/items", itemsRouter);
app.use("/usages", usagesRouter);
app.use("/schedule", scheduleRouter); 
app.use("/reports",reportRouter );

//middlewares
app.use(middlewares.verifyRoutes)



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
