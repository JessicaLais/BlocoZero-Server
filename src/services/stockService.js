import Stock from "../entitys/stockEntity.js"; 
import * as stockModel from "../models/stockModel.js";
import prisma from "../models/connectionModel.js"; 

export const getStockDashboard = async (workId) => {
  const cards = await stockModel.getStockMetrics(Number(workId));
  const rawStocks = await stockModel.getAllStocksByWorkId(Number(workId));

  const tableData = rawStocks.map(item => {
    return {
      id: item.id_stock,
      code: item.code,
      name: item.name,
      type: item.type?.name || "-",
      category: item.category?.name || "-",
      unitMeasure: item.unitMeasure,
      allocatedStage: item.allocatedStage, 
      stockQuantity: item.stockQuantity,      
      weightLength: item.weightLength,
      actualQuantity: item.actualQuantity,    
      minQuantity: item.minQuantity,
      recentInflow: item.recentInflow,
      recentOutflow: item.recentOutflow
    };
  });

  return {
    cards: {
      inflow: { recent: cards.recentInflow, cumulative: cards.cumulativeInflow },
      outflow: { recent: cards.recentOutflow, cumulative: cards.cumulativeOutflow }
    },
    stockList: tableData
  };
};

export const registerExit = async ({ stockId, quantity, employeeName }) => {
    const stockItem = await stockModel.getStockItemById({ id: Number(stockId) });
    
    if (!stockItem) throw new Error("Stock item not found.");

    if (stockItem.actualQuantity < quantity) {
        throw new Error(`Insufficient stock. Available: ${stockItem.actualQuantity}`);
    }

    const [updatedStock] = await prisma.$transaction([
        prisma.stock.update({
            where: { id_stock: Number(stockId) },
            data: {
                actualQuantity: { decrement: quantity },
                cumulativeOutflow: { increment: quantity },
                recentOutflow: { increment: quantity },
            }
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
                code: 0 
            }
        })
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
        }
    });
};

export const createStockItem = async ({ data }) => {
  if (!data.id_budget) throw new Error("id_budget is required.");

  const stockExisting = await stockModel.findStockByNameAndCode({
    name: data.name,
    code: data.code,
  });

  if (stockExisting) throw new Error("Item already exists.");

  const fullStockData = {
    ...data,
    id_budget: Number(data.id_budget),
    stockQuantity: Number(data.stockQuantity ?? 0),
    actualQuantity: Number(data.actualQuantity ?? data.stockQuantity ?? 0),
    minQuantity: Number(data.minQuantity ?? 0),
    cumulativeInflow: 0,
    cumulativeOutflow: 0,
    recentInflow: 0,
    recentOutflow: 0
  };

  const stockEntity = new Stock(fullStockData);
  return await stockModel.createStockItem({ data: stockEntity });
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