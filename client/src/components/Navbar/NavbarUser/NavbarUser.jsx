import { useContext } from 'react';
import './NavbarUser.css';
import { Link } from 'react-router';
import { AuthContext } from '../../../context/AuthContext/AuthContext';

export const NavbarUser = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div className="front-page">
      <section className="lateral-bar">
        <div>
          <img
            src="/src/assets/Images/Logo/logoblanco.png"
          ></img>
          <div className="container-logo">
            <i className="fa-regular fa-house"></i>
            <Link className='link' to={"/"} > HOME</Link>
          </div>
          <div className="container-logo">
            <i className="fa-solid fa-business-time"></i>
            <Link className='link' to={`/companyProfile/${userData?.user_id}`} > Perfil de empresa</Link>
          </div>
          <div className="container-logo">
            <i className="fa-regular fa-file-lines"></i>
            <Link className='link' to={"/allTests"}>Todos los tests</Link>
          </div>
          <div className="container-logo">
            <i className="fa-regular fa-calendar"></i>
            <Link className='link' to={"/userTestRecord"}>Historial de tests</Link>
          </div>

          <div className="container-graphics">
            <details
              name=""
              id=""
            >
              <summary>
                <i className="fa-solid fa-chart-column"></i>
                <p>Datos analíticos</p>
              </summary>
              <div className='options-cont'>
                <Link className='link' to={"/generalGraphic"}>· Gráficos</Link>
                <Link className='link' to={"/userODSGraphic"}>· Gráficos por ODS</Link>
              </div>
            </details>
          </div>

          <div className="container-logo">
            <i className="fa-solid fa-circle-notch"></i>
            <Link className='link' to={"/IAChat"}>IA Chat</Link>
          </div>
        </div>

        {/* Sin linkear */}
        <div className="child2">
          <p>Privacidad</p>
          <p>Cookies</p>
          <p>Aviso legal</p>

          <div className="logos">
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-instagram"></i>
          </div>
        </div>
      </section>
    </div>
  )
}
