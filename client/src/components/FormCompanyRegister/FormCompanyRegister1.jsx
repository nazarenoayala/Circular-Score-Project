import React from 'react'
import './formCompanyRegister.css'
import { question3 } from '../../data/CompanyRegisterData/Question3'
import { MyButton } from '../MyButton/MyButton'
import '../../components/MyButton/MyButton.css'

export const FormCompanyRegister1 = ({
  newCompany1,
  newCompany2,
  handleChange,
  setCurrentFormPage,
  navigate,
  valErrors,
  fetchError }) => {
  return (
    <>
      <main className='form-main'>
        <section className='form-section'>
          <form className='form-card'>
            <h3>1. Identificación de la empresa</h3>
            <label>1. Nombre de la empresa</label>
            <input
              type="text"
              className='myinput'
              placeholder='Nombre de la empresa'
              value={newCompany1.company_name}
              name='company_name'
              onChange={handleChange} />
            {valErrors?.company_name && (
              <p className='red'>{valErrors.company_name}</p>
            )}
            <label htmlFor="">2. Correo electrónico de la empresa</label>
            <input
              type="text" 
              className='myinput'
              placeholder='Correo electrónico de la empresa'
              value={newCompany1.company_email}
              name='company_email'
              onChange={handleChange} />
            {valErrors?.company_email && (
              <p className='red'>{valErrors.company_email}</p>
            )}
            {fetchError?.user_email && (
              <p className='red'>{fetchError.user_email}</p>
            )}

            <label>3. Nombre de la persona de contacto</label>
            <input
              type="text" 
              className='myinput'
              placeholder='Nombre de la persona de contacto'
              value={newCompany2.contact_name}
              name='contact_name'
              onChange={handleChange} />
            {valErrors?.contact_name && (
              <p className='red'>{valErrors.contact_name}</p>
            )}
            <label>4. Cargo de la persona de contacto</label>
            <select
              value={newCompany2.position}
              name='position' 
              className='myinput'
              onChange={handleChange}>
              <option value="" disabled>Elige una opción</option>
              {question3.map((elem) => {
                return (
                  <option key={elem.id} value={elem.id}>{elem.name}</option>
                )
              })}
            </select>
            {valErrors?.position && (
              <p className='red'>{valErrors.position}</p>
            )}
            <label>5. Teléfono de contacto</label>
            <input
              type="text"
              className='myinput'
              placeholder='Teléfono de contacto'
              value={newCompany2.phone_number}
              name='phone_number'
              onChange={handleChange} />
            {valErrors?.phone_number && (
              <p className='red'>{valErrors.phone_number}</p>
            )}
            <label htmlFor="">6. Correo electrónico de contacto</label>
            <input
              type="text"
              className='myinput'
              placeholder='Correo electrónico de contacto'
              value={newCompany2.user_email}
              name='user_email'
              onChange={handleChange} />
            {valErrors?.user_email && (
              <p className='red'>{valErrors.user_email}</p>
            )}
            {fetchError?.user_email && (
              <p className='red'>{fetchError.user_email}</p>
            )}
            <div className='btnform'>
              <MyButton
                onSubmit={() => navigate('/')}
                text={'Cancelar'}
                btnClass={'btn-red'} />
              <MyButton
                onSubmit={() => setCurrentFormPage(2)}
                text={'Siguiente'}
                btnClass={'btn-green'} />
            </div>
          </form>
        </section>
      </main>
    </>
  )
}
