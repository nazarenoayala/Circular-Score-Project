import React, { useState, useEffect } from 'react';
import { MyButton } from '../MyButton/MyButton';
import './CompaniesCard.css';
import { fetchData } from '../../../helpers/axiosHelper';
import { Link } from 'react-router';
import Accordion from 'react-bootstrap/Accordion';

export const CompaniesCard = ({
  allCompanies, //contiene los datos del admin desde el context
  token,
  setShowInfo,
  showInfo,
  userData,
}) => {
  //guarda los tests de cada empresa
  const [testsRealizados, setTestsRealizados] = useState([]);

  const handleInfo = async () => {
   
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
      if (isDeleted === 1) {
        const activateRes = await fetchData(
          `/company/delLogicCompany/${allCompanies.user_id}`,
          'PUT',
          null,
          token,
        );
        console.log(activateRes);
      } else {
        const desactivateRes = await fetchData(
          `/company/delLogicCompany/${allCompanies.user_id}`,
          'PUT',
          null,
          token,
        );
        console.log(desactivateRes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <Link
            to={`/oneCompany/${allCompanies.user_id}`}
            className="text-success myLink"
          >
            {' '}
            <h5> {allCompanies.company_name} </h5>
          </Link>
        </Accordion.Header>
        <Accordion.Body className="bg-body-secondary">
          <div className="d-flex justify-content-between">
            <div>
              <ul>
                <li>
                  <strong>Persona de contacto:</strong> {allCompanies.name}
                </li>
                <li>
                  <strong>Teléfono:</strong> {allCompanies.phone_number}
                </li>
                <li>
                  <strong>Email:</strong> {allCompanies.user_email}
                </li>
                <li>
                  <strong>Categoría:</strong> {allCompanies.sector_id}
                </li>
              </ul>
            </div>

            <div className="card-accordion">
              {allCompanies.is_deleted === 0 ? (
                <MyButton
                  text={'Habilitar'}
                  btnClass="btn-green"
                  onSubmit={onSubmit(allCompanies.is_deleted)}
                />
              ) : (
                <MyButton
                  text={'Deshabilitar'}
                  btnClass="btn-red"
                  onSubmit={() => onSubmit(allCompanies.is_deleted)}
                />
              )}
              <strong>Tests Realizados: {testsRealizados.length} </strong>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
