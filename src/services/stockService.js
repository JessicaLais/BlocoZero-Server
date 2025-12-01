import Stock from "../entitys/stockEntity.js";
import * as stockModel from "../models/stockModel.js";
import { getTypeById } from "./typeService.js";
import { getCaterogyById } from "./categoryService.js";
import { getWorkById } from "./workServices.js";

export const createStockItem = async ({ data }) => {
  const stockExisting = await stockModel.findStockByNameAndCode({
    name: data.name,
    code: data.code,
  });
  const searchTypeById = await getTypeById({ id: data.id_type });

  if (!searchTypeById) {
    throw new Error("Type not found");
  }

  const searchCategoryByid = await getCaterogyById({ id: data.category });

  if (!searchCategoryByid) {
    throw new Error("Category not found");
  }

  const searchWorkById = await getWorkById({ id: data.id_work });

  if (!searchWorkById) {
    throw new Error("Work not found");
  }

  if (stockExisting) throw new Error("Item already exists.");
  data.costTotal = data.stockQuantity * data.costUnit;

  const stockEntity = new Stock(data);

  return await stockModel.createStockItem({ data: stockEntity });
};

export const listStockByWorkId = async ({ id }) => {
  id = Number(id);

  const searchWorkById = await getWorkById({ id });

  const listAllStock = await stockModel.getAllStocksByWorkId({ id });

  return listAllStock.map((item) => new Stock(item));
};

export const registerExit = async ({ data }) => {
  const searchItemById = await stockModel.getStockItemById({
    id: data.id_item,
  });
  if (!searchItemById) throw new Error("Item not found");

  if (data.quantity > searchItemById.actualQuantity)
    throw new Error("Invalid quantity");

  //PODERÁ SER IMPLEMENTADA A LÓGICA DE SALVAR OS DADOS DO FUNCIONÁRIO QUE ESTÁ SOLICITANDO A RETIRADA DE MATERIAL, FUTURA TASK
  const dataUpdateItem = {
    stock_id: data.id_item,
    actualQuantity: searchItemById.actualQuantity - data.quantity,
    recentOutflow: data.quantity,
    cumulativeOutflow: searchItemById.cumulativeOutflow + data.quantity,
  };

  return await stockModel.updateQuantityItemExit({
    data: dataUpdateItem,
  });
};

// DESATIVADOS

export const getItemInStockById = async ({ id }) => {
  const searchItemById = await stockModel.getStockItemById({
    id,
  });
  if (!searchItemById) throw new Error("Item not found");
  return searchItemById;
};

export const getStockDashboard = async ({ id }) => {
  id = Number(id);
  const getAllItemsByWorkId = await stockModel.getAllStocksByWorkId({ id });

  return getAllItemsByWorkId.map((item) => new Stock(item));
};

export const registerEntry = async ({ data }) => {
  const searchItemById = await stockModel.getStockItemById({
    id: data.id_item,
  });
  if (!searchItemById) throw new Error("Item not found");

  //PODERÁ SER IMPLEMENTADA A LÓGICA DE SALVAR OS DADOS DO FUNCIONÁRIO QUE ESTÁ INSERINDO MAIS MATERIAIS, FUTURA TASK

  const dataUpdateItem = {
    stock_id: data.id_item,
    actualQuantity: searchItemById.actualQuantity + data.quantity,
    recentInflow: data.quantity,
    cumulativeInflow: searchItemById.cumulativeInflow + data.quantity,
  };
  return await stockModel.updateQuantityItemEntry({ data: dataUpdateItem });
};

export const updateStockItem = async ({ data, id }) => {
  const findStock = await stockModel.getStockItemById({ id: Number(id) });
  if (!findStock) throw new Error("Item not found");

  const { id_stock, ...updateData } = data;
  return await stockModel.updateStockItem({ data: updateData, id: Number(id) });
};

export const deleteStockItem = async ({ id }) => {
  const getStock = await stockModel.getStockItemById({ id: Number(id) });
  if (!getStock) throw new Error("Item not found");
  return await stockModel.deleteStockItem({ id: Number(id) });
};
