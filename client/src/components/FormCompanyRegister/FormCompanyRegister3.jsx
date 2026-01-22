import React from 'react'

export const FormCompanyRegister3 = ({newCompany, handleChange, setCurrentFormPage}) => {
  return (
    <>
      <form action="">
        <h2>3. Sector de actividad</h2>
        <label htmlFor="">10. Sector principal de la empresa</label>
        <input
          type="text"
          placeholder='Sector principal de la empresa'
          value={newCompany.sector_name}
          name='sector_name'
          onChange={handleChange} />
        <h2>4. Localización y ámbito geográfico</h2>
        <label htmlFor="">11. Localización de la sede principal</label>
        <input
          type="text"
          placeholder='Localización de la sede principal'
          value={newCompany.city_name}
          name='city_name'
          onChange={handleChange} />
        <label htmlFor="">12. Provincia de la sede principal</label>
        <input
          type="text"
          placeholder='Provincia de la sede principal'
          value={newCompany.province_name}
          name='province_name'
          onChange={handleChange} />
        <label htmlFor="">13. Ámbito geográfico principal de operación</label>
        <input
          type="text"
          placeholder='Ámbito geográfico principal de operación'
          value={newCompany.gso}
          name='gso'
          onChange={handleChange} />
          <div>
            <button onClick={()=>setCurrentFormPage(2)}>Atrás</button>
            <button onClick={()=>setCurrentFormPage(4)}>Siguiente</button>
          </div>
      </form>
    </>
  )
}
