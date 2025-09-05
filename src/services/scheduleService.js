
import * as scheduleModel from '../models/scheduleModel.js'; 

// Função para buscar o cronograma e calcular as estatísticas
export const getScheduleData = async (workId) => {
    const workIdNumber = Number(workId);
    if (isNaN(workIdNumber)) {
        throw new Error("ID da obra inválido. Forneça um valor numérico.");
    }

    const rawTasks = await scheduleModel.findScheduleByWorkId(workIdNumber);
    if (!rawTasks || rawTasks.length === 0) {
        throw new Error("Nenhum cronograma encontrado para esta obra.");
    }

    // Função auxiliar para renomear as chaves de uma tarefa
    const formatTaskForFrontend = (task) => ({
        TaskID: task.id,
        TaskName: task.name,
        StartDate: task.startDate,
        EndDate: task.endDate,
        Duration: task.duration,
        Progress: task.progress,
        Predecessor: task.dependency 
    });
    //tarefa principal
    const parentTaskRaw = rawTasks.find(task => task.dependency === null);
    
    // Separa as tarefas secundarias
    const childTasksRaw = rawTasks.filter(task => task.dependency !== null);

    let formattedTasks = [];

    if (parentTaskRaw) {
    const parentTaskFormatted = formatTaskForFrontend(parentTaskRaw);
    parentTaskFormatted.subtasks = childTasksRaw.map(formatTaskForFrontend);
    formattedTasks.push(parentTaskFormatted);
    } else {
        formattedTasks = rawTasks.map(formatTaskForFrontend);
    }

    const totalTasks = rawTasks.length;
    let onTimeCount = 0;
    let aheadCount = 0;
    let delayedCount = 0;

    rawTasks.forEach(task => {
    switch (task.status) {
        case 'on-time':
            onTimeCount++;
            break;
        case 'ahead':
            aheadCount++;
            break;
        case 'delayed':
            delayedCount++;
            break; 
        }
    }
);

const stats = {
onTimePercentage: totalTasks > 0 ? ((onTimeCount / totalTasks) * 100).toFixed(0) : 0,
aheadPercentage: totalTasks > 0 ? ((aheadCount / totalTasks) * 100).toFixed(0) : 0,
delayedPercentage: totalTasks > 0 ? ((delayedCount / totalTasks) * 100).toFixed(0) : 0,
};

return {stats, tasks: formattedTasks};
};