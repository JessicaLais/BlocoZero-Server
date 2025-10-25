export const createType = (req, res) => {
  try {
    console.log("tô aqui");
    res.status(200).json({ message: "tá aqui" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
