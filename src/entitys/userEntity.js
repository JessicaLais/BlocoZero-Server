export default class User{
    constructor({id, email, name, password, phone, enterprise_id, position}){
        this.id = id || null;
        this.email = email;
        this.name = name
        this.password = password;
        this.phone = phone;
        this.enterprise_id = enterprise_id;
        this.position = position

        this.validate()
    }  

    validate = () => {
        if (!this.email || !this.name || !this.password || !this.phone || !this.position){
            throw new Error("Missing required fields");
        }
    }



    toPublicJson = () => {
        return{
            id: this.id,
            name: this.name,
            position:this.position,
            enterprise_id:this.enterprise_id
        };
    }
}