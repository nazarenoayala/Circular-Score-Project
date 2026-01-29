import React, { useContext, useState } from 'react'
import '../../../components/FormCreateTest/formCreateTest.css'
import { FormCreateTest } from '../../../components/FormCreateTest/FormCreateTest'
/* import { createTestSchema} from '../../../../schemas/createTest' */
import {ZodError} from 'zod';
import { fetchData } from '../../../../helpers/axiosHelper';
import { AuthContext } from '../../../context/AuthContext/AuthContext';

const initialValues = {
  test_name:'',
  category: '',
  test_image:'',
  is_public: false
}

const initialValues2 = {
  question_text: '',
  premium: false
}

const CreateTest = () => {
  const [newTest, setNewTest] = useState(initialValues);
  const [question, setQuestion] = useState(initialValues2)
  const [questions, setQuestions] = useState([]);
  const [valErrors, setValErrors] = useState([]);
  const {token} = useContext(AuthContext)
   
   const handleChange = (e) =>{
     const {name, value, type} = e.target
      if(type === 'image'){
        setNewTest({...newTest, image: e.target.files[0].name})
      }else {
        setNewTest({...newTest, [name]:value}); 
      }
    }
    const handleChange2 = (e) => {
      const {name, value, type, checked} = e.target;
      setQuestion({...question, [name]: type === 'checkbox' ? checked : value})
    }

    const addQuestion = async() => {
      setQuestions([...questions, question])
      setQuestion(initialValues2)
    }

    const onSubmit = async () =>{
         try { 
        //validación de los campos
       /*  createTestSchema.parse(newTest);
        createTestSchema.parse({...newTest, questions}); */
        console.log('validación ok');
        //mandar datos al Back
        const res = await fetchData(`/test/createTest`, 'POST', newTest, token);
        console.log(res);
        if(res){
          const res2 = await fetchData(`/question/createQuestion`, 'POST', questions, token);
          console.log(res2);
        }
          setNewTest(initialValues)  
         } catch (error) {
        if(error instanceof ZodError){
          const fieldErrors = {};
          error.issues.forEach((elem)=>{
            fieldErrors[elem.path[0]] = elem.message
          });
          setValErrors(fieldErrors)
        }else{
          console.log(error);
        }
      }
    }

    console.log(questions);
    

  return (

    <>
      <div className='create-test-container'>
        <main>
          <header>
            <h1 className='title-form'>Creación de test</h1>
          </header>
          <FormCreateTest
            newTest={newTest}
            handleChange={handleChange}
            handleChange2={handleChange2}
            questions={questions}
            question={question}
            onSubmit={onSubmit}
            addQuestion={addQuestion}
            valErrors={valErrors}/>
        </main>
      </div>
    </>
  )
}

export default CreateTest