import * as substageService from "../services/substageService.js";

export const createSubstage = async (req, res) => {
  try {
    const data = req.body;
    const createSubstage = await substageService.createSubstage({ data });
    res.status(201).json({ response: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listAllSubstageByIdStage = async (req, res) => {
  try {
    const id = req.params.id;
    const listAllSubstage = await substageService.listAllSubstageByIdStage({
      id,
    });
    res.status(200).json({ subStages: listAllSubstage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
