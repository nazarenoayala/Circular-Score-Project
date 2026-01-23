import React from 'react';
import './NavbarUser.css';

export const NavbarUser = () => {

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
            <p>HOME</p>
          </div>
          <div className="container-logo">
            <i className="fa-solid fa-business-time"></i>
            <p>Perfil de empresa</p>
          </div>
          <div className="container-logo">
            <i className="fa-regular fa-file-lines"></i>
            <p>Todos los tests</p>
          </div>
          <div className="container-logo">
            <i className="fa-regular fa-calendar"></i>
            <p>Historial de tests</p>
          </div>

          <div className="container-graphics">
            <details
              name=""
              id=""
            >
              <summary>
                <i className="fa-solid fa-chart-column me-2"></i>
                Datos analíticos
              </summary>
              <option value="graphic">· Gráficos</option>
              <option value="g-ODS">· Gráficos por ODS</option>
            </details>
          </div>

          <div className="container-logo">
            <i className="fa-solid fa-circle-notch"></i>
            <p>IA Chat</p>
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