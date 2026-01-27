import React from 'react'
import { Card, Form } from 'react-bootstrap'

export const FormEditUser = ({editUserData, handleUserChange}) => {
  return (
    <Card>
        <Card.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                        name='name'
                        value={editUserData?.name}
                        onChange={handleUserChange}
                        placeholder='Introduce nombre de usuario'
                    >    
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Apellido de usuario</Form.Label>
                    <Form.Control
                        name='last_name'
                        value={editUserData?.last_name}
                        onChange={handleUserChange}
                        placeholder='Introduce apellido de usuario'
                    >    
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Télefono</Form.Label>
                    <Form.Control
                        name='phone_number'
                        value={editUserData?.phone_number}
                        onChange={handleUserChange}
                        placeholder='Introduce teléfono de contacto'
                    >    
                    </Form.Control>
                </Form.Group>
                </Form>
        </Card.Body>
    </Card>
  )
}
