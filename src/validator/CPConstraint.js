import { Constraint } from "./Constraint";

export class CPConstraint extends Constraint {
    constructor(name, value, min, max) {
        super(name, value);
        this.min = min;
        this.max = max;
    }

    getMessage() {
        return "El código postal no es válido.";
    }

    validate() {
        return this.value >= this.min && this.value <= this.max;
    }
}
