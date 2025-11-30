export default class Budget {
  constructor({
    id_budget,
    id_work,
    id_category,
    id_type,
    id_stage,
    id_substage,
    code,
    name,
    unitMeasure,
    cost,
    quantityUsage,
    hours,
    extraHours,
    total,
    Userfunction,
    weightLength,
    createdAt,
    updatedAt,
  }) {
    this.id_budget = id_budget || null;
    this.id_work = id_work;
    this.id_category = id_category;
    this.id_type = id_type;
    this.id_stage = id_stage;
    this.id_substage = id_substage;
    this.code = code;
    this.name = name;
    this.unitMeasure = unitMeasure;
    this.cost = cost;
    this.quantityUsage = quantityUsage;
    this.hours = hours;
    this.extraHours = extraHours;
    this.total = total;
    this.Userfunction = Userfunction || null;
    this.weightLength = weightLength;
    this.createdAt = createdAt || null;
    this.updatedAt = updatedAt || null;

    this.validate();
  }

  validate = () => {
    const fields = {
      id_work: this.id_work,
      id_category: this.id_category,
      id_type: this.id_type,
      id_stage: this.id_stage,
      id_substage: this.id_substage,
    };

    for (const [key, value] of Object.entries(fields)) {
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        (typeof value === "number" && isNaN(value))
      ) {
        throw new Error(`Missing or invalid field in Substage: ${key}`);
      }
    }
  };
}
