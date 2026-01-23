import React from 'react'
import './NavbarAdmin.css';

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
            <i class="fa-regular fa-house"></i>
            <p> HOME</p>
          </div>
          <div className="container-logo">
            <i className="fa-brands fa-squarespace"></i>
            <p>Admin Dashboard</p>
          </div>
          <div className="container-logo">
            <i className="fa-solid fa-business-time"></i>
            <p>Control de empresas</p>
          </div>

          <div className="container-logo">
            <i className="fa-regular fa-file-lines"></i>
            <p>Control de tests</p>
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
            <p>IA Prompt Editor</p>
          </div>
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


