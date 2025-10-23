export default class Work {
  constructor({
    id_work,
    id_entreprise,
    id_manager,
    id_tender,
    title,
    cnpj,
    address,
    cep,
    budget,
    start_time,
    end_time,
    describe,
    isActive,
  }) {
    this.id_work = id_work || null;
    this.id_entreprise = Number(id_entreprise);
    this.id_manager = Number(id_manager);
    this.id_tender = Number(id_tender);
    this.title = title;
    this.cnpj = cnpj;
    this.address = address;
    this.cep = cep;
    this.budget = Number(budget);
    this.start_time = new Date(start_time);
    this.end_time = new Date(end_time);
    this.describe = describe;
    this.isActive = isActive;

    this.validate();
  }
  validate = () => {
    if (
      this.id_entreprise === null ||
      this.id_entreprise === undefined ||
      this.id_manager === null ||
      this.id_manager === undefined ||
      this.id_tender === null ||
      this.id_tender === undefined ||
      !this.title ||
      !this.cnpj ||
      !this.address ||
      !this.cep ||
      !this.budget ||
      !this.start_time ||
      !this.end_time ||
      !this.describe
    ) {
      throw new Error("Missing required fields");
    }
  };

  smallInformation = () => {
    return {
      id_work: this.id_work,
      id_enterprise: this.id_enterprise,
      id_manager: this.id_manager,
      id_tender: this.id_tender,
      title: this.title,
      budget: this.budget,
      start_time: this.start_time,
      end_time: this.end_time,
      isActive: this.isActive,
    };
  };
}
