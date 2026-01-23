import React, { useState } from 'react'
import { NavbarUser } from '../../../components/NavbarUser/NavbarUser';
import { FormEditCompany } from '../../../components/FormEditCompany/FormEditCompany';
import { FormEditUser } from '../../../components/FormEditUser/FormEditUser';
import { MyButton } from '../../../components/MyButton/MyButton';

import './EditCompany.css'

const initialValueCompany = {
  company_name:'',
  user_email:'',
  sector_id:'',
  company_type:'',
  active_years:'',
  company_size:'',
  sustainability:'',
  ods_background:'',
  gso:''
}

const initialValueUser = {
  name:'',
  phone_number:''
}

const EditCompanyPage = () => {
  //para usar boton volver y que redirija al perfil usuario useNavigate, como lo uso en MyButton?
  

  //Estado para empresa
  const [editCompanyData, setEditCompanyData] = useState(initialValueCompany);
  //Estado para user
  const [editUserData, setEditUserData] = useState(initialValueUser);

  //funciones para control de inputs
  const handleCompanyChange = (e) => {
    const {name, value} = e.target;
    //tengo q probar si funciona  
    setEditCompanyData((prev) =>({
      ...prev,
      [name]: value
    }))
  }

  const handleUserChange = (e) => {
    const {name, value} = e.target;
    //tengo q probar si funciona  
    setEditUserData((prev) =>({
      ...prev,
      [name]: value
    }))
  }

  //funcion para guardar (enviar a la DB) 
  const sendDb = async (e) => {
    e.preventDefault();
    //probar si funciona
    //aca iría fetch con que método?
  }
  
  return (
    <div className='edit-profile-container'>
    <main className='container mt-5 mb-5'>
      <header className='header-content mb-4'>
        <h1>Hola {editUserData.name}</h1>
        <MyButton text="Cerrar Sesión"/>
      </header>
      {/* Card 1: Form empresa */}
      <section className='form-card mb-4'>
        <h2 className='title-form'>Datos de empresa</h2>
        {/* Formulario de empresa */}
        {/* paso por props datos y funcion a los hijos */}
        <FormEditCompany
          data={editCompanyData} 
          onChange={handleCompanyChange}
        /> 
      </section>

        {/* dejar espaciado entre formularios */}

      {/* Card 2: Form user */}
      <section className='form-card mb-4'>
        <h2 className='title-form'>Perfil de usuario</h2>  
        {/* Formulario de usuario */}
        <FormEditUser
          data={editUserData}
          onChange={handleUserChange}
        />
      </section>  

      <footer className='btn-footer gap-3 mt-4'>
        <MyButton
          onSubmit={sendDb}
          text="Guardar"
        />
        <MyButton
        text="Volver"
        />
      </footer>
    </main>
    </div>
  )
}

export default EditCompanyPage;