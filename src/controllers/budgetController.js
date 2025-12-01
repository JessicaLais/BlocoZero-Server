import * as budgetService from "../services/budgetService.js";

//Create Budget
export const createBudget = async (req, res) => {
  try {
    const data = req.body;
    const budget = await budgetService.createBudget({ data });
    res.status(201).json({ response: "sucess" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
