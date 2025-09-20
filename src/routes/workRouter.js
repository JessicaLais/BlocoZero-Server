import express from "express";
import * as workController from "../controllers/workController.js";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";

const router = express.Router();


//List all works
router.get("/list", workController.getAllWorks);

/* 
#CORPO DA REQUISIÇÃO: REGISTER WORK
{
    "enterprise_id":1,
    "enterprise_name":"Espindola Empreendimentos",
    "title":"Residencial Jardim das Flores",
    "location":"Rio de Janeiro - RJ",
    "employees":30,
    "budget":10000000,
    "startDate":"2024-01-15",
    "endDate":"2028-01-15",
    "progress":50,
    "description":"Desenvolvimento de um condomínio residencial com 50 unidades habitacionais.",
    "status":"Fase de acabamento",
    "photoUrl":"https://img.dfimoveis.com.br/fotos/468058/ff49e8efe4a663efa4cbd24230329e6d.webp"
}
*/
//Create new Work
router.post ("/register", verifyBody, workController.createWork )


//List specific work by id
router.get("/:id", workController.getSpecificWork);

export default router;
