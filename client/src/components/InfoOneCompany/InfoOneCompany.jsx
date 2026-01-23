import React, { useContext } from 'react'


export const InfoOneCompany = () => {

  const { token } = useContext(Auth)

  return (
    <div>
      <div>
        <h3>Persona de Contacto: </h3>
        <h3>Ocupación: </h3>
        <h3>Teléfono: </h3>
        <h3>Email: </h3>
      </div>

      <h2>Información Empresa</h2>

      <div>
        <h3>Teléfono: </h3>
        <h3>Email: </h3>
        <h3>Dirección: </h3>
        <h3>Sector: </h3>
        <h3>Años en Activo: </h3>
        <h3>Nº Empleados: </h3>
        <h3>Tipo Empresa: </h3>
        <h3>Ámbito Geográfico: </h3>
        <h3>Tipos de Clientes: </h3>
        <h3>Sostenibilidad y ODS: </h3>
        <h3>Nivel de Experiencia con ODS: </h3>
      </div>
    </div>
  )
}
 