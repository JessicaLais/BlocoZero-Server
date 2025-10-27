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

export const getAllStages = async (req, res) => {
  try {
    const stages = await stageService.listAllStages();
    res.json(stages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getStageById = async (req, res) => {
  try {
    const stage_id = req.params.id;
    const getStage = await stageService.getStageById({ stage_id });
    res.status(200).json(getStage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateStage = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;

    const update = await stageService.updateStage({ data, id });

    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteStage = async (req, res) => {
  try {
    const id = req.params.id; // Este é o id_stage
    const deleteStage = await stageService.deleteStage({ id });
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};