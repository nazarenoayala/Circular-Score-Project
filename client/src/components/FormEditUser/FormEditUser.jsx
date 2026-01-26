import React from 'react'
import { Card, Form } from 'react-bootstrap'

export const FormEditUser = () => {
  return (
    <Card>
        <Card.Body>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                        name='name'
                        // value={}
                        // onChange={}
                        placeholder='Introduce nombre de usuario'
                    >    
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Télefono</Form.Label>
                    <Form.Control
                        name='phone_number'
                        // value={}
                        // onChange={}
                        placeholder='Introduce teléfono de contacto'
                    >    
                    </Form.Control>
                </Form.Group>
                </Form>
        </Card.Body>
    </Card>
  )
}
