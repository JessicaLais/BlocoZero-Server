import * as substageModel from "../models/substageModel.js";
import Substage from "../entitys/substageEntitys.js";

export const createSubstage = async ({ data }) => {
  const substageExisting = await substageModel.findSubstageByName({
    name: data.name,
  });
  if (substageExisting) {
    throw new Error(`The Substage "${data.name}" already exists`);
  }

  const substageEntity = new Substage(data);
  const createSubstage = await substageModel.createSubstage({
    data: substageEntity,
  });

  return createSubstage;
};
