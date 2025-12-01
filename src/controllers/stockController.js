import * as stockService from "../services/stockService.js";

export const createItem = async (req, res) => {
  try {
    const data = req.body;
    const newItem = await stockService.createStockItem({ data });
    res.status(201).json({ message: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listStockByWorkId = async (req, res) => {
  try {
    const id = req.params.id;
    const listStock = await stockService.listStockByWorkId({ id });

    await res.status(200).json({ stock: listStock });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const id = req.params.id;
    const dashboardData = await stockService.getStockDashboard({ id });
    return res.status(200).json({ stock_items: dashboardData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno." });
  }
};

// POST Saída
export const registerExit = async (req, res) => {
  try {
    const data = req.body;
    const registerExitItem = await stockService.registerExit({ data });
    return res.status(201).json({ message: "sucess" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// POST Entrada
export const registerEntry = async (req, res) => {
  try {
    const data = req.body;
    const registerEntryItem = await stockService.registerEntry({ data });
    return res.status(200).json({ message: "sucess" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// CRUD

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await stockService.updateStockItem({ id, data: req.body });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await stockService.deleteStockItem({ id });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
