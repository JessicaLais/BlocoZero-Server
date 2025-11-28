import Type from "../entitys/typeEntity.js";
import * as typeModel from "../models/typeModel.js";
import { getSpecificWork } from "../models/worksModel.js";

export const createType = async ({ data }) => {
  const searchTypeByName = await typeModel.getTypeByName({ data });
  if (searchTypeByName) {
    throw new Error("Existing type");
  }

  const searchWorkById = await getSpecificWork({ id: data.work_id });

  if (!searchWorkById) {
    throw new Error("work not found");
  }

  const type = new Type(data);

  return await typeModel.createType({ data: type });
};

export const listAllTypes = async () => {
  const alltypes = await typeModel.listAllTypes();

  return alltypes.map((item) => new Type(item));
};

export const getTypeById = async ({ id }) => {
  const searchTypeById = await typeModel.getById({ id });

  return new Type(searchTypeById);
};

export const updateType = async ({ id, data }) => {
  id = Number(id);
  const searchTpe = await typeModel.getById({ id });
  if (!searchTpe) {
    throw new Error("type not found");
  }

  const searchWorkById = await getSpecificWork({ id: data.work_id });

  if (!searchWorkById) {
    throw new Error("work not found");
  }

  const type = new Type(data);
  return typeModel.updateType({ id, data });
};

export const deleteType = async ({ id }) => {
  id = Number(id);
  const searchTpe = await typeModel.getById({ id });
  if (!searchTpe) {
    throw new Error("type not found");
  }
  return typeModel.deleteType({ id });
};
