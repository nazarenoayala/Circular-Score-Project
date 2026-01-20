import React from 'react'
import './NavbarAdmin.css';

export const NavbarAdmin = () => {
  return (
    <div class="front-page">
      <section class="lateral-bar">
        <div>
          <img
            src="/src/assets/logoblanco.png"
            alt=""
          ></img>
          <div class="container-logo">
            <i class="fa-utility fa-semibold fa-house"></i>
            <p> HOME</p>
          </div>
          <div class="container-logo">
            <i class="fa-brands fa-squarespace"></i>
            <p>Admin Dashboard</p>
          </div>
          <div class="container-logo">
            <i class="fa-utility fa-semibold fa-briefcase"></i>
            <p>Control de empresas</p>
          </div>

          <div class="container-logo">
            <i class="fa-regular fa-file-lines"></i>
            <p>Control de tests</p>
          </div>
          <div class="container-logo">
            <i class="fa-regular fa-calendar"></i>
            <p>Historial de tests</p>
          </div>

          <div class="container-graphics">
            <details
              name=""
              id=""
            >
              <summary>
                <i class="fa-solid fa-chart-column"></i>
                Datos analíticos
              </summary>
              <option value="graphic">· Gráficos</option>
              <option value="g-ODS">· Gráficos por ODS</option>
            </details>
          </div>

          <div class="container-logo">
            <i class="fa-solid fa-circle-notch"></i>
            <p>IA Prompt Editor</p>
          </div>
        </div>

        {/* SIN LINKEAR */}
        <div class="child2">
          <p>Privacidad</p>
          <p>Cookies</p>
          <p>Aviso legal</p>

          <div class="logos">
            <i class="fa-brands fa-youtube"></i>
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-instagram"></i>
          </div>
        </div>
      </section>
    </div>
  )
}


