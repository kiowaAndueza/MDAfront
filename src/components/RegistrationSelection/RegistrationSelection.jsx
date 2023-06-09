import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RegistrationSelection.css";
import { containerLogger } from "../IsLogger/IsLogger";
import { useNavigate } from "react-router-dom";

function RegistrationSelection() {
  const navigate = useNavigate();

  const redirectToPath = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  const [isLogger] = containerLogger.useState("isLogger");

  useEffect(() => {
    const fetchCharacters = async () => {
      if (isLogger) {
        redirectToPath("/home");
      }
    };
  
    fetchCharacters();
  }, [isLogger, redirectToPath]);
  

  return (
    <div className="registration-container">
      <div className="registration-header">
        <h1>¡Bienvenido/a!</h1>
        <h2>Seleccione el tipo de usuario que desea</h2>
      </div>
      <div className="registration-options">
        <Link to="/register/company" className="btn-company btn btn-lg">
          Empresa
        </Link>
        <Link to="/register/particular" className="btn-particular btn btn-lg">
          Particular
        </Link>
      </div>
    </div>
  );
}

export default RegistrationSelection;
