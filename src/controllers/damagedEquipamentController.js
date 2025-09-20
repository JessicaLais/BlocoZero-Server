import * as damagedEquipamenteService from "../services/damagedEquipamentService.js"

export const getAllDamagedEquipament = async (req, res) => {
    try {
        const { workId } = req.params;
        const damagedEquipament = await damagedEquipamenteService.getAllDamagedEquipament({id: workId})
        res.status(200).json({damagedEquipament})
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export const registerDamagedEquipament = async (req, res) => {
    try {
         const data = req.body
         const newDamagedEquipament = await damagedEquipamenteService.registerDamagedEquipament({data})
         res.status(200).json({response:"sucess"})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
   
}