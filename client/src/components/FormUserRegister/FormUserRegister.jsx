import './FormUserRegister.css';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import registerSchema from '../../../schemas/userRegister';
import { ZodError } from 'zod';
import { fetchData } from '../../../helpers/axiosHelper';

const initialValue = {
  user_email: '',
  password: '',
  repPassword: '',
};

export const FormUserRegister = ({ setShowPage }) => {
  const [registerUser, setRegisterUser] = useState(initialValue);
  const [errorValidation, setErrorValidation] = useState();
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  const onSubmit = async () => {
    try {
      registerSchema.parse(registerUser);
     
      // Lamamos al back para que intente el registro del user
      const res = await fetchData('/user/register', 'POST', registerUser);
      const {token} = res.data;

      // Insertamos un item json con el token en local storage
      localStorage.setItem('credentials', token);
      console.log('FRONT, USER REGISTER FORM, RES Y TOKEN', res, token);
      setShowPage('modal');
      
    } catch (error) {
      if (error instanceof ZodError) {
        
        //objecto que guarda todos los errores
        const ErrorObject = {};

        error.issues.forEach((elem) => {
        ErrorObject[elem.path[0]] = elem.message;
        });
      console.log(ErrorObject);

       setErrorValidation(ErrorObject);
      } else {
        console.log('otro error', error);
      }
    }
  };

  return (
    <Form className="register-container">
      <h1>Regístrate</h1>

      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="Email"
          name="user_email"
          value={registerUser.user_email}
          onChange={handleChange}
          required
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
          value={registerUser.password}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Confirmar contraseña"
          name="repPassword"
          value={registerUser.repPassword}
          onChange={handleChange}
          required
        />
        {errorValidation?.repPassword && (
          <p className=" error-alert">{errorValidation.repPassword}</p>
        )}
      </Form.Group>

      <Form.Group>
        <Button className="btn-green" onClick={onSubmit}>
          Enviar
        </Button>
      </Form.Group>
    </Form>
  );
};
