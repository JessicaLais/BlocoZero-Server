export default class report{
    constructor({date_register,percentual,qtd_work,weather,ocurrence,stage,status}){
    this.date_register = date_register;
    this.percentual = percentual;
    this.qtd_work = qtd_work;
    this.weather = weather;
    this.ocurrence = ocurrence;
    this.stage =stage;
    this.status = status || 'pendente';

    this.validate()
    }
    
    validate = () => {
        if(!this.date_register || !this.percentual|| !this.qtd_work|| !this.weather
            ||!this.ocurrence||!this.stage){
            throw new Error("Missing required fields");
            }
    }


}