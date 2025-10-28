export default class Budget {
  constructor({
    id_budget,
    id_work,
    id_category,
    id_type,
    code,
    allocatedStage,
    name,
    unitMeasure,
    weightLength,
    stockQuantity,
    Userfunction,
    cost,
    hours,
    extraHours,
    total,
  }) {
    (this.id_budget = id_budget),
      (this.id_work = id_work),
      (this.id_category = id_category),
      (this.id_type = id_type),
      (this.code = code),
      (this.allocatedStage = allocatedStage),
      (this.name = name);
    (this.cost = cost), (this.total = total);
    if (code.includes("TRAB -")) {
      (this.unitMeasure = "h"),
        (this.weightLength = 0),
        (this.stockQuantity = 0),
        (this.Userfunction = Userfunction),
        (this.hours = hours),
        (this.extraHours = extraHours || 0);
    }

    this.validate();
  }

  validate = () => {
    if (!this.id_work) {
      throw new Error("Missing required field: id_work");
    }
    if (!this.id_category) {
      throw new Error("Missing required field: id_category");
    }
    if (!this.id_type) {
      throw new Error("Missing required field: id_type");
    }
    if (!this.code) {
      throw new Error("Missing required field: code");
    }
    if (!this.name) {
      throw new Error("Missing required field: name");
    }

    // Valida campos específicos para TRAB
    if (this.code.includes("TRAB -")) {
      if (!this.Userfunction) {
        throw new Error("Missing required field: Userfunction");
      }
      if (!this.hours && this.hours !== 0) {
        throw new Error("Missing required field: hours");
      }
    }
  };
}
