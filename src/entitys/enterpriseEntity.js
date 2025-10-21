export default class Enterprise {
  constructor({ id_enterprise, name, cnpj, address, phone, email }) {
    this.id_enterprise = id_enterprise || null;
    this.name = name;
    this.cnpj = cnpj;
    this.address = address;
    this.phone = phone;
    this.email = email;

    this.validade();
  }

  validade = () => {
    if (
      !this.name ||
      !this.name ||
      !this.cnpj ||
      !this.address ||
      !this.phone ||
      !this.email
    ) {
      throw new Error("All fields are required");
    }
  };

  toPublicJson = () => {
    return {
      name: this.name,
      cnpj: this.cnpj,
      address: this.address,
      phone: this.phone,
      email: this.email,
    };
  };
}
