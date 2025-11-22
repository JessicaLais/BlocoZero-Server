export default class Stock {
  constructor({id_stock,id_budget,id_type,id_category,code,name,unitMeasure,stockQuantity,allocatedStage,weightLength,recentInflow,cumulativeInflow,cumulativeOutflow,recentOutflow,actualQuantity,minQuantity,}) {
    this.id_stock = id_stock || null;
    this.id_budget = id_budget;
    this.id_type = id_type;
    this.id_category = id_category;
    this.code = code;
    this.name = name;
    this.unitMeasure = unitMeasure;
    this.stockQuantity = stockQuantity;
    this.allocatedStage = allocatedStage;
    this.weightLength = weightLength;
    this.recentInflow = recentInflow || 0;
    this.cumulativeInflow = cumulativeInflow || 0;
    this.cumulativeOutflow = cumulativeOutflow || 0;
    this.recentOutflow = recentOutflow || 0;
    this.actualQuantity = actualQuantity || 0;
    this.minQuantity = minQuantity || 0;

    this.validate();
  }
   validate() {
    if (
      !this.id_budget ||
      !this.id_type ||
      !this.id_category ||
      !this.code ||
      !this.name ||
      !this.unitMeasure
    ) {
      throw new Error("Missing required fields");
    }
    if (this.stockQuantity < 0 || this.actualQuantity < 0) {
      throw new Error("Quantities cannot be negative");
    }
  }
  isDisponivel() {
    return this.actualQuantity > 0;
  }
};