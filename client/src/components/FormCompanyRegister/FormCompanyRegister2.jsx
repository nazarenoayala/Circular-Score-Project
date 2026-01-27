import React from 'react';
import './formCompanyRegister.css';
import { question6 } from '../../data/CompanyRegisterData/Question6';
import { question7 } from '../../data/CompanyRegisterData/Question7';
import { question8 } from '../../data/CompanyRegisterData/Question8';
import { question9 } from '../../data/CompanyRegisterData/Question9';

export const FormCompanyRegister2 = ({
  newCompany1,
  handleChange,
  setCurrentFormPage,
  valErrors
}) => {
  return (
    <>
      <div className="ppal">

        <h2>2. Características de la empresa</h2>

        <form action="" className="form">
          <label>7. Tipo de empresa</label>
          <select
            value={newCompany1.company_type}
            name="company_type"
            onChange={handleChange}
          >
            <option value="" disabled>
              Elige una opción
            </option>
            {question6.map((elem) => {
              return <option key={elem.id} value={elem.id}>{elem.name}</option>;
            })}
          </select>

          {valErrors?.company_type && (
              <p>{valErrors.company_type}</p>
            )}

          <label>8. Forma jurídica</label>
          <select
            value={newCompany1.legal_form}
            name="legal_form"
            onChange={handleChange}
          >
            <option value="" disabled>
              Elige una opción
            </option>
            {question7.map((elem) => {
              return <option key={elem.id} value={elem.id}>{elem.name}</option>;
            })}
          </select>

          {valErrors?.legal_form && (
              <p>{valErrors.legal_form}</p>
            )}
          
          <label>9. Años en activo</label>
          <select
            value={newCompany1.active_years}
            name="active_years"
            onChange={handleChange}
          >
            <option value="" disabled>Elige una opción</option>
            {question8.map((elem)=>{
              return(
                <option key={elem.id} value={elem.id}>{elem.name}</option>
              )
            })}
          </select>

          {valErrors?.active_years && (
              <p>{valErrors.active_years}</p>
            )}

          <label>10. Números de empleados</label>
          <select 
            value={newCompany1.company_size}
            name="company_size"
            onChange={handleChange}>
              <option value='' disabled>Elige una opción</option>
              {question9.map((elem)=>{
                return(
                  <option key={elem.id} value={elem.id}>{elem.name}</option>
                )
              })}
          </select>

          {valErrors?.company_size && (
              <p>{valErrors.company_size}</p>
            )}
           
          <div>
            <button onClick={() => setCurrentFormPage(1)}>Atrás</button>
            <button onClick={() => setCurrentFormPage(3)}>Siguiente</button>
          </div>
        </form>
      </div>
    </>
  );
};
