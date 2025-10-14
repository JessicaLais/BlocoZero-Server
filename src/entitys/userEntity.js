export default class User {
  constructor({
    id,
    email,
    name,
    password,
    phone,
    hourlyRate,
    enterprise_id,
    userFunction,
    isActive,
  }) {
    this.id = id || null;
    this.enterprise_id = enterprise_id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.phone = phone;
    this.hourlyRate = hourlyRate;
    this.enterprise_id = 0;
    this.userFunction = userFunction;
    this.isActive = isActive ?? true;

    this.validate();
  }

  validate = () => {
    if (
      !this.email ||
      !this.name ||
      !this.password ||
      !this.phone ||
      !this.userFunction ||
      !this.hourlyRate
    ) {
      throw new Error("Missing required fields");
    }
  };

  toPublicJson = () => {
    return {
      id: this.id,
      enterprise_id: this.enterprise_id,
      userFunction: this.userFunction,
      name: this.name,
      email: this.email,
      phone: this.phone,
      hourlyRate: this.hourlyRate,
      isActive: this.isActive,
    };
  };
}
