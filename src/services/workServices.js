//Models
import  * as workModel  from '../models/worksModel.js';

//POO
import Work from "../entitys/workEntity.js"




//CREATE WORK
export const createWork = async (data) => {
    data.startDate = new Date (data.startDate)
    data.endDate = new Date (data.endDate)

    const work = new Work(data)

  
    return await (workModel.createWork(work))
}


// GET ALL WORKES
export const getAllWorks = async () => {
    const works = await (workModel.getAllWorks())

    return works.map(item => new Work(item))
}



//GET SPECIFIC WORK BY ID
export const getSpecificWork = async ({ id }) => {
  if (isNaN(id)){
    throw new Error("Invalid ID: please provide a numeric value");
  }

  const getSpecificWork = await workModel.getSpecificWork({ id: Number(id)});

  if (!getSpecificWork) {
    throw new Error("No work found with this id");
  }

  return new Work(getSpecificWork)
};
