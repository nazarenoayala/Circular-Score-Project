import { useContext, useEffect, useState } from 'react';
import { MyButton } from '../../../components/MyButton/MyButton';
import { question10 } from '../../../data/CompanyRegisterData/Question10';
import './profile.css';
import { Link, useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { fetchData } from '../../../../helpers/axiosHelper';
import uploadImage from '../../../assets/Images/Logo/detail2.svg';
import { HistoricTestContainer } from '../../../components/HistoricTestContainer/HistoricTestContainer';

const urlImage = import.meta.env.VITE_IMAGES;

const CompanyProfilePage = () => {
  const { userData, token, companyData } = useContext(AuthContext);
  const { id } = useParams();
  const [allCompanyTests, setAllCompanyTests] = useState();
  const [showTestsDetails, setShowTestsDetails] = useState(false);
  const navigate = useNavigate();

  // Encontrar el nombre del sector partiendo
  const sectorName = question10.find((e) => e.id === companyData?.sector_id);

  useEffect(() => {
    const fetchAllTestsCompanies = async () => {
      try {
        let result = await fetchData(
          `/company/allCompanyTests/${id}`,
          'GET',
          null,
          token,
        );
        setAllCompanyTests(result.data.result);
      
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllTestsCompanies();
  }, []);

  const uniqueTests = [];
  allCompanyTests?.forEach((elem) => {
    const tests = uniqueTests.find((e) => e.test_id === elem.test_id);
    if (!tests) {
      uniqueTests.push(elem);
    }
  });

  return (
    <div className="profileContainer">
      <div className="profile">
        <div className="data">
          <h3 className="pb-3"> {companyData?.company_name} </h3>
          <p>
            {' '}
            <strong>Sector:</strong> {sectorName?.name}{' '}
          </p>
          <p>
            <strong>Persona de contacto:</strong>{' '}
            {userData?.name} {userData?.last_name}
          </p>
          <p>
            <strong>Teléfono:</strong> {userData?.phone_number}{' '}
          </p>
          <p>
            <strong>Email:</strong> {companyData?.company_email}{' '}
          </p>
        </div>

        <div className="ranking">
          <MyButton
            btnClass={'btn-green'}
            text={'Editar Información'}
            onSubmit={() => navigate(`/editCompany/${id}`)}
          />
        </div>
      </div>

      <div className="tests">
        <h2 className="pt-5 pb-4">Tests realizados</h2>
        <div className="testscont">
          {uniqueTests?.map((elem, idx) => {
            return (
              <div className="oneTest" key={idx}>
                <div className="test-info">
                  <div className="image-title">
                    <img
                      src={`${urlImage}/ODSimages/${elem?.test_image}`}
                      alt=""
                    />
                    <h3>{elem?.test_name}</h3>
                  </div>

                  <div className="progressContainer">
                    <div className='progressBarContainer'>
                      <div
                        className='progressBarHigh'
                        style={{width: `${elem?.result_total}%`}}
                      >
                      </div>
                    </div>
                      <h3>{parseInt(elem?.result_total)} %</h3>

                    <div
                      className="btn-details"
                      onClick={() =>
                        setShowTestsDetails(
                          showTestsDetails === elem.answer_set_id
                          ? null
                          : elem.answer_set_id,
                        )
                      }
                      >
                      <img src={uploadImage} className="img" alt="" />
                      <p>Detalles</p>
                    </div>
                  </div>
                </div>
                {showTestsDetails === elem.answer_set_id && (
                  <div className="test-details">
                    <HistoricTestContainer id={elem.test_id} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
