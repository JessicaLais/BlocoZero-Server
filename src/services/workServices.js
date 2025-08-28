import  * as workModel  from '../models/worksModel.js';

export const createWork = async (data) => {
    if ( !data.enterprise_name || !data.title || !data.location || !data.employees || !data.budget || !data.startDate || 
        !data.endDate || !data.progress || !data.description || !data.status || !data.photoUrl){
            throw new Error ("Missing required fields")
    }   
    const startDate = new Date(data.startDate)
    const endDate = new Date (data.endDate)

    return await (workModel.createWork(data, startDate, endDate))
}


// Retorna todos os trabalhos
export const getAllWorks = async () => {
    const getAllWorks = await (workModel.getAllWorks())
    
    if(getAllWorks) {
        return getAllWorks.map(({id, title, enterprise_name, photo_url,  start_date, end_date, budget, employees, progress } ) => ({
        id,
        title,
        enterprise: enterprise_name,
        photoUrl: photo_url, 
        startDate: start_date,
        endDate: end_date,
        budget,
        employees,
        progress
        }))
};
}

export const getSpecificWork = async ({id}) => {
    const getSpecificWork = await (workModel.getSpecificWork({id}));

    if(!getSpecificWork){
        throw new Error ("No work found with this id")
       
    }
    return (getSpecificWork)
    
}