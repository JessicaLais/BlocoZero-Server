export default class Budget {
  constructor({
    id_budget,
    code,
    name,
    user_id,
    type,
    category,
    unitMeasure,
    cost,
    stockQuantity,
    hoursWorked,
    costHours,
    extraHours,
    total,
    allocatedStage,
    userFunction,
  }) {
    this.id = id_budget || null;
    this.code = code;
    this.name = name;
    this.user_id = user_id;
    this.type = type;
    this.category = category;
    this.unitMeasure = unitMeasure;
    this.cost = cost;
    this.stockQuantity = stockQuantity;
    this.hoursWorked = hoursWorked;
    this.costHours = costHours;
    this.extraHours = extraHours;
    this.total = total;
    this.allocatedStage = allocatedStage;
    this.userFunction = userFunction;

    this.validade();
  }

  validade = () => {
    if (!this.code || !this.name || !this.type || !this.category) {
      throw new Error("Missing required fields");
    }
  };
}
