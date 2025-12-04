import * as financialPhysicalModel from "../models/financialphysicalModel.js";
import { getSpecificWork } from "../models/worksModel.js";
import FinancialPhysicalReport from "../entitys/financialphysicalEntity.js";

export const getPhysicalFinancialReport = async ({ id_work }) => {
  const workId = Number(id_work);

  if (isNaN(workId)) {
    throw new Error("ID da obra inválido");
  }

  const searchWorkById = await getSpecificWork({ id: workId });

  if (!searchWorkById) {
    throw new Error("Work not found");
  }

  const reportData = await financialPhysicalModel.getFinancialPhysicalReport(workId);

  if (!reportData) {
    throw new Error("Não foi possível gerar o relatório financeiro");
  }

  return new FinancialPhysicalReport(reportData);
};
