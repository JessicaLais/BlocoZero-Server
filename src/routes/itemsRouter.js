import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as itemsController from "../controllers/itemsController.js"

const router = express.Router();

/*#CORPO DA REQUISIÇÃO: REGISTER items
    {
    "enterprise_id": 0,
    "work_id": 3,
    "code": "123bbbaae",
    "name": "Areia",
    "type": "material",
    "quantity": 1000,
    "unit": "m²",
    "lote": "1020"
}

*/
//Register Items System
router.post("/register", verifyBody, itemsController.createItems)


//List all Items System
router.get("/list/:workId", itemsController.listAllItemsByWorkId);


export default router;