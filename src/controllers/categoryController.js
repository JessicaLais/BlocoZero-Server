import * as categoryService from "../services/categoryService.js";

export const register = async (req, res) => {
  try {
    const data = req.body;
    const category = await categoryService.register({ data });
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listAllCategory = async (req, res) => {
  const categories = await categoryService.listAllCategory();
  res.status(200).json({ categories });
};

export const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updateCategory = await categoryService.updateCategory({ id, data });
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteCategory = (req, res) => {
  try {
    const id = req.params.id;

    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
