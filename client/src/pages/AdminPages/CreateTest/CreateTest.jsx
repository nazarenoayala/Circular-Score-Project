import React, { useContext, useState } from 'react';
import '../../../components/FormCreateTest/formCreateTest.css';
import { FormCreateTest } from '../../../components/FormCreateTest/FormCreateTest';
/* import { createTestSchema} from '../../../../schemas/createTest' */
import { ZodError } from 'zod';
import { fetchData } from '../../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import {
  createTestSchema,
  questionSchema,
} from '../../../../schemas/createTest';

const initialValues = {
  test_name: '',
  test_image: '',
  is_public: 0,
};

const initialValues2 = {
  question_text: '',
  premium: 0,
};

const CreateTest = () => {
  const [newTest, setNewTest] = useState(initialValues);
  const [testImage, setTestImage] = useState();
  const [question, setQuestion] = useState(initialValues2);
  const [questions, setQuestions] = useState([]);
  const [valErrors, setValErrors] = useState([]);
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);
  console.log(token);

  // control de los inputs

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'file') {
      setTestImage(e.target.files[0]);
    } else {
      setNewTest({
        ...newTest,
        [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
      });
    }
  };
  const handleChange2 = (e) => {
    const { name, value, type, checked } = e.target;
    setQuestion({
      ...question,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    });
  };

  // añadir Preguntas al Array

  const addQuestion = async () => {
    try {
      //validación de campos 
      questionSchema.parse(question);
      setQuestions([...questions, question]);
      setQuestion(initialValues2);
      setMessage('');
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = {};
        error.issues.forEach((elem) => {
          fieldErrors[elem.path[0]] = elem.message;
        });
        setValErrors(fieldErrors);
      } else {
        console.log(error);
      }
    }
  };

  //Envio de datos el Back
  const onSubmit = async () => {
    try {
      //validación de los campos

      createTestSchema.parse(newTest);
      if (questions.length === 0) {
        setMessage('Debe de introducir al menos 1 pregunta');
        return;
      }
      //Preparacion de datos para la Imagen

      const formData = new FormData();
      formData.append('newTest', JSON.stringify(newTest));
      formData.append('img', testImage);

      //mandar datos al Back
      const res = await fetchData(`/test/createTest`, 'POST', formData, token);
      //una vez se haya creado el test y conocemos su id 
      //mandamos el array de preguntas 
      if (res?.data?.test_id) {
        const res2 = await fetchData(
          `/question/createQuestion/${res.data.test_id}`,
          'POST',
          JSON.stringify(questions),
          token,
        );
        console.log(res2);
        setMessage('');
      }
      setNewTest(initialValues);
      setQuestions([]);
      setValErrors('');
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = {};
        error.issues.forEach((elem) => {
          fieldErrors[elem.path[0]] = elem.message;
        });
        setValErrors(fieldErrors);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="create-test-container">
        <main>
          <header>
            <h1 className="title-form">Creación de test</h1>
          </header>
          <FormCreateTest
            newTest={newTest}
            handleChange={handleChange}
            handleChange2={handleChange2}
            questions={questions}
            question={question}
            onSubmit={onSubmit}
            addQuestion={addQuestion}
            valErrors={valErrors}
            setQuestions={setQuestions}
            message={message}
          />
        </main>
      </div>
    </>
  );
};

export default CreateTest;
