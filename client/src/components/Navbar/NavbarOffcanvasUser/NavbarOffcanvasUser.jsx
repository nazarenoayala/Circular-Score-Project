import './NavbarOffcanvasUser.css';
import { useContext, useState } from 'react';
import { Link } from 'react-router';
import { MyButton } from '../../MyButton/MyButton';
import { Offcanvas } from 'react-bootstrap';
import { AuthContext } from '../../../context/AuthContext/AuthContext';

const NavTop = ({ ...props }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { userData } = useContext(AuthContext);
  return (
    <div className='navTop'>
      <img src="/src/assets/Images/Logo/logoblanco.png"></img>
      <MyButton
        btnClass={"navbarbutton"}
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
              <i className="fa-solid fa-business-time"></i>
              <Link className='off-link' to={`/companyProfile/${userData?.user_id}`} > Perfil de empresa</Link>
            </div>
            <div className="offcontainer-logo">
              <i className="fa-regular fa-file-lines"></i>
              <Link className='off-link' to={"/allTests"}>Todos los tests</Link>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div >
  );
}

export const NavbarOffcanvasUser = () => {
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
