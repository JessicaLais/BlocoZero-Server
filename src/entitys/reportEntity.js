export default class Report{
    constructor({id,work_id,manager_id,date_register,percentual,qtd_work,weather,ocurrence,stage,status}){
    this.id = id,
    this.work_id = work_id,
    this.manager_id = manager_id,
    this.date_register = date_register;
    this.percentual = percentual;
    this.qtd_work = qtd_work;
    this.weather = weather;
    this.ocurrence = ocurrence;
    this.stage =stage;
    //this.status = status || 'pendente';

    this.validate()
    }
    
    validate = () => {
        if(!this.date_register || !this.percentual|| !this.qtd_work|| !this.weather
            ||!this.ocurrence||!this.stage){
            throw new Error("Missing required fields");
            }
    }
    updateQtdWorks = (newQtd) => {
        if (newQtd < 0) {
            throw new Error("Quantity of employees cannot be negative");
        }
        this.qtd_work = newQtd;
    }

}