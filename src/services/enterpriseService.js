import * as enterpriseModel from "../models/enterpriseModel.js";
import Enterprise from "../entitys/enterpriseEntity.js";

export const createEnterprise = async ({ data }) => {
  const searchEnterpriseByCNPJ = await enterpriseModel.findEnterpriseByCNPJ({
    cnpj: data.cnpj,
  });
  if (searchEnterpriseByCNPJ) {
    throw new Error("Enterprise with this CNPJ already exists");
  }
  const newEnterprise = new Enterprise(data);
  return await enterpriseModel.createEnterprise({ newEnterprise });
};

export const listAllEnterprises = async () => {
  const enterprises = await enterpriseModel.listAllEnterprises();

  return enterprises.map((enterprise) =>
    new Enterprise(enterprise).toPublicJson()
  );
};
