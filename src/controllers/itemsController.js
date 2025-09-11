import * as itemsService from "../services/itemsService.js"

export const createItems = async (req, res) => {
    try {
        const data = req.body
        const createItems = await itemsService.createItems({data})
        res.status(200).json({response:"sucess"})
    } catch(error){
        res.status(400).json({error:error.message})
    }
}


export const listAllItemsByWorkId = async (req, res) => {
    try{
        const workId = req.params.workId
        const itemsByWorkId = await itemsService.listAllItemsByWorkId({workId})
        res.status(200).json({itemsByWorkId})
    } catch (error){
        res.status(400).json({error:error.message})
    }
    
}


