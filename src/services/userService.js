import * as usersModel from "../models/usersModel.js"
import bcrypt from "bcrypt"

// SERVICE CREATE USER
export const createUser = async (data) =>{
    if (!data.name || !data.email || !data.password || !data.position) {
        console.log(data)
        throw new Error ("Missing required fields")
    }


    const emailExisting = await usersModel.findUserByEmail({ email: data.email })
    
    if (emailExisting){
        throw new Error ("Email already registered")
    }

    const password  = data.password
    const hashPassword = await bcrypt.hash(password, 10);
    return await (usersModel.createUser({ name: data.name, email: data.email, password:hashPassword, enterprise_id: data.enterprise_id, position: data.position, phone:data.phone }));
    
}

//SERVICE LIST USERS
export const listAllUser = async () =>{
    const users = await usersModel.allUsers() 

    return users
}

//SERVICE LOGIN USER
export const loginUser = async ({email, password}) => {
    const user = await usersModel.findUserByEmail({email});

    if(!user){
        throw new Error ("User not found")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch){
        return ({name:user.name, position: user.position, enterprise_id:user.enterprise_id})
    }else {
        throw new Error ("Invalid password")
    }
   
}

