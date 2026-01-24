import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext/AuthContext'
import { useParams } from 'react-router'


export const InfoOneCompany = () => {

  const { id } = useParams();
  console.log("user_id:", id);
  const {companyData} = useContext(AuthContext);


  return (
    <div>
        <h3>Teléfono: </h3>
        <h3>Email: </h3>
        <h3>Dirección: </h3>
        <h3>Sector: {companyData?.sector_id}</h3>
        <h3>Años en Activo: {companyData?.active_years}</h3>
        <h3>Nº Empleados: </h3>
        <h3>Tipo Empresa: </h3>
        <h3>Ámbito Geográfico: </h3>
        <h3>Tipos de Clientes: </h3>
        <h3>Sostenibilidad y ODS: </h3>
        <h3>Nivel de Experiencia con ODS: </h3>
    </div>
  )
}
 