import React from 'react'

export const InfoRepresentante = ({company}) => {

 
  return (
    <div>
      <h3>Persona de Contacto: {company?.company.name}</h3>
      <h3>Ocupación: {company?.company.position}</h3>
      <h3>Teléfono: {company?.company.phone_number}</h3>
      <h3>Email: {company?.company.user_email}</h3>      
    </div>
  )
}
