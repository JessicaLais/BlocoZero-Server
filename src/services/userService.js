//MODELS
import * as userModel from "../models/usersModel.js";

//POO
import User from "../entitys/userEntity.js";

//ENCRIPT PASSWORD
import bcrypt from "bcrypt";

// SERVICE CREATE USER
export const createUser = async (data) => {
  const emailExisting = await userModel.findUserByEmail({ email: data.email });

  if (emailExisting) {
    throw new Error("Email already registered");
  }

  data.password = await bcrypt.hash(data.password, 10);

  const user = new User(data);
  const createUserDB = await userModel.createUser({ data: user });

  if (user.userFunction === "manager") {
    return await userModel.createManager({ user_id: createUserDB.id });
  } else if (user.userFunction === "tender") {
    return await userModel.createTender({
      user_id: createUserDB.id,
      enterprise_id: user.enterprise_id,
    });
  } else {
    return;
  }
};

//SERVICE REGISTER MANAGER-TENDER
export const registerManagerTender = async ({ data }) => {
  const idExistingManager = await userModel.findManagerById({
    user_id: data.manager_id,
  });

  const idExistingTender = await userModel.findTenderById({
    user_id: data.tender_id,
  });
  if (!idExistingManager || !idExistingTender) {
    throw new Error("Id manager or Id tender non-existent");
  }
  return await userModel.createManagerTender({
    manager_id: idExistingManager.id,
    tender_id: idExistingTender.id,
  });
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
//SERVICE LIST USERS
export const listAllUser = async ({ enterprise_id }) => {
  enterprise_id = Number(enterprise_id);
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
  return user.toPublicJson();
};

//LIST ALL MANAGER'S AND TENDER'S ASSOCIATED
// SERVICE LIST ALL MANAGER'S AND TENDER'S ASSOCIATED
export const getAllManagers = async ({ enterprise_id }) => {
  enterprise_id = Number(enterprise_id);
  const managers = await userModel.getAllManagers({ enterprise_id });

  return managers.map((manager) => {
    const managerUser = new User(manager.user);

    return {
      id: manager.id,
      user_id: manager.user_id,
      work_id: manager.work_id,
      user: managerUser.toPublicJson(),
      tenders: manager.managerTender.map((relation) => {
        const tenderUser = new User(relation.tender.user);
        return {
          id: relation.id,
          tender_id: relation.tender_id,
          tender: {
            ...relation.tender,
            user: tenderUser.toPublicJson(),
          },
        };
      }),
    };
  });
};

//LIST ALL TENDER'S AND MANAGER'S ASSOCIATED
// SERVICE LIST ALL MANAGER'S AND TENDER'S ASSOCIATED
export const getAllTenders = async ({ enterprise_id }) => {
  enterprise_id = Number(enterprise_id);
  const tenders = await userModel.getAllTenders({ enterprise_id });

  return tenders.map((tender) => {
    const tenderUser = new User(tender.user);

    return {
      id: tender.id,
      user_id: tender.user_id,
      work_id: tender.work_id,
      user: tenderUser.toPublicJson(),
      managers: tender.managerTender.map((relation) => {
        const managerUser = new User(relation.manager.user);
        return {
          id: relation.id,
          manager_id: relation.manager_id,
          manager: {
            ...relation.manager,
            user: managerUser.toPublicJson(),
          },
        };
      }),
    };
  });
};

export const updateUser = async ({ data, id }) => {
  data.password = await bcrypt.hash(data.password, 10);

  const user = new User({ ...data, id });

  return await userModel.updateUser({ data: user, id: Number(user.id) });
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
