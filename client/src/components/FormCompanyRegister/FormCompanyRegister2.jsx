import React from 'react';
import './formCompanyRegister.css';
import { question6 } from '../../data/CompanyRegisterData/Question6';
import { question7 } from '../../data/CompanyRegisterData/Question7';
import { question8 } from '../../data/CompanyRegisterData/Question8';
import { question9 } from '../../data/CompanyRegisterData/Question9';
import { MyButton } from '../MyButton/MyButton';
import { companyRegisterSchema2 } from '../../../schemas/companyRegister';
import { ZodError } from 'zod';

export const FormCompanyRegister2 = ({
  newCompany1,
  handleChange,
  setCurrentFormPage,
  valErrors,
  setValErrors
}) => {

  const turnPage = async() => {
        try {
          companyRegisterSchema2.parse({... newCompany1});
          setCurrentFormPage(3)
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
      <main className="form-main">
        <section className="form-section">
          <form className="form-card">
            <h3>2. Características de la empresa</h3>
            <label>7. Tipo de empresa</label>
            <select
              value={newCompany1.company_type}
              name="company_type"
              className='myinput'
              onChange={handleChange}
            >
              <option value="" disabled>
                Elige una opción
              </option>
              {question6.map((elem) => {
                return (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                );
              })}
            </select>
            {valErrors?.company_type && (
              <p className="red">{valErrors.company_type}</p>
            )}
            <label>8. Forma jurídica</label>
            <select
              value={newCompany1.legal_form}
              name="legal_form"
              className='myinput'
              onChange={handleChange}
            >
              <option value="" disabled>
                Elige una opción
              </option>
              {question7.map((elem) => {
                return (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                );
              })}
            </select>
            {valErrors?.legal_form && (
              <p className="red">{valErrors.legal_form}</p>
            )}

            <label>9. Años en activo</label>
            <select
              value={newCompany1.active_years}
              name="active_years"
              className='myinput'
              onChange={handleChange}
            >
              <option value="" disabled>
                Elige una opción
              </option>
              {question8.map((elem) => {
                return (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                );
              })}
            </select>
            {valErrors?.active_years && (
              <p className="red">{valErrors.active_years}</p>
            )}
            <label>10. Números de empleados</label>
            <select
              value={newCompany1.company_size}
              name="company_size"
              className='myinput'
              onChange={handleChange}
            >
              <option value="" disabled>
                Elige una opción
              </option>
              {question9.map((elem) => {
                return (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                );
              })}
            </select>
            {valErrors?.company_size && (
              <p className="red">{valErrors.company_size}</p>
            )}

            <div className="btnform">
              <MyButton
                onSubmit={() => setCurrentFormPage(1)}
                text="Atrás"
                btnClass={'btn-red'}
              />
              <MyButton
                onSubmit={turnPage}
                text="Siguiente"
                btnClass='btn-green'
              />
            </div>
          </form>
        </section>
      </main>
    </>
  );
};
