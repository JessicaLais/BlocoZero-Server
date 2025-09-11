export default class Work {
    constructor ({id, enterprise_id, enterprise_name, title, location, employees, budget, startDate, start_date, endDate, end_date, progress, description, status, photoUrl, photo_url}) {
        this.id = id || null;
        this.enterprise_id = enterprise_id;
        this.enterprise = enterprise_name;
        this.title = title;
        this.location = location;
        this.employees = employees;
        this.budget = budget;
        this.startDate = startDate || start_date ;
        this.endDate = endDate || end_date;
        this.progress = progress;
        this.description = description;
        this.status = status;
        this.photoUrl = photoUrl || photo_url;

        //this.validate()

    }
    validate = () => {
        if (!this.enterprise || !this.title || !this.location || !this.employees || !this.budget || !this.startDate || !this.endDate 
            || !this.progress || !this.description || !this.status || !this.photoUrl) {
                throw new Error("Missing required fields");
            }
    }
}