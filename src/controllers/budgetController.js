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

export const listBudgetsByWorkId = async (req, res) => {
  try {
    const id = req.params.id;
    const allBudgets = await budgetService.listBudgetsByWorkId({ id });
    res.status(200).json({ allBudgets });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
