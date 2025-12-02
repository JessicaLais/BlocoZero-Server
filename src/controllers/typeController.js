import * as typeService from "../services/typeService.js";
export const createType = async (req, res) => {
  try {
    const data = req.body;
    const type = await typeService.createType({ data });
    res.status(201).json({ message: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listAllTypesByWorkId = async (req, res) => {
  try {
    const id = req.params.id;
    const allTypes = await typeService.listAllTypesByWorkId({ id });
    res.status(200).json({ types: allTypes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateType = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updateType = await typeService.updateType({ id, data });
    res.status(200).json({ message: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteType = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteType = await typeService.deleteType({ id });
    res.status(200).json({ message: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
