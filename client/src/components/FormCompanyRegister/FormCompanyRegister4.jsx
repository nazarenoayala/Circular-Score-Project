import React from 'react'

export const FormCompanyRegister4 = ({newCompany, handleChange, setCurrentFormPage}) => {
  return (
    <>
    <form action="">
        <h2>5. Clientes y grupos de interés</h2>
        <label htmlFor="">14. Tipo de clientes principales</label>
        <input
          type="text"
          placeholder='Tipo de clientes principales'
          value={newCompany.client_segment}
          name='client_segment'
          onChange={handleChange} />
        <label htmlFor="">15. Principales grupos de interés(stakeholders)</label>
        <input
          type="text"
          placeholder='Principales grupos de interés'
          value={newCompany.stakeholders}
          name='stakeholders'
          onChange={handleChange} />
        <h2>6. Sostenibilidad y ODS (preguntas puente)</h2>
        <label htmlFor="">16. ¿La empresa dispone de una política de sostenibilidad, RSC o ESG?</label>
        <input
          type="text"
          placeholder='La empresa dispone de una política de sostenibilidad'
          value={newCompany.sustainability}
          name='sustainability'
          onChange={handleChange} />
        <label htmlFor="">17. ¿Nivel de experiencia de la empresa con los ODS?</label>
        <input
          type="text"
          placeholder='¿Nivel de experiencia de la empresa con los ODS?'
          value={newCompany.ods_background}
          name='ods_background'
          onChange={handleChange} />
          <div>
            <button onClick={()=>setCurrentFormPage(3)}>Atrás</button>
            <button>Enviar</button>
          </div>
      </form>
    </>
  )
}
