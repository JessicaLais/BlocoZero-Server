import express from "express";
import * as userController from "../controllers/userController.js";
import { verifyBody } from "../middlewares/verifyMiddlewares.js";

const router = express.Router();

//List all User  System
router.get("/list", userController.getAllUsers);


/* 
#CORPO DA REQUISIÇÃO: CREATE USER
{
    "email":"joao@blocozero.com",
    "password":"123456",
    "phone": "556188888888",
    "enterprise_id":0,
    "position":"Encarregado"
}
*/
//Create new User
router.post("/register", verifyBody, userController.createUser)


/* 
#CORPO DA REQUISIÇÃO: LOGIN USER
{
    "email":"joao@blocozero.com",
    "password":"123456"
}
*/



//Login User
router.post("/login", verifyBody, userController.login);

export default router;