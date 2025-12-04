export default class Item {
  constructor({
    id,
    id_work,
    id_user,
    id_stage,
    id_substage,
    startDate,
    endDate,
    weather,
    completionPercentage,
    notes,
    status,
    managerRejectionReason,
  }) {
    this.id = id || null;
    (this.id_work = Number(id_work)), (this.id_user = Number(id_user));
    this.id_stage = Number(id_stage);
    this.id_substage = Number(id_substage);
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.weather = weather;
    this.completionPercentage = Number(completionPercentage);
    this.notes = notes;
    (this.status = status ? status : ""),
      (this.managerRejectionReason = managerRejectionReason
        ? managerRejectionReason
        : "");
  }
  validate = () => {
    if (
      !this.id_work ||
      !this.id_user ||
      !this.id_stage ||
      !this.id_substage ||
      !this.startDate ||
      !this.endDate ||
      !this.weather ||
      !this.completionPercentage
    ) {
      throw new Error("Missing required fields");
    }
  };
}
