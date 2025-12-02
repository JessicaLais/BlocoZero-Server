import Type from "../entitys/typeEntity.js";
import * as typeModel from "../models/typeModel.js";
//import { getSpecificWork } from "../models/worksModel.js";
import { getWorkById } from "./workServices.js";

export const createType = async ({ data }) => {
  const searchTypeByName = await typeModel.getTypeByName({ data });
  if (searchTypeByName) {
    throw new Error("Existing type");
  }

  const searchWorkById = await getWorkById({ id: data.work_id });

  const type = new Type(data);

  return await typeModel.createType({ data: type });
};

export const listAllTypesByWorkId = async ({ id }) => {
  id = Number(id);
  const searchWorkById = await getWorkById({ id });

  const alltypes = await typeModel.listAllTypesByWorkId({ id });

  return alltypes.map((item) => new Type(item));
};

export const getTypeById = async ({ id }) => {
  const searchTypeById = await typeModel.getById({ id });
  if (!searchTypeById) throw new Error("Type not found");
  return new Type(searchTypeById);
};

export const updateType = async ({ id, data }) => {
  id = Number(id);
  const searchTpe = await typeModel.getById({ id });
  if (!searchTpe) {
    throw new Error("type not found");
  }
  const searchWorkById = await getWorkById({ id: data.work_id });

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

export const getTypeByName = async ({ name }) => {
  const searchTypeByName = await typeModel.getTypeByName({ data: name });
  if (!searchTypeByName) {
    throw new Error("Type not found");
  }
  return searchTypeByName;
};
