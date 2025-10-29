import * as stockModel from "../models/stockModel.js";
import  Stock  from "../entitys/stockEntity.js";

// Criar novo item de estoque
export const createStockItem = async ({ data }) => {
  const stockExisting = await stockModel.findStockByNameAndCode({
    name: data.name,
    code: data.code,
  });

  if (stockExisting) {
    throw new Error("Item with the same name and code already exists");
  }

  const fullStockData = {
    ...data,
    stockQuantity: data.stockQuantity !== undefined ? data.stockQuantity : 0,
    actualQuantity: data.actualQuantity !== undefined ? data.actualQuantity : 0,
    recentInflow: data.recentInflow !== undefined ? data.recentInflow : 0,
    recentOutflow: data.recentOutflow !== undefined ? data.recentOutflow : 0,
  };

  const stock = new Stock(fullStockData);
  const createStockDB = await stockModel.createStockItem({ data: stock });

  return createStockDB;
};

// Listar todos os itens
export const listAllStockItems = async () => {
  const items = await stockModel.allStockItems();
  return items.map((item) => new Stock(item));
};

// Buscar item pelo ID
export const getStockItemById = async ({ id }) => {
  const getStock = await stockModel.getStockItemById({ id: Number(id) });
  if (!getStock) {
    throw new Error("Stock item not found");
  }
  return new Stock(getStock);
};

// Atualizar item existente
export const updateStockItem = async ({ data, id }) => {
  id = Number(id);
  const findStock = await stockModel.getStockItemById({ id });
  if (!findStock) {
    throw new Error("Stock item not found");
  }
  const stock = new Stock({ ...findStock, ...data, id_stock: id });
  return await stockModel.updateStockItem({ data: stock, id: stock.id_stock });
};

// Deletar item
export const deleteStockItem = async ({ id }) => {
  id = Number(id);
  const getStock = await stockModel.getStockItemById({ id });
  if (!getStock) {
    throw new Error("Stock item not found");
  }
  return await stockModel.deleteStockItem({ id });
};

// Listar apenas itens disponíveis (quantidade > 0)
export const listAvailableStockItems = async () => {
  const items = await stockModel.availableStockItems();
  return items.map((item) => new Stock(item));
};
