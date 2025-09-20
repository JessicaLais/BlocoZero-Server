import * as reportModel from "../models/reportModel.js"
import Report from "../entitys/reportEntity.js"


export const createReport = async (data) => {
    data.date_register = new Date (data.date_register)
    data.percentual = parseFloat(data.percentual.replace("%", ""))
    
    const report = new Report(data)

    return await (reportModel.createReport(report))
}
