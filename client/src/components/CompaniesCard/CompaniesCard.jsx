import React, { useState, useEffect } from 'react';
import { MyButton } from '../MyButton/MyButton';
import './CompaniesCard.css';
import { fetchData } from '../../../helpers/axiosHelper';

export const CompaniesCard = ({
  allCompanies, //contiene los datos del admin desde el context
  token,
  setShowInfo,
  showInfo,
  userData,
}) => {
  

  //guarda los tests de cada empresa
  const [testsRealizados, setTestsRealizados] = useState([]);

 
const [openManage, setOpenManage] = useState(null);

 //  controlar el desplegable de gestión
const handleManage = () => {
 
  if (openManage === allCompanies.user_id) {
    setOpenManage(null);
  } else {
    setOpenManage(allCompanies.user_id);
  }
};

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



  const onSubmit = async (isDeleted) => {
    try {
      if (isDeleted) {
        const activateRes = await fetchData(
          `/user/setUserLogicState/${allCompanies.user_id}`,
          'PUT',
          setting,
          token,
        );
        console.log(activateRes);
      } else {
        const desactivateRes = await fetchData(
          `/user/setUserLogicState/${allCompanies.user_id}`,
          'PUT',
          setting,
          token,
        );
        console.log(desactivateRes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card mb-3 py-3 ">
      <div className="d-flex justify-content-between align-items-center">
        <h5>{allCompanies.company_name}</h5>

     
         <div className="d-flex gap-2">
    
      <MyButton
        text={openManage === allCompanies.user_id ? 'Cerrar gestión' : 'Gestionar empresa'}
        btnClass="btn-green"
        onSubmit={handleManage}
      />

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


  {openManage === allCompanies.user_id && (
    <div className="d-flex justify-content-center align-items-center bg-light mt-3 border-top py-3 gap-4">
        <p className="mb-0">
        <strong>Estado actual:</strong>{' '}
        <span className={allCompanies.is_deleted ? "text-danger" : "text-success"}>
          {allCompanies.is_deleted ? 'DESACTIVADO' : 'ACTIVADO'}
        </span>
      </p>

      {allCompanies.is_deleted ? (
        <MyButton
          text="Activar Empresa"
          btnClass="btn-green"
           onSubmit={() => (onSubmit)} 
        />
      ) : (
        <MyButton
          text="Desactivar Empresa"
          btnClass="btn-red"
           onSubmit={() => (onSubmit)} 
        />
      )}
    </div>
  )}
      {/* Se muestra si el id de la empresa es igual al estado */}
      {showInfo === allCompanies.user_id && (
        <div className="d-flex justify-content-around align-items-center bg-body-secondary mt-3 border-top pt-3 flex-wrap">
          <div>
            <ul>
             <li><strong>Persona de contacto:</strong> {allCompanies.name}</li>
             <li><strong>Teléfono:</strong> {allCompanies.phone_number}</li>
            <li><strong>Email:</strong> {allCompanies.user_email}</li>
            <li><strong>Categoría:</strong> {allCompanies.sector_id}</li>
            </ul>
          </div>
          <div>
            <strong>Tests Realizados: {testsRealizados.length} </strong>
          </div>
        </div>
      )}
    </div>
  </div>
  )}
