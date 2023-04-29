import { Constraint } from "./Constraint";

export class MinCharactersConstraint extends Constraint {
  constructor(name, value, min) {
    super(name, value);
    this.min = min;
  }

  getMessage() {
    const trimmedValue = String(this.value).trim();
    if (trimmedValue.length === 0) {
      return `Este campo no puede estar vacío.`;
    }
    return `${this.name} debe tener como mínimo ${this.min} caracteres.`;
  }

  validate() {
    const trimmedValue = String(this.value).trim();
    if (trimmedValue.length === 0) {
      return false;
    }
    return trimmedValue.length >= this.min;
  }
}
