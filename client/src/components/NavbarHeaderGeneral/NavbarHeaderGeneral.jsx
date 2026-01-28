import { useContext } from 'react';
import { MyButton } from '../MyButton/MyButton';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import {useNavigate} from 'react-router'

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
   
//obtener nombre y apellido
  const nombre = userData?.name + ' ' + userData?.last_name;

const handleLogOut = (e) => {
   e.preventDefault();
  logout(); 
  navigate('/');
 }



  return (
    <div className="d-flex justify-content-between p-3">
      <div className='d-flex gap-2'>
        <h3 className='text-muted'>Hola</h3>
        <h3 className='fw-bold'>{nombre}</h3>
      </div>
      <div className="d-flex gap-3">
        <MyButton text={initiales()} btnClass="btn-blue-circle" />
        <MyButton text="Cerrar sesión" btnClass="btn-blue" onSubmit={handleLogOut} />
      </div>
    </div>
  );
};
