import React from "react";
import { useState } from "react";
import "./AdoptionForm.css";
import { MdPets } from "react-icons/md";
import { MinCharactersConstraint } from "../../validator/MinCharactersConstraint";
import { MaxCharactersConstraint } from "../../validator/MaxCharactersConstraint";
import { MinRangeNumberConstraint } from "../../validator/MinRangeNumberConstraint";
import { successfulMessage } from "../Messages/Messages";
import { useNavigate } from "react-router-dom";
import { createAdoptionAdvertisement } from "../../services/ApiServices";
import { ImageUrlConstraint } from "../../validator/ImageUrlConstraint";
import { containerLogger } from "../IsLogger/IsLogger";

function AdoptionForm() {
  const navigate = useNavigate();
  const [isLogger, setLogger] = containerLogger.useState("isLogger");

  const redirectToPath = (path) => {
    navigate(path);
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    animal: "",
    gender: "",
    age: null,
    breed: "",
    image: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    title: "",
    description: "",
    age: "",
    animal: "",
    gender: "",
    image: "",
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
      case "title":
        const minCharsConstraintTitle = new MinCharactersConstraint(
          "El título",
          value,
          3
        );
        const maxCharsConstraintTitle = new MaxCharactersConstraint(
          "El título",
          value,
          15
        );
        setErrorMessages({
          ...errorMessages,
          [name]:
            minCharsConstraintTitle.test() || maxCharsConstraintTitle.test(),
        });
        break;
      case "description":
        const minCharsConstraintDescription = new MinCharactersConstraint(
          "La descripción",
          value,
          15
        );
        setErrorMessages({
          ...errorMessages,
          [name]: minCharsConstraintDescription.test(),
        });
        break;
      case "age":
        if (value === "" || isNaN(value)) {
          formData.age = null;
          value = null;
        } else {
          const minRangeNumberConstraintAge = new MinRangeNumberConstraint(
            "La edad",
            parseInt(value),
            0
          );
          setErrorMessages({
            ...errorMessages,
            [name]: minRangeNumberConstraintAge.test(),
          });
        }
        break;
      case "image":
        if (value !== "" || value !== null) {
          const imagenUrlConstraint = new ImageUrlConstraint(name, value);
          setErrorMessages({
            ...errorMessages,
            [name]: imagenUrlConstraint.test(),
          });
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    setErrorMessages({
      ...errorMessages,
      animal: "",
      gender: "",
    });

    e.preventDefault();

    let errorsForm = false;

    Object.values(errorMessages).forEach((errorMessage) => {
      if (errorMessage) {
        errorsForm = true;
      }
    });

    if (!formData.animal || !formData.gender) {
      setErrorMessages({
        ...errorMessages,
        animal: "Por favor selecciona un animal",
        gender: "Por favor selecciona un género",
      });
      errorsForm = true;
    }

    if (errorsForm) {
      console.log("El formulario contiene errores");
    } else {
      try {
        const response = await createAdoptionAdvertisement(formData);
        if (response.status === 200) {
          successfulMessage("El anuncio se añadió correctamente").then(() => {
            redirectToPath("/home");
          });
          console.log(formData);
        } else {
          console.log("El formulario contiene errores");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (isLogger) {
    return (
      <div className="adoption-form-container">
        <form onSubmit={handleSubmit} className="adoption-form">
          <div className="title-adoption-form">
            <div className="me-3 icon-container">
              <MdPets />
            </div>
            <h2>ADOPCIÓN</h2>
            <div className="ms-3 icon-container">
              <MdPets />
            </div>
          </div>
          <div className="adoption-form-group form-group">
            <label
              htmlFor="adoptionTitle title"
              className="adoption-label form-label"
            >
              Título*:
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <div className="errorMessage">{errorMessages.title}</div>
          </div>
          <div className="adoption-form-group form-group">
            <label htmlFor="description" className="adoption-label">
              Descripción*:
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
            <div className="errorMessage">{errorMessages.description}</div>
          </div>
          <div className="adoption-form-group form-group">
            <label htmlFor="animal" className="adoption-label">
              Tipo de animal*:
            </label>
            <select
              className="form-select"
              id="animal"
              name="animal"
              value={formData.animal}
              onChange={handleInputChange}
            >
              <option value="">Selecciona una opción</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="pájaro">Pájaro</option>
              <option value="roedor">Roedor</option>
              <option value="otro">Otro</option>
            </select>
            <div className="errorMessage">{errorMessages.animal}</div>
          </div>
          <div className="adoption-form-group form-group">
            <label htmlFor="gender" className="adoption-label">
              Género*:
            </label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="hembra"
                checked={formData.gender === "hembra"}
                onChange={handleInputChange}
              />
              <label
                className="adoption-label form-check-label"
                htmlFor="female"
              >
                Hembra
              </label>
              <div className="errorMessage">{errorMessages.gender}</div>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="macho"
                checked={formData.gender === "macho"}
                onChange={handleInputChange}
              />
              <label className="adoption-label form-check-label" htmlFor="male">
                Macho
              </label>
            </div>
          </div>
          <div className="adoption-form-group form-group">
            <label htmlFor="age" className="adoption-label form-label">
              Edad:
            </label>
            <input
              type="number"
              name="age"
              className="form-control"
              id="age"
              value={formData.age !== null ? formData.age : ""}
              onChange={handleInputChange}
            />
            <div className="errorMessage">{errorMessages.age}</div>
          </div>
          <div className="adoption-form-group form-group">
            <label htmlFor="breed" className="form-label">
              Raza:
            </label>
            <input type="text" className="form-control" id="breed" />
            <span className="form-validation"></span>
          </div>
          <div className="adoption-form-group form-group">
            <label htmlFor="image" className="form-label">
              Añadir foto:
            </label>
            <input
              type="text"
              className="form-control"
              value={formData.image}
              id="image"
              name="image"
              onChange={handleInputChange}
            />
            <div className="errorMessage">{errorMessages.image}</div>
            <span className="form-validation"></span>
          </div>
          <div className="adoption-form-group form-group">
            <button
              type="submit"
              className="btn-adoptionForm btn btn-primary btn-block mt-4"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    redirectToPath("/home");
  }
  
}

export default AdoptionForm;
