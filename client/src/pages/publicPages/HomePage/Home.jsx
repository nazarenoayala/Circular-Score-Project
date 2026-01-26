import './Home.css';
import { FormUserRegister } from '../../../components/FormUserRegister/FormUserRegister';
import { FormUserLogin } from '../../../components/FormUserLogin/FormUserLogin';
import { FormModalRegister } from '../../../components/FormModalRegister/FormModalRegister';
import { FormContact } from '../../../components/FormContact/FormContact';

const Home = ({setShowPage, showPage}) => {




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

        {showPage === 'login' && (<FormUserLogin setShowPage={setShowPage} />
        )}
      </section>

      <section>
        <h2 id='caracteristicas'>Características</h2>
        <div className='cards-cont d-flex gap-4 justify-content-evenly p-5 flex-wrap'>
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

      <section>
        <h2>Entidades colaboradoras</h2>
        <div className="logos">
          <img src="/src/assets/Images/forHome/logocatedra.png" alt="" />
          <img src="/src/assets/Images/forHome/logogeneralitat.png" alt="" />
        </div>
      </section>

      <section>
        <h2 className='pb-4'>Premios y reconocimientos</h2>
        <div className='logos2'>
          <img src="/src/assets/Images/forHome/santander.png" className='santander' />
          <img src="/src/assets/Images/forHome/CGP.png" />
          <img src="/src/assets/Images/forHome/imagin.png" />
          <img src="/src/assets/Images/forHome/universitat.png" />
          <img src="/src/assets/Images/forHome/ayto.png" />
        </div>
      </section>

      <section className='section-contact'>
        <h2 className='p-5' id="contacto">¿Tienes alguna pregunta?</h2>
        <FormContact />
      </section>
    </div>
  );
};

export default Home;