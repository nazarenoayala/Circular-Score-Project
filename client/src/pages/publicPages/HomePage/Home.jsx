import React, { useState } from 'react';
import './Home.css';
import { FormUserRegister } from '../../../components/FormUserRegister/FormUserRegister';
import { FormUserLogin } from '../../../components/FormUserLogin/FormUserLogin';
import { FormModalRegister } from '../../../components/FormModalRegister/FormModalRegister';
import Card from 'react-bootstrap/Card';

const Home = () => {
  const [showPage, setShowPage] = useState('register');

  return (
    <div className="homepage">
      <section>
        <h1>CircularScore por la sostenibilidad</h1>
        <p>
          Funcionalidades de datos e IA para ayudarte en la transformación hacia
          el futuro utilizando inteligencia de datos medioambientales, sociales
          y de gobernanza (ASG).
        </p>

      
          {showPage === 'register' && (
            <FormUserRegister setShowPage={setShowPage} />
          )}

          {showPage === 'login' && <FormUserLogin setShowPage={setShowPage} />}

        
          {showPage === 'modal' && (
            <FormModalRegister setShowPage={setShowPage} />
          )}
       
      </section>

      <section>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="../assets/forHome/cards1.png" />
          <Card.Body>
            <Card.Title>Evalúa el impacto</Card.Title>
            <Card.Text>
              Comienza midiendo y supervisando tu huella medioambiental.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="../assets/forHome/cards2.png" />
          <Card.Body>
            <Card.Title>Acelera el progreso</Card.Title>
            <Card.Text>
              Adopta soluciones más sofisticadas para minimizar el impacto de tu
              organización y cadena de suministro.
            </Card.Text>
          </Card.Body>
        </Card>

        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="../assets/forHome/cards3.png" />
          <Card.Body>
            <Card.Title>Transforma la empresa</Card.Title>
            <Card.Text>
              Reinventa tus sistemas y modelos de negocio a la vez que
              satisfaces las necesidades del planeta.
            </Card.Text>
          </Card.Body>
        </Card>
      </section>

      <section>
        <h2>Entidades colaboradoras</h2>
        <div className="logos">
          <img src="../assets/forHome/logocatedra.png" alt="" />
          <img src="../assets/forHome/logogeneralitat.png" alt="" />
        </div>
      </section>

      <section>
        <h2>Premios y reconocimientos</h2>
        <div className="logos">
          <img src="../assets/forHome/santander.png" alt="" />
          <img src="../assets/forHome/CGP.png" alt="" />
          <img src="../assets/forHome/imagin.png" alt="" />
          <img src="../assets/forHome/universitat.png" alt="" />
          <img src="../assets/forHome/ayto.png" alt="" />
        </div>
      </section>
    </div>
  );
};

export default Home;
