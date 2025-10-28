export default class Stage {
  constructor({id_stage,name,substage,progress,expStartDate,expEndDate,exeStartDate,exeEndDate,work_id,mainStageId,}) {
    this.id = id_stage || null;
    this.name = name;
    this.substage = substage;
    this.progress = progress;
    this.expStartDate = expStartDate;
    this.expEndDate = expEndDate;
    this.exeStartDate = exeStartDate || null; // [0..1] significa opcional
    this.exeEndDate = exeEndDate || null;     // [0..1] significa opcional
    this.work_id = work_id;
    this.mainStageId = mainStageId;

    this.validate();
  }

  validate = () => {
    if (!this.name || !this.substage) {
      throw new Error("Missing required fields: name and substage are required.");
    }

    if (!this.expStartDate || !this.expEndDate) {
      throw new Error("Missing required fields: expected dates are required.");
    }
  };
}