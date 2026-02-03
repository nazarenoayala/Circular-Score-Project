import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext/AuthContext'
import { useParams } from 'react-router'
import { InfoOneCompany } from '../../../components/InfoOneCompany/InfoOneCompany'
import { InfoRepresentante } from '../../../components/InfoRepresentante/InfoRepresentante'
import { MyButton } from '../../../components/MyButton/MyButton'
import { fetchData } from '../../../../helpers/axiosHelper'
import './oneCompany.css'

const OneCompany = () => {

  const {user_id} = useParams(); 
  const [company, setCompany] = useState();
  const { token } = useContext(AuthContext);
  const [isDeleted, setIsDeleted] = useState();

  
  //Mostrar toda la información nada más cargar la página
  useEffect(() => {
    const fetchCompany = async () => {
      console.log(user_id)
      
      try {
        const res = await fetchData(`/company/oneCompany/${user_id}`, "GET",  null, token)
        
        console.log("REsssss", res)
        setCompany(res.data)
        setIsDeleted(res.data.company.is_deleted);
        
        
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchCompany();
  }, [user_id, token])
  

  //Botón deshabilitar/habilitar empresa
  const delLogicCompany = async (user_id) => {
    
    console.log("company", company);
  
      try {
        let res = await fetchData(`/user/setUserLogicState/${user_id}`, "PUT", null, token);
        console.log("copmanuyyyyy", res);
        setIsDeleted(prev => (prev === 0 ? 1 : 0));

     } catch (error) {
       console.log(error);
      
     }
   }

   //Mientras se carga la información necesaria mostramos este mensaje

   if (!company) {
     return <p>Cargando información de la empresa...</p>;
   }

  return (
    <div className='one_Company pt-5'>
      <div className='company_name_div'>
        <h1 className='company_name fw-bold'>{company?.company.company_name}</h1>
        
        {isDeleted === 0 ? (
        <MyButton
          text={"Deshabilitar"}
          btnClass='btn-red button fw-bold px-4 '
          onSubmit={()=>delLogicCompany(user_id)}
        />
        ) : (
          <MyButton
          text={"Habilitar"}
          btnClass='btn-red button fw-bold px-4'
          onSubmit={()=>delLogicCompany(user_id)}
        />
        )}
        
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
