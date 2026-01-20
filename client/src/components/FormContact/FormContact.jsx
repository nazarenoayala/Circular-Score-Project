import React from 'react'
import { Form, Button } from 'react-bootstrap';

export const FormContact = () => {

  return (
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
      <Button>Enviar</Button>
    </Form>

  )
}
