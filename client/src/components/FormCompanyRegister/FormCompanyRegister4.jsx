import React from 'react'
import './formCompanyRegister.css'
import { question14 } from '../../data/CompanyRegisterData/Question14'
import { question16 } from '../../data/CompanyRegisterData/Question16'
import { question17 } from '../../data/CompanyRegisterData/Question17'
import { question15 } from '../../data/CompanyRegisterData/Question15'

export const FormCompanyRegister4 = ({
                newCompany, 
                handleChange, 
                setCurrentFormPage,
                /* setNewCompany */}) => {
    

  return (
    <>
    <div className='ppal'>
      <form action="" className='form'>
          <h2>5. Clientes y grupos de interés</h2>

          <label>14. Tipo de clientes principales</label>
           {question14.map((elem)=>{
                return(
                <label key={elem.id}>
                <input
                  type='checkbox'
                  checked={newCompany.client_segment.includes(elem.id)}
                  name='client_segment'
                  onChange={(e)=>handleChange(e, elem.id)}
                />
                {elem.name}
            </label> 
                 )
              })}

          <label>15. Principales grupos de interés(stakeholders)</label>
            {question15.map((elem)=>{
                return(
                <label key={elem.id}>
                <input
                  type='checkbox'
                  value={newCompany.stakeholders.includes(elem.id)}
                  name='stakeholders'
                  onChange={(e)=>handleChange(e, elem.id)}
                />
                {elem.name}
            </label> 
                 )
              })}

          <h2>6. Sostenibilidad y ODS (preguntas puente)</h2>

          <label> 16. ¿La empresa dispone de una política de sostenibilidad, RSC o ESG?</label>
          <select
            value={newCompany.sustainability}
            name='sustainability'
            onChange={handleChange}>
              <option value="" disabled>Elige una opción</option>
              {question16.map((elem)=>{
                return(
                  <option key={elem.id}>{elem.name}</option>
                )
              })}
          </select>
            

          <label>17. ¿Nivel de experiencia de la empresa con los ODS?</label>
          <select
            value={newCompany.ods_background}
            name='ods_background'
            onChange={handleChange}>
              <option value="" disabled>Elige una opción</option>
            {question17.map((elem)=>{
              return(
                <option key={elem.id}>{elem.name}</option>
              )
            })}
          </select>
            
            <div>
              <button onClick={()=>setCurrentFormPage(3)}>Atrás</button>
              <button>Enviar</button>
            </div>
        </form>
    </div>
    </>
  )
}
