import * as workServices from '../services/workServices.js';

export const getWorks = (req, res) => {
    const works = workServices.getAllWorks();
    res.status(200).json(works);
};

export const getSpecificWork = (req, res) => {
    const workID = Number(req.params.id);
    const work = workServices.getWorkById(workID);

    if (work) {
        res.status(200).json(work);
    } else {
        res.status(404).json({ message: "Work not found" });
    }
};
