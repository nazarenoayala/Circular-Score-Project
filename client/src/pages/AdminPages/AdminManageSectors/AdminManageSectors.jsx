import React, { useContext, useEffect, useState } from 'react'
import { Card, Container, Form, Modal } from 'react-bootstrap';
import { MyButton } from '../../../components/MyButton/MyButton';
import { fetchData } from '../../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import './adminSectors.css'


const AdminManageSectors = () => {
    const {token} = useContext(AuthContext); 
    //Estado para lista de sectores
    const [sectors, setSectors] = useState([]);
    //Estado para sector seleccionado por id
    const [selectedSectorId, setSelectedSectorId] = useState("");
    //Estado para editar o eliminar sector
    const [editSector, setEditSector] = useState("")
    //Estado para nuevo crear sector o cambiar nombre
    const [newSector, setNewSector] = useState("");
    //Estado para modal de confirmacion de delete
    const [showModal, setShowModal] = useState(false);
    //Estado para modal de edicion exitosa
    const [showModalSucces, setShowModalSucces] = useState(false);

    useEffect(() => {
            bringSectors();
        }, []);

    
    const bringSectors = async () => {  
      try {
          const res = await fetchData('/sector/allSectors', 'GET');
          if (res?.data?.result) {
            setSectors(res.data.result)
    } else {
        setSectors([]);
    }
      } catch (error) {
        console.log(error);
      }  
    }

    
    const createSector = async () =>{
        try {
            const res = await fetchData('/sector/create', 'POST', {sector_name: newSector}, token);
            if (res?.status >= 200 && res?.status < 300) {
            setNewSector("");
            await bringSectors(); //espero a que la lista se refresque
            setShowModalSucces(true);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const updatedSector = async () =>{
        try {
            console.log("1. Iniciando actualización...");
            const res = await fetchData(`/sector/update/${selectedSectorId}`, 'PUT', {sector_name: editSector}, token);
            console.log("2. Respuesta recibida:", res);
            if (res?.status >= 200 && res?.status < 300) {
                console.log("3. Status 200, refrescando...");
                setSelectedSectorId(""); //reinicio el select
                setEditSector("");
                await bringSectors();
                setShowModalSucces(true);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const deleteSector = async () =>{
        //busco token pq sino me sale undefined
        const searchToken = localStorage.getItem("credentials");
        try {
            const res = await fetchData(`/sector/delete/${selectedSectorId}`, 'DELETE', null, searchToken);
            if (res?.status >= 200 && res?.status < 300) {
            setSelectedSectorId("");
            setEditSector("");
            setShowModal(false);
            await bringSectors();
            }
        } catch (error) {
            console.log(error);       
        }
    }

    const handleSelectChange = (e) => {
        const id = e.target.value;
        setSelectedSectorId(id);
        //Busco nombre del sector seleccionado para usarlo en el input de editar
        const sector = sectors.find(individualSector => individualSector.sector_id === parseInt(id));
        setEditSector(sector ? sector.sector_name : "");
    }

    //Funciones para abrir y cerrar modal
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

  return (
    <div>
        <Container className='container-admin py-5'>
            <h2>Categorías de empresas</h2>
            {/* Seccion para gestionar sectores ya existentes */}
            <Card className='section'>
                <Card.Header className='sector-titles'>Modificar o Eliminar Categoría</Card.Header>
                <Card.Body>
                    <Form.Group className='mb-4'>
                        <Form.Label className='sector-titles'>Selecciona categoría</Form.Label>
                        <Form.Select
                        value={selectedSectorId}
                        onChange={handleSelectChange}
                        >
                            <option value="">Elige un sector</option>
                            {sectors?.map(elem => (
                                <option key={elem.sector_id} 
                                        value={elem.sector_id}>
                                {elem.sector_name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='mb-4'>
                        <Form.Label className='sector-titles'>Modificar nombre de la categoría</Form.Label>
                        <Form.Control
                        type='text'
                        value={editSector}
                        onChange={(e) => setEditSector(e.target.value)}
                        placeholder='Escribe el nuevo nombre aquí'
                        />
                    </Form.Group>

                    <div className='d-flex gap-3'>
                        <MyButton
                            text="Actualizar nombre"
                            onSubmit={updatedSector}
                            className="btn"
                        />
                        <MyButton
                            text="Eliminar categoría"
                            onSubmit={handleShowModal}
                            className="btn"
                        />
                    </div>
                </Card.Body>
            </Card>

            {/* Seccion para crear nueva categoria */}
            <Card className='section'>
                <Card.Header>Crear Nueva Categoría</Card.Header>
                <Card.Body>
                    <Form.Group className='mb-4'>
                        <Form.Label className='sector-titles'>Añadir Categoría</Form.Label>
                        <Form.Control
                            type="text"
                            value={newSector}
                            onChange={(e) => setNewSector(e.target.value)}
                            placeholder='Ej: Agropecuario'
                        />
                    </Form.Group>
                    <MyButton
                        text="Añadir Categoría"
                        onSubmit={createSector}
                        className="btn"
                    />
                </Card.Body>
            </Card>
        </Container>
            <Modal
                show={showModalSucces} 
                onHide={handleCloseModal}
                centered
            >
                    <Modal.Header>
                        <Modal.Title>CAMBIOS GUARDADOS</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>Se han realizado los cambios</Modal.Body>
                            <Modal.Footer>
                                <MyButton
                                    text="OK"
                                    onSubmit={() => setShowModalSucces(false)}
                                />
                            </Modal.Footer>
                 </Modal>

            <Modal 
                show={showModal} 
                onHide={handleCloseModal} 
                centered
                >
                <Modal.Header>
                    <Modal.Title>Confirmacion eliminar categoría</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro que deseas eliminar la categoría seleccionada?</Modal.Body>
                <Modal.Footer>
                    <MyButton
                        text="Cancelar"
                        onSubmit={handleCloseModal}
                    />
                    <MyButton
                        text="Si, eliminar categoría"
                        onSubmit={deleteSector}
                    />
                </Modal.Footer>
            </Modal>
    </div>
  )
}

export default AdminManageSectors