import { Constraint } from "./Constraint";

export class ImageUrlConstraint extends Constraint {
  getMessage() {
    return "Si deseas añadir una imagen, la URL debe tener un formato válido. Ejemplo: https://www.ulpgc.es/sites/all/themes/ulpgc/images/logo_impresion.jpg";
  }

  validate() {
    const regexUrl = /^(http(s?):)([/|.|\w|\s|-])*\.(?:png|jpg|jpeg)$/;
    return regexUrl.test(this.value);
  }
}
