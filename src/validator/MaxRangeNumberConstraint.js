import { Constraint } from './Constraint.js';

export class MaxRangeNumberConstraint extends Constraint {
  constructor(name, value, maxRangeNumber) {
    super(name, value);
    this.maxRangeNumber = maxRangeNumber;
  }

  getMessage() {
    return `${this.name} debe ser menor o igual a ${this.maxRangeNumber}.`;
  }

  validate() {
    return Number(this.value) <= this.maxRangeNumber;
  }
}