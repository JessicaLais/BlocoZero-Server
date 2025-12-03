import prisma from "./connectionModel.js";

export const createType = async ({ data }) => {
  return prisma.type.create({
    data: {
      name: data.name,
      work_id: data.work_id,
    },
  });
};

export const getTypeByName = async ({ data }) => {
  return prisma.type.findFirst({
    where: {
      name: data.name,
    },
  });
};

export const getById = async ({ id }) => {
  return prisma.type.findFirst({
    where: {
      id_type: id,
    },
  });
};

export const listAllTypesByWorkId = async ({ id }) => {
  return prisma.type.findMany({
    where: {
      work_id: id,
    },
  });
};

export const updateType = async ({ id, data }) => {
  return prisma.type.update({
    where: {
      id_type: id,
    },
    data: {
      name: data.name,
      work_id: data.work_id,
    },
  });
};

export const deleteType = async ({ id }) => {
  return await prisma.$transaction(async (tx) => {
    // 1️⃣ Dependentes de STOCK
    await tx.materialUsage.deleteMany({
      where: { stock: { id_type: id } },
    });

    await tx.substageStock.deleteMany({
      where: { materialStock: { id_type: id } },
    });

    // 2️⃣ Tabelas diretamente ligadas a TYPE

    await tx.budget.deleteMany({
      where: { id_type: id },
    });

    await tx.equipmentRequest.deleteMany({
      where: { id_type: id },
    });

    await tx.budgetReport.deleteMany({
      where: { id_type: id },
    });

    await tx.substageCategoryType.deleteMany({
      where: { typeId: id },
    });

    await tx.stock.deleteMany({
      where: { id_type: id },
    });

    await tx.category.deleteMany({
      where: { id_type: id },
    });

    // 3️⃣ Por último, deletar o TYPE
    return await tx.type.delete({
      where: { id_type: id },
    });
  });
};
