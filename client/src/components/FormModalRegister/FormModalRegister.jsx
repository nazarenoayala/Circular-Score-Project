import React from 'react'
import './modal.css'
import { Modal, Button } from 'react-bootstrap';
import { MyButton } from '../MyButton/MyButton';

export const FormModalRegister = ({ setShowPage }) => {


  const onSubmit = async () => {
    try {
      setShowPage('login')
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
        <Modal.Header>
          {/* <Modal.Title className='text-center'>!Ya casi estás!</Modal.Title> */}
          <h1>¡Ya casi estás!</h1>
        </Modal.Header>

        <Modal.Body >
          <p>Tu cuenta ha sido creada, hemos enviado un correo electrónico con el enlace de activación.
            En caso de no recibirlo, por favor revisa la carpeta de correo no deseado.</p>
        </Modal.Body>

        <Modal.Footer >
          <MyButton
            text={'CORREO CONFIRMADO'}
            btnClass='btn-green'
            onSubmit={onSubmit}
          />
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );

}
