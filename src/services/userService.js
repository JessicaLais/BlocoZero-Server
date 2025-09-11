//MODELS
import * as userModel from "../models/usersModel.js"

//POO
import User from "../entitys/userEntity.js"

//ENCRIPT PASSWORD
import bcrypt from "bcrypt"


// SERVICE CREATE USER
export const createUser = async (data) =>{
    const emailExisting = await userModel.findUserByEmail({ email: data.email })
    
    if (emailExisting){
        throw new Error ("Email already registered")
    }

    data.password = await bcrypt.hash(data.password, 10)

    const user = new User (data)

    return await userModel.createUser({data:user})
   
}

//SERVICE LIST USERS
export const listAllUser = async () =>{
    const users = await userModel.allUsers() 

    return users.map(item => new User(item))
}

//SERVICE LOGIN USER
export const loginUser = async ({email, password}) => {
    const userData = await userModel.findUserByEmail({email});

    if(!userData){
        throw new Error ("Invalid password or email")
    }

    const user = new User (userData)

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch){
        throw new Error ("Invalid password or email")
    }

    return user.toPublicJson()
}

