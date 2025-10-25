export default class Type {
  constructor({ id_type, name }) {
    (this.id = id_type || null), (this.name = name);

    this.validate();
  }
  validate = () => {
    if (!this.name) {
      throw new Error("Missing required fields");
    }
  };
}
