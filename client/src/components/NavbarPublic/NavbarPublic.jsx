import './NavbarPublic.css';
import { MyButton } from '../../components/MyButton/MyButton';
import { useEffect } from 'react';


export const NavbarPublic = ({setShowPage, showPage}) => {

  





  return (
    <div className='header-public'>
      <div>
        <img id='inicio' src="/src/assets/Images/logo/logo.png" />
      </div>
      <div className='buttons-cont'>
        {/* Botones que redirigen de una sección a otra del home */}
        <MyButton
          text='Inicio'
          onSubmit={() => document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' })}
          btnClass='btn-white'
        />
        <MyButton
          text='Características'
          onSubmit={() => document.getElementById('caracteristicas').scrollIntoView({ behavior: 'smooth' })}
          btnClass='btn-white'
        />
        <MyButton
          text='Contacto'
          onSubmit={() => document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' })}
          btnClass='btn-white'
        />
        <MyButton
          text='Iniciar sesión'
          onSubmit={() =>setShowPage('login')} 
          btnClass='btn-green'
        />
      </div>
    </div>
  )
}
