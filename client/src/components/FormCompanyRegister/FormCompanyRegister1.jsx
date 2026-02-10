import React from 'react'
import './formCompanyRegister.css'
import { question3 } from '../../data/CompanyRegisterData/Question3'
import { MyButton } from '../MyButton/MyButton'
import '../../components/MyButton/MyButton.css'
import { companyRegisterSchema1 } from '../../../schemas/companyRegister'
import { ZodError } from 'zod';

export const FormCompanyRegister1 = ({
  newCompany1,
  newCompany2,
  handleChange,
  setCurrentFormPage,
  navigate,
  valErrors,
  fetchError, 
  setValErrors}) => {

    //funcion para pasar de vista haciendo antes una validación de los datos 

    const turnPage = async() => {
      try {
        companyRegisterSchema1.parse({... newCompany1, ...newCompany2});
        setCurrentFormPage(2)
      } catch (error) {
        if (error instanceof ZodError) {
                const fieldsErrors = {};
                error.issues.forEach((elem) => {
                  fieldsErrors[elem.path[0]] = elem.message;
                });
                setValErrors(fieldsErrors);
              } else {
                console.log(error);
                
              }
      }
    }

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
              value={newCompany2.name}
              name='name'
              onChange={handleChange} />
            {valErrors?.name && (
              <p className='red'>{valErrors.name}</p>
            )}

            <label>3. Apellidos de la persona de contacto</label>
            <input
              type="text" 
              className='myinput'
              placeholder='Apellidos de la persona de contacto'
              value={newCompany2.last_name}
              name='last_name'
              onChange={handleChange} />
            {valErrors?.last_name && (
              <p className='red'>{valErrors.last_name}</p>
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
                onSubmit={turnPage}
                text='Siguiente'
                btnClass='btn-green' />
            </div>
          </form>
        </section>
      </main>
    </>
  )
}
