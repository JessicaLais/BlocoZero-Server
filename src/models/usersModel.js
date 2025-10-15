import prisma from "./connectionModel.js";

export const findUserByEmail = async ({ email }) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findManagerById = async ({ user_id }) => {
  return await prisma.manager.findUnique({
    where: {
      user_id,
    },
  });
};

export const findTenderById = async ({ user_id }) => {
  return await prisma.tender.findUnique({
    where: {
      user_id,
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
    where: { id },
  });
};

export const getAllManagers = async ({ enterprise_id }) => {
  return await prisma.manager.findMany({
    where: {
      enterprise_id,
    },
    include: {
      user: true, // traz os dados do usuário do gestor
      managerTender: {
        include: {
          tender: {
            include: {
              user: true, // traz os dados do usuário do encarregado
            },
          },
        },
      },
    },
  });
};

export const getAllTenders = async ({ enterprise_id }) => {
  return await prisma.tender.findMany({
    where: {
      enterprise_id,
    },
    include: {
      user: true, // traz os dados do usuário do gestor
      managerTender: {
        include: {
          manager: {
            include: {
              user: true, // traz os dados do usuário do encarregado
            },
          },
        },
      },
    },
  });
};

export const createUser = async ({ data }) => {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      enterprise_id: data.enterprise_id,
      userFunction: data.userFunction,
      phone: data.phone,
      hourlyRate: data.hourlyRate,
    },
  });
};

export const createManager = async ({ user_id, enterprise_id }) => {
  return await prisma.manager.create({
    data: {
      user_id,
      enterprise_id,
    },
  });
};

export const createTender = async ({ user_id, enterprise_id }) => {
  return await prisma.tender.create({
    data: {
      user_id,
      enterprise_id,
    },
  });
};

export const createManagerTender = async ({ manager_id, tender_id }) => {
  return await prisma.managerTender.create({
    data: {
      manager_id,
      tender_id,
    },
  });
};

export const updateUser = async ({ data, id }) => {
  return await prisma.user.update({
    where: { id },
    data: {
      userFunction: data.userFunction,
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      isActive: data.isActive,
    },
  });
};

export const deleteUser = async ({ id }) => {
  return await prisma.user.update({
    where: { id },
    data: {
      isActive: false,
    },
  });
};
