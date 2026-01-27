import './FormUserResPassword.css'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ZodError } from 'zod';
import { fetchData } from '../../../helpers/axiosHelper';


export const FormUserResPassword = ({ setShowPage }) => {
  const [userEmail, setUserEmail] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [errorValidation, setErrorValidation] = useState();
 

  const handleChange = (e) => {
    setUserEmail(e.target.value);
  };
  
  const onSubmit = async () => {
    try {
      //registerSchema.parse(userEmail);
     
      // Llamamos al back para que busque el email del usuario
      const res = await fetchData("/user/findResetPassword", 'POST', {user_email: userEmail});
      console.log(res.data.userExists.length);
      
      if(res.data.userExists.length !== 0){
        setAlertMsg('Compruebe su correo para reestablecer su contraseña.');
        setEmailSent(true);
      } else {
        setAlertMsg('No se ha encontrado su correo.')
      }
      
      
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

  const goBack = () => {
    setEmailSent(false);
    setAlertMsg("");
    setUserEmail("");
    setShowPage("login");
  }

  return (
    <>
      <Form className="register-container">
        <h1>Recuperación de Contraseña</h1>
        <p>{alertMsg}</p>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            name="user_email"
            value={userEmail}
            onChange={handleChange}
            required
          />
          {errorValidation && (
            <p className="error-alert">{errorValidation.user_email}</p>
          )}
        </Form.Group>
        {emailSent ?
        <Form.Group>
          <Button className="btn-green" onClick={goBack}>
            Volver
          </Button>
        </Form.Group>
          :
        <Form.Group>
          <Button className="btn-green" onClick={onSubmit}>
            Enviar
          </Button>
        </Form.Group>
        }
      </Form>
    </>
  );
};