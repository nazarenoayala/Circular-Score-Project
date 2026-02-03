import { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { Link, useNavigate, useParams } from 'react-router';
import { MyButton } from '../../../components/MyButton/MyButton';
import './CompanyTestSaved.css';

import { QuestionAnswerCard } from '../../../components/QuestionAnswerCard/QuestionAnswerCard';
const urlImage = import.meta.env.VITE_IMAGES;

const CompanyTestSaved = () => {
const navigate = useNavigate();

  // Nos traemos el array de los test
  const { test, token } = useContext(AuthContext);

  //Rescatar id del test
  const { id , answer_set_id } = useParams();
  //Filtrar el test que queremos a través del id rescatado
  const uniqueTest = test?.find((e) => e.test_id == id);

  const [loading, setLoading] = useState(true);

  //Array traído del back
  const [AllTestsCompanies, setAllTestsCompanies] = useState([]);

  // Seteamos un marcador de pregunta
  const [index, setIndex] = useState(0);

  // Creamos un estado para las respuestas:
  const [answer, setAnswer] = useState({});

  // Guardamos en este estado el array de preguntas que nos traemos de BD
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    //info de la empresa
    const fetchAllTestsCompanies = async () => {
      try {
        let result = await fetchData(`/company/allCompaniesData/${id}`,'GET',null,token,);
        setAllTestsCompanies(result.data.result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
     fetchAllTestsCompanies();
   

    //preguntas del test
    const fetchQuestions = async () => {
      try {
        let result = await fetchData(`/question/getQuestions/${id}`,'GET',null,token);
        const allQ = result.data.result;
        setQuestions(allQ);
      } catch (error) {
        console.log(error);
      }
    };
      fetchQuestions();
 

    //respuestas guardadas
    const fetchAnswers = async () => {
      // Si answer_set_id no tiene valor o es  "undefined", salimos de la función
     
      try {
        let result = await fetchData(`/answer/savedAnswers/${id}`,'GET',null,token,);
     
    
        //verificamos que existe la respuesta
         if (result && result.data && result.data.result) {

          //objeto para guardar las respuetas
          const savedAnswers = {};
          for (let i = 0; i < result.data.result.length; i++) {
          const item = result.data.result[i]; 
          savedAnswers[item.question_id] = item.user_answer;
          }

          setAnswer(savedAnswers);
          const answerLength = result.data.result.length;
          setIndex(answerLength);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
      fetchAnswers();
   
  }, [id, token]);

          const continueTest = () =>{

           navigate(`/newTest/${id}?answer_set_id=${answer_set_id}`); 
           
        };

 

  
  return (
   <div>
  <div >
  <div>
    {AllTestsCompanies?.map((elem) => (
      <div className="test-card" key={elem.company_id}>
    
        <div className="test-info">
          <h4 className="company-name">
            Nombre de la empresa:{' '}
            <Link
              to={`/oneCompany/${elem.user_id}`}
              className="myLink"
            >
              {elem.company_name}
            </Link>
          </h4>

          <h4 className="test-name">
            Test: {uniqueTest?.test_name}
          </h4>
        </div>

        <div className="test-image">
          <img
            src={`${urlImage}/ODSimages/${uniqueTest?.test_image}`}
            alt={uniqueTest?.test_name}
          />
        </div>

      </div>
    ))}
  </div>
</div>
  <div className="p-4">
    {!loading && questions.length > 0 && (
      <div>
        <div className="mb-5">
          {questions
            .filter((q) => answer.hasOwnProperty(q.question_id))
            .map((pregunta) => (
              <QuestionAnswerCard
                key={pregunta.question_id}
                question={pregunta}
                answer={answer}
              />
            ))}
        </div>

        <div>
          <MyButton
            text="Continuar Test"
            btnClass="btn-green"
            onSubmit={continueTest}
          />
        </div>
      </div>
    )}
  </div>
</div>
  )
}
export default CompanyTestSaved;
