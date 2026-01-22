import React from 'react'

export const FormCompanyRegister1 = ({newCompany, handleChange, setCurrentFormPage}) => {
  return (
    <>
      <h2>1. Identificación de la empresa</h2>
      <form action="">
        <label htmlFor="">1. Nombre de la empresa</label>
        <input
          type="text"
          placeholder='Nombre de la empresa'
          value={newCompany.company_name}
          name='company_name'
          onChange={handleChange} />
        <label htmlFor="">2. Nombre de la persona de contacto</label>
        <input
          type="text"
          placeholder='Nombre de la persona de contacto'
          value={newCompany.contact_name}
          name='contact_name'
          onChange={handleChange} />
        <label htmlFor="">3. Cargo de la persona de contacto</label>
        <input
          type="text"
          placeholder='Cargo de la persona de contacto'
          value={newCompany.position}
          name='position'
          onChange={handleChange} />
        <label htmlFor="">4. Teléfono de contacto</label>
        <input
          type="text"
          placeholder='Teléfono de contacto'
          value={newCompany.phone_number}
          name='phone_number'
          onChange={handleChange} />
        <label htmlFor="">5. Correo electrónico de contacto</label>
        <input
          type="text"
          placeholder='Correo electrónico de contacto'
          value={newCompany.user_mail}
          name='user_mail'
          onChange={handleChange} />
          <div>
            <button>Atrás</button>
            <button onClick={()=>setCurrentFormPage(2)}>Siguiente</button>
          </div>
      </form>
    </>
  )
}
