import React from 'react'
import { Card, Form } from 'react-bootstrap'

export const EditTestCategory = ({testName, handleTitleChange}) => {
  return (
            <Form>
            {/* Seccion edicion titulo / categoría */}
            <div className='section-edit'>
            <Form.Group>
                <Form.Label>Título/ categoría del test</Form.Label>
                <Form.Control
                    type="text"
                    value={testName}
                    onChange={handleTitleChange}
                >                    
                </Form.Control>
            </Form.Group>
            </div>
            </Form>
  )
}
