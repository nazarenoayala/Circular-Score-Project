import React, { useEffect, useState } from 'react';
import { FormCompanyRegister1 } from '../../../components/FormCompanyRegister/FormCompanyRegister1';
import { FormCompanyRegister2 } from '../../../components/FormCompanyRegister/FormCompanyRegister2';
import { FormCompanyRegister3 } from '../../../components/FormCompanyRegister/FormCompanyRegister3';
import { FormCompanyRegister4 } from '../../../components/FormCompanyRegister/FormCompanyRegister4';
import { useNavigate } from 'react-router';
import { fetchData } from '../../../../helpers/axiosHelper';
import { companyRegisterSchema } from '../../../../schemas/companyRegister';
import { ZodError } from 'zod';
/* import { useContext } from 'react';
import {AuthContextProvider} from '../../../context/AuthContext/AuthContextProvider' */

const initialValues = {
  company_name: '',
  contact_name: '',
  position: '',
  position_other: '',
  phone_number: '',
  user_email: '',
  company_type: '',
  legal_form: '',
  active_years: '',
  company_size: '',
  sector_id: '',
  sector_id_other: '',
  city_id: '',
  province_id: '',
  gso: '',
  client_segment: [],
  stakeholders: [],
  sustainability: '',
  ods_background: '',
};

const CompanyRegister = () => {
  const [newCompany, setNewCompany] = useState(initialValues);
  const [currentFormPage, setCurrentFormPage] = useState(1);
  const [locality, setLocality] = useState();
  const [province, setProvince] = useState();
  const [valErrors, setValErrors] = useState('');
  const [fetchError, setFetchError] = useState('');

  /* const {token} = useContext(AuthContextProvider) */
  
  
  const navigate = useNavigate()
//control de formulario, con inputs select/text y checkbox
  const handleChange = (e, id) => {

    const { name, value, checked } = e.target;
    console.log(e);
    
    if(name === 'client_segment' || name === 'stakeholders'){
      if(checked){
        if(name === 'stakeholders'){
          setNewCompany({...newCompany, stakeholders:[...newCompany.stakeholders, id]})
        }else if(name === 'client_segment'){
          setNewCompany({...newCompany, client_segment:[...newCompany.client_segment, id]})
        }
      }else{
        if(name === 'client_segment'){
          setNewCompany({...newCompany, client_segment:newCompany.client_segment.filter(elem=>elem !== id)})
        }else if(name === 'stakeholders'){
          setNewCompany({...newCompany, stakeholders:newCompany.stakeholders.filter(elem=>elem !== id)})    
        }
      }
    }else{
      setNewCompany({ ...newCompany, [name]: value });
    }
  };

// pedir a base de datos localidades y provincias. 
  useEffect(()=>{
    const fetchDataGeo = async()=>{
      try{
        let res = await fetchData('/company/locality', 'GET', null);
        setLocality(res.data)
        let res2 = await fetchData('/company/province', 'GET', null);
        setProvince(res2.data)
      }catch(error){
        console.log(error);
      }
    }
    fetchDataGeo();
  },[])
  

  const onSubmit = async(e) =>{
    try{
      e.preventDefault()
      //Validación de datos  
      companyRegisterSchema.parse(newCompany);
      console.log('Validación ok');
      //mandar datos al Back
      const res = await fetchData('/company/register', 'POST', newCompany);
      console.log(res);
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
    <>
      <h1>Registro de Empresa</h1>
      {currentFormPage === 1 &&<FormCompanyRegister1
        newCompany={newCompany}
        handleChange={handleChange}
        setCurrentFormPage={setCurrentFormPage}
        navigate={navigate}
        valErrors={valErrors}
        fetchError={fetchError}
      />}
      
      {currentFormPage === 2 && (
        <FormCompanyRegister2
          newCompany={newCompany}
          handleChange={handleChange}
          setCurrentFormPage={setCurrentFormPage}
        />
      )}
      {currentFormPage === 3 && (
        <FormCompanyRegister3
          newCompany={newCompany}
          handleChange={handleChange}
          setCurrentFormPage={setCurrentFormPage}
          locality={locality}
          province={province}
          valErrors={valErrors}
        />
      )}
      {currentFormPage === 4 && (
        <FormCompanyRegister4
          newCompany={newCompany}
          handleChange={handleChange}
          setCurrentFormPage={setCurrentFormPage}
          navigate={navigate}
          setNewCompany={setNewCompany}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};

export default CompanyRegister;
