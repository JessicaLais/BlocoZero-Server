import prisma from "./connectionModel.js";

export const getStockMetrics = async (workId) => {
  const metrics = await prisma.stock.aggregate({
    _sum: {
      recentInflow: true,
      cumulativeInflow: true,
      recentOutflow: true,
      cumulativeOutflow: true
    }
  });

  return {
    recentInflow: metrics._sum.recentInflow || 0,
    cumulativeInflow: metrics._sum.cumulativeInflow || 0,
    recentOutflow: metrics._sum.recentOutflow || 0,
    cumulativeOutflow: metrics._sum.cumulativeOutflow || 0
  };
};

export const getAllStocksByWorkId = async (workId) => {
   where: { workId: workId }
  return await prisma.stock.findMany({
    include: {
      type: true,
      category: true
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
};

export const getStockItemById = async ({ id }) => {
  return await prisma.stock.findUnique({
    where: { id_stock: id },
    include: { type: true }
  });
};

export const findStockByNameAndCode = async ({ name, code }) => {
  return await prisma.stock.findFirst({
    where: {
      name: name,
      code: code
    }
  });
};

export const createStockItem = async ({ data }) => {
  return await prisma.stock.create({
    data: data
  });
};

export const updateStockItem = async ({ data, id }) => {
  return await prisma.stock.update({
    where: { id_stock: id },
    data: data
  });
};

export const deleteStockItem = async ({ id }) => {
  return await prisma.stock.delete({
    where: { id_stock: id }
  });
};