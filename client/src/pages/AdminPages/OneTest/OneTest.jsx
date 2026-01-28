import './oneTestAd.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { Link, useNavigate, useParams } from "react-router";
import { MyButton } from '../../../components/MyButton/MyButton';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { fetchData } from '../../../../helpers/axiosHelper';

const urlImage = import.meta.env.VITE_IMAGES;

const OneTest = () => {
  //Array de los tests
  const { test, token } = useContext(AuthContext);
  //Rescatar id del test
  const { id } = useParams();
  //Array traído del back
  const [AllTestsCompanies, setAllTestsCompanies] = useState();
  //Filtrar el test que queremos a través del id rescatado
  const uniqueTest = test?.find((e) => e.test_id == id);
  //Para ir a otra página
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllTestsCompanies = async () => {
      try {
        let result = await fetchData(`/company/allCompaniesData/${id}`, 'GET', null, token);
        setAllTestsCompanies(result.data.result)
        console.log(result, "AAAAAAAAAAAA");
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllTestsCompanies();
  }, []);

  console.log(AllTestsCompanies);

  return (
    <div className='one-test-admin'>
      <div className='ot-cont'>
        <div className="test">
          <div className='d-flex gap-3'>
            <img src={`${urlImage}/ODSimages/${uniqueTest.test_image}`} />
            <div className='d-flex flex-column flex-wrap'>
              <h3>{uniqueTest.test_name.split('·')[0]}</h3>
              <h3>{uniqueTest.test_name.split('·')[1]}</h3>
            </div>
          </div>
          <div className='button d-flex gap-2'>
            <MyButton
              text={"Atrás"}
              btnClass={"btn-red"}
              onSubmit={() => navigate('/tests')}
            />
            <MyButton
              text={"Editar test"}
              btnClass={"btn-green"}
              onSubmit={() => navigate(`/editTest/${id}`)}
            />
          </div>
        </div>
        <div className="white-box">
          <div className='data-box'>
            <Tabs
              defaultActiveKey="companies"
              id="uncontrolled-tab-example"
              className="mb-3 mytabs"
            >
              <Tab
                eventKey="companies"
                title="Tests realizados por empresas"
                className='mytab'
              >
                <div className='companies'>
                  {AllTestsCompanies?.map((elem) => {
                    return (
                      <div className="company-box" key={elem.company_id}>
                        <div>
                          <Link to={`/company/oneCompany/${elem.user_id}`} className='text-success myLink'> <h4> {elem.company_name} </h4></Link>
                          <h5> {elem.sector_name} </h5>
                        </div>
                        <div className='text-end'>
                          {/* para revertir la fecha de YYYY-MM-DD a DD-MM-YYYY */}
                          <h5> {elem.test_date.split('-').reverse().join('-')} </h5>
                          <h5>Resultado: {elem.total_score} </h5>
                        </div>
                      </div>
                    )
                  })}
                </div>

              </Tab>
              <Tab eventKey="profile" title="Gráficas de resultados obtenidos" className='mytab'>
                <div className="graphics-box">
                  AÑADIR GRÁFICA
                </div>
              </Tab>
            </Tabs>
          </div>
        </div >
      </div >
    </div >
  )
}

export default OneTest;