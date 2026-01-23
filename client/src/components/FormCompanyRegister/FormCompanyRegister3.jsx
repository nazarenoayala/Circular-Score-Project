import React from 'react';
import './formCompanyRegister.css';
import { question10 } from '../../data/CompanyRegisterData/Question10';
import { question13 } from '../../data/CompanyRegisterData/Question13';

export const FormCompanyRegister3 = ({
  newCompany,
  handleChange,
  setCurrentFormPage,
  locality,
  province
}) => {
  
  return (
    <>  
      <div className="ppal">
        <form action="" className="form">
          <h2>3. Sector de actividad</h2>

          <label>10. Sector principal de la empresa</label>
          <select
            value={newCompany.sector_name}
            name="sector_name"
            onChange={handleChange}
          >
            <option value="" disabled>
              Elige una opción
            </option>
            {question10.map((elem) => {
              return <option key={elem.id}>{elem.name}</option>;
            })}
          </select>
          {newCompany.sector_name === 'Otro sector' && (
            <input
              type="text"
              placeholder="Especificar el sector"
              value={newCompany.sector_name_other}
              name="position_other"
              onChange={handleChange}
            />
          )}

          <h2>4. Localización y ámbito geográfico</h2>

          <label>11. Localización de la sede principal</label>
          <select
            value={newCompany.city_name}
            name="city_name"
            onChange={handleChange}>
            <option>Elige solo una opción</option>
            {locality?.map((elem)=>{
              return(
                <option key={elem.id}>{elem.name}</option>
              )
            })}
          </select>
            
          <label>12. Provincia de la sede principal</label>
    <select
            value={newCompany.province_name}
            name="province_name"
            onChange={handleChange}>
            <option>Elige solo una opción</option>
            {province?.map((elem)=>{
              return(
                <option key={elem.province_id}>{elem.name}</option>
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
                  <option key={elem.city_id}>{elem.name}</option>
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
