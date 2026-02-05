import React from 'react';
import './formCompanyRegister.css';
import { question10 } from '../../data/CompanyRegisterData/Question10';
import { question13 } from '../../data/CompanyRegisterData/Question13';
import { MyButton } from '../MyButton/MyButton';
import { ZodError } from 'zod';
import { companyRegisterSchema3 } from '../../../schemas/companyRegister';

export const FormCompanyRegister3 = ({
  newCompany1,
  newCompany2,
  handleChange,
  setCurrentFormPage,
  locality,
  province,
  valErrors,
  setValErrors
}) => {

  // filtramos las ciudades para que aparezcan, dependiendo de la provincia elegida
  
  const localityProvince = locality?.filter(
    (e) => e.province_id === Number(newCompany2.province_id),
  );

  //funcion para pasar de vista haciendo antes una validación de los datos 

  const turnPage = async() => {
          try {
            companyRegisterSchema3.parse({... newCompany1, ...newCompany2});
            setCurrentFormPage(4)
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
            <h3>3. Sector de actividad</h3>
            <label>11. Sector principal de la empresa</label>
            <select
              value={newCompany1.sector_id}
              name="sector_id"
              className='myinput'
              onChange={handleChange}
            >
              <option value="" disabled>
                Elige una opción
              </option>
              {question10.map((elem) => {
                return (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                );
              })}
            </select>
            {valErrors?.sector_id && (
              <p className="red">{valErrors.sector_id}</p>
            )}
            <h3>4. Localización y ámbito geográfico</h3>

            <label>12. Provincia de la sede principal</label>
            <select
              value={newCompany2.province_id}
              name="province_id"
              className='myinput'
              onChange={handleChange}
            >
              <option value="" disabled>
                Elige solo una opción
              </option>
              {province?.map((elem, idx) => {
                return (
                  <option key={idx} value={elem.province_id}>
                    {elem.name}
                  </option>
                );
              })}
            </select>
            {valErrors?.province_id && (
              <p className="red">{valErrors.province_id}</p>
            )}
            <label>13. Localización de la sede principal</label>
            <select
              value={newCompany2.city_id}
              name="city_id"
              className='myinput'
              onChange={handleChange}
            >
              <option value="" disabled>
                Elige solo una opción
              </option>
              {localityProvince?.map((elem, idx) => {
                return (
                  <option key={idx} value={elem.city_id}>
                    {elem.name}
                  </option>
                );
              })}
            </select>
            {valErrors?.city_id && <p className="red">{valErrors.city_id}</p>}
            <label>14. Ámbito geográfico principal de operación</label>
            <select 
            value={newCompany1.gso} 
            name="gso" 
            className='myinput'
            onChange={handleChange}>
              <option value="" disabled>
                Elegir una opción
              </option>
              {question13.map((elem) => {
                return (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                );
              })}
            </select>
            {valErrors?.gso && <p className="red">{valErrors.gso}</p>}
            <div className="btnform">
              <MyButton
                onSubmit={() => setCurrentFormPage(2)}
                text={"Atrás"}
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
