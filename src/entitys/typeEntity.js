export default class Type {
  constructor({ id_type, name, work_id }) {
    (this.id = id_type || null), (this.name = name), (this.work_id = work_id);

    this.validate();
  }
  validate = () => {
    if (!this.name || !this.work_id) {
      throw new Error("Missing required fields");
    }
  };
}
