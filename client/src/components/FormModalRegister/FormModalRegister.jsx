import React from 'react'

import {Modal, Button} from 'react-bootstrap';

export const FormModalRegister = ({setShowPage}) => {


   const onSubmit = async () => {
    try {
      setShowPage('modal')
      // ENVIAR DATOS AL BACK

    } catch (error) {
      console.log(error);
    }
  }


  
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>!Ya casi estás!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Tu cuenta ha sido creada, hemos enviado un correo electrónico con el enlace de activación.
        En caso de no recibirlo, por favor revisa la carpeta de correo no deseado</p>
        </Modal.Body>

        <Modal.Footer>
          <Button   onClick={onSubmit}>
            
            CORREO CONFIRMADO
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );

}
