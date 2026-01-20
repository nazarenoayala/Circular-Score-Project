import React from 'react'
import { Button } from 'react-bootstrap';

export const NavbarPublic = () => {

  return (
    <div className='header-public'>
      <div>
        <img src="/src/assets/logo.png" />
      </div>

      <div>
        <Button>Inicio</Button>
        <Button>Características</Button>
        <Button>Contacto</Button>
        <Button>Iniciar sesión</Button>
      </div>
    </div>
  )
}
