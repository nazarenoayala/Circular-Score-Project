import React from 'react';
import './formCompanyRegister.css';
import { question14 } from '../../data/CompanyRegisterData/Question14';
import { question16 } from '../../data/CompanyRegisterData/Question16';
import { question17 } from '../../data/CompanyRegisterData/Question17';
import { question15 } from '../../data/CompanyRegisterData/Question15';
import { MyButton } from '../MyButton/MyButton';



export const FormCompanyRegister4 = ({
  newCompany1,
  handleChange,
  setCurrentFormPage,
  onSubmit,
  valErrors,
}) => {

  return (
    <>
      <main className="form-main">
        <section className="form-section">
          <form className="form-card">
            <h3>5. Clientes y grupos de interés</h3>
            <div className="checkbox-container">
              <div>
                <label>15. Tipo de clientes principales</label>
                <div className="checkbox-grid">
                  {question14.map((elem) => {
                    return (
                      <label key={elem.id} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={newCompany1.client_segment?.includes(
                            elem.id,
                          )}
                          name="client_segment"
                          onChange={(e) => handleChange(e, elem.id)}
                        />
                        <span>{elem.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            {valErrors?.client_segment && <p className="red">{valErrors.client_segment}</p>}
            <div className="checkbox-container">
              <div>
                <label>16. Principales grupos de interés(stakeholders)</label>
                <div className="checkbox-grid">
                  {question15.map((elem) => {
                    return (
                      <label key={elem.id} className="checkbox-item">
                        <input
                          type="checkbox"
                          value={newCompany1.stakeholders?.includes(elem.id)}
                          name="stakeholders"
                          onChange={(e) => handleChange(e, elem.id)}
                        />
                        <span>{elem.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
            {valErrors?.stakeholders && <p className="red">{valErrors.stakeholders}</p>}
            <h3>6. Sostenibilidad y ODS (preguntas puente)</h3>
            <label>
              {' '}
              17. ¿La empresa dispone de una política de sostenibilidad, RSC o
              ESG?
            </label>
            <select
              value={newCompany1.sustainability}
              name="sustainability"
              className='myinput'
              onChange={handleChange}
            >
              <option value="" disabled>
                Elige una opción
              </option>
              {question16.map((elem) => {
                return (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                );
              })}
            </select>
            {valErrors?.sustainability && <p className="red">{valErrors.sustainability}</p>}

            <label>18. ¿Nivel de experiencia de la empresa con los ODS?</label>
            <select
              value={newCompany1.ods_background}
              name="ods_background"
              className='myinput'
              onChange={handleChange}
            >
              <option value="" disabled>
                Elige una opción
              </option>
              {question17.map((elem) => {
                return (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                );
              })}
            </select>
            {valErrors?.ods_background && <p className="red">{valErrors.ods_background}</p>}

            <div className="btnform">
              <MyButton
                onSubmit={() => setCurrentFormPage(3)}
                text="Atrás"
                btnClass='btn-red'
              />
              <MyButton
                onSubmit={onSubmit}
                text="Enviar"
                btnClass='btn-green'
              />
            </div>
          </form>
        </section>
      </main>
    </>
  );
};
