export default class Stage {
    constructor({id_stage, name, progress, expStartDate, expEndDate, exeStartDate, exeEndDate}) {
        this.id = id_stage || null;
        this.name = name;
        this.progress = progress;
        this.expStartDate = expStartDate;
        this.expEndDate = expEndDate;
        this.exeStartDate = exeStartDate || null;
        this.exeEndDate = exeEndDate || null; 
        this.validate();
    }

    validate = () => {
        if (!this.name) {
            throw new Error("Missing required field: name is required.");
        }

        if (!this.expStartDate || !this.expEndDate) {
            throw new Error("Missing required fields: expected dates are required.");
        }
    };
}