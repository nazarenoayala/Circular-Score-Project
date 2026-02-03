import { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { Link, useNavigate, useParams } from 'react-router';
import { MyButton } from '../../../components/MyButton/MyButton';
import './CompanyTestSaved.css';
import options from '../../../data/CompanyRegisterData/options';

import { QuestionAnswerCard } from '../../../components/QuestionAnswerCard/QuestionAnswerCard';
const urlImage = import.meta.env.VITE_IMAGES;

const CompanyTestSaved = () => {
  const navigate = useNavigate();

  // Nos traemos el array de los test
  const { test, token, companyData } = useContext(AuthContext);
  console.log('', companyData);

  //Rescatar id del test
  const { id, answer_set_id } = useParams();
  //Filtrar el test que queremos a través del id rescatado
  const currentTest = test?.find((e) => e.test_id == id);

  // Creamos un estado para las respuestas:
  const [answersTorender, setAnswersTorender] = useState([]);
  // Guardamos en este estado el array de preguntas que nos traemos de BD
  const [questions, setQuestions] = useState([]);

  console.log(questions);

  useEffect(() => {
    //preguntas del test
    const fetchQuestions = async () => {
      try {
        let result = await fetchData(
          `/question/getQuestions/${id}`,
          'GET',
          null,
          token,
        );
        const allQ = result.data.result;
     console.log(allQ);
     
     
        let result2 = await fetchData(
          `/answer/savedAnswers/${answer_set_id}`,
          'GET',
          null,
          token,
        );
       // console.log(result2);
        const allanswers = result2.data.result
        console.log(allanswers);
        
        const finalData = allanswers.map((a)=> {
           const question = allQ.find(q=> q.question_id === a.question_id)
           const opts = options.find(o=> o.value === a.user_answer )
      
           return {
            question_id: question?.question_id,
            question: question?.text, 
            answer: opts?.name
           }
          
        })
        setAnswersTorender(finalData)
       console.log(finalData);
     
       
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);


  console.log(answersTorender);
  
  useEffect(() => {
    //respuestas guardadas
    const fetchAnswers = async () => {
      try {
        


        //verificamos que existe la respuesta
        //  if (result && result.data && result.data.result) {

        //   //objeto para guardar las respuetas
        //   const savedAnswers = {};
        //   for (let i = 0; i < result.data.result.length; i++) {
        //   const item = result.data.result[i];
        //   savedAnswers[item.question_id] = item.user_answer;
        //   }

        //   setAnswers(savedAnswers);
        //   const answerLength = result.data.result.length;
        //   setIndex(answerLength);
        // }

        // setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchAnswers();
  }, []);

  // }, [id, token]);

  const continueTest = () => {
    navigate(`/newTest/${id}?answer_set_id=${answer_set_id}`);
  };

  return (
    <div>
      <div>
        <div>
          <h2>nombres companias:{companyData.name}</h2>
          <h2>nombre del test: {currentTest.test_name}</h2>
          <img src={`${urlImage}/ODSimages/${currentTest.test_image}`} alt="" />
        </div>
      </div>
      <div>
       {answersTorender.map(elem => {
        return (
          <div>
             <p>{elem.question_id}: {elem.question}</p>
             <p>{elem.answer}</p>
             <hr />

  
          </div>
       
        )
       })

       }
      </div>
      <div className="p-4">
    
          <MyButton
            text="Continuar Test"
            btnClass="btn-green"
            onSubmit={continueTest}
          />
        </div>
     
    </div>
  );
};
export default CompanyTestSaved;
