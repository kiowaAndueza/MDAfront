import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import '../Footer/Footer.css';

function Footer() {
  return (
    <footer className="text-center text-lg-start" style={{ backgroundColor: '#27BFFA' }}>
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="mb-2 text-uppercase">Acerca de Amigos Peludos</h5>
            <p>
              Plataforma dedicada a las mascotas, donde las
              empresas como particulares pueden utilizarla para encontrarles un 
              hogar o para buscarlas cuando éstas se pierdan.
            </p>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="mb-2 text-uppercase">Enlaces rápidos</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/home" className="text-dark">Home</a>
              </li>
              <li>
                <a href="/register" className="text-dark">Registro</a>
              </li>
              <li>
                <a href="/login" className="text-dark">Iniciar sesión</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Contacto</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="mb-2 text-uppercase">Contacto</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-dark"><FontAwesomeIcon icon={faPhone} /> +123456789</a>
              </li>
              <li>
                <a href="#!" className="text-dark"><FontAwesomeIcon icon={faEnvelope} /> info@amigospeludos.com</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="mb-2 text-uppercase mb-0">Redes sociales</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-dark"><FaFacebook />  Amigos Peludos</a>
              </li>
              <li>
                <a href="#!" className="text-dark"><FaTwitter />  @amigosPeludos</a>
              </li>
              <li>
                <a href="#!" className="text-dark"><FaInstagram />  @amigosPeludos</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        Derechos reservados &copy; 2023 | Amigos Peludos
      </div>
    </footer>
  );
}

export default Footer;