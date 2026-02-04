import './CompaniesCard.css';
import { useEffect, useState } from 'react';
import { MyButton } from '../MyButton/MyButton';
import { fetchData } from '../../../helpers/axiosHelper';
import { Link ,useParams } from 'react-router';
import Accordion from 'react-bootstrap/Accordion';


export const CompaniesCard = ({
  allCompanies, //contiene los datos del admin desde el context
  token,
}) => {

  //estado para manejar el borrado lógico de las empresas
  const [isDeleted, setIsDeleted] = useState(allCompanies.is_deleted);

  const {user_id} = useParams();
  
  //guarda los tests de cada empresa
  const [testsRealizados, setTestsRealizados] = useState(0);
  

  const handleAccordion = async () => {

    try {
      //  ruta  que llama a userDal.showTestData para pedir los tests
      let res = await fetchData(
        `/answerSet/allAnswersTestByUser/${allCompanies.user_id}`,
        'GET',
        null,
        token,
      );
     setTestsRealizados(res.data.numtest);
      console.log(res.data);
     
     
    } catch (error) {
      console.log(error);
    }
  };


  const delLogicCompany = async (user_id) => {
   
    console.log("comapanyyyy", allCompanies);
 
      try {
        let res = await fetchData(`/user/setUserLogicState/${user_id}`, "PUT", null, token);
        console.log("copmanuyyyyy", res);
        setIsDeleted(prev => (prev === 0 ? 1 : 0));
 
     } catch (error) {
       console.log(error);
     
     }
   };
 



  return (
    <Accordion className='accordCC'>
      <Accordion.Item eventKey="0">
        <Accordion.Header onClick={handleAccordion}>
          <Link
            to={`/oneCompany/${allCompanies.user_id}`}
            className="text-success myLink"
          >
            {' '}
            <h5> {allCompanies.company_name} </h5>
          </Link>
        </Accordion.Header>
        <Accordion.Body className="bg-body-secondary">
          <div className="info">
            <div className='info1'>
              <ul>
                <li><strong>Persona de contacto:</strong> {allCompanies.name}</li>
                <li><strong>Teléfono:</strong> {allCompanies.phone_number}</li>
                <li><strong>Email:</strong> {allCompanies.user_email}</li>
              </ul>
            </div>

            <div className="info2">
                {isDeleted === 0 ? (
                  <MyButton
                    text={"Deshabilitar"}
                    btnClass='btn-red fw-bold px-4'
                    onSubmit={()=>delLogicCompany(allCompanies.user_id)}
                  />
                  ) : (
                    <MyButton
                    text={"Habilitar"}
                    btnClass='btn-blue fw-bold px-4'
                    onSubmit={()=>delLogicCompany(allCompanies.user_id)}
                  />
                  )}
              <strong>Tests Realizados: {testsRealizados} </strong>
            </div>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
