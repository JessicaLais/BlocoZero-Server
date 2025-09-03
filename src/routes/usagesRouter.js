import express from "express";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";
import * as usagesController from "../controllers/usagesController.js"

const router = express.Router();

/*#CORPO DA REQUISIÇÃO: REGISTER usages
{
    "itemId":2,    
    "quantity":100,   
    "userId":4,   
    "workId":1,     
    "lote":"abc1234",   
    "usedAt":"2025-08-31",      
    "purpose":"Construção do Hall principal"   
}
*/
//Register Usages System
router.post("/register", verifyBody, usagesController.createUsage)



//List all Usages System
router.get("/list/:workId", usagesController.listUsageByWorkId)


export default router;