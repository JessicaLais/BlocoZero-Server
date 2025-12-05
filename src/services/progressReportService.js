import { getWorkById } from "./workServices.js";
import { getUserId } from "./userService.js";
import { listStageById } from "./stageService.js";
import { getSubstageById } from "./substageService.js";
import * as progressReportModel from "../models/progressReportModel.js";

import ProgressReport from "../entitys/progressReportEntity.js";

export const createNewProgressReport = async ({ data, photo }) => {
  const searchWorkById = await getWorkById({ id: Number(data["id_work"]) });
  const searchUserById = await getUserId({ user_id: Number(data["id_user"]) });
  const searchStageByid = await listStageById({ id: Number(data["id_stage"]) });
  const searchSubstageByid = await getSubstageById({
    id: Number(data["id_substage"]),
  });

  const progressReport = new ProgressReport(data);
  console.log(photo);

  return await progressReportModel.createNewProgressReport({
    data: progressReport,
    photo,
  });
};

export const listAllProgressReportByWorkId = async ({ id }) => {
  id = Number(id);
  await getWorkById({ id });

  const getAllProgressReport =
    await progressReportModel.listAllProgressReportByWorkId({ id });

  return getAllProgressReport;
};
