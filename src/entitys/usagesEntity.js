export default class Usages {
    constructor ({id,itemId, quantity, userId, workId, lote, usedAt, purpose}){
        this.id = id || null;
        this.itemId = itemId;
        this.quantity = quantity;
        this.userId = userId;
        this.workId = workId;
        this.lote = lote
        this.usedAt = usedAt;
        this.purpose = purpose

        this.validate()
    }
    validate = () => {
        if(!this.itemId || !this.quantity || !this.userId || !this.workId || !this.lote || !this.usedAt || !this.purpose){
            throw new Error("Missing required fields");
        }
    };

    updateDate = (dataFormatted)  => {
        this.usedAt = dataFormatted 
    }
}