export default class Substage {
  constructor({
    id_substage,
    name,
    expDuration,
    progress,
    createdAt,
    updatedAt,
  }) {
    this.id = id_substage || null;
    this.name = name;
    this.expDuration = new Date(expDuration);
    this.progress = progress !== undefined ? progress : 0.0;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    this.validate();
  }

  validate = () => {
    if (!this.name) {
      throw new Error("Missing required field: Substage name is required.");
    }

    if (this.expDuration === undefined || this.expDuration <= 0) {
      throw new Error("Expected duration must be a positive value.");
    }

    if (this.progress < 0 || this.progress > 100) {
      throw new Error("Progress must be between 0 and 100.");
    }
  };
}
