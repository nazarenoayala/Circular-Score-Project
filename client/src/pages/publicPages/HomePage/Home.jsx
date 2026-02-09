import './Home.css';
import { FormUserRegister } from '../../../components/FormUserRegister/FormUserRegister';
import { FormUserLogin } from '../../../components/FormUserLogin/FormUserLogin';
import { FormModalRegister } from '../../../components/FormModalRegister/FormModalRegister';
import { FormUserResPassword } from '../../../components/FormUserResPassword/FormUserResPassword';
import { FormContact } from '../../../components/FormContact/FormContact';
import { Col, Row } from 'react-bootstrap';
import { MyButton } from '../../../components/MyButton/MyButton';

const Home = ({ setShowPage, showPage }) => {
  return (
    <div className="homepage">
      <section className='section1'>
        <h1>CircularScore por la sostenibilidad</h1>
        <p className='text-first'>
          Funcionalidades de datos e IA para ayudarte en la transformación hacia
          el futuro utilizando inteligencia de datos medioambientales, sociales
          y de gobernanza (ASG).
        </p>
      </section>

      {/* Cambiar formularios */}
      <section className='section-register'>
        {showPage === 'register' && (
          <FormUserRegister setShowPage={setShowPage} />
        )}

        {showPage === 'modal' && (
          <FormModalRegister setShowPage={setShowPage} />)}

        {showPage === 'login' && (
          <FormUserLogin setShowPage={setShowPage} />)}

        {showPage === 'resPassword' && (
          <FormUserResPassword setShowPage={setShowPage} />)}
      </section>

      <section>
        <h2 id='caracteristicas'>Características</h2>
        <div className='cards-cont'>
          <div className='card-unique'>
            <h3 className="gray">01</h3>
            <img src="/src/assets/Images/forHome/cards1.png" />
            <h3>Evalúa el impacto</h3>
            <p>Comienza midiendo y supervisando tu huella medioambiental.</p>
          </div>

          <div className='card-unique'>
            <h3 className="gray">02</h3>
            <img src="/src/assets/Images/forHome/cards2.png" />
            <h3>Acelera el progreso</h3>
            <p>Adopta soluciones más sofisticadas para minimizar el impacto de tu
              organización y cadena de suministro.</p>
          </div>

          <div className='card-unique'>
            <h3 className="gray">03</h3>
            <img src="/src/assets/Images/forHome/cards3.png" />
            <h3>Transforma la empresa</h3>
            <p>Reinventa tus sistemas y modelos de negocio a la vez que
              satisfaces las necesidades del planeta.</p>
          </div>
        </div>
      </section>

      <section className='section-5'>
        <div className='col1'>
          <h2>Diseña e implementa estrategias que permitan un crecimiento sostenible.</h2>
          <p>No importa en qué punto de tu camino hacia la sostenibilidad te encuentres; las soluciones tecnológicas de CircularScore basadas en
            Inteligencia Artificial pueden ayudarte a conseguir tus objetivos.</p>
          <div className='mini-section'>
            <img src="/src/assets/Images/forHome/icon-3-2.svg" />
            <p>Aumentar la eficacia.</p>
          </div>
          <div className='mini-section'>
            <img src="/src/assets/Images/forHome/icon-1.svg" />
            <p>Mejorar los márgenes y los ingresos.</p>
          </div>
          <div className='mini-section'>
            <img src="/src/assets/Images/forHome/icon-3-2.svg" />
            <p>Generar confianza en la marca.</p>
          </div>
        </div>
        <div className='graphic'>
          <img src="/src/assets/Images/forHome/graphic.png" />
        </div>
      </section>

      <section className='section-6'>
        <Col>
          <img src="/src/assets/Images/forHome/rueda2030.png" />
        </Col>
        <Col className='col2'>
          <h2>CircularScore supervisa y administra el impacto medioambiental de la organización</h2>
          <div className='text-start pt-4'>
            <p>→ Liderar el progreso hacia cero emisiones netas</p>
            <p>→ Respaldar el desarrollo de nuevas tecnologías</p>
            <p>→ Seguimiento de la contribución de la agenda 2030</p>
            <p>→ Información basada en inteligencia artificial</p>
            <p>→ Modelos de cálculo para las categorías de emisiones de Ámbitos 1, 2 y múltiples Ámbitos 3.</p>
          </div>
          <MyButton
            btnClass={"btn-green"}
            text={"Pruébalo"}
            onSubmit={() => document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' })}
          />
        </Col>
      </section>

      <section className='recon'>
        <h2 className='pb-4'>Premios y reconocimientos</h2>
        <div className='logos'>
          <img src="/src/assets/Images/forHome/santander.png" className='santander' />
          <img src="/src/assets/Images/forHome/CGP.png" />
          <img src="/src/assets/Images/forHome/imagin.png" />
          <img src="/src/assets/Images/forHome/universitat.png" />
          <img src="/src/assets/Images/forHome/ayto.png" />
        </div>
      </section>

      <section className='section-contact'>
        <h2 id="contacto">¿Tienes alguna pregunta?</h2>
        <FormContact />
      </section>
    </div>
  );
};

export default Home;