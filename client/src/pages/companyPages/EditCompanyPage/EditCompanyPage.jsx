import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { NavbarUser } from '../../../components/NavbarUser/NavbarUser';
import { FormEditCompany } from '../../../components/FormEditCompany/FormEditCompany';
import { FormEditUser } from '../../../components/FormEditUser/FormEditUser';
import { fetchData } from '../../../../helpers/axiosHelper'
import { MyButton } from '../../../components/MyButton/MyButton';
import { useNavigate } from 'react-router';
import { id } from 'zod/v4/locales';

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
  gso:'',
  client_segment:[],
  stakeholders:[]
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

  const [province, setProvince] = useState();
  const [city, setCity] = useState();
  const [valErrors, setValErrors] = useState('');

  //Cuando tenga los datos, los paso a estados locales
  useEffect(() =>{

    const setData = () => {
      if (companyData) {
        setEditCompanyData(companyData);
      }
      if (userData) {
        setEditUserData(userData);
      }
    }
    setData();
  }, [companyData, userData]);

  //funciones para control de inputs. (uso la mismo control company para checkbox)
  const handleCompanyChange = (e, id) => {
    const {name, value, checked} = e.target;
    if(name === 'client_segment' || name === 'stakeholders'){
      if(checked){
        //si se marca añado id al array
        if (name === 'stakeholders') {
          setEditCompanyData({
            ...editCompanyData,
            stakeholders: [...(editCompanyData.stakeholders || []), id]
          })
      }else if (name === 'client_segment') {
        setEditCompanyData({
          ...editCompanyData,
          client_segment: [...(editCompanyData.client_segment || []), id]
        })
      }
      }else{
        if (name === 'client_segment'){
          setEditCompanyData({
            ...editCompanyData,
            client_segment: editCompanyData.client_segment?.filter(elem => elem !== id)
          });
        }else if (name === 'stakeholders'){
          setEditCompanyData({
            ...editCompanyData,
            stakeholders: editCompanyData.stakeholders?.filter(elem => elem !== id)
          })
        }
      }
    } else{
      setEditCompanyData({...editCompanyData, [name]: value})
    }
}  

  const handleUserChange = (e) => {
    const {name, value} = e.target; 
    setEditUserData((prev) =>({
      ...prev,
      [name]: value
    }))
  }

 const handleLogOut = (e) => {
  console.log(e);
  logout(); //limpio los datos y LS
  navigate('/'); 
 }

  //funcion para guardar (enviar a la DB) 
  const sendDb = async (e) => {
    e.preventDefault();
    //Verifico que hay token
    if(token){
      try {
        //creo objeto con toda la info
        const updatedData = {
          ...editCompanyData,
          ...editUserData,
        }
        console.log('enviando datos al server', updatedData);
        
        //Hago peticion PUT en user.routes.js la ruta pide eso
        const result = await fetchData(`/user/updateProfile`, 'PUT', updatedData, token);
        
        if(result){
          setMessage("Los cambios se guardaron con éxito")
        }
      } catch (error) {
        console.log('Error al guardar en la DB', error);
      }
    }
  }
  
  return (
    
    <div className='edit-profile-container'>
    <main className='container mt-5 mb-5'>
      <header className='header-content mb-4'>
        <h1>Hola {editUserData.name}</h1>
        <MyButton text="Cerrar Sesión" onSubmit={handleLogOut}/>
      </header>
      {/* Card 1: Form empresa */}
      <section className='form-card mb-4'>
        <h2 className='title-form'>Datos de empresa</h2>
        {/* Formulario de empresa */}
        {/* paso por props datos y funcion a los hijos */}
        <FormEditCompany
          editCompanyData={editCompanyData}
          handleCompanyChange={handleCompanyChange}
          city={city}
          province={province}
          valErrors={valErrors}
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