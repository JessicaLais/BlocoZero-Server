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
