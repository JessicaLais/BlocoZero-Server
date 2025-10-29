import prisma from "./connectionModel.js";

export const findStockByNameAndCode = async ({ name, code }) => {
  return await prisma.stock.findFirst({
    where: {
      name: name,
      code: code,
    },
  });
};

export const createStockItem = async ({ data }) => {
  return await prisma.stock.create({
    data: {
      id_budget: data.id_budget,
      id_type: data.id_type,
      id_category: data.id_category,
      code: data.code,
      name: data.name,
      unitMeasure: data.unitMeasure,
      stockQuantity: data.stockQuantity,
      allocatedStage: data.allocatedStage,
      weightLength: data.weightLength,
      recentInflow: data.recentInflow,
      cumulativeInflow: data.cumulativeInflow,
      cumulativeOutflow: data.cumulativeOutflow,
      recentOutflow: data.recentOutflow,
      actualQuantity: data.actualQuantity,
      minQuantity: data.minQuantity,
    },
  });
};

export const allStockItems = async () => {
  return await prisma.stock.findMany();
};

export const updateStockItem = async ({ data, id }) => {
  return await prisma.stock.update({
    where: {
      id_stock: id,
    },
    data: {
      id_budget: data.id_budget,
      id_type: data.id_type,
      id_category: data.id_category,
      code: data.code,
      name: data.name,
      unitMeasure: data.unitMeasure,
      stockQuantity: data.stockQuantity,
      allocatedStage: data.allocatedStage,
      weightLength: data.weightLength,
      recentInflow: data.recentInflow,
      cumulativeInflow: data.cumulativeInflow,
      cumulativeOutflow: data.cumulativeOutflow,
      recentOutflow: data.recentOutflow,
      actualQuantity: data.actualQuantity,
      minQuantity: data.minQuantity,
    },
  });
};

export const deleteStockItem = async ({ id }) => {
  return await prisma.stock.delete({
    where: {
      id_stock: id,
    },
  });
};

export const availableStockItems = async () => {
  return await prisma.stock.findMany({
    where: {
      actualQuantity: { gt: 0 },
    },
  });
};
