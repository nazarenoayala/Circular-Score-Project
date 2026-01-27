import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext/AuthContext'
import { useParams } from 'react-router'
import { InfoOneCompany } from '../../../components/InfoOneCompany/InfoOneCompany'
import { InfoRepresentante } from '../../../components/InfoRepresentante/InfoRepresentante'
import {MyButton} from '../../../components/MyButton/MyButton'
import { fetchData } from '../../../../helpers/axiosHelper'
import './oneCompany.css'

const OneCompany = () => {

  const {user_id} = useParams(); 


  const [company, setCompany] = useState();
  // const [disableButton, setDisableButton] = useState();

  
  const { token } = useContext(AuthContext);


  const delLogicCompany = async(user_id) => {
    try {
      let res = await fetchData(`/company/delLogicCompany/${user_id}`, "PUT", null, token);
      console.log("copmanuyyyyy", res)

      setCompany(prev => ({...prev, company: { ...prev.company, is_deleted: prev.company.is_deleted === 0 ? 1 : 0 }}));
      

    } catch (error) {
      console.log(error);
      
    }
  }


  useEffect(() => {
    const fetchCompany = async () => {
      
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
    <div className='p-5'>
      <div className='company_name_div px-5'>
        <h1 className='company_name fw-bold'>{company?.company.company_name}</h1>
        <MyButton
          text={company.company.is_deleted === 0 ? 'Deshabilitar' : 'Habilitar'}
          btnClass='btn-red fw-bold px-4'
          onClick={()=>delLogicCompany(user_id)}
        />
        
      </div>

        <h2 className='mt-5 mb-4 fw-bold'>Información Representante</h2>
      <div className='person_info'>
        <InfoRepresentante
          company={company}
        />
      </div>

      <h2 className='mt-5 mb-4 fw-bold'>Información Empresa</h2>
      <div className='company_info'>
        <InfoOneCompany
          company={company}
        />
      </div>




    </div>
  )
}

export default OneCompany