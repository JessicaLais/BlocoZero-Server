import * as budgetService from "../services/budgetService.js";

//Create Budget
export const createBudgetLabor = async (req, res) => {
  try {
    const data = req.body;
    const budget = await budgetService.createBudgetLabor({ data });
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const listAllBudget = async (req, res) => {
  const listAllBudget = await budgetService.listAllBudget();
  res.status(200).json(listAllBudget);
};

export const updateBudget = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updateBudget = await budgetService.updateBudget({ id, data });
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteBudget = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBudget = await budgetService.deleteBudget({ id });
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
