import prisma from "./connectionModel.js";

export const findEnterpriseByCNPJ = async ({ cnpj }) => {
  return await prisma.enterprise.findUnique({
    where: {
      cnpj,
    },
  });
};

export const findEntrepriseById = async ({ id }) => {
  return await prisma.enterprise.findUnique({
    where: {
      id_entreprise: id,
    },
  });
};

export const createEnterprise = async ({ newEnterprise }) => {
  return await prisma.enterprise.create({
    data: {
      name: newEnterprise.name,
      cnpj: newEnterprise.cnpj,
      address: newEnterprise.address,
      phone: newEnterprise.phone,
      email: newEnterprise.email,
    },
  });
};

export const listAllEnterprises = async () => {
  return await prisma.enterprise.findMany();
};
