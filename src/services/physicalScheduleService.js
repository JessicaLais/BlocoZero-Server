import * as physicalScheduleModel from "../models/physicalScheduleModel.js";
import PhysicalSchedule from "../entitys/physicalScheduleEntity.js";

export const getWorkSchedule = async (workId) => {
  const phySchedule = await physicalScheduleModel.getScheduleByWorkId(workId);
  const formattedSchedule = phySchedule.map((schedule) => {
    
    const tasks = schedule.substageSchedules;
    let minDate = null;
    let maxDate = null;

    tasks.forEach((task) => {
      const start = new Date(task.expStartDate);
      const end = new Date(task.expEndDate);

      if (!minDate || start < minDate) minDate = start;
      if (!maxDate || end > maxDate) maxDate = end;
    });

    return {
      id_physicalSchedule: schedule.id_physicalSchedule,
      stageName: schedule.stage.name,
      stageId: schedule.stage.id_stage,
      summaryStartDate: minDate,
      summaryEndDate: maxDate,
      tasks: tasks.map(t => ({
        substageName: t.substage.name,
        startDate: t.expStartDate,
        endDate: t.expEndDate,
        duration: t.expDuration,
        progress: t.progress
      }))
    };
  });

  return formattedSchedule;
};

export const createPhysicalSchedule = async (data) => {
  const entity = new PhysicalSchedule(data.id_work, data.id_stage);
  const existing = await physicalScheduleModel.findPhysicalSchedule({
    id_work: entity.id_work,
    id_stage: entity.id_stage
  });

  if (existing) return existing;

  return await physicalScheduleModel.createPhysicalSchedule(entity);
};