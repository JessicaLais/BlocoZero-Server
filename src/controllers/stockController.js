import * as stockService from "../services/stockService.js";

export const createStockItem = async (req, res) => {
  try {
    const data = req.body;
    await stockService.createStockItem({ data });
    res.status(200).json({ response: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllStockItems = async (req, res) => {
  try {
    const items = await stockService.listAllStockItems();
    res.json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getStockItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await stockService.getStockItemById({ id });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateStockItem = async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    await stockService.updateStockItem({ data, id });
    res.status(200).json({ response: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteStockItem = async (req, res) => {
  try {
    const id = req.params.id;
    await stockService.deleteStockItem({ id });
    res.status(200).json({ response: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAvailableStockItems = async (req, res) => {
  try {
    const items = await stockService.listAvailableStockItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
