import * as userService from "../services/userService.js";

//CONTROLLER CREATE USER
export const createUser = async (req, res) => {
  try {
    const data = req.body;
    const createUser = await userService.createUser(data);
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//CONTROLER REGISTER MANAGER-TENDER
export const registerManagerTender = async (req, res) => {
  try {
    const data = req.body;
    const createRelation = await userService.registerManagerTender({ data });
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//CONTROLLER LOGIN USER
export const login = async (req, res) => {
  try {
    const data = req.body;
    const loginUser = await userService.loginUser({
      email: data.email,
      password: data.password,
    });

    res.status(200).json(loginUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//CONTROLLER LIST ALL USERS
export const getAllUsers = async (req, res) => {
  const enterprise_id = req.params.enterprise_id;
  const users = await userService.listAllUser({ enterprise_id });

  res.json(users);
};

//CONTROLLER LIST USER BY ID
export const getUserId = async (req, res) => {
  try {
    const user_id = req.params.id;
    const getUserid = await userService.getUserId({ user_id });
    res.status(200).json(getUserid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//CONTROLLER LIST ALL USERS BY WORK ID
export const getAllManagers = async (req, res) => {
  const enterprise_id = req.params.enterprise_id;
  const getAllManagers = await userService.getAllManagers({ enterprise_id });
  res.status(200).json(getAllManagers);
};

export const getAllTenders = async (req, res) => {
  const enterprise_id = req.params.enterprise_id;
  const getAllTenders = await userService.getAllTenders({ enterprise_id });
  res.status(200).json(getAllTenders);
};

export const updateUser = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;

    const update = await userService.updateUser({ data, id });

    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await userService.deleteUser({ id });
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
