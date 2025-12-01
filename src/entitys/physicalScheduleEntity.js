class PhysicalSchedule {
  constructor(id_work, id_stage) {
    this.id_work = id_work;
    this.id_stage = id_stage;
  }

  validate() {
    if (!this.id_work || !this.id_stage) {
      throw new Error("PhysicalSchedule precisa de id_work e id_stage.");
    }
  }
}
export default PhysicalSchedule;