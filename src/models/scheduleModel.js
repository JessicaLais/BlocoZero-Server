/*import prisma from "./connectionModel.js";

export const getScheduleDataByWorkId = async (workId) => {
    return await prisma.work.findUnique({
        where: {
            id_work: workId,
        },
        select: {
            start_time: true,
            end_time: true, 


            resources: {
                select: {
                    id_budget: true,
                    code: true,
                    cost: true,
                    total: true,
                    allocatedStage: true,
                },
            },
            workStages: {
                select: {
                    stage: {
                        select: {
                            id_stage: true,
                            name: true,

                            financialSchedules: {
                                select: {
                                    value: true,
                                    percentage: true,
                                    period: true,
                                    id_substage: true, 
                                    substage: {
                                        select: {
                                            id_substage: true,
                                            name: true,
                                        }
                                    }
                                },
                                orderBy: {
                                    period: 'asc',
                                }
                            }
                        }
                    }
                }
            }
        }
    });
};


export const getExecutedStockData = async () => {
    
    // Simplificando a busca de execução para fins de demonstração
    const stockData = await prisma.stock.findMany({
        select: {
            id_stock: true,
            cumulativeOutflow: true, // Saídas Acumuladas
            id_budget: true, // FK para Resource (Orçamento)
        }
    });

    return { stockData };
};*/