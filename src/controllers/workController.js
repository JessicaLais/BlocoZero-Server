import * as workServices from '../services/workServices.js';

export const createWork = async (req, res) => {
    try{
        const data = req.body
        const createWork = await workServices.createWork(data)
        res.status(200).json({createWork})
    } catch (error){
        res.status(400).json({error:error.message})
    }
}


export const getAllWorks = async (req, res) => {
    const works = await (workServices.getAllWorks())
    res.status(200).json(works);
};

export const getSpecificWork = async (req, res) => {
    try{
        const id = req.params.id
        
        const getSpecificWork = await (workServices.getSpecificWork({id}))
        
        res.status(200).json(getSpecificWork);
    }catch (error){
        res.status(400).json({error:error.message})
    }
   
    
};
