import express from "express";
import userController from "./src/routes/userRouter.js";
import workRouter from "./src/routes/workRouter.js";
import cors from "cors";

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

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
