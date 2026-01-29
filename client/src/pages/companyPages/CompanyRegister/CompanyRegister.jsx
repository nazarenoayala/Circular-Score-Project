import React, { useEffect, useState, useContext } from 'react';
import '../../../components/FormCompanyRegister/formCompanyRegister.css'
import { FormCompanyRegister1 } from '../../../components/FormCompanyRegister/FormCompanyRegister1';
import { FormCompanyRegister2 } from '../../../components/FormCompanyRegister/FormCompanyRegister2';
import { FormCompanyRegister3 } from '../../../components/FormCompanyRegister/FormCompanyRegister3';
import { FormCompanyRegister4 } from '../../../components/FormCompanyRegister/FormCompanyRegister4';
import { useNavigate } from 'react-router';
import { fetchData } from '../../../../helpers/axiosHelper';
import { companyRegisterSchema } from '../../../../schemas/companyRegister';
import { ZodError } from 'zod';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
const initialValues1 = {
         company_name: '',
         company_email: '',
         legal_form: '',
         active_years: '',
         company_size: '',
         sector_id: '',
         gso: '',
         company_type: '',
         client_segment: [],
         stakeholders: [],  
         sustainability: '',
         ods_background: '',
};
const initialValues2 = {
          contact_name: '',
          position: '',
          phone_number: '',
          user_email: '',
          city_id: '',
          province_id: '',
  }

const CompanyRegister = () => {
  const [newCompany1, setNewCompany1] = useState(initialValues1);
  const [newCompany2, setNewCompany2] = useState(initialValues2);
  const [currentFormPage, setCurrentFormPage] = useState(1);
  const [locality, setLocality] = useState();
  const [province, setProvince] = useState();
  const [valErrors, setValErrors] = useState('');
  const [fetchError, setFetchError] = useState('');

  const {token, userData} = useContext(AuthContext) 
  console.log(token);
  console.log(userData);
  
  const navigate = useNavigate()

//control de formulario, con inputs select/text y checkbox
  const handleChange = (e, id) => {

    const { name, value, checked } = e.target;
    console.log(e);
    
    if(name === 'client_segment' || name === 'stakeholders'){
      if(checked){
        if(name === 'stakeholders'){
          setNewCompany1({...newCompany1, stakeholders:[...newCompany1.stakeholders, id]})
        }else if(name === 'client_segment'){
          setNewCompany1({...newCompany1, client_segment:[...newCompany1.client_segment, id]})
        }
      }else{
        if(name === 'client_segment'){
          setNewCompany1({...newCompany1, client_segment:newCompany1.client_segment?.filter(elem=>elem !== id)})
        }else if(name === 'stakeholders'){
          setNewCompany1({...newCompany1, stakeholders:newCompany1.stakeholders?.filter(elem=>elem !== id)})    
        }
      }
    }else{
      setNewCompany1({ ...newCompany1, [name]: value });
      setNewCompany2({ ...newCompany2, [name]: value });
    }
  };

// pedir a base de datos localidades y provincias. 
  useEffect(()=>{
    const fetchDataGeo = async()=>{
      try{
        let res = await fetchData('/company/locality', 'GET', null, token);
        setLocality(res.data);
        let res2 = await fetchData('/company/province', 'GET', null, token);
        setProvince(res2.data)
      }catch(error){
        console.log(error);
      }
    }
    fetchDataGeo();
  },[])


// Mandamos datos al back, POST y PUT con Validaciones. 
  const onSubmit = async(e) =>{
    try{
      e.preventDefault()
      //Validación de datos  
      companyRegisterSchema.parse(newCompany1, newCompany2);
      console.log('Validación ok'); 
      //mandar datos al Back
      const res = await fetchData(`/company/register/${userData?.user_id}`, 'POST', newCompany1, token);
      console.log(res);
      if(res){
        const res2 = await fetchData(`/company/registerUpdate/${userData?.user_id}`, 'PUT', newCompany2, token);
        console.log(res2);
      }
      navigate('/')
    }catch(error){
      if (error instanceof ZodError){
        const fieldsErrors = {};
        error.issues.forEach((elem)=>{
          fieldsErrors[elem.path[0]] = elem.message;
        });
        setValErrors(fieldsErrors);
      }else{
        setFetchError('Hay un error')
      }
      console.log(error);
    }
  }

  
  
  return (
    <div className='register-profile-container'>
      <main className='container mt-5 mb-5'>
        <header className='header-content mb-4'>
          <h1 className='title-form'>Registro de Empresa</h1>
        </header>
        <section>
          {currentFormPage === 1 &&<FormCompanyRegister1
            newCompany1={newCompany1}
            newCompany2={newCompany2}
            handleChange={handleChange}
            setCurrentFormPage={setCurrentFormPage}
            navigate={navigate}
            valErrors={valErrors}
            fetchError={fetchError}
          />}
          
          {currentFormPage === 2 && (
            <FormCompanyRegister2
              newCompany1={newCompany1}
              handleChange={handleChange}
              setCurrentFormPage={setCurrentFormPage}
              valErrors={valErrors}
            />
          )}
          {currentFormPage === 3 && (
            <FormCompanyRegister3
              newCompany1={newCompany1}
              newCompany2={newCompany2}
              handleChange={handleChange}
              setCurrentFormPage={setCurrentFormPage}
              locality={locality}
              province={province}
              valErrors={valErrors}
            />
          )}
          {currentFormPage === 4 && (
            <FormCompanyRegister4
              newCompany1={newCompany1}
              handleChange={handleChange}
              setCurrentFormPage={setCurrentFormPage}
              navigate={navigate}
              onSubmit={onSubmit}
              valErrors={valErrors}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default CompanyRegister;
