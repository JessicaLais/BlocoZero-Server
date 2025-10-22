export default class User {
  constructor({
    id_user,
    enterprise_id,
    userFunction,
    email,
    password,
    phone,
    works,
    hourlyRate,
    name,
    isActive,
  }) {
    this.id_user = id_user || null;
    this.enterprise_id = enterprise_id;
    this.userFunction = userFunction;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.works = works;
    this.hourlyRate = hourlyRate;
    this.name = name;
    this.isActive = isActive;

    this.validate();
  }

  validate = () => {
    if (
      !this.userFunction ||
      !this.email ||
      !this.password ||
      !this.phone ||
      !this.hourlyRate ||
      !this.name
    ) {
      throw new Error("Missing required fields");
    }
  };

  toPublicJson = () => {
    return {
      id_user: this.id_user,
      enterprise_id: this.enterprise_id,
      userFunction: this.userFunction,
      name: this.name,
      email: this.email,
      phone: this.phone,
      works: this.works,
      hourlyRate: this.hourlyRate,
      isActive: this.isActive,
    };
  };
}
