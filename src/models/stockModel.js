import prisma from "./connectionModel.js";

export const createStockItem = async ({ data }) => {
  return await prisma.stock.create({
    data: {
      id_type: data.id_type,
      id_category: data.id_category,
      id_work: data.id_work,
      code: data.code,
      name: data.name,
      unitMeasure: data.unitMeasure,
      costUnit: data.costUnit,
      costTotal: data.costTotal,
      stockQuantity: data.stockQuantity,
      weightLength: data.weightLength,
      recentInflow: data.actualQuantity,
      cumulativeInflow: data.actualQuantity,
      cumulativeOutflow: data.cumulativeOutflow,
      recentOutflow: data.recentOutflow,
      actualQuantity: data.actualQuantity,
      minQuantity: data.minQuantity,
    },
  });
};

export const getAllStocksByWorkId = async ({ id }) => {
  return await prisma.stock.findMany({
    where: {
      id_work: id,
    },
  });
};

export const getStockItemById = async ({ id }) => {
  return await prisma.stock.findUnique({
    where: { id_stock: id },
    include: { type: true },
  });
};

export const findStockByNameAndCode = async ({ name, code }) => {
  return await prisma.stock.findFirst({
    where: {
      name: name,
      code: code,
    },
  });
};

export const getStockMetrics = async (workId) => {
  const metrics = await prisma.stock.aggregate({
    _sum: {
      recentInflow: true,
      cumulativeInflow: true,
      recentOutflow: true,
      cumulativeOutflow: true,
    },
  });

  return {
    recentInflow: metrics._sum.recentInflow || 0,
    cumulativeInflow: metrics._sum.cumulativeInflow || 0,
    recentOutflow: metrics._sum.recentOutflow || 0,
    cumulativeOutflow: metrics._sum.cumulativeOutflow || 0,
  };
};

export const updateQuantityItemExit = async ({ data }) => {
  return await prisma.stock.update({
    where: {
      id_stock: data.stock_id,
    },
    data: {
      actualQuantity: data.actualQuantity,
      recentOutflow: data.recentOutflow,
      cumulativeOutflow: data.cumulativeOutflow,
    },
  });
};

export const updateQuantityItemEntry = async ({ data }) => {
  return await prisma.stock.update({
    where: {
      id_stock: data.stock_id,
    },
    data: {
      actualQuantity: data.actualQuantity,
      recentInflow: data.recentInflow,
      cumulativeInflow: data.cumulativeInflow,
    },
  });
};

export const updateStockItem = async ({ data, id }) => {
  return await prisma.stock.update({
    where: { id_stock: id },
    data: data,
  });
};

export const deleteStockItem = async ({ id }) => {
  return await prisma.stock.delete({
    where: { id_stock: id },
  });
};
