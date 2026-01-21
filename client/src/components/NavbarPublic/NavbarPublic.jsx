import React from 'react'
import './NavbarPublic.css'
import '../../App.css';
import { Button } from 'react-bootstrap';

export const NavbarPublic = () => {

  return (
    <div className='header-public'>
      <div>
        <img src="/src/assets/logo.png" />
      </div>

      <div className='buttons-cont'>
        <Button className='btn-white'>Inicio</Button>
        <Button className='btn-white'>Características</Button>
        <Button className='btn-white'>Contacto</Button>
        <Button className='btn-green'>Iniciar sesión</Button>
      </div>
    </div>
  )
}
