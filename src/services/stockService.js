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

  const stockEntity = new Stock(data);
  console.log(stockEntity);

  return await stockModel.createStockItem({ data: stockEntity });
};

export const getStockDashboard = async ({ id }) => {
  id = Number(id);
  const getAllItemsByWorkId = await stockModel.getAllStocksByWorkId({ id });

  return getAllItemsByWorkId.map((item) => new Stock(item));
};

export const registerExit = async ({ stockId, quantity, employeeName }) => {
  const stockItem = await stockModel.getStockItemById({ id: Number(stockId) });

  if (!stockItem) throw new Error("Stock item not found.");

  if (stockItem.actualQuantity < quantity) {
    throw new Error(
      `Insufficient stock. Available: ${stockItem.actualQuantity}`
    );
  }

  const [updatedStock] = await prisma.$transaction([
    prisma.stock.update({
      where: { id_stock: Number(stockId) },
      data: {
        actualQuantity: { decrement: quantity },
        cumulativeOutflow: { increment: quantity },
        recentOutflow: { increment: quantity },
      },
    }),
    prisma.materialUsage.create({
      data: {
        id_stock: Number(stockId),
        employee_name: employeeName || "Unknown",
        material_name: stockItem.name,
        useDate: new Date(),
        quantity: quantity,
        type: stockItem.type?.name || "Material",
        defect: "None",
        code: 0,
      },
    }),
  ]);

  return updatedStock;
};

export const registerEntry = async ({ stockId, quantity }) => {
  return await prisma.stock.update({
    where: { id_stock: Number(stockId) },
    data: {
      actualQuantity: { increment: quantity },
      cumulativeInflow: { increment: quantity },
      recentInflow: { increment: quantity },
    },
  });
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
