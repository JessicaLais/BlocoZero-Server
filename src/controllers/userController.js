import * as userService from "../services/userService.js"


//CONTROLLER CREATE USER
export const createUser = async (req, res) => {
  try{ 
  const data = req.body

  const createUser = await userService.createUser(data)
  res.status(200).json({response:"sucess"})
  }catch(error){
    res.status(400).json({error: error.message})
  }
 
}

//CONTROLLER LIST USERS
export const getAllUsers = async  (req, res) => {
  const users = await userService.listAllUser()

  res.json(users);
};


//CONTROLLER LOGIN USER
export const login = async (req, res) => {
  try{
    const data = req.body;
    const loginUser = await userService.loginUser({email: data.email, password: data.password })

    res.status(200).json(loginUser);
  } catch(error){
    res.status(400).json({error: error.message})
  }
};
