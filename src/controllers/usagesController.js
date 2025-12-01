import * as usagesService from "../services/usagesService.js";

export const createUsage = async (req, res) => {
  try {
    const data = req.body;
    const createUsage = await usagesService.createUsage({ data });
    res.status(201).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listUsageByWorkId = async (req, res) => {
  try {
    const workId = req.params.workId;

    const usagesByWorkId = await usagesService.listUsageByWorkId({ workId });

    res.status(200).json({ usagesByWorkId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
