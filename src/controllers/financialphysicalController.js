import * as financialphysicalService from "../services/financialphysicalService.js";

export const getFinancialReportController = async (req, res) => {
  try {
    const { workId } = req.params;
    const report = await financialphysicalService.getPhysicalFinancialReport({
      id_work: workId,
    });
    return res.status(200).json(report);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};