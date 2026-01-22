import React from 'react'

export const FormCompanyRegister2 = ({newCompany, handleChange, setCurrentFormPage}) => {
  return (
    <>
    <h2>2 . Características de la empresa</h2>
      <form action="">
        <label htmlFor="">6. Tipo de empresa</label>
        <input
          type="text"
          placeholder='Tipo de empresa'
          value={newCompany.company_type}
          name='company_type'
          onChange={handleChange} />
        <label htmlFor="">7. Forma jurídica</label>
        <input
          type="text"
          placeholder='Forma jurídica'
          value={newCompany.legal_form}
          name='legal_form'
          onChange={handleChange} />
        <label htmlFor="">8. Años en activo</label>
        <input
          type="text"
          placeholder='Años en activo'
          value={newCompany.active_years}
          name='active_years'
          onChange={handleChange} />
        <label htmlFor="">9. Números de empleados</label>
        <input
          type="text"
          placeholder='Números de empleados'
          value={newCompany.company_size}
          name='company_size'
          onChange={handleChange} />
          <div>
            <button onClick={()=>setCurrentFormPage(1)}>Atrás</button>
            <button onClick={()=>setCurrentFormPage(3)}>Siguiente</button>
          </div>
      </form>
    </>
    
  )
}
