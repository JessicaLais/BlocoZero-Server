import * as scheduleModel from "../models/scheduleModel.js";

const MASTER_STAGES_LIST = [
    "Planejamento e Preparação",
    "Serviços Preliminares",
    "Infraestrutura (Fundação)",
    "Estrutura",
    "Alvenaria e Vedação",
    "Cobertura",
    "Instalações",
    "Esquadrias e Vidros",
    "Louças, Metais e Equipamentos",
    "Urbanização e Externos",
    "Revestimentos e Acabamentos",
    "Acabamento Final e Entrega",
];

const formatMonthYear = (date) => {
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${year}`;
};

const getEndOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

const generateMonthRange = (startDate, endDate) => {
    const MONTHS = [];
    let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const lastDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

    while (currentDate <= lastDate) {
        MONTHS.push(formatMonthYear(currentDate));
        currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return MONTHS;
};

export const getScheduleData = async (workId) => {
    
    const rawData = await scheduleModel.getScheduleDataByWorkId(Number(workId));
    const { stockData } = await scheduleModel.getExecutedStockData();
    
    if (!rawData) {
        throw new Error("Work not found or no stages assigned.");
    }

    const resourceMap = new Map();
    rawData.resources.forEach(res => {
        resourceMap.set(res.id_budget, res);
    });

    const executedMap = new Map();
    let totalRealExecuted = 0;

    stockData.forEach(stock => {
        const resource = resourceMap.get(stock.id_budget);
        if (!resource) return;

        const executedValue = stock.cumulativeOutflow * resource.cost;
        totalRealExecuted += executedValue;

        const stageIdKey = resource.allocatedStage;
        
        if (!executedMap.has(stageIdKey)) {
            executedMap.set(stageIdKey, {});
        }
        const monthLabel = formatMonthYear(new Date()); 
        executedMap.get(stageIdKey)[monthLabel] = (executedMap.get(stageIdKey)[monthLabel] || 0) + executedValue;
    });

    const startDate = rawData.start_time;
    const endDate = rawData.end_time;     
    
    if (!startDate || !endDate) {
         throw new Error("Work must have defined start and end dates to generate the schedule timeline.");
    }

    const MONTHS = generateMonthRange(new Date(startDate), new Date(endDate));
    const TODAY = new Date();
    const contractValue = rawData.resources.reduce((acc, res) => acc + res.total, 0);
    
    let totalAccumulatedMonthly = Array(MONTHS.length).fill(0);
    const transformedStagesMap = new Map(); 

    MASTER_STAGES_LIST.forEach(name => {
        transformedStagesMap.set(name, {
            name: name,
            isSubstage: false,
            totalValue: 0,
            monthlyData: MONTHS.map(() => null),
            substages: new Map()
        });
    });

    for (const workStage of rawData.workStages) {
        const stage = workStage.stage;

        const masterItem = transformedStagesMap.get(stage.name);

        if (!masterItem) continue; 

        const itemSchedules = new Map(); 
        
        stage.financialSchedules.forEach(fs => {
            const isSub = !!fs.id_substage;
            const key = isSub ? `substage_${fs.id_substage}` : `stage_${stage.id_stage}`;
            
            if (!itemSchedules.has(key)) {
                itemSchedules.set(key, {
                    name: fs.substage?.name || stage.name,
                    id: fs.id_substage || stage.id_stage,
                    isSubstage: isSub,
                    schedules: [],
                    totalValue: 0,
                });
            }
            
            itemSchedules.get(key).schedules.push(fs);
            itemSchedules.get(key).totalValue += fs.value;
        });

        for (const item of itemSchedules.values()) {
            masterItem.totalValue += item.totalValue;
            const monthlyData = MONTHS.map((month, monthIndex) => {
                const scheduledPlanned = item.schedules.find(s => formatMonthYear(new Date(s.period)) === month);
                const stageKeyForExecuted = item.isSubstage ? `substage_${item.id}` : `stage_${item.id}`;
                const executedMonthValue = executedMap.get(stageKeyForExecuted)?.[month] || 0;
                
                if (scheduledPlanned || executedMonthValue > 0) {
                    const plannedValue = scheduledPlanned?.value || 0;
                    totalAccumulatedMonthly[monthIndex] += plannedValue; 

                    return {
                        executedValue: executedMonthValue,
                        plannedValue: plannedValue,
                        percentage: scheduledPlanned?.percentage || 0,
                        isExecuted: executedMonthValue > 0 
                    };
                }
                return null;
            });
            
            // Adiciona Subetapa à Etapa Mestra
            if (item.isSubstage) {
                 masterItem.substages.set(item.name, { ...item, monthlyData });
            } else {
                 // Se for a própria Stage, atualiza o monthlyData
                 masterItem.monthlyData = monthlyData;
            }
        }
    }
    
    const transformedStages = [];
    
    for (const item of transformedStagesMap.values()) {
        transformedStages.push({
            name: item.name,
            isSubstage: false,
            totalValue: item.totalValue,
            monthlyData: item.substages.size === 0 ? item.monthlyData : MONTHS.map(() => null) 
        });
        item.substages.forEach(sub => {
            transformedStages.push({
                name: sub.name,
                isSubstage: true,
                totalValue: sub.totalValue,
                monthlyData: sub.monthlyData
            });
        });
    }

    const totalMonthly = totalAccumulatedMonthly;
    let accumulated = 0;
    const totalAccumulated = totalMonthly.map(monthlyTotal => {
        accumulated += monthlyTotal;
        return accumulated;
    });

    const currentMonthLabel = formatMonthYear(TODAY);
    const currentMonthIndex = MONTHS.indexOf(currentMonthLabel);
    const currentMonthValue = totalAccumulatedMonthly[currentMonthIndex] || 0; 

    return {
        header: {
            contractValue: contractValue,
            currentMonthValue: currentMonthValue,
            available: contractValue - totalRealExecuted, 
            months: MONTHS, 
        },

        stages: transformedStages.filter(s => s.totalValue > 0 || s.substages?.size > 0), // Opcional: Filtra etapas sem dados.
        footer: {
            totalMonthly: totalMonthly,
            totalAccumulated: totalAccumulated,
        }
    };
};