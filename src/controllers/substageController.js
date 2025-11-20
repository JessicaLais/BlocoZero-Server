import * as substageService from "../services/substageService.js";

export const createSubstage = async (req, res) => {
    try {
        const data = req.body;
        const createSubstage = await substageService.createSubstage({ data });
        res.status(200).json({ response: "success", data: createSubstage });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllSubstages = async (req, res) => {
    try {
        const substages = await substageService.listAllSubstages();
        res.json(substages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getSubstageById = async (req, res) => {
    try {
        const id_substage = req.params.id;
        const getSubstage = await substageService.getSubstageById({ id_substage });
        res.status(200).json(getSubstage);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateSubstage = async (req, res) => {
    try {
        const data = req.body;
        const {id} = req.params;

        const update = await substageService.updateSubstage({ data, id });

        res.status(200).json({ response: "success", data: update });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteSubstage = async (req, res) => {
    try {
        const id = req.params.id; 
        const deleteSubstage = await substageService.deleteSubstage({ id });
        res.status(200).json({ response: "success", data: deleteSubstage });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};