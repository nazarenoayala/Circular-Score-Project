import React, { useState } from 'react';
import './FormContact.css';
import { Form, Button } from 'react-bootstrap';
import { ZodError } from 'zod';
import { contactFormSchema } from '../../../schemas/contactForm';
import { fetchData } from '../../../helpers/axiosHelper';

const initiaalValues = {
  subject: '',
  email: '',
  message: '',
};

export const FormContact = () => {
  const [contact, setContact] = useState(initiaalValues);
  const [valErrors, setValErrors] = useState('');
  const [fetchError, setFetchError] = useState('');
  const [contactMess, setContactMess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const onSubmit = async () => {
    try {
      //validación de datos 
      contactFormSchema.parse(contact);
      //mandar datos al back
      const res = await fetchData('/user/contact', 'POST', contact);
      console.log(res);
      setContact(initiaalValues)
      setContactMess('Mensaje enviado')
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldsErrors = {};
        error.issues.forEach((elem) => {
          fieldsErrors[elem.path[0]] = elem.message;
        });
        setValErrors(fieldsErrors);
      } else {
        setFetchError('Hay un error');
      }
      console.log(error);
    }
  };

  return (
    <div className="contact-container text-center">
      <h1>Contáctanos</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="subject"
            value={contact.subject}
            placeholder="Asunto"
            onChange={handleChange}
          />
        </Form.Group>

        {valErrors?.subject && <p className="red">{valErrors.subject}</p>}

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            name="email"
            value={contact.email}
            placeholder="Email"
            onChange={handleChange}
          />
        </Form.Group>

        {valErrors?.email && <p className="red">{valErrors.email}</p>}

        {fetchError?.email && (
          <p className="red">{fetchError.email}</p>
        )}

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Mensaje"
            name="message"
            value={contact.message}
            onChange={handleChange}
          />
        </Form.Group>

        {valErrors?.message && <p className="red">{valErrors.message}</p>}
        <p>{contactMess}</p>

        <Button className="btn-green" onClick={onSubmit}>
          Enviar
        </Button>
      </Form>
    </div>
  );
};
