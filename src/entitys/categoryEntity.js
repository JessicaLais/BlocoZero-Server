export default class Category {
  constructor({ id_category, name }) {
    (this.id = id_category || null), (this.name = name);

    this.validate();
  }
  validate = () => {
    if (!this.name) {
      throw new Error("Missing required fields");
    }
  };
}
