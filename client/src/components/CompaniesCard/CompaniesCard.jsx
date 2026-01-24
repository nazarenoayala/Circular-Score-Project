import React, { useState } from 'react';
import { MyButton } from '../MyButton/MyButton';
import './allCompanies.css'

export const CompaniesCard = ({empresa}) => {

  const [shwoInfo, setShowInfo] = useState(false);


  return (

<div className='p-5'>
      <div className="card py-2 ">
        <h2 className="header">EMPRESAS REGISTRADAS</h2>
      </div>
      <div className="d-flex justify-content-center align-items-center gap-5 py-3">
        <input
          type="text"
          placeholder="buscar empresa"
          className="flex-1 border rounded px-3 py-2"
        />
        <select className="border rounded px-3 py-2 ">
          <option>Categoría</option>
        </select>
      </div>

      <div className="card mb-3 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3>{empresa.company_name}</h3>

          <div className="d-flex gap-2">
            <MyButton text="Gestionar Empresa" btnClass="btn-green" />

            <MyButton
              text="Ver información"
              btnClass="bnt-white"
              onSubmit={() => setShowInfo(true)}
            />
          </div>
        </div>

        {shwoInfo && (
          <div className="d-flex justify-content-around align-items-center">
            <div>
              <ul>
                <li>Persona de contacto: {empresa.name} </li>
                <li>Teléfono: {empresa.phone_number}</li>
                <li>Email: {empresa.user_email}</li>
              </ul>
            </div>
            <div className="">
              <strong>Test realizados: empresa.testrealizados </strong>
            </div>
            <MyButton
              text="Cerrar"
              btnClass="btn-white"
              onSubmit={() => setShowInfo(false)}
            />
          </div>
        )}
      </div>
    </div>







  
  )
}
