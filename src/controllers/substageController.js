import * as substageService from "../services/substageService.js";

// Create (Mantido)
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
    const id = Number(req.params.id); 
    if (isNaN(id)) throw new Error("ID inválido");

    const listAllSubstage = await substageService.listAllSubstageByIdStage({ id });
    res.status(200).json({ subStages: listAllSubstage });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateSubstage = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    
    if (isNaN(id)) throw new Error("ID inválido");

    await substageService.updateSubstage({ id, data });
    res.status(200).json({ response: "updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete
export const deleteSubstage = async (req, res) => {
  try {
    const id = Number(req.params.id);
    
    if (isNaN(id)) throw new Error("ID inválido");

    await substageService.deleteSubstageById(id);
    res.status(200).json({ response: "deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};