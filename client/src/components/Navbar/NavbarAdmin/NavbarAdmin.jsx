import './NavbarAdmin.css';
import { Link } from 'react-router';

export const NavbarAdmin = () => {
  return (
    <div className="front-page">
      <section className="lateral-bar">
        <div>
          <img
            src="/src/assets/Images/Logo/logoblanco.png"
            alt=""
          ></img>
          <div className="container-logo">
            <i className="fa-regular fa-house"></i>
            <Link className='link' to={"/tests"} > HOME</Link>
          </div>
          <div className="container-logo">
            <i className="fa-brands fa-squarespace"></i>
            <Link className='link' to={"/dashboard"}>Admin Dashboard</Link>
          </div>
          <div className="container-logo">
            <i className="fa-solid fa-business-time"></i>
            <Link className='link' to={"/allCompanies"}>Empresas registradas</Link>
          </div>

          <div className="container-logo">
            <i className="fa-regular fa-file-lines"></i>
            <Link className='link' to={"/tests"}>Control de tests</Link>
          </div>
{/*           <div className="container-logo">
            <i className="fa-regular fa-calendar"></i>
            <Link className='link' to={"/AdminTestsRecord"}>Historial de tests</Link>
          </div>

          <div className="container-graphics">
            <details>
              <summary>
                <i className="fa-solid fa-chart-column"></i>
                <p>Datos analíticos</p>
              </summary>
              <div className='options-cont'>
                <Link className='link' to={"/graphic"}>· Gráficos</Link>
                <Link className='link' to={"/AdminODSgraphic"}>· Gráficos de ODS</Link>
              </div>
            </details>
          </div>

          <div className="container-logo">
            <i className="fa-solid fa-circle-notch"></i>
            <Link className='link' to={"/IApromptEdit"}>IA Prompt Editor</Link>
          </div> */}
        </div>

        {/* SIN LINKEAR */}
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


