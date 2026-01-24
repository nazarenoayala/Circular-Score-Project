import React from 'react'
import { InfoOneCompany } from '../../../components/InfoOneCompany/InfoOneCompany'
import { InfoRepresentante } from '../../../components/InfoRepresentante/InfoRepresentante'

const OneCompany = () => {
  return (
    <div>
      <div>
        <h1>Nombre Empresa</h1>
        <button>Deshabilitar</button>
      </div>

      <h2>Información Representante</h2>
      <InfoRepresentante
              path
      />

      <h2>Información Empresa</h2>
      <InfoOneCompany/>



    </div>
  )
}

export default OneCompany