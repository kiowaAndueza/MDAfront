import { Constraint } from './Constraint.js';

export class MinRangeNumberConstraint extends Constraint {
  constructor(name, value, minRangeNumber) {
    super(name, value);
    this.minRangeNumber = minRangeNumber;
  }

  getMessage() {
    return `${this.name} debe ser mayor o igual a ${this.minRangeNumber}.`;
  }

  validate() {
    return Number(this.value) >= this.minRangeNumber;
  }
}