import React from 'react';
import './modal.css';
import { Modal, Button } from 'react-bootstrap';

export const FormModalRegister = ({ setShowPage }) => {
  const onSubmit = async () => {
    try {
      setShowPage('login');
      // ENVIAR DATOS AL BACK
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <h1 className="text-center mb-2">!Ya casi estás!</h1>

        <Modal.Body>
          <p>
            Tu cuenta ha sido creada, hemos enviado un correo electrónico con el
            enlace de activación. En caso de no recibirlo, por favor revisa la
            carpeta de correo no deseado.
          </p>
        </Modal.Body>

        <Modal.Footer className='justify-content-center'>
          <Button className="btn-green" onClick={onSubmit}>
            CORREO CONFIRMADO
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};
