import React from 'react'
import './formCompanyRegister.css'
import { question14 } from '../../data/CompanyRegisterData/Question14'
import { question16 } from '../../data/CompanyRegisterData/Question16'
import { question17 } from '../../data/CompanyRegisterData/Question17'
import { question15 } from '../../data/CompanyRegisterData/Question15'

export const FormCompanyRegister4 = ({
                newCompany1, 
                handleChange, 
                setCurrentFormPage,
                onSubmit,
                valErrors}) => {
    

  return (
    <>
    <div className='ppal'>
      <form action="" className='form'>
          <h2>5. Clientes y grupos de interés</h2>

          <label>15. Tipo de clientes principales</label>
           {question14.map((elem)=>{
                return(
                <label key={elem.id}>
                <input
                  type='checkbox'
                  checked={newCompany1.client_segment?.includes(elem.id)}
                  name='client_segment'
                  onChange={(e)=>handleChange(e, elem.id)}
                />
                {elem.name}
            </label> 
                 )
              })}

          <label>16. Principales grupos de interés(stakeholders)</label>
            {question15.map((elem)=>{
                return(
                <label key={elem.id}>
                <input
                  type='checkbox'
                  value={newCompany1.stakeholders?.includes(elem.id)}
                  name='stakeholders'
                  onChange={(e)=>handleChange(e, elem.id)}
                />
                {elem.name}
            </label> 
                 )
              })}

          <h2>6. Sostenibilidad y ODS (preguntas puente)</h2>

          <label> 17. ¿La empresa dispone de una política de sostenibilidad, RSC o ESG?</label>
          <select
            value={newCompany1.sustainability}
            name='sustainability'
            onChange={handleChange}>
              <option value="" disabled>Elige una opción</option>
              {question16.map((elem)=>{
                return(
                  <option key={elem.id} value={elem.id}>{elem.name}</option>
                )
              })}
          </select>

          {valErrors?.sustainability && (
              <p>{valErrors.sustainability}</p>
            )}
            

          <label>18. ¿Nivel de experiencia de la empresa con los ODS?</label>
          <select
            value={newCompany1.ods_background}
            name='ods_background'
            onChange={handleChange}>
              <option value="" disabled>Elige una opción</option>
            {question17.map((elem)=>{
              return(
                <option key={elem.id} value={elem.id}>{elem.name}</option>
              )
            })}
          </select>

          {valErrors?.ods_background && (
              <p>{valErrors.ods_background}</p>
            )}
            
            <div>
              <button onClick={()=>setCurrentFormPage(3)}>Atrás</button>
              <button onClick={onSubmit}>Enviar</button>
            </div>
        </form>
    </div>
    </>
  )
}
