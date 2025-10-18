import prisma from "./connectionModel.js";

export const findEntrepriseById = async ({ id }) => {
  return await prisma.enterprise.findUnique({
    where: {
      id,
    },
  });
};
