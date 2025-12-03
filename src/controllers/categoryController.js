import * as categoryService from "../services/categoryService.js";

export const register = async (req, res) => {
  try {
    const data = req.body;
    const category = await categoryService.register({ data });

    res.status(201).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listAllCategoryByWorkId = async (req, res) => {
  try {
    const id = req.params.id;
    const categories = await categoryService.listAllCategoryByWorkId({ id });
    res.status(200).json({ categories });
  } catch {
    res.status(400).json({ error: error.message });
  }
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

export const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteCatego = await categoryService.deleteCategoryById({ id });
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
