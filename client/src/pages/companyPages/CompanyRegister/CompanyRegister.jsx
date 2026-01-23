import React, { useEffect, useState } from 'react';
import { FormCompanyRegister1 } from '../../../components/FormCompanyRegister/FormCompanyRegister1';
import { FormCompanyRegister2 } from '../../../components/FormCompanyRegister/FormCompanyRegister2';
import { FormCompanyRegister3 } from '../../../components/FormCompanyRegister/FormCompanyRegister3';
import { FormCompanyRegister4 } from '../../../components/FormCompanyRegister/FormCompanyRegister4';
import { useNavigate } from 'react-router';
import { fetchData } from '../../../../helpers/axiosHelper';

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
  sector_name: '',
  sector_name_other: '',
  city_name: '',
  province_name: '',
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

  const navigate = useNavigate()
//control de formulario, con inputs select/text y checkbox
  const handleChange = (e, id) => {

    const { name, value, checked } = e.target;
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
    //FALTA VALIDAR 
    try{
      e.preventDefault()
      const res = await fetchData('/company/register', 'POST', newCompany);
      console.log(res);
      navigate('/')
    }catch(error){
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
