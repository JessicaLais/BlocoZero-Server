import prisma from "./connectionModel.js";

export const register = async ({ data }) => {
  return prisma.category.create({
    data: {
      name: data.name,
      id_type: data.id_type,
    },
  });
};

export const searchCategoryByName = async ({ data }) => {
  return prisma.category.findFirst({
    where: {
      name: data.name,
    },
  });
};

export const searchCategoryById = ({ id_category }) => {
  return prisma.category.findFirst({
    where: { id_category },
  });
};

export const searchCategoryByTypeId = ({ id }) => {
  return prisma.category.findFirst({
    where: {
      id_type: id,
    },
  });
};

export const listAllCategory = async () => {
  return prisma.category.findMany();
};

export const updateCategory = async ({ id_category, data }) => {
  return prisma.category.update({
    where: { id_category },
    data: {
      name: data.name,
      id_type: data.id_type,
    },
  });
};
