import React from 'react'
import {Card, Form} from 'react-bootstrap'

export const FormEditCompany = () => {
  return (
    <Card>
        <Card.Body>
            <Card.Title>Datos de empresa</Card.Title>
            <Form>
                {/* Lado izquierdo */}
                <Form.Group>
                    <Form.Label>Nombre de la empresa</Form.Label>
                    <Form.Control
                        name='company_name'
                        // value={}
                        // onChange={}
                        placeholder='Introduce nombre de la empresa'
                    >    
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Nombre de la persona de contacto</Form.Label>
                    <Form.Control
                        name='name'
                        // value={}
                        // onChange={}
                        placeholder='Introduce nombre de la persona de contacto'
                    >    
                    </Form.Control>
                </Form.Group>

                 <Form.Group>
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control
                        name='user_email'
                        // value={}
                        // onChange={}
                        placeholder='Introduce email de contacto'
                    >    
                    </Form.Control>
                        </Form.Group>

                <Form.Group>
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        name='phone_number'                       
                        // value={} 
                        // onChange={}
                        placeholder='Introduce telefono de contacto'
                    >    
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Tipo de empresa</Form.Label>
                    <Form.Select
                        name='company_type'
                        // value={}
                        // onChange={}
                                           
                    >
                        <option value="" disabled hidden>Seleccionar tipo de empresa</option>
                        <option value="">Autónomo/a</option>
                        <option value="">StartUp</option>
                        <option value="">Micro empresa</option>
                        <option value="">Pyme</option>
                        <option value="">Gran empresa</option>
                        <option value="">Entidad sin ánimo de lucro</option>
                        <option value="">Administración pública / Entidad pública</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Años en activo</Form.Label>
                    <Form.Select
                        name='active_years'
                        // value={}
                        // onChange={}
                                             
                    >
                        <option value="" disabled hidden>Seleccionar..</option>
                        <option value="">Menos de 2 años</option>
                        <option value="">Entre 2 y 5 años</option>                       
                        <option value="">Entre 6 y 10 años</option>
                        <option value="">Entre 11 y 20 años</option>
                        <option value="">Más de 20 años</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Nº de empleados</Form.Label>
                    <Form.Select
                        name='company_size'
                        // value={}
                        // onChange={}                     
                    >
                        <option value="" disabled hidden>Seleccionar..</option>
                        <option value="">1-9</option>
                        <option value="">10-49</option>                       
                        <option value="">50-249</option>
                        <option value="">Más de 250</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Sector</Form.Label>
                    <Form.Select
                        name='sector_id'
                        // value={}
                        // onChange={}                     
                    >
                        <option value="" disabled hidden>Seleccionar sector</option>
                        <option value="">Agricultura, ganadería y pesca</option>
                        <option value="">Industria alimentaria</option>
                        <option value="">Industria manufacturera</option>
                        <option value="">Construcción</option>
                        <option value="">Comercio mayorista</option>
                        <option value="">Comercio minorista</option>
                        <option value="">Servicios profesionales</option>
                        <option value="">Servicios financieros y seguros</option>
                        <option value="">Tecnología / Innovación / TIC</option>
                        <option value="">Energía y utilities</option>
                        <option value="">Medio ambiente y gestión de residuos</option>
                        <option value="">Turismo y hostelería</option>
                        <option value="">Transporte y logística</option>
                        <option value="">Educación y formación</option>
                        <option value="">Sanidad y servicios sociales</option>
                        <option value="">Cultura, deporte y ocio</option>
                        <option value="">Economía social</option>
                        <option value="">Otro sector (especificar)</option>
                    </Form.Select>
                </Form.Group>

                    {/* Lado derecho */}
                <Form.Group>
                    <Form.Label>Ámbito geográfico principal de operación</Form.Label>
                    <Form.Select
                        name=''
                        // value={}
                        // onChange={}                     
                    >
                        <option value="" disabled hidden>Seleccionar ámbito geográfico</option>
                        <option value="">Local (municipio)</option>
                        <option value="">Comarcal</option>                       
                        <option value="">Regional / Autónomico</option>
                        <option value="">Nacional</option>
                        <option value="">Comercio mayorista</option>
                        <option value="">Internacional (Europa)</option>
                        <option value="">Internacional (fuera de Europa)</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Localidad de la sede</Form.Label>
                    <Form.Control
                        name='province_id'
                        //lista desplegable de localidades
                        // value={}
                        // onChange={}
                    >    
                    </Form.Control>
                </Form.Group>
                        

                <Form.Group>
                    <Form.Label>Estado de sostenibilidad y ODS</Form.Label>
                    <Form.Select
                        name='ods_background'
                        // value={}
                        // onChange={}
                        >
                        <option value="" disabled hidden>Seleccionar..</option>    
                        <option value="">Si, formalizada y en vigor</option>    
                        <option value="">Si, informal o parcial</option>    
                        <option value="">En desarrollo</option>    
                        <option value="">No, pero está previsto abordarlo</option>    
                        <option value="">No, pero está previsto abordarlo</option>    
                        <option value="">No, no se ha planteado</option>    
                    </Form.Select>
                </Form.Group>
                    
                    <div>
                    <Form.Label>Grupo de interés</Form.Label>
                    <Form.Check
                        type='checkbox'
                        name='gso'
                        // onChange={}
                        
                    >    
                    </Form.Check>
                    </div>
                    

    
    
            </Form>
        </Card.Body>
    </Card>
        
  )
}
