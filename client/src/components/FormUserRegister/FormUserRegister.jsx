import './FormUserRegister.css';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const initialValue = {
  user_email: "",
  password: ""
}

export const FormUserRegister = () => {
  const [registerUser, setRegisterUser] = useState(initialValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  }

  const onSubmit = async () => {
    try {
      // ENVIAR DATOS AL BACK

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Control
          type="email"
          placeholder="Email"
          name="user_email"
          value={registerUser.user_email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Contraseña"
          name="password"
          value={registerUser.password}
          onChange={handleChange}
        />
      </Form.Group>
      <Button
        onClick={onSubmit}
      >Enviar
      </Button>
    </Form>
  )
}
