import React from 'react'
import { Card, Form } from 'react-bootstrap'

const segmentClientOptions = [
    //lista de opciones con clave valor (uso texto q ya identificaba cada opción)
    { value: 'b2b', label: 'Empresas (B2B)' },
    { value: 'b2c', label: 'Consumidor final (B2C)' },
    { value: 'b2g', label: 'Administraciones públicas (B2G)' },
    { value: 'third_sector', label: 'Endidades del tercer sector' }
];

const stakeholderOptions = [
    //lista de opciones con clave valor numerico, hacer map luego
    { value: 1, label: 'Personas empleadas' },
    { value: 2, label: 'Clientes / usuarios' },
    { value: 3, label: 'Proveedores' },
    { value: 4, label: 'Comunidad local' },
    { value: 5, label: 'Accionistas / socios' },
    { value: 6, label: 'Administraciones públicas' },
    { value: 7, label: 'Entidades financieras' },
    { value: 8, label: 'ONG / asociaciones' },
    { value: 9, label: 'Universidades / centros de investigación' },
    { value: 10, label: 'Otros grupos de interés' }
];

export const FormEditCompany = ({
    editCompanyData,
    handleCompanyChange,
    province,
    city,
    valErrors

}) => {
    //funcion para filtrar ciudades correspondientes a la provincia seleccionada
    const localityProvince = city?.filter(e => Number(e.province_id) === Number(editCompanyData.province_id)) || [];

    return (
        <Card>
            <Card.Body>
                <Form>
                    {/* Lado izquierdo */}
                    <Form.Group>
                        <Form.Label>Nombre de la empresa</Form.Label>
                        <Form.Control
                            name='company_name'
                            value={editCompanyData?.company_name || ""}
                            onChange={handleCompanyChange}
                            placeholder='Introduce nombre de la empresa'
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                            name='company_email'
                            value={editCompanyData.company_email || ""}
                            onChange={handleCompanyChange}
                            placeholder='Introduce email de contacto'
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Teléfono de contacto empresa</Form.Label>
                        <Form.Control
                            name='phone_number'
                            value={editCompanyData.phone_number || ""}
                            onChange={handleCompanyChange}
                            placeholder='Introduce teléfono de contacto'
                        >
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tipo de empresa</Form.Label>
                        <Form.Select
                            name='legal_form'
                            value={editCompanyData?.legal_form || ""}
                            onChange={handleCompanyChange}

                        >
                            <option value="1">Autónomo/a</option>
                            <option value="2">StartUp</option>
                            <option value="3">Micro empresa</option>
                            <option value="4">Pyme</option>
                            <option value="5">Gran empresa</option>
                            <option value="6">Entidad sin ánimo de lucro</option>
                            <option value="7">Administración pública / Entidad pública</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Años en activo</Form.Label>
                        <Form.Select
                            name='active_years'
                            value={editCompanyData?.active_years || ""}
                            onChange={handleCompanyChange}

                        >
                            <option value="1">Menos de 2 años</option>
                            <option value="2">Entre 2 y 5 años</option>
                            <option value="3">Entre 6 y 10 años</option>
                            <option value="4">Entre 11 y 20 años</option>
                            <option value="5">Más de 20 años</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Nº de empleados</Form.Label>
                        <Form.Select
                            name='company_size'
                            value={editCompanyData?.company_size || ""}
                            onChange={handleCompanyChange}
                        >
                            <option value="1">1-9</option>
                            <option value="2">10-49</option>
                            <option value="3">50-249</option>
                            <option value="4">Más de 250</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Sector</Form.Label>
                        <Form.Select
                            name='sector_id'
                            value={editCompanyData?.sector_id || ""}
                            onChange={handleCompanyChange}
                        >
                            <option value="1">Agricultura, ganadería y pesca</option>
                            <option value="2">Industria alimentaria</option>
                            <option value="3">Industria manufacturera</option>
                            <option value="4">Construcción</option>
                            <option value="5">Comercio mayorista</option>
                            <option value="6">Comercio minorista</option>
                            <option value="7">Servicios profesionales</option>
                            <option value="8">Servicios financieros y seguros</option>
                            <option value="9">Tecnología / Innovación / TIC</option>
                            <option value="10">Energía y utilities</option>
                            <option value="11">Medio ambiente y gestión de residuos</option>
                            <option value="12">Turismo y hostelería</option>
                            <option value="13">Transporte y logística</option>
                            <option value="14">Educación y formación</option>
                            <option value="15">Sanidad y servicios sociales</option>
                            <option value="16">Cultura, deporte y ocio</option>
                            <option value="17">Economía social</option>
                            <option value="18">Otro sector (especificar)</option>
                            {/* como especificar? */}
                        </Form.Select>
                    </Form.Group>

                    {/* Lado derecho */}
                    <Form.Group>
                        <Form.Label>Ámbito geográfico principal de operación</Form.Label>
                        <Form.Select
                            name='gso'
                            value={editCompanyData?.gso || ""}
                            onChange={handleCompanyChange}
                        >
                            <option value="1">Local (municipio)</option>
                            <option value="2">Comarcal</option>
                            <option value="3">Regional / Autónomico</option>
                            <option value="4">Nacional</option>
                            <option value="5">Comercio mayorista</option>
                            <option value="6">Internacional (Europa)</option>
                            <option value="7">Internacional (fuera de Europa)</option>
                        </Form.Select>
                    </Form.Group>


                    <Form.Group>
                        <Form.Label>Provincia</Form.Label>
                        <Form.Select
                            name='province_id'
                            //lista desplegable de localidades
                            value={editCompanyData?.province_id || ""}
                            onChange={handleCompanyChange}
                            placeholder='Selecciona provincia'
                        >
                            {province?.map((elem) => {
                                return (
                                    <option key={elem.province_id} value={elem.province_id}>{elem.name}</option>
                                )
                            })}
                        </Form.Select>
                        {valErrors?.province_id && (
                            <p>{valErrors.province_id}</p>
                        )}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Select
                            name='city_id'
                            //lista desplegable de localidades
                            value={editCompanyData?.city_id || ""}
                            onChange={handleCompanyChange}
                            placeholder='Selecciona ciudad'
                        >
                            {localityProvince?.map((elem) => {
                                return (
                                    <option key={elem.city_id} value={elem.city_id}>{elem.name}</option>
                                )
                            })}
                        </Form.Select>
                        {valErrors?.city_id && (
                            <p>{valErrors.city_id}</p>
                        )}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Estado de sostenibilidad y ODS</Form.Label>
                        <Form.Select
                            name='ods_background'
                            value={editCompanyData?.ods_background || ""}
                            onChange={handleCompanyChange}
                        >
                            <option value="1">Si, formalizada y en vigor</option>
                            <option value="2">Si, informal o parcial</option>
                            <option value="3">En desarrollo</option>
                            <option value="4">No, pero está previsto abordarlo</option>
                            <option value="5">No, pero está previsto abordarlo</option>
                            <option value="6">No, no se ha planteado</option>
                        </Form.Select>
                    </Form.Group>

                    <div className='checkbox-container'>
                        {/* Check box lado izquierdo */}
                        <div className='checkbox-group'>
                            <Form.Label
                                className='checkbox-title'
                            >CLIENTES Y GRUPOS DE INTERÉS
                            </Form.Label>
                            {segmentClientOptions.map((option) => (
                                <Form.Check
                                    className="stakeholder-check"
                                    type='checkbox'
                                    name='client_segment'
                                    key={option.value}
                                    label={option.label}
                                    value={option.value}
                                    onChange={(e) => handleCompanyChange(e, option.value)}
                                    checked={editCompanyData?.client_segment?.includes(option.value) || false}
                                />
                            ))}
                        </div>

                        {/* Check box lado derecho */}
                        <div className='checkbox-group'>
                            <Form.Label
                                className='checkbox-title'
                            >PRINCIPALES GRUPOS DE INTERÉS
                            </Form.Label>
                            {stakeholderOptions.map((option) => (
                                <Form.Check
                                    className="stakeholder-check"
                                    type='checkbox'
                                    name='stakeholders'
                                    key={option.value}
                                    label={option.label}
                                    value={option.value}
                                    onChange={(e) => handleCompanyChange(e, option.value)}
                                    checked={editCompanyData?.stakeholders?.includes(option.value) || false}
                                />
                            ))}
                        </div>
                    </div>
                </Form>
            </Card.Body>
        </Card>

    )
}