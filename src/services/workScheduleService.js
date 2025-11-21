/*import * as substageModel from "../models/substageModel.js";
import Substage from "../entitys/substageEntitys.js";
import prisma from "../models/connectionModel.js";

export const registerInitialSchedule = async ({ workId, stageId, substageName, startDate, endDate }) => {
    
    let substage = await substageModel.findSubstageByName({ name: substageName });

    if (!substage) {
        const durationMs = new Date(endDate).getTime() - new Date(startDate).getTime();
        const expDuration = Math.ceil(durationMs / (1000 * 3600 * 24));
        
        const substageEntity = new Substage({
            name: substageName,
            expDuration: expDuration,
            progress: 0.0
        });

        substage = await substageModel.createSubstage({ data: substageEntity });
    }

    const existingRelations = await prisma.stageSubstage.findMany({
        where: {
            substageId: substage.id_substage,
        }
    });
    
    const isAlreadyMappedToDifferentStage = existingRelations.some(rel => rel.stageId !== stageId);
    
    if (isAlreadyMappedToDifferentStage) {
         throw new Error(`The Substage "${substageName}" is already allocated to a different Stage in the system.`);
    }

    const stageSubstage = await prisma.stageSubstage.create({
        data: {
            stageId: stageId,
            substageId: substage.id_substage,
            expStartDate: new Date(startDate), 
            expEndDate: new Date(endDate),
        }
    });
    await prisma.workStage.upsert({
        where: {
            workId_stageId: { workId: workId, stageId: stageId }
        },
        update: {},
        create: { workId: workId, stageId: stageId },
    });
    
    return { 
        substageName: substage.name, 
        stageId: stageId,
        startDate: stageSubstage.expStartDate,
        endDate: stageSubstage.expEndDate,
        message: "Item de cronograma inicial criado e vinculado com sucesso."
    };
};*/