import { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router';
import { MyButton } from '../../../components/MyButton/MyButton';
import './CompanyTestSaved.css';
import options from '../../../data/CompanyRegisterData/options';



const urlImage = import.meta.env.VITE_IMAGES;

const CompanyTestSaved = () => {
  const navigate = useNavigate();
const [searchParams] = useSearchParams();
const navType = searchParams.get('navigate')
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

  


 

  const continueTest = () => {
    navigate(`/newTest/${id}?answer_set_id=${answer_set_id}`);
  };

  return (
    <div>
      <div className='test-card'>
        <div>
          <h4 className='company-name d-flex gap-2'>Nombre de la empresa:  <Link
            to={`/companyProfile/${companyData.user_id}`}
            className="text-success myLink" > {' '}
            <h4> {companyData.company_name} </h4>
          </Link></h4>
          <h4 className='test-name'>Test: {currentTest.test_name}</h4>
          </div>
        <div className='test-image'>
          <img src={`${urlImage}/ODSimages/${currentTest.test_image}`} alt="" />
        </div>  
      </div>
         
      <div className='test-info'>
        
       {answersTorender.map((elem, id)=> {
        return (
          <div className='mb-0 fs-5' key={id}>
             <p><strong>{elem.question_id}: {elem.question}</strong></p>
             <div className='d-flex gap-2'>
              <input type="radio" 
              readOnly
               checked
                />
                <p className="mb-0 text-muted ">{elem.answer? elem.answer : 'No aplica'}</p>
             </div>
          </div>
          
        )
       })

       }
      </div>
      <div className="p-4">
          {navType?<MyButton
            text="Volver"
            btnClass="btn-green"
            onSubmit={()=>navigate(-1)}
          />: 
          <MyButton
            text="Continuar Test"
            btnClass="btn-green"
            onSubmit={continueTest}
          />}
        </div>
    </div>
  );
};
export default CompanyTestSaved;
