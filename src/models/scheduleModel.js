/*import prisma from "./connectionModel.js"

export const findScheduleByWorkId = async (workId) => {
  return await prisma.scheduleTask.findMany({
    where: {
      workId: workId,
    },
  });
};
*/

const scheduleTasks = [
{
    id: 1,
    workId: 1,
    name: 'Projeto Inicial',
    startDate: '2024-03-25T00:00:00.000Z',
    endDate: '2024-04-04T00:00:00.000Z',
    duration: 9,
    dependency: null, 
    progress: 59,
    status: 'on-time' 
},
{
    id: 2,
    workId: 1,
    name: 'Planejamento',
    startDate: '2024-03-25T00:00:00.000Z',
    endDate: '2024-03-26T00:00:00.000Z',
    duration: 2,
    dependency: 1,
    progress: 100,
    status: 'ahead'
},
{
    id: 3,
    workId: 1,
    name: 'Desenvolvimento',
    startDate: '2024-03-26T00:00:00.000Z',
    endDate: '2024-04-01T00:00:00.000Z',
    duration: 5,
    dependency: 2,
    progress: 60,
    status: 'on-time'
},
{
    id: 4,
    workId: 1,
    name: 'Teste',
    startDate: '2024-04-02T00:00:00.000Z',
    endDate: '2024-04-04T00:00:00.000Z',
    duration: 3,
    dependency: 3,
    progress: 30,
    status: 'delayed'
},
{
    id: 5,
    workId: 1,
    name: 'Implantação',
    startDate: '2024-04-05T00:00:00.000Z',
    endDate: '2024-04-10T00:00:00.000Z',
    duration: 5,
    dependency: 4,
    progress: 0,
    status: 'delayed'
}
];

export const findScheduleByWorkId = async (workId) => {
    const tasks = scheduleTasks.filter(task => task.workId === workId);
    return tasks;
};

