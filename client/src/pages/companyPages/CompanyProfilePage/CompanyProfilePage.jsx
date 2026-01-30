import { useContext, useEffect } from 'react';
import { MyButton } from '../../../components/MyButton/MyButton';
import { question10 } from '../../../data/CompanyRegisterData/Question10';
import './profile.css';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import { fetchData } from '../../../../helpers/axiosHelper';

const urlImage = import.meta.env.VITE_IMAGES;

const CompanyProfilePage = () => {

  // Array de los test del user
  const {test, token} = useContext(AuthContext);
  const [AllTestsCompanies, setAllTestsCompanies] = useState();
  const id = "allTests";
  const navigate = useNavigate();

  const {userData, companyData} = useContext(AuthContext);

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
    <div className='profileContainer'>
      <div className="profile">
        <div className='data'>
          <h3 className='pb-3'>{companyData?.company_name}</h3>
          <p>Sector: {question10?.find((elem)=> elem.id === companyData?.sector_id)?.name}</p>
          <p>Persona de contacto: {userData?.name} {userData?.last_name}</p>
          <p>Email: {companyData?.company_email}</p>
          <p>Teléfono: {userData?.phone_number}</p>
        </div>
        <div className="ranking">
          <div>
            <h4>Ranking</h4>
            <p className='position'>15</p>
          </div>
          <MyButton
            btnClass={'btn-green'}
            text={"Editar"}
          />
        </div>
      </div>

      <div className="tests">
        <h2 className='py-4'>Tests realizados</h2>
        <div className="testscont">
          <div className='testdata'>
            <img src="/src/assets/react.svg" alt="" />
            <div className="name">
              <div className='companies'>
                  {AllTestsCompanies?.map((elem, idx) => {
                    return (
                      <div className="company-box" key={idx}>
                        <div>
                          <Link to={`/oneCompany/${elem.user_id}`} className='text-success myLink'> <h4> {elem.company_name} </h4></Link>
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
            </div>
          </div>
          <div className="button">
            <MyButton
              text={'Detalles'}
              btnClass={'btn-white'}
            />
          </div>
          <div className="progressbar">
            <p>barrita</p>
            <p>100%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyProfilePage;