import prisma from "./connectionModel.js";

export const createType = async ({ data }) => {
  return prisma.type.create({
    data: {
      name: data.name,
    },
  });
};

export const getTypeByName = async ({ data }) => {
  return prisma.type.findFirst({
    where: {
      name: data.name,
    },
  });
};

export const getById = async ({ id }) => {
  return prisma.type.findFirst({
    where: {
      id_type: id,
    },
  });
};

export const listAllTypes = async () => {
  return prisma.type.findMany({});
};

export const updateType = async ({ id, data }) => {
  return prisma.type.update({
    where: {
      id_type: id,
    },
    data: {
      name: data.name,
    },
  });
};

export const deleteType = async ({ id }) => {
  return prisma.type.delete({
    where: {
      id_type: id,
    },
  });
};
