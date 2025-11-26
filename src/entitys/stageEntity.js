export default class Stage {
  constructor({
    id_stage,
    name,
    progress,
    expStartDate,
    expEndDate,
    exeStartDate,
    exeEndDate,
  }) {
    this.id_stage = id_stage || null;
    this.name = name;
    this.progress = progress || 0;

    this.expStartDate = new Date(expStartDate);
    this.expEndDate = new Date(expEndDate);

    this.exeStartDate = exeStartDate
      ? new Date(exeStartDate)
      : new Date("0001-01-01T00:00:00Z");

    this.exeEndDate = exeEndDate
      ? new Date(exeEndDate)
      : new Date("0001-01-01T00:00:00Z");

    this.validate();
  }

  validate() {
    if (!this.name || !this.expStartDate || !this.expEndDate) {
      throw new Error("Missing required fields");
    }
  }
}
