import { useContext } from 'react';
import './navgen.css';
import { MyButton } from '../../MyButton/MyButton';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router'

export const NavbarHeaderGeneral = () => {

  const { logout, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  //obtener initiales del nombre y apellido
  const initiales = () => {
    if (userData?.name && userData?.last_name) {

      return (userData.name[0] + userData.last_name[0]).toUpperCase();
    } else {
      return "CS";
    }
  }

  
  

  const handleLogOut = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  }

  return (
    <div className="navgen">
      <div className='d-flex gap-2'>
        <h3 className='text-muted'>Hola</h3>
        {(userData?.name || userData?.last_name) && <h3 className='fw-bold'>{userData.name && userData.name} {userData.last_name ? userData.last_name : ""}</h3>}
      </div>
      <div className="d-flex gap-3">
        <MyButton
          text={initiales()}
          btnClass="btn-blue-circle"
        />
        <MyButton
          text="Cerrar sesión"
          btnClass="btn-blue"
          onSubmit={handleLogOut}
        />
      </div>
    </div>
  );
};
