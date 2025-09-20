export default class DamagedEquipament {
    constructor ({id, itemId, userId, workId, status, note, reportedAt }){
        this.id = id || null;
        this.itemId = itemId;
        this.userId = userId;
        this.workId = workId;
        this.status = status;
        this.note = note;
        this.reportedAt = reportedAt || null;
        
        this.validate()
    }

    validate = () => {
        if (!this.itemId || !this.userId || !this.workId  || !this.note) {
        throw new Error("Missing required fields");
        }
    };




}