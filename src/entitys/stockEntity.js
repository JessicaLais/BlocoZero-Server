export default class Stock {
  constructor({
    id_stock,
    id_budget,
    id_type,
    id_category,
    code,
    name,
    unitMeasure,
    stockQuantity,
    allocatedStage,
    weightLength,
    actualQuantity,
    minQuantity,
    recentInflow,
    cumulativeInflow,
    recentOutflow,
    cumulativeOutflow,
    createdAt,  
    updatedAt
  }) {
    this.id_stock = id_stock || null;
    this.id_budget = Number(id_budget);
    this.id_type = Number(id_type);
    this.id_category = Number(id_category);
    this.code = code;
    this.name = name;
    this.unitMeasure = unitMeasure;
    this.allocatedStage = allocatedStage;
    this.stockQuantity = Number(stockQuantity);
    this.weightLength = Number(weightLength);
    this.actualQuantity = actualQuantity !== undefined ? Number(actualQuantity) : Number(stockQuantity);
    this.minQuantity = Number(minQuantity);
    this.recentInflow = Number(recentInflow || 0);
    this.cumulativeInflow = Number(cumulativeInflow || 0);
    this.recentOutflow = Number(recentOutflow || 0);
    this.cumulativeOutflow = Number(cumulativeOutflow || 0);
    this.createdAt = createdAt ? new Date(createAt) : undefined;
    this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
    this.validate();
  }

  validate = () => {
    const fields = {
      id_budget: this.id_budget,
      id_type: this.id_type,
      id_category: this.id_category,
      code: this.code,
      name: this.name,
      unitMeasure: this.unitMeasure,
      stockQuantity: this.stockQuantity,
      allocatedStage: this.allocatedStage,
      weightLength: this.weightLength,
    };

    for (const [key, value] of Object.entries(fields)) {
      if (value === null || value === undefined || value === '' || (typeof value === 'number' && isNaN(value))) {
        throw new Error(`Missing or invalid field in Stock: ${key}`);
      }
    }
  };

}