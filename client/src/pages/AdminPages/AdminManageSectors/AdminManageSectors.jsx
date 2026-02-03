import React, { useState } from 'react'
import { Card, Container, Form } from 'react-bootstrap';
import { MyButton } from '../../../components/MyButton/MyButton';


const AdminManageSectors = () => {
    //Estado para lista de sectores
    const [sectors, setSectors] = useState([]);
    const [selectedSectorId, setSelectedSectorId] = useState("");
    const [editSector, setEditSector] = useState("")
    const [newSector, setNewSector] = useState("");

    const createSector = () =>{
        //peticion POST al endpoint de sectores
    }

    const updatedSector = () =>{
        
    }

    const deleteSector = () =>{

    }
  return (
    <div>
        <Container>
            <h2>Categorías de empresas</h2>
            {/* Seccion para gestionar sectores ya existentes */}
            <Card>
                <Card.Header>Modificar o Eliminar Categoría</Card.Header>
                <Card.Body>
                    <Form.Group>
                        <Form.Label>Selecciona categoría</Form.Label>
                        <Form.Select
                        //value
                        //onchange
                        >
                            <option value="">Elige un sector</option>
                            {/* map de sectores */}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Nombre de la categoría</Form.Label>
                        <Form.Control
                        //type
                        //value
                        //onchange
                        />
                    </Form.Group>

                    <div>
                        <MyButton
                            text="Guardar cambios"
                            //onsubmit
                        />
                        <MyButton
                            text="Eliminar categoría"
                            //onsubmit
                        />
                    </div>
                </Card.Body>
            </Card>

            {/* Seccion para crear nueva categoria */}
            <Card>
                <Card.Header>Crear Nueva Categoría</Card.Header>
                <Card.Body>
                    <Form.Group>
                        <Form.Label>Nueva Categoría</Form.Label>
                        <Form.Control
                            type="text"
                            //value
                            //onchange
                        />
                    </Form.Group>
                    <MyButton
                        text="Añadir Sector"
                        //onsubmit
                    />
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}

export default AdminManageSectors