import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import { Form, Button } from "react-bootstrap";
import { FaRegUserCircle } from "react-icons/fa";
import { EmailConstraint } from "../../validator/EmailConstraint";
import { Link } from "react-router-dom";
import { successfulMessage } from "../Messages/Messages";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/Authentication";
import { containerLogger } from "../IsLogger/IsLogger";

function LoginForm() {
  const navigate = useNavigate();
  const [isLogger, setLogger] = containerLogger.useState("isLogger");

  const redirectToPath = (path) => {
    navigate(path);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const fetchCharacters = async (IsLogger) => {
    if (isLogger) {
      redirectToPath("/home");
    }
  };

  useEffect(() => {
    fetchCharacters(isLogger);
  }, [setLogger]);

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (name === "email") {
      const emailConstraint = new EmailConstraint(name, value);
      setEmailError(emailConstraint.test());
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.email === "") {
      setEmailError("Este campo no puede estar vacío");
    } else {
      setEmailError("");
    }

    if (formData.password === "") {
      setPasswordError("Esta campo no puede estar vacío");
    } else {
      setPasswordError("");
    }

    if (
      !emailError &&
      !passwordError &&
      formData.email.trim() &&
      formData.password.trim()
    ) {
      try {
        const response = await login(formData);
        if (response.status === 200) {
          setLogger(true);
          successfulMessage("Inicio de sesión exitoso").then(() => {
            redirectToPath("/home");
          });
        } else {
          console.log("El formulario contiene errores");
        }
        if (response.status === 200) {
          successfulMessage("Inicio de sesión exitoso").then(() => {
            redirectToPath("/home");
          });
        } else {
          console.log("El formulario contiene errores");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login-form-wrapper">
      <Form onSubmit={handleSubmit} className="login-form">
        <div className="title-container">
          <div className="icon-container">
            <FaRegUserCircle />
          </div>
          <h2>Iniciar sesión</h2>
        </div>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Correo electrónico*:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Ingresa tu correo electrónico"
            className="form-control"
          />
          {emailError && <div className="errorMessage">{emailError}</div>}
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label className="mt-4">Contraseña*:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Ingresa tu contraseña"
            className="form-control"
          />
          {passwordError && <div className="errorMessage">{passwordError}</div>}
        </Form.Group>
        <div className="text-center mt-3">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </div>
        <Button
          type="submit"
          className="mt-4 btn-company-form btn-block-container"
        >
          <div className="btn-block d-flex justify-content-center w-100">
            Iniciar sesión
          </div>
        </Button>
      </Form>
    </div>
  );
}
export default LoginForm;
