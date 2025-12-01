import * as stageService from "../services/stageService.js";

export const createStage = async (req, res) => {
  try {
    const data = req.body;
    const createStage = await stageService.createStage({ data });
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listAllStageByWorkId = async (req, res) => {
  try {
    const id_work = req.params.id_work;
    const stages = await stageService.listAllStageByWorkId({ id_work });
    res.status(200).json({ stages });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateStage = async (req, res) => {
  try {
    const id_stage = req.params.id;
    const data = req.body;
    const updateStage = await stageService.updateStage({ id_stage, data });
    res.status(201).json({ message: "sucess" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteStage = async (req, res) => {
  try {
    const id_stage = req.params.id;
    const deleteStage = await stageService.deleteStage({ id_stage });
    res.status(200).json({ message: "sucess" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
