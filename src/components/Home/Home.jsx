import React from 'react';
import PetHome from '../../assets/pet-home.PNG';
import PetPlay from '../../assets/pet-play.PNG';
import './Home.css';

function Home() {
  return (
    <div className="home-container container-fluid">
      <div className="row">
        <div className="col-md-6 order-2 order-md-1 p-0">
          <img src={PetHome} alt="Mascota con hogar" className="img-petHome img-fluid" />
        </div>
        <div className="col-md-6 order-1 order-md-2">
          <div className="home-text p-5">
            <h2 className="text mb-4">Adopta a un amigo peludo</h2>
            <p className="mb-4">
              Tienes la oportunidad de darle a tu nuevo mejor amigo peludo un hogar. Es importante 
              tener en cuenta que un animal no es un juguete, por lo que buscamos personas responsables 
              que estén dispuestas a asumir esta nueva aventura con responsabilidad y compromiso.
            </p>
            <a href="#" className="btn btn-home">MASCOTAS DISPONIBLES</a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 order-2 p-0">
          <img src={PetPlay} alt="Mascota jugando" className="img-petPlay img-fluid" />
        </div>
        <div className="col-md-6 order-1">
          <div className="home-text p-5">
            <h2 className="text mb-4">Amigos peludos desaparecidos</h2>
            <p className="mb-4">
              Toda ayuda es bien recibida. Ayuda a nuestros amigos peludos a encontrar su camino de regreso a casa. 
              Muchos de ellos se encuentran perdidos en las calles sin saber dónde están. En nuestra plataforma 
              podrás encontrar mascotas que se han perdido en tu ciudad y estar alerta por si las ves en la calle.
            </p>
            <a href="#" className="btn btn-home">MASCOTAS DESAPARECIDAS</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
