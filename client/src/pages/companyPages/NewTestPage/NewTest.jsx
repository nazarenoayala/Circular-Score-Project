import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { fetchData } from '../../../../helpers/axiosHelper';
import { QuestionCard } from '../../../components/questionCard/QuestionCard';
import { MyButton } from '../../../components/MyButton/MyButton';
import './newTest.css';

const apiImage = import.meta.env.VITE_IMAGES;

const NewTest = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  // Rescatamos el id del test del parámetro dinámico
  const {id} = useParams();
  // Nos traemos del contexto tanto los tests como el token
  const {test, token} = useContext(AuthContext);
  // Hacemos un filtro mediante el id de test del parámetro dinámico para elegir el test
  const oneTest = test.filter((test) => test.test_id == id);
  // Creamos un estado loading para que no se rendericen los hijos hasta que no hagamos el useEffect para poder pasar los datos actualizados
  const [loading, setLoading] = useState(true);
  // Guardamos en este estado el array de preguntas que nos traemos de BD
  const [questions, setQuestions] = useState();
  // Seteamos un marcador de pregunta
  const [index, setIndex] = useState(state !== null ? state.index : 0);
  // Creamos un estado para las respuestas:
  const [answer, setAnswer] = useState({});
  // Creamos un estado para poder guardar el answer_set_id:
  const [answerSetId, setAnswerSetId] = useState();

  
  // Hacer llamada a base de datos para traernos las preguntas, respuestas en el caso de que haya y el answerSet
  useEffect(() => {
    
    const fetchAnswerSet = async () => {
      
      try {
        console.log("ID DEL NEW TEST", id);
        
        let result = await fetchData(`/answerSet/selectAnswerSet/${id}`, 'GET', null, token);
        console.log("RESULTADO", result);
        setAnswerSetId(result.data.result[0].answer_set_id);
        
      } catch (error) {
        console.log(error);
      }
      
    }
    
    fetchAnswerSet();
    
    const fetchQuestions = async () => {
      
      try {
        
        let result = await fetchData(`/question/getQuestions/${id}`, 'GET', null, null);
        setQuestions(result.data.result);
        console.log(result.data.result);
        
        setLoading(false);

      } catch (error) {
        console.log(error);
      }
      
    }
    
    fetchQuestions();
    
  },[]);
  
  
  // Función para cancelar test que estará en la primera pregunta y lo que hara será hard delete del answer Set en la base de datos
  const cancelAnswerSet = async () => {
    
    try {
      
      let result = await fetchData(`/answerSet/deleteAnswerSet/${answerSetId}`, 'DELETE', null, token);
      console.log(result);
      navigate(`/oneTestCompany/${id}`);
      
    } catch (error) {
      console.log(error);
    }
  }
  console.log("SAVE QUIESTION", answerSetId);
  
  // Función para salir y guardar progreso de test:
  const saveQuestions = async () => {
    console.log("MITOKEN EN SAVE QUESTION", token);
    try {
      
      let result = await fetchData(`/answer/saveQuestions/${id}/${answerSetId}`, 'POST', {answer}, token);
      console.log("LOG DE SAVE**********",result);
      navigate(`/oneTestCompany/${id}`);

    } catch (error) {
      console.log(error);
    }
    
  }
  
  // Función para finalizar el test y guardar las preguntas:
  const finishTest = async () => {
    try {
      
      let resultSaving = await fetchData(`/answer/saveQuestions/${id}/${answerSetId}`, 'POST', {answer}, token);
      console.log(resultSaving);
      
      let resultFinish = await fetchData('/answerSet/finishTest', 'PUT', {answerSetId}, token);
      console.log(resultFinish);
      
      // Hay que decidir dónde enviar al usuario tras finalizar el test.
      // navigate(?)
      navigate(`/generalGraphic/${id}`);
      
    } catch (error) {
      console.log(error);
    }
    
  }

  // Lógica de botones (se renderiza en función de las 3 casuísticas):
  const renderButtons = () => {

    if (index === 0) {

      return (
      <div className='btn-class'>
        <MyButton
          text='Siguiente Pregunta'
          btnClass='btn-green'
          onSubmit={() => setIndex(index + 1)}
        />
        <MyButton
          text='Cancelar'
          btnClass='btn-blue'
          onSubmit={cancelAnswerSet}
        />
      </div>
      )
    }
    else if (index > 0 && index < questions?.length - 1) {
      return (

      <div className='btn-class'>
        <MyButton
          text='Pregunta anterior'
          btnClass='btn-green'
          onSubmit={() => setIndex(index - 1)}
        />
        <MyButton
          text='Siguiente pregunta'
          btnClass='btn-green'
          onSubmit={() => setIndex(index + 1)}
        />
        <MyButton
          text='Volver atrás y guardar progreso'
          btnClass='btn-blue'
          onSubmit={saveQuestions}
        />
      </div>
      )
    }
    else {

      return (
        <div className='btn-class'>
          <MyButton
            text='Pregunta anterior'
            btnClass='btn-green'
            onSubmit={() => setIndex(index - 1)}
          />
          <MyButton
            text='Finalizar Test'
            btnClass='btn-blue'
            onSubmit={finishTest}
          />
        </div>
      )
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
        <img src={`${apiImage}/ODSimages/${oneTest[0]?.test_image}`} alt="" />
        <h1>{oneTest[0]?.test_name}</h1>
      </div>

      <div className='questionsContainer'>
        {!loading && <QuestionCard
          question={questions[index]}
          answer={answer}
          setAnswer={setAnswer}
        />}
      </div>

      {/* {<div className='btn-class'>
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
          onSubmit={saveQuestions}
        />
        :
        <MyButton
          text='Terminar test'
          btnClass='btn-blue'
          onSubmit={finishTest}
        />
        }

      </div>} */}

      {renderButtons()}
    </div>
  )
}

export default NewTest;
