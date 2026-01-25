import React from 'react'
import './formCompanyRegister.css'
import { question3 } from '../../data/CompanyRegisterData/Question3'

export const FormCompanyRegister1 = ({
                      newCompany, 
                      handleChange, 
                      setCurrentFormPage,
                      navigate,
                      valErrors,
                      fetchError}) => {
  return (
    <>
      <div className='ppal'>
        <h2>1. Identificación de la empresa</h2>

        <form action="" className='form'>
          <label>1. Nombre de la empresa</label>
          <input
            type="text"
            placeholder='Nombre de la empresa'
            value={newCompany.company_name}
            name='company_name'
            onChange={handleChange} />

            {valErrors?.company_name && (
              <p>{valErrors.company_name}</p>
            )}
            
          <label>2. Nombre de la persona de contacto</label>
          <input
            type="text"
            placeholder='Nombre de la persona de contacto'
            value={newCompany.contact_name}
            name='contact_name'
            onChange={handleChange} />

            {valErrors?.contact_name && (
              <p>{valErrors.contact_name}</p>
            )}

          <label>3. Cargo de la persona de contacto</label>
          <select
              value={newCompany.position}
              name='position'
              onChange={handleChange}>
              <option value="" disabled>Elige una opción</option>
          {question3.map((elem)=>{
            return(
              <option key={elem.id} value={elem.id}>{elem.name}</option>
            )
          })}
          </select>
            {newCompany.position === '12' && <input
            type="text"
            placeholder='Especificar el cargo'
            value={newCompany.position_other}
            name='position_other'
            onChange={handleChange} />}

            {valErrors?.position_other && (
              <p>{valErrors.position_other}</p>
            )}

          <label>4. Teléfono de contacto</label>
          <input
            type="text"
            placeholder='Teléfono de contacto'
            value={newCompany.phone_number}
            name='phone_number'
            onChange={handleChange} />

            {valErrors?.phone_number && (
              <p>{valErrors.phone_number}</p>
            )}

          <label htmlFor="">5. Correo electrónico de contacto</label>
          <input
            type="text"
            placeholder='Correo electrónico de contacto'
            value={newCompany.user_email}
            name='user_email'
            onChange={handleChange} />

            {valErrors?.user_email && (
              <p>{valErrors.user_email}</p>
            )}
            {fetchError?.user_email && (
              <p>{fetchError.user_email}</p>
            )}

            <div>
              <button onClick={()=>navigate('/')}>Cancelar</button>
              <button onClick={()=>setCurrentFormPage(2)}>Siguiente</button>
            </div>
        </form>
      </div>
    </>
  )
}
