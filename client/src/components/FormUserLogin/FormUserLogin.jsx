import './FormUserLogin.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button, Form } from "react-bootstrap";
import { ZodError } from 'zod';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { useContext } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import { MyButton } from '../MyButton/MyButton';

const initialValue = {
  user_email: '',
  password: '',
};

export const FormUserLogin = () => {

  const { setUserData, setCompanyData, setToken } = useContext(AuthContext);
  const [userLogin, setUserLogin] = useState(initialValue);
  const [errorValidation, setErrorValidation] = useState();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const onSubmit = async () => {
    //TODO Hace falta, validar los campos desde el front !!!!!
    try {

      // Fetch para mandar el input del usuario a autenticación
      const userRes = await fetchData('/user/login', 'POST', userLogin);
      const token = userRes.data.token;

      // Mando token con la petición para validar la autenticación
      const userByToken = await fetchData('/user/userByToken', 'GET', null, token);

      // Guardamos en local storage el token del user
      localStorage.setItem('credentials', token);

      setUserData(userByToken.data.userData);
      setCompanyData(userByToken.data.companyData);
      setToken(token);

      // Si todo es correcto, mandamos al usuario a su perfil

      //TODO Supongamos que navega a company profile tras loguear, ya lo que decidamos
      //navigate(`/companyProfile`)
      //TODO Esta pa cuando la vista esté disponible
      const user_id = userByToken.data.userData.user_id;
      navigate(`/companyRegister/${user_id}`);
    } catch (error) {
        setErrorValidation(error?.response?.data);
        console.log(error);
    }
  }

  return (
    <Form className="login-container">
      <h1>Login</h1>
      {errorValidation && (
        <p className="error-alert">{errorValidation}</p>
      )}
      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="Email"
          name="user_email"
          value={userLogin.user_email}
          onChange={handleChange}
        />
      {errorValidation?.user_email && (
        <p className="error-alert">{errorValidation.user_email}</p>
      )}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Contraseña"
          name="password"
          value={userLogin.password}
          onChange={handleChange}
        />
        {errorValidation?.password && (
          <p className="error-alert">{errorValidation.password}</p>
        )}
      </Form.Group>

      <Form.Group className='gap-2 d-flex justify-content-center'>

        <MyButton
          btnClass={"btn-green"}
          onSubmit={onSubmit}
          text={"Enviar"}
        />
        <MyButton
          btnClass={"btn-red"}
          onSubmit={() => navigate('/')}
          text={"Cancelar"}
        />
      </Form.Group>
    </Form>
  );
};
