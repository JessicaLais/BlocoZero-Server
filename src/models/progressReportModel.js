import prisma from "./connectionModel.js";

export const createNewProgressReport = async ({ data, photo }) => {
  return await prisma.progressSubstageReport.create({
    data: {
      id_work: data.id_work,
      id_user: data.id_user,
      id_stage: data.id_stage,
      id_substage: data.id_substage,
      startDate: data.startDate,
      endDate: data.endDate,
      weather: data.weather,
      completionPercentage: data.completionPercentage,
      photo,
      notes: data.notes,
      status: data.status,
      managerRejectionReason: data.managerRejectionReason,
    },
  });
};

export const listAllProgressReportByWorkId = async ({ id }) => {
  return await prisma.progressSubstageReport.findMany({
    where: {
      id_work: id,
    },
  });
};
export const updateReportByEmployee = async ({ id_report, id_user, data, photo }) => {
  return await prisma.progressSubstageReport.updateMany({
    where: {
      id_progressSubstageReport: id_report,
      id_user: id_user,
    },
    data: {
      startDate: data.startDate,
      endDate: data.endDate,
      weather: data.weather,
      completionPercentage: data.completionPercentage,
      photo: photo || undefined,
      notes: data.notes,
    },
  });
};

export const updateReportStatusByManager = async ({ id_report, data }) => {
  const validStatuses = ['PENDENTE', 'APROVADO', 'INVALIDO'];
  if (!validStatuses.includes(data.status)) {
    throw new Error("Status inválido. Use: PENDENTE, APROVADO ou INVALIDO");
  }

  return await prisma.progressSubstageReport.update({
    where: {
      id_progressSubstageReport: id_report,
    },
    data: {
      status: data.status,
      managerRejectionReason: data.status === 'INVALIDO' ? data.managerRejectionReason : null,
    },
  });
};
