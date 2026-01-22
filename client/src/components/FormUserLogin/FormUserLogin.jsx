import './FormUserLogin.css'
import { useState } from 'react';
import { Button, Form } from "react-bootstrap"

const initialValue = {
  email: "",
  password: ""
}

export const FormUserLogin = ({setShowPage}) => {
const [userLogin, setUserLogin] = useState(initialValue);

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setUserLogin({...userLogin, [name]:value});
  }


   const onSubmit = async () => {
    try {
       setShowPage('login')
      // ENVIAR DATOS AL BACK

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Form className='login-container'>
      <h1>Login</h1>
      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="Email"
          name="user_email"
          value={userLogin.user_email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Contraseña"
          name="password"
          value={userLogin.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Button
      className='btn-green'
        onClick={onSubmit}
      >Enviar
      </Button>
    </Form>
  )
}
