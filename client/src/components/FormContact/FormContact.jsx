import React from 'react'
import './FormContact.css';
import { Form, Button } from 'react-bootstrap';

export const FormContact = () => {

  return (
    <div className='contact-container text-center'>
      <h1>Contáctanos</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Nombre de usuario"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control as="textarea" rows={3} placeholder="Mensaje" />
        </Form.Group>
        <Button className='btn-green'>Enviar</Button>
      </Form>
    </div>
  )
}
