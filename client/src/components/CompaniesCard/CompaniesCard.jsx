import React, { useState } from 'react';
import { MyButton } from '../MyButton/MyButton';
import './CompaniesCard.css';
import { fetchData } from '../../../helpers/axiosHelper'


export const CompaniesCard = ({
  allCompanies,
  token,
  setShowInfo,
  showInfo,
  userData, //contiene los datos del admin desde el context
}) => {

  console.log("!!!!!!!!!!!!!!!!!!!!!!!!", userData);
  

  //guarda los tests de cada empresa
  const [testsRealizados, setTestsRealizados] = useState([]);

  const handleInfo = async () => {
    // Si ya está abierta la información, la cierra . Si no, guarda su id.
    if (showInfo === allCompanies.user_id) {
      setShowInfo(null);
    } else {
      setShowInfo(allCompanies.user_id);
    }

    try {
      //  ruta  que llama a userDal.showTestData para pedir los tests
      let res = await fetchData(
        `/user/showTestData/${allCompanies.user_id}`,
        'GET',
        null,
        token,
      );

      console.log(res);
      //la Api devuelve una lista de tests en utdResult.
      //el tamaño del array es el nºtotal de test realizado, si no hay test el array está vacío y su length 0.
      setTestsRealizados(res.data.utdResult || []);

    } catch (error) {
      console.log(error);
    }
  };
  
  console.log("USER DATA EN EL !!!!!!!!!!!!!!!!!!", userData[0]);
  

  const onSubmit = async (isDeleted) => {

      try {
        if(isDeleted){
          
          const activateRes = await fetchData(`/user/setUserActivation/${0}/${userData[0].user_id}`,'PUT', null, token);
          console.log(activateRes);
          
        } else {
          
          const desactivateRes = await fetchData(`/user/setUserActivation/${1}/${userData[0].user_id}`,'PUT', null, token);
          console.log(desactivateRes);
        }
        
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="card mb-3 py-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3>{allCompanies.company_name}</h3>

        <div className="d-flex gap-2">

          <p>Estado del usuario: {userData[0].is_deleted ? "DESACTIVADO" : "ACTIVADO"}</p>
          {/* Dependiendo de userData.is_deleted */}
          {userData[0].is_deleted ? 
            <MyButton
              text="Activar Empresa"
              btnClass="btn-green"
              onSubmit={onSubmit}
            />
            :
            <MyButton
              text="Desactivar Empresa"
              btnClass="btn-red"
              onSubmit={onSubmit}
            />
          }

          <MyButton
            text={
              showInfo === allCompanies.user_id
                ? 'Cerrar información'
                : 'Ver información'
            }
            btnClass="btn-white"
            onSubmit={handleInfo}
          />
        </div>
      </div>

      {/* Se muestra si el id de la empresa es igual al estado */}
      {showInfo === allCompanies.user_id && (
        <div className="d-flex justify-content-around align-items-center bg-body-secondary mt-3 border-top pt-3 flex-wrap">
          <div>
            <ul>
              <li>Persona de contacto: {allCompanies.name} </li>
              <li>Teléfono: {allCompanies.phone_number}</li>
              <li>Email: {allCompanies.user_email}</li>
              <li>Categoría: {allCompanies.sector_id}</li>
            </ul>
          </div>
          <div>
            <strong>Tests Realizados: {testsRealizados.length} </strong>
          </div>
        </div>
      )}
    </div>
  );
};
