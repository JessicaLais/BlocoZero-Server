export default class Work {
constructor({
  id_work,
  id_entreprise,
  id_manager,
  tender_id,
  id_tender,
  title,
  cnpj,
  address,
  cep,
  budget,
  start_time,
  end_time,
  description,
  descibre,
  describe,
  isActive,
  photo,
}) {
  this.id_work = id_work || null;
  this.id_entreprise = Number(id_entreprise);
  this.id_manager = Number(id_manager);
  this.tender_id = Number(tender_id) || id_tender;
  this.title = title;
  this.cnpj = cnpj;
  this.address = address;
  this.cep = cep;
  this.budget = Number(budget);
  this.start_time = new Date(start_time);
  this.end_time = new Date(end_time);
  this.description = description || descibre || describe;
  this.isActive = isActive;
  this.photo = photo;

  this.validate();
}

  validate = () => {
  const fields = {
    id_entreprise: this.id_entreprise,
    id_manager: this.id_manager,
    tender_id: this.tender_id,
    title: this.title,
    cnpj: this.cnpj,
    address: this.address,
    cep: this.cep,
    budget: this.budget,
    start_time: this.start_time,
    end_time: this.end_time,
    description: this.description,
  };

  for (const [key, value] of Object.entries(fields)) {
    if (value === null || value === undefined || value === '' || (typeof value === 'number' && isNaN(value))) {
      throw new Error(`Missing or invalid field: ${key}`);
    }
  }
};


  smallInformation = () => {
    return {
      id_work: this.id_work,
      id_entreprise: this.id_entreprise,
      id_manager: this.id_manager,
      tender_id: this.tender_id,
      title: this.title,
      budget: this.budget,
      start_time: this.start_time,
      end_time: this.end_time,
      isActive: this.isActive,
      photo: this.photo,
    };
  };
}
