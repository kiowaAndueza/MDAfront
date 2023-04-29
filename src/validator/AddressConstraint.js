import { Constraint } from "./Constraint";

export class AddressConstraint extends Constraint {
    getMessage(){
        return 'La dirección debe tener un formato válido. Ejemplo: Calle ejemplo, 9';
    }


    validate(){
        const regexAddress = /^[A-Za-z0-9áéíóúÁÉÍÓÚñÑ\s]+,\s\d+$/;
        return regexAddress.test(this.value);
    }
}
