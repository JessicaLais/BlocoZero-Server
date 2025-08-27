import  * as allWorks  from '../models/worksModel.js';

// Retorna todos os trabalhos
export const getAllWorks = () => {
    return allWorks.works.map(({id, title, enterprise, photoUrl, startDate, endDate, budget, employees, progress}) => ({
        id,
        title,
        enterprise,
        photoUrl, 
        startDate,
        endDate,
        budget,
        employees,
        progress,
})) 
};

const worksByID = allWorks.works.reduce((acc, work)=>{
    acc[work.id] = work
    return acc;
}, {})

const searcWorkById = (id) => worksByID[id]

// Retorna um trabalho específico pelo ID
export const getWorkById = (id) => {
    return searcWorkById(id);
};
