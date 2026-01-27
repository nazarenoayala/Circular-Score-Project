import './NavbarOffcanvasAdmin.css';
import { useState } from 'react';
import { Link } from 'react-router';
import { MyButton } from '../../MyButton/MyButton';
import { Offcanvas } from 'react-bootstrap';

const NavTop = ({ ...props }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='navTop d-flex justify-content-between'>
      <img src="/src/assets/Images/Logo/logoblanco.png"></img>
      <MyButton
        btnClass={"btn-green"}
        onSubmit={handleShow}
        text={<svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>}
      />
      <Offcanvas
        {...props}
        show={show}
        onHide={handleClose}
        className={"bg-off h-50 text-white"}
      >
        <Offcanvas.Header closeButton closeVariant='white'>
          <Offcanvas.Title>
            <img
              src="/src/assets/Images/Logo/logoblanco.png"
              style={{ width: "12rem" }}
            ></img>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <div className="offcontainer-logo">
              <i className="fa-regular fa-house"></i>
              <Link className='off-link' to={"/"} > HOME</Link>
            </div>
            <div className="offcontainer-logo">
              <i className="fa-brands fa-squarespace"></i>
              <Link className='off-link' to={"/dashboard"}>Admin Dashboard</Link>
            </div>
            <div className="offcontainer-logo">
              <i className="fa-solid fa-business-time"></i>
              <Link className='off-link' to={"allCompanies"}>Control de empresas</Link>
            </div>
            <div className="offcontainer-logo">
              <i className="fa-regular fa-file-lines"></i>
              <Link className='off-link' to={"tests"}>Control de tests</Link>
            </div>
            <div className="offcontainer-logo">
              <i className="fa-regular fa-calendar"></i>
              <Link className='off-link' to={"/AdminTestsRecord"}>Historial de tests</Link>
            </div>

            <div className="offcontainer-graphics">
              <details>
                <summary className='offSumary'>
                  <i className="fa-solid fa-chart-column"></i>
                  <p className='text-white'>Datos analíticos</p>
                </summary>
                <div className='offoptions-cont pt-2'>
                  <Link className='off-link' to={"/graphic"}>· Gráficos</Link>
                  <Link className='off-link' to={"/AdminODSgraphic"}>· Gráficos de ODS</Link>
                </div>
              </details>
            </div>

            {/*   <div className="offcontainer-logo">
              <i className="fa-solid fa-circle-notch"></i>
              <Link className='off-link' to={"/IApromptEdit"}>IA Prompt Editor</Link>
            </div> */}

          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div >
  );
}

export const NavbarOffcanvasAdmin = () => {
  return (
    <>
      <div>
        {['top'].map((placement, idx) => (
          <NavTop key={idx} placement={placement} />
        ))}
      </div>
    </>
  )
}
