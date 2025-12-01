import * as enterpriseService from "../services/enterpriseService.js";

export const createEnterprise = async (req, res) => {
  try {
    const data = req.body;
    const createEnterprise = await enterpriseService.createEnterprise({ data });
    res.status(201).json({ response: "sucess" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const listAllEnterprises = async (req, res) => {
  const enterprises = await enterpriseService.listAllEnterprises();
  console.log(enterprises);
  res.status(200).json({ enterprises });
};
