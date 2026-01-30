import { useContext, useEffect, useState } from 'react';
import { MyButton } from '../../../components/MyButton/MyButton';
import './profile.css';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { fetchData } from '../../../../helpers/axiosHelper';
import { sectors } from '../../../data/CompanyRegisterData/sectors';

//CUENTA
//1@1.com
//123aA!456


const CompanyProfilePage = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const { companyData, userData, test } = useContext(AuthContext);
  console.log(companyData, userData, test);
  console.log(useContext(AuthContext));

  const [company, setCompany] = useState();
  /* Traer  */
  useEffect(() => {
    const fetchCompany = async () => {

      try {
        const res = await fetchData(`/company/oneCompany/${id}`, "GET", null, token)

        console.log("REsssss", res)
        setCompany(res.data)

      } catch (error) {
        console.log(error);
      }
    }

    fetchCompany();
  }, [id, token])

  /* Encontrar el nombre del sector partiendo  */
  const sectorId = company?.company?.sector_id;
  const sectorName = sectors.find(s => s.id === sectorId)?.name;

  return (
    <div className='profileContainer'>
      <div className="profile">
        <div className='data'>
          <h3 className='pb-3'> {company?.company.company_name} </h3>
          <p> <strong>Sector:</strong> {sectorName} </p>
          <p><strong>Persona de contacto:</strong> {userData?.name + ' ' + userData?.last_name} </p>
          <p><strong>Teléfono:</strong> {userData?.phone_number} </p>
          <p><strong>Email:</strong> {company?.company.company_email} </p>
        </div>
        {/* FALTA */}
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
              <p>ODS</p>
              <p>Nombre del test</p>
            </div>
          </div>
          <div className="button">
            <MyButton
              text={'Detalles'}
              btnClass={'btn-white'}
              onSubmit={() => navigate(`/editCompany/${id}`)}
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