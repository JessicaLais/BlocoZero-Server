export default class Schedule{
    constructor({id, work_id,manager_id,stage,responsable, progress, date_start,date_end }){
    this.id = id,
    this.work_id = work_id;
    //this.manager_id = manager_id,
    this.stage = stage;
    this.responsable = responsable;
    this.progress = progress;
    this.date_start = date_start;
    this.date_end = date_end;
    }

    validate = () => {
    if (!this.stage || !this.responsable || !this.progress || !this.date_start || !this.date_end) {
        throw new Error("Missing required fields");
        }
    }
}