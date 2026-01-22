import React from 'react';
import './formCompanyRegister.css';
import { question6 } from '../../data/CompanyRegisterData/Question6';
import { question7 } from '../../data/CompanyRegisterData/Question7';
import { question8 } from '../../data/CompanyRegisterData/Question8';
import { question9 } from '../../data/CompanyRegisterData/Question9';

export const FormCompanyRegister2 = ({
  newCompany,
  handleChange,
  setCurrentFormPage,
}) => {
  return (
    <>
      <div className="ppal">

        <h2>2 . Características de la empresa</h2>

        <form action="" className="form">
          <label>6. Tipo de empresa</label>
          <select
            value={newCompany.company_type}
            name="company_type"
            onChange={handleChange}
          >
            <option value="" disabled>
              Elige una opción
            </option>
            {question6.map((elem) => {
              return <option key={elem.id}>{elem.name}</option>;
            })}
          </select>

          <label>7. Forma jurídica</label>
          <select
            value={newCompany.legal_form}
            name="legal_form"
            onChange={handleChange}
          >
            <option value="" disabled>
              Elige una opción
            </option>
            {question7.map((elem) => {
              return <option key={elem.id}>{elem.name}</option>;
            })}
          </select>
          
          <label>8. Años en activo</label>
          <select
            value={newCompany.active_years}
            name="active_years"
            onChange={handleChange}
          >
            <option value="" disabled>Elige una opción</option>
            {question8.map((elem)=>{
              return(
                <option key={elem.id}>{elem.name}</option>
              )
            })}
          </select>

          <label>9. Números de empleados</label>
          <select 
            value={newCompany.company_size}
            name="company_size"
            onChange={handleChange}>
              <option value='' disabled>Elige una opción</option>
              {question9.map((elem)=>{
                return(
                  <option key={elem.id}>{elem.name}</option>
                )
              })}
          </select>
           
          <div>
            <button onClick={() => setCurrentFormPage(1)}>Atrás</button>
            <button onClick={() => setCurrentFormPage(3)}>Siguiente</button>
          </div>
        </form>
      </div>
    </>
  );
};
