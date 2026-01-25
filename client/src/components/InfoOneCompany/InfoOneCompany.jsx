import React from "react"
import './InfoOneCompany.css' 


export const InfoOneCompany = ({company}) => {

  return (

    <div>
        <h3>Teléfono: {company?.company.phone_number}</h3>
        <h3>Email: {company?.company.email}</h3>
        <h3>Dirección: {company?.company.city_id}, {company?.company.province_id}</h3>
        <h3>Sector: {company?.company.sector_id}</h3>
        <h3>Años en Activo: {company?.company.active_years}</h3>
        <h3>Nº Empleados: {company?.company.company_size}</h3>
        <h3>Tipo Empresa: {company?.company.company_type}</h3>
        <h3>Ámbito Geográfico: {company?.company.gso}</h3>
        <h3>Tipos de Clientes: {company?.company.client_segment}</h3>
        <h3>Sostenibilidad y ODS: {company?.company.sustainability}</h3>
        <h3>Nivel de Experiencia con ODS: {company?.company.ods_background}</h3>
    </div>
  )
}
 