import React from "react";
import { Link } from "react-router-dom";
import "./RegistrationSelection.css";

function RegistrationSelection() {
  return (
    <div className="registration-container">
      <div className="registration-header">
        <h1>¡Bienvenido/a!</h1>
        <h2>Seleccione el tipo de usuario que desea</h2>
      </div>
      <div className="registration-options">
        <Link to="/register/company" className="btn-company btn btn-lg">Empresa</Link>
        <Link to="/register/particular" className="btn-particular btn btn-lg">Particular</Link>
      </div>
    </div>
  );
}

export default RegistrationSelection;
