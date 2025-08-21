const works = [{
    id: 1,
    enterprise:"Leite e CIA LTDA",
    title: "Prédio Beira Rio - São Paulo",
    location: "São Paulo - SP",
    employees:45,
    budget: 1500000,
    startDate: "2025-01-15",
    endDate: "2026-01-15",
    progress: "25%",
    description: "Construção de um prédio comercial de 10 andares às margens do rio Tietê.",
    status: "Em andamento",
    photoUrl: "https://img.dfimoveis.com.br/fotos/913452/37f5c831b5bbbe1e7563e258d6b9a92a.jpg"
},
{
    id: 2,
    enterprise:"Construtora Alfa",
    title: "Residencial Jardim das Flores",
    location: "Rio de Janeiro - RJ",
    employees:30,
    budget: 800000,
    startDate: "2024-06-01",
    endDate: "2025-06-01",
    progress: "50%",
    description: "Desenvolvimento de um condomínio residencial com 50 unidades habitacionais.",
    status: "Fase de acabamento",
    photoUrl: "https://img.dfimoveis.com.br/fotos/468058/ff49e8efe4a663efa4cbd24230329e6d.webp"
}];


const responseFiltered = works.map(({id, title, enterprise, photoUrl, startDate, endDate}) => ({
        id,
        title,
        enterprise,
        photoUrl, 
        startDate,
        endDate 
})) 

const worksById = works.reduce((acc, work) => {
    acc[work.id] = work
    return acc;
}, {})

const searchWorkById = (id) => worksById[id];

export const getWorks = (req, res) => {
    res.json(responseFiltered);
};

export const getSpecificWork = (req, res) => {
    //console.time("getWork");
    const workID = Number(req.params.id);
    const responseToFunction = searchWorkById(workID);
    if (responseToFunction) {
        res.status(200).json(responseToFunction);
    } else {
        res.status(404).json({ message: "Work not found" });
    }
    //console.timeEnd("getWork");

}


