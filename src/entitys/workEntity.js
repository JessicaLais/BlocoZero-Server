export default class Work {
  constructor({
    id_work,
    id_enterprise,
    title,
    cnpj,
    address,
    cep,
    budget,
    start_time,
    end_time,
    description,
    photo_url,
    tender_id,
    isActive,
  }) {
    this.id_work = id_work || null;
    this.id_enterprise = id_enterprise;
    this.title = title;
    this.cnpj = cnpj;
    this.address = address;
    this.cep = cep;
    this.budget = budget;
    this.start_time = new Date(start_time);
    this.end_time = new Date(end_time);
    this.description = description;
    this.photo_url = photo_url;
    this.tender_id = tender_id;
    this.isActive = isActive;

    this.validate();
  }
  validate = () => {
    if (
      this.id_enterprise === null ||
      this.id_enterprise === undefined ||
      !this.title ||
      !this.cnpj ||
      !this.address ||
      !this.cep ||
      !this.budget ||
      !this.start_time ||
      !this.end_time ||
      !this.description
    ) {
      throw new Error("Missing required fields");
    }
  };

  smallInformation = () => {
    return {
      id_work: this.id_work,
      id_enterprise: this.id_enterprise,
      title: this.title,
      address: this.address,
      budget: this.budget,
      start_time: this.start_time,
      end_time: this.end_time,
      photo_url: this.photo_url,
      tender_id: this.tender_id,
      isActive: this.isActive,
    };
  };
}
