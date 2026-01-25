import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext/AuthContext'
import { useParams } from 'react-router'
import { InfoOneCompany } from '../../../components/InfoOneCompany/InfoOneCompany'
import { InfoRepresentante } from '../../../components/InfoRepresentante/InfoRepresentante'
import { fetchData } from '../../../../helpers/axiosHelper'
import './oneCompany.css'

const OneCompany = () => {

  const {user_id} = useParams(); 
  console.log(user_id);

  const [company, setCompany] = useState();

  
  const { token } = useContext(AuthContext);
  // const user_id = companyData.user_id;




  useEffect(() => {
    const fetchCompany = async () => {

      console.log("userrr_iddddd", user_id);
      
      try {
        const res = await fetchData(`/company/oneCompany/${user_id}`, "GET",  null, token)

        console.log("REsssss", res.data)
        setCompany(res.data)

      } catch (error) {
        console.log(error);
      }
    }

    fetchCompany();
  }, [user_id, token])


   if (!company) {
     return <p>Cargando información de la empresa...</p>;
   }

  return (
    <div>
      <div className='company_name '>
        <h1>{company?.company.company_name}</h1>
        <button>Deshabilitar</button>
      </div>

      <h2>Información Representante</h2>
      <InfoRepresentante
        company={company}
      />

      <h2>Información Empresa</h2>
      <InfoOneCompany
        company={company}
      />




    </div>
  )
}

export default OneCompany