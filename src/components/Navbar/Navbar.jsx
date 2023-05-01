import React from "react";
import "../Navbar/Navbar.css";
import LogoIcon from "../LogoIcon/LogoIcon";
import { containerLogger } from "../IsLogger/IsLogger";
import {BiExit} from "react-icons/bi";

function Navbar() {
  const [isLogger, setLogger] = containerLogger.useState("isLogger");
  const handleLogout = async () => {
    setLogger(false);
    window.location.reload(false);
  };
  
  if (isLogger) {
    return (
      <nav class="navbar navbar-expand-md navbar-light">
        {LogoIcon()}
        <button
          id="menu"
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/home">
                Home
              </a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/advertisement/adoption">
                Añadir adopción
              </a>
            </li>
            <button onClick={handleLogout} className="border-0 p-3 mt-2" style={{ backgroundColor: "#0CC8A8" }}>Exit <i><BiExit /></i></button>
          </ul>
        </div>
      </nav>
    );
  }
  return (
    <nav class="navbar navbar-expand-md navbar-light">
      {LogoIcon()}
      <button
        id="menu"
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <a class="nav-link" href="/home">
              Home
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/register">
              Registro
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">
              Iniciar sesión
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
