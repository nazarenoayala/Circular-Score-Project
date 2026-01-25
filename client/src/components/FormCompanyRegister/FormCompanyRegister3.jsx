import React from 'react';
import './formCompanyRegister.css';
import { question10 } from '../../data/CompanyRegisterData/Question10';
import { question13 } from '../../data/CompanyRegisterData/Question13';

export const FormCompanyRegister3 = ({
  newCompany,
  handleChange,
  setCurrentFormPage,
  locality,
  province,
  valErrors
}) => {
  
  return (
    <>  
      <div className="ppal">
        <form action="" className="form">
          <h2>3. Sector de actividad</h2>

          <label>10. Sector principal de la empresa</label>
          <select
            value={newCompany.sector_id}
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
          {newCompany.sector_id === '18' && (
            <input
              type="text"
              placeholder="Especificar el sector"
              value={newCompany.sector_id_other}
              name="sector_id_other"
              onChange={handleChange}
            />
          )}

            {valErrors?.sector_id_other && (
              <p>{valErrors.sector_id_other}</p>
            )}

          <h2>4. Localización y ámbito geográfico</h2>

          <label>11. Localización de la sede principal</label>
          <select
            value={newCompany.city_name}
            name="city_id"
            onChange={handleChange}>
            <option>Elige solo una opción</option>
            {locality?.map((elem)=>{
              return(
                <option key={elem.city_id} value={elem.city_id}>{elem.name}</option>
              )
            })}
          </select>
            
          <label>12. Provincia de la sede principal</label>
    <select
            value={newCompany.province_name}
            name="province_id"
            onChange={handleChange}>
            <option>Elige solo una opción</option>
            {province?.map((elem)=>{
              return(
                <option key={elem.province_id} value={elem.province_id}>{elem.name}</option>
              )
            })}
          </select>

          <label>13. Ámbito geográfico principal de operación</label>
          <select
            value={newCompany.gso}
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
