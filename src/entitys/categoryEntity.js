export default class Category {
  constructor({ id_category, name, id_type }) {
    (this.id = id_category || null),
      (this.name = name),
      (this.id_type = id_type);

    this.validate();
  }
  validate = () => {
    if (!this.name || !this.id_type) {
      throw new Error("Missing required fields");
    }
  };
}
