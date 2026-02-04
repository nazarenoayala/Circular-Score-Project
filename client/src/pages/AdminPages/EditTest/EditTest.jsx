import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { MyButton } from '../../../components/MyButton/MyButton';
import { fetchData } from '../../../../helpers/axiosHelper';
import { EditTestCategory } from '../../../components/EditTestCategory/EditTestCategory';
import { EditTestQuestion } from '../../../components/EditTestQuestion/EditTestQuestion';
import { Col, Container, Row } from 'react-bootstrap';

import './editTest.css';

const EditTest = () => {
    const navigate = useNavigate();
    //Rescato id del test
    const {id} = useParams(); 
    const {token, test} = useContext(AuthContext);

    //Estado del titulo
    const [testName, setTestName] = useState("");
    //Array de preguntas
    const [questions, setQuestions] = useState([]);
    //categoria segun id de test seleccionado
    //const [selectedCategory, setSelectedCategory] = useState("");


    useEffect(()=>{
        const searchToken = token || localStorage.getItem("credentials");

        const getData = async () =>{
            try {
                
                //peticion al endpoint de preguntas
                const res = await fetchData(`/question/getQuestions/${id}`, 'GET', null, searchToken);
                console.log("Respuesta del Back (Preguntas):", res.data);
                if(res.data?.result){
                    setQuestions(res.data.result);
                    console.log("Estado 'questions' actualizado:", res.data.result);
                }
                console.log("Datos del Contexto (Tests):", test);
                //busco el test en el contexto y pre-selecciono categoria
                if(test){
                    const currentTest = test?.find(individualTest=> individualTest.test_id.toString() == id.toString());
                    if(currentTest){
                        setTestName(currentTest.test_name)
                        }
                }
            } catch (error) {
                console.log("Error al cargar test", error);
                
            }
        }
        if (id && searchToken && test){
            getData();
    }
    }, [token, id, test])

    const handleTitleChange = (e) =>{
        const newTitle = e.target.value;
        setTestName(newTitle);
    }

    const handleQuestionChange = (idx, newValue) =>{
        const updated =[...questions];
        updated[idx].text = newValue;
        setQuestions(updated);
    }

    const addQuestion = (text) => {
        const newQuestionText = {
            text: text,
            test_id: id
        }
        setQuestions([...questions, newQuestionText])
    }

    const saveChanges = async () =>{
        try {
            //Datos que enviare a la DB
            const updatedTest = {
                test_id: id,
                test_name: testName,
                questions: questions
            }

            console.log("Enviando cambios!!!!!!!", updatedTest);

            //Petición en espera, nose aun si existe endpoint correspondiente
            const res = await fetchData(`/test/editTest/${id}`, 'PUT', updatedTest, token);
            if(res.status === 200) {
                navigate('/dashboard')
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }
    
  return (
    <Container className='edit-test-container'>
     <Row>    
      <header className='header-content'>  
        <div>
        <h2 className='section-titles'>Edición de test</h2>
        </div>
      </header>  

            {/* categoria modificable */}
            <section className='section'>
                 {/*Select edicion categoria  */}
                <EditTestCategory
                    categories={test}
                    testName={testName}
                    handleTitleChange={handleTitleChange}
                />
                
                
            </section>
            {/* Preguntas */}
            <section className='section'>
                {/* aca map de preguntas */}
                < EditTestQuestion
                    questions={questions}
                    handleQuestionChange={handleQuestionChange}
                    addQuestion={addQuestion}
                />
            </section>
        <footer className='footer-section'>
            <MyButton
                text="Volver"
                onSubmit={()=> navigate('/dashboard')} 
            />
            <MyButton
                text="Guardar"
                onSubmit={saveChanges}
            />
        </footer>
     </Row>
    </Container>
  )
}

export default EditTest