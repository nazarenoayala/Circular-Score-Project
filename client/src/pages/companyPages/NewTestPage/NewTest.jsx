import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { fetchData } from '../../../../helpers/axiosHelper';
import { QuestionCard } from '../../../components/questionCard/QuestionCard';
import { MyButton } from '../../../components/MyButton/MyButton';
import './newTest.css';

const apiImage = import.meta.env.VITE_IMAGES;

const NewTest = () => {

  const navigate = useNavigate();

  const { id, answer_set_id } = useParams();
  const { test } = useContext(AuthContext);
  const oneTest = test.filter((test) => test.test_id == id);
  const [loading, setLoading] = useState(true);

  // Guardamos en este estado el array de preguntas que nos traemos de BD
  const [questions, setQuestions] = useState();
  // Seteamos un marcador de pregunta
  const [index, setIndex] = useState(0);
  // Creamos un estado para las respuestas:
  const [answer, setAnswer] = useState({});

  // Hacer llamada a base de datos para traernos las preguntas
  useEffect(() => {

    const fetchQuestions = async () => {

      try {

        let result = await fetchData(`/question/getQuestions/${id}`, 'GET', null, null);
        setQuestions(result.data.result);
        setLoading(false);

      } catch (error) {
        console.log(error);
      }

    }

    fetchQuestions();

  }, [])


  // Función para salir y guardar progreso de test:
  const saveTest = async () => {

    try {

      // todo hay que meter TOKEN
      let result = await fetchData(`/answer/saveTest/${id}/${answer_set_id}`, 'POST', { answer }, null);
      console.log(result);
      console.log(answer);
      navigate(`/oneTestCompany/${id}`);

    } catch (error) {
      console.log(error);
    }


  }

  return (
    <div className='oneQuestionPages'>
      <div className='progress-bar'>
        <h4>7 %</h4>
        <div className='progress-bar-container'>
          <div className='progress-bar-result'>
          </div>
        </div>
      </div>

      <div className='test-info'>
        <img src={`${apiImage}/ODSimages/${oneTest[0].test_image}`} alt="" />
        <h1>{oneTest[0].test_name}</h1>
      </div>

      <div className='questionsContainer'>
        {!loading && <QuestionCard
          question={questions[index]}
          answer={answer}
          setAnswer={setAnswer}
        />}
      </div>

      <div className='btn-class'>
        {index > 0 && <MyButton
          text='Pregunta anterior'
          btnClass='btn-green'
          onSubmit={() => setIndex(index - 1)}
        />}

        {index < questions?.length - 1 && <MyButton
          text='Siguiente Pregunta'
          btnClass='btn-green'
          onSubmit={() => setIndex(index + 1)}
        />}

        {index < questions?.length - 1 ? <MyButton
          text='Volver atrás (guardar)'
          btnClass='btn-blue'
          onSubmit={saveTest}
        />
          :
          <MyButton
            text='Terminar test'
            btnClass='btn-blue'
          />
        }

      </div>

    </div>
  )
}

export default NewTest;
