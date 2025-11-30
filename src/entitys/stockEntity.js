export default class Stock {
  constructor({
    id_stock,
    id_type,
    id_category,
    id_work,
    code,
    name,
    unitMeasure,
    costUnit,
    costTotal,
    stockQuantity,
    weightLength,
    recentInflow,
    cumulativeInflow,
    cumulativeOutflow,
    recentOutflow,
    actualQuantity,
    minQuantity,
    createdAt,
    updatedAt,
  }) {
    this.id_stock = id_stock || null;
    this.id_type = Number(id_type);
    this.id_category = Number(id_category);
    this.id_work = id_work;
    this.code = code;
    this.name = name;
    this.unitMeasure = unitMeasure;
    this.costUnit = costUnit;
    this.costTotal = costTotal;
    this.stockQuantity = stockQuantity;
    this.weightLength = weightLength;
    this.recentInflow = recentInflow ? recentInflow : 0;
    this.cumulativeInflow = cumulativeInflow ? cumulativeInflow : 0;
    this.cumulativeOutflow = cumulativeOutflow ? cumulativeOutflow : 0;
    this.recentOutflow = recentOutflow ? recentInflow : 0;
    this.actualQuantity = actualQuantity ? actualQuantity : stockQuantity;
    this.minQuantity = minQuantity;
    this.createdAt = createdAt ? new Date(createdAt) : "";
    this.updatedAt = updatedAt ? new Date(updatedAt) : "";
    this.validate();
  }

  validate = () => {
    const fields = {
      id_type: this.id_type,
      id_category: this.id_category,
      id_work: this.id_work,
      code: this.code,
      name: this.name,
      unitMeasure: this.unitMeasure,
      stockQuantity: this.stockQuantity,
      weightLength: this.weightLength,
      minQuantity: this.minQuantity,
      costUnit: this.costUnit,
    };

    for (const [key, value] of Object.entries(fields)) {
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        (typeof value === "number" && isNaN(value))
      ) {
        throw new Error(`Missing or invalid field in Stock: ${key}`);
      }
    }
  };
}
