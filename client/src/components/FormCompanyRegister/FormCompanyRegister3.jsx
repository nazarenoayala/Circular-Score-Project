import React from 'react';
import './formCompanyRegister.css';
import { question10 } from '../../data/CompanyRegisterData/Question10';
import { question13 } from '../../data/CompanyRegisterData/Question13';

export const FormCompanyRegister3 = ({
  newCompany1,
  newCompany2,
  handleChange,
  setCurrentFormPage,
  locality,
  province,
  valErrors
}) => {

  const localityProvince = locality.filter(e => e.province_id === Number(newCompany2.province_id));

  return (
    <>  
      <div className="ppal">
        <form action="" className="form">
          <h2>3. Sector de actividad</h2>

          <label>11. Sector principal de la empresa</label>
          <select
            value={newCompany1.sector_id}
            name="sector_id"
            onChange={handleChange}
          >
            <option value="" disabled>
              Elige una opción
            </option>
            {question10.map((elem) => {
              return <option key={elem.id} value={elem.id}>{elem.name}</option>;
            })}
          </select>

          {valErrors?.sector_id && (
              <p>{valErrors.sector_id}</p>
            )}

          <h2>4. Localización y ámbito geográfico</h2>

            
          <label>12. Provincia de la sede principal</label>
    <select
            value={newCompany2.province_id}
            name="province_id"
            onChange={handleChange}>
            <option value='' disabled>Elige solo una opción</option>
            {province?.map((elem, idx)=>{
              return(
                <option key={idx} value={elem.province_id}>{elem.name}</option>
              )
            })}
          </select>

          {valErrors?.province_id && (
            <p>{valErrors.province_id}</p>
          )}

          <label>13. Localización de la sede principal</label>
          <select
            value={newCompany2.city_id}
            name="city_id"
            onChange={handleChange}>
            <option value='' disabled>Elige solo una opción</option>
            {localityProvince?.map((elem, idx)=>{
              return(
                <option key={idx} value={elem.city_id}>{elem.name}</option>
              )
            })}
          </select>

          {valErrors?.city_id && (
              <p>{valErrors.city_id}</p>
            )}

          <label>14. Ámbito geográfico principal de operación</label>
          <select
            value={newCompany1.gso}
            name="gso"
            onChange={handleChange}>
              <option value="" disabled>Elegir una opción</option>
              {question13.map((elem)=>{
                return(
                  <option key={elem.id} value={elem.id}>{elem.name}</option>
                )
              })}
          </select>
            
          <div>
            <button onClick={() => setCurrentFormPage(2)}>Atrás</button>
            <button onClick={() => setCurrentFormPage(4)}>Siguiente</button>
          </div>
        </form>
      </div>
    </>
  );
};
