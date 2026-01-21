import './NavbarPublic.css';
import { MyButton } from '../../components/MyButton/MyButton';

export const NavbarPublic = () => {

  return (
    <div className='header-public'>
      <div>
        <img src="/src/assets/Images/logo/logo.png" />
      </div>
      <div className='buttons-cont'>
        <MyButton
          text='Inicio'
          /*  onSubmit={} */
          btnClass='btn-white'
        />
        <MyButton
          text='Características'
          /*  onSubmit={} */
          btnClass='btn-white'
        />
        <MyButton
          text='Contacto'
          /*     onSubmit={} */
          btnClass='btn-white'
        />
        <MyButton
          text='Iniciar sesión'
          /*   onSubmit={} */
          btnClass='btn-green'
        />
      </div>
    </div>
  )
}
