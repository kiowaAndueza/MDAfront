import React from 'react';
import '../Navbar/Navbar.css';
import LogoIcon from '../LogoIcon/LogoIcon';

function Navbar() {
  return (
    <nav class="navbar navbar-expand-md navbar-light">
        {LogoIcon()}
        <button id='menu' class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="/home">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/advertisement/adoption">Añadir adopción</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Registro</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/login">Iniciar sesión</a>
                </li>
            </ul>
        </div>
    </nav>
  );
}

export default Navbar;