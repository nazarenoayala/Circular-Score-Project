import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { NavbarUser } from '../../../components/NavbarUser/NavbarUser';
import { FormEditCompany } from '../../../components/FormEditCompany/FormEditCompany';
import { FormEditUser } from '../../../components/FormEditUser/FormEditUser';
import { fetchData } from '../../../../helpers/axiosHelper'
import { MyButton } from '../../../components/MyButton/MyButton';
import { useNavigate } from 'react-router';

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
  //para usar boton volver y que redirija al perfil usuario useNavigate, podria usarlo en mybutton?
  const navigate = useNavigate();
  //estado para mensaje que se guardaron los cambios con exito
  const [message, setMessage] = useState("");

  const {companyData, userData, token, logout} = useContext(AuthContext)

  //Estado para empresa
  const [editCompanyData, setEditCompanyData] = useState(initialValueCompany);
  //Estado para user
  const [editUserData, setEditUserData] = useState(initialValueUser);

  //Cuando tenga los datos, los paso a estados locales
  useEffect(() =>{
    console.log("Datos de empresa:", companyData);
    console.log("Datos de usuario:", userData);
    if (companyData) {
      setEditCompanyData(companyData);
    }
    if (userData) {
      setEditUserData(userData);
    }
  }, [companyData, userData]);

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

  //const handleCheckboxChange = () => {
    
 // }

  //funcion para guardar (enviar a la DB) 
  const sendDb = async (e) => {
    e.preventDefault();
    //Verifico que hay token
    const tokenLS = localStorage.getItem("token")
    try {
      //creo objeto con toda la info
      const updatedData = {
        ...editCompanyData,
        ...editUserData,
      }
      console.log('enviando datos al server', updatedData);

      //Hago peticion PUT en user.routes.js la ruta pide eso
      const result = await fetchData(`/user/updateProfile`, 'PUT', updatedData, tokenLS);
      
      if(result){
        setMessage("Los cambios se guardaron con éxito")
      }
    } catch (error) {
      console.log('Error al guardar en la DB', error);
    }
    

  }
  
  return (
    
    <div className='edit-profile-container'>
    <main className='container mt-5 mb-5'>
      <header className='header-content mb-4'>
        <h1>Hola {editUserData.name}</h1>
        <MyButton text="Cerrar Sesión" onSubmit={logout}/>
      </header>
      {/* Card 1: Form empresa */}
      <section className='form-card mb-4'>
        <h2 className='title-form'>Datos de empresa</h2>
        {/* Formulario de empresa */}
        {/* paso por props datos y funcion a los hijos */}
        <FormEditCompany
          editCompanyData={editCompanyData}
          handleCompanyChange={handleCompanyChange}
        /> 
      </section>

        {/* dejar espaciado entre formularios */}

      {/* Card 2: Form user */}
      <section className='form-card mb-4'>
        <h2 className='title-form'>Perfil de usuario</h2>  
        {/* Formulario de usuario */}
        <FormEditUser
          editUserData={editUserData}
          handleUserChange={handleUserChange}
        />
      </section>  

      <footer className='btn-footer gap-3 mt-4'>
        <p>{message}</p>
        <MyButton
          onSubmit={sendDb}
          text="Guardar"
        />
        <MyButton
        onSubmit={()=> navigate(`/companyProfile/${companyData?.user_id}`)}
        text="Volver"
        />
      </footer>
    </main>
    </div>
  )
}

export default EditCompanyPage;