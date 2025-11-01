//MODELS
import * as userModel from "../models/usersModel.js";
import { findEntrepriseById } from "../models/enterpriseModel.js";
//POO
import User from "../entitys/userEntity.js";

//ENCRIPT PASSWORD
import bcrypt from "bcrypt";

// SERVICE CREATE USER
export const createUser = async ({ data }) => {
  const emailExisting = await userModel.findUserByEmail({ email: data.email });
  if (emailExisting) {
    throw new Error("Email already registered");
  }

  const findEnterprise = await findEntrepriseById({ id: data.enterprise_id });
  if (!findEnterprise) {
    throw new Error("Enterprise not found");
  }

  data.password = await bcrypt.hash(data.password, 10);

  const user = new User(data);

  const createUserDB = await userModel.createUser({ data: user });

  return createUserDB;
};

//SERVICE LIST USERS
export const listAllUser = async ({ enterprise_id }) => {
  enterprise_id = Number(enterprise_id);
  const findEnterprise = await findEntrepriseById({ id: enterprise_id });
  if (!findEnterprise) {
    throw new Error("Enterprise not found");
  }

  const users = await userModel.allUsers({ enterprise_id });

  return users.map((item) => new User(item).toPublicJson());
};

//SERVICE LIST SPECIFIC USER
export const getUserId = async ({ user_id }) => {
  const getUserId = await userModel.getUserId({ id: Number(user_id) });
  if (!getUserId) {
    throw new Error("User not found");
  }
  const user = new User(getUserId);
  return user;
};

//SERVICE LOGIN USER
export const loginUser = async ({ email, password }) => {
  const userData = await userModel.findUserByEmail({ email });

  if (!userData) {
    throw new Error("Invalid password or email");
  }

  const user = new User(userData);

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password or email");
  }

  return user.toPublicJson();
};

export const updateUser = async ({ data, id }) => {
  const findUser = await userModel.getUserId({ id: Number(id) });
  if (!findUser) {
    throw new Error("User not found");
  }

  const findEnterprise = await findEntrepriseById({ id: data.enterprise_id });
  if (!findEnterprise) {
    throw new Error("Enterprise not found");
  }

  data.password = await bcrypt.hash(data.password, 10);

  const user = new User({ ...data, id_user: Number(id) });
  console.log(user);
  return await userModel.updateUser({ data: user, id: Number(user.id_user) });
};

export const deleteUser = async ({ id }) => {
  id = Number(id);
  const getUserId = await userModel.getUserId({ id });
  if (getUserId === null) {
    throw new Error("User not found");
  }
  const deleteUser = await userModel.deleteUser({ id });

  return deleteUser;
};
