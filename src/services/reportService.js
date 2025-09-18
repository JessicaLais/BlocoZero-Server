import * as reportModel from "../models/reportModel.js"
import Report from "../entitys/reportEntity.js"


export const createReport = async (data) => {

  if (!data.stage || !data.date_register || !data.percentual) {
        throw new Error("Etapa, data de registro e percentual sao obrigatorios")
    }

    data.date_register = new Date (data.date_register)
    data.percentual = parseFloat(data.percentual.replace("%", ""))
    
    const report = new Report(data)

    return await (reportModel.createReport(report))
}
