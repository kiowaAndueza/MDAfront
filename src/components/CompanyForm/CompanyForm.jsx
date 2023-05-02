import React from "react";
import "./CompanyForm.css";
import { useState } from "react";
import { EmailConstraint } from "../../validator/EmailConstraint";
import { MinCharactersConstraint } from "../../validator/MinCharactersConstraint";
import { MaxCharactersConstraint } from "../../validator/MaxCharactersConstraint";
import { CifConstraint } from "../../validator/CifConstraint";
import cities from "../../cities.json";
import { AddressConstraint } from "../../validator/AddressConstraint";
import { PasswordConstraint } from "../../validator/PasswordConstraint";
import { CPConstraint } from "../../validator/CPConstraint";
import { useNavigate } from "react-router-dom";
import { successfulMessage } from "../Messages/Messages";
import { companyRegister } from "../../services/Authentication";
import { containerLogger } from "../IsLogger/IsLogger";

function CompanyForm() {
  const navigate = useNavigate();
  const [isLogger, setLogger] = containerLogger.useState("isLogger");

  const redirectToPath = (path) => {
    navigate(path);
  };

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    companyName: "",
    cif: "",
    password: "",
    confirmPassword: "",
    city: "",
    cp: "",
    address: "",
  });

  function getMin(city) {
    return cities[city].min;
  }

  function getMax(city) {
    return cities[city].max;
  }

  const citySelect = Object.keys(cities).map((city) => (
    <option value={city} key={city}>
      {city}
    </option>
  ));

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    username: "",
    email: "",
    companyName: "",
    cif: "",
    password: "",
    confirmPassword: "",
    city: "",
    cp: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        const minCharsConstraintName = new MinCharactersConstraint(
          "El nombre",
          value,
          2
        );
        const maxCharsConstraintName = new MaxCharactersConstraint(
          "El nombre",
          value,
          25
        );
        setErrorMessages({
          ...errorMessages,
          [name]:
            minCharsConstraintName.test() || maxCharsConstraintName.test(),
        });
        break;
      case "username":
        const minCharsConstraintUsername = new MinCharactersConstraint(
          "Los apellidos",
          value,
          2
        );
        const maxCharsConstraintUsername = new MaxCharactersConstraint(
          "Los apellidos",
          value,
          40
        );
        setErrorMessages({
          ...errorMessages,
          [name]:
            minCharsConstraintUsername.test() ||
            maxCharsConstraintUsername.test(),
        });
        break;
      case "email":
        const emailConstraint = new EmailConstraint(name, value);
        setErrorMessages({
          ...errorMessages,
          [name]: emailConstraint.test(),
        });
        break;
      case "companyName":
        const minCharsConstraintCompanyName = new MinCharactersConstraint(
          "El nombre de la empresa",
          value,
          1
        );
        setErrorMessages({
          ...errorMessages,
          [name]: minCharsConstraintCompanyName.test(),
        });
        break;
      case "cif":
        const cifConstraint = new CifConstraint(name, value);
        setErrorMessages({
          ...errorMessages,
          [name]: cifConstraint.test(),
        });
        break;
      case "password":
        const passwordConstraint = new PasswordConstraint(name, value);
        setErrorMessages({
          ...errorMessages,
          [name]: passwordConstraint.test(),
        });
        break;
      case "confirmPassword":
        setErrorMessages({
          ...errorMessages,
          [name]: "",
        });
        break;
      case "cp":
        const valueCP = parseInt(value);
        const cPConstraint = new CPConstraint(
          name,
          valueCP,
          getMin(formData.city),
          getMax(formData.city)
        );
        setErrorMessages({
          ...errorMessages,
          [name]: cPConstraint.test(),
        });
        break;
      case "address":
        const addressConstraint = new AddressConstraint(name, value);
        setErrorMessages({
          ...errorMessages,
          [name]: addressConstraint.test(),
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorsForm = false;

    setErrorMessages({
      ...errorMessages,
      confirmPassword: "",
    });

    if (formData.confirmPassword !== formData.password) {
      setErrorMessages({
        ...errorMessages,
        confirmPassword: "Las contraseñas no coinciden",
      });
      errorsForm = true;
    }

    Object.values(errorMessages).forEach((errorMessage) => {
      if (errorMessage) {
        errorsForm = true;
      }
    });

    if (errorsForm) {
      console.log("El formulario contiene errores");
    } else {
      try {
        const response = await companyRegister(formData);
        if (response.status === 200) {
          successfulMessage("Se ha registrado correctamente").then(() => {
            redirectToPath("/login");
          });
        } else {
          console.log("El formulario contiene errores");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (!isLogger){
    return (
      <div className="container-company-form container mt-5 mb-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div class="col-md-6 mb-4">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-md-9">
                  <div className="col-md-12 order-1 order-md-2">
                    <div className="particularText mb-4">
                      <h2 className="text-center text mb-4">
                        ¡Regístrate ahora!
                      </h2>
                      <p className="mb-4">
                        Como empresa/asociación, tendrás la posibilidad de
                        buscar un hogar para nuestros amigos peludos o publicar
                        un anuncio si tu mascota ha desaparecido. Cada anuncio
                        contará con un foro en el que otros usuarios podrán
                        participar de alguna forma, ya sea para apoyarte en tu
                        búsqueda o para ofrecerle un hogar al animal.
                      </p>
                      <p class="mb-4 font-weight-light">
                        ¡Únete a nuestra plataforma para ayudar a nuestros
                        amigos peludos!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <h2 className="company-title card-header">Empresa</h2>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="name">Nombre*</label>
                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="errorMessage">{errorMessages.name}</div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="username">Apellidos*</label>
                      <input
                        id="username"
                        type="text"
                        className="form-control"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="errorMessage">
                        {errorMessages.username}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 form-group row">
                    <div className="col-md-6">
                      <label htmlFor="companyName">Nombre Empresa*</label>
                      <input
                        id="companyName"
                        type="text"
                        className="form-control"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="errorMessage">
                        {errorMessages.companyName}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="cif">CIF*</label>
                      <input
                        id="cif"
                        type="text"
                        className="form-control"
                        name="cif"
                        value={formData.cif}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="errorMessage">{errorMessages.cif}</div>
                    </div>
                  </div>
                  <div className="mt-3 col-md-12">
                    <label htmlFor="email">Correo Electrónico*</label>
                    <input
                      id="email"
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="errorMessage">{errorMessages.email}</div>
                  </div>
                  <div className="mt-3 form-group row">
                    <div className="col-md-6">
                      <label htmlFor="password">Contraseña*</label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="errorMessage">
                        {errorMessages.password}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="confirmPassword">
                        Confirmar Contraseña*
                      </label>
                      <input
                        id="confirmPassword"
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="errorMessage">
                        {errorMessages.confirmPassword}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 form-group row">
                    <div className="col-md-6">
                      <label htmlFor="city">Ciudad*</label>
                      <select
                        id="city"
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Selecciona una ciudad</option>
                        {citySelect}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="cp">Código postal*</label>
                      <input
                        type="number"
                        className="form-control"
                        name="cp"
                        id="cp"
                        value={formData.cp}
                        onChange={handleInputChange}
                        required
                      />
                      <div className="errorMessage">{errorMessages.cp}</div>
                    </div>
                  </div>
                  <div className="mt-3 form-group">
                    <label htmlFor="address">Nombre de la calle, número*</label>
                    <textarea
                      id="address"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                    <div className="errorMessage">{errorMessages.address}</div>
                  </div>
                  <div className="mt-3 form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="termsAndConditions"
                        name="termsAndConditions"
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="termsAndConditions"
                      >
                        Acepto los términos y condiciones
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn-companyRegister btn btn-primary"
                    >
                      REGISTRAR
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="col-md-6"></div>
        </div>
      </div>
    );
  } else {
    redirectToPath("/home"); 
  }
}

export default CompanyForm;
