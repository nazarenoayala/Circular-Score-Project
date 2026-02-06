import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { ZodError } from "zod"
import { useNavigate, useParams } from "react-router"
import { fetchData } from "../../../../helpers/axiosHelper";
import resetPassSchema from "../../../../schemas/userResetPass";
import './resetPassword.css'

const initialValue = {
  password: "",
  repPassword: ""
};


const ResetPassword = ({setShowPage}) => {
  
  const navigate = useNavigate();
  const {token, user_id} = useParams();
  const [newUserPassword, setNewUserPassword] = useState(initialValue);
  const [errorValidation, setErrorValidation] = useState();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewUserPassword({...newUserPassword, [name]: value});
  }

  const onSubmit = async () => {
    try {
      resetPassSchema.parse(newUserPassword);

      await fetchData(`/user/updatePassword/${token}/${user_id}`, 'POST', {password: newUserPassword.password});
      setShowPage('login');
      navigate('/');
    } catch (error) {
      if(error instanceof ZodError) {

        const ErrorObject = {};

        error.issues.forEach((elem)=> {
          ErrorObject[elem.path[0]] = elem.message;
        });
        
        setErrorValidation(ErrorObject);
      } else {
        console.log("Otro error", error);
      }
    }
  }

  return (
    <div className="res-pass-page">
      <Form className="register-container">
        <h1>Restablecer contraseña.</h1>

        <div className="res-pass-form">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Contraseña"
              name="password"
              value={newUserPassword.password}
              onChange={handleChange}
              required
              />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Confirmar contraseña"
              name="repPassword"
              value={newUserPassword.repPassword}
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
        </div>
      </Form>
  </div>
  )
}

export default ResetPassword