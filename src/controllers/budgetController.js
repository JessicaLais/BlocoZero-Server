export const createBudget = async (req, res) => {
  try {
    const data = req.body;

    res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
