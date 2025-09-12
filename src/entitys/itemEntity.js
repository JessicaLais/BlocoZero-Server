export default class Item {
    constructor ({id, enterpise_id, work_id, code, name, type, quantity, unit, lote}) {
        this.id = id || null;
        this.enterpise_id = 0;
        this.work_id = work_id;
        this.code = code;
        this.name = name;
        this.type = type;
        this.quantity = quantity;
        this.unit = unit;
        this.lote = lote;

        this.validate()
    }
    validate = () => {
        if (!this.work_id || !this.code || !this.name || !this.type || !this.quantity || !this.unit || !this.lote) {
        throw new Error("Missing required fields");
        }
    };


    updateQuantity = (newQuantity) => {
        if(newQuantity < 0 ){
            throw new Error ("Quantity cannot be negative");
        }else if (this.quantity < newQuantity){
            throw new Error ("Quantity not available in stock");
        }
        this.quantity = this.quantity - newQuantity

        
    }
    requestEquipament = (equipmentData) => {
        if (equipmentData.quantity <= 0){
            throw new Error("Requested quantity must be greater than zero")
        }

            this.code = equipmentData.code,
            this.name = equipmentData.name,
            this.type = equipmentData.type,
            this.quantity = equipmentData.quantity,
            this.unit = equipmentData.unit,
            this.lote = equipmentData.lote,
            this.status = "Pending",
            this.requested_at = new Date()

    }
}