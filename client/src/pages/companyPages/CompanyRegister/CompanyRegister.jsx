import React, { useState } from 'react';
import { FormCompanyRegister1 } from '../../../components/FormCompanyRegister/FormCompanyRegister1';
import { FormCompanyRegister2 } from '../../../components/FormCompanyRegister/FormCompanyRegister2';
import { FormCompanyRegister3 } from '../../../components/FormCompanyRegister/FormCompanyRegister3';
import { FormCompanyRegister4 } from '../../../components/FormCompanyRegister/FormCompanyRegister4';
import { useNavigate } from 'react-router';

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
  stakeholders: '',
  sustainability: '',
  ods_background: '',
};

const CompanyRegister = () => {
  const [newCompany, setNewCompany] = useState(initialValues);
  const [currentFormPage, setCurrentFormPage] = useState(1);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCompany({ ...newCompany, [name]: value });
  };
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
        />
      )}
      {currentFormPage === 4 && (
        <FormCompanyRegister4
          newCompany={newCompany}
          handleChange={handleChange}
          setCurrentFormPage={setCurrentFormPage}
          navigate={navigate}
          setNewCompany={setNewCompany}
        />
      )}
    </>
  );
};

export default CompanyRegister;
