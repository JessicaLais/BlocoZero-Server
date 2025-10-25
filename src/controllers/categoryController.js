export const register = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    res.status(200).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
