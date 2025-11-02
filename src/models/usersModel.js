import prisma from "./connectionModel.js";

export const findUserByEmail = async ({ email }) => {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
};

export const createUser = async ({ data }) => {
  return await prisma.user.create({
    data: {
      enterprise_id: data.enterprise_id,
      userFunction: data.userFunction,
      email: data.email,
      password: data.password,
      phone: data.phone,
      works: data.works,
      hourlyRate: data.hourlyRate,
      name: data.name,
      isActive: true,
    },
  });
};

export const allUsers = async ({ enterprise_id }) => {
  return await prisma.user.findMany({
    where: {
      enterprise_id: enterprise_id,
    },
  });
};

export const getUserId = async ({ id }) => {
  return await prisma.user.findUnique({
    where: {
      id_user: id,
    },
  });
};


export const updateUser = async ({ data, id }) => {
  return await prisma.user.update({
    where: { id_user: id },
    data: {
      userFunction: data.userFunction,
      email: data.email,
      password: data.password,
      phone: data.phone,
      works: data.works,
      hourlyRate: data.hourlyRate,
      name: data.name,
    },
  });
};

export const deleteUser = async ({ id }) => {
  return await prisma.user.update({
    where: { id_user: id },
    data: {
      isActive: false,
    },
  });
};
