import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { MyButton } from '../../../components/MyButton/MyButton';
import { fetchData } from '../../../../helpers/axiosHelper';
import { EditTestCategory } from '../../../components/EditTestCategory/EditTestCategory';
import { EditTestQuestion } from '../../../components/EditTestQuestion/EditTestQuestion';
import { Col, Container, Modal, Row } from 'react-bootstrap';

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
    //Estado para mensajes
    const [message, setMessage] = useState("");
    //Modal para cuando se hayan guardado los cambios 
    const [showModal, setShowModal] = useState(false);


    useEffect(()=>{
        const searchToken = token || localStorage.getItem("credentials");

        const getData = async () =>{
            try {
                //peticion al endpoint de preguntas
                const res = await fetchData(`/question/getQuestions/${id}`, 'GET', null, searchToken);
                
                if(res.data?.result){
                    setQuestions(res.data.result);
                    
                }
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
        if (id && searchToken){
            getData();
    }
    }, [token, id])

    const handleTitleChange = (e) =>{
        const newTitle = e.target.value;
        setTestName(newTitle);
    }

    const handleQuestionChange = (idx, newValue) =>{
        const updated =[...questions];
        updated[idx].question_text = newValue;
        setQuestions(updated);
    }

    const handleCloseModal = () =>{
        setShowModal(false);
        navigate('/dashboard');
    }

    const addQuestion = (question_text) => {
        const newQuestionText = {
            question_text: question_text,
            test_id: id
        }
        setQuestions([...questions, newQuestionText])
    }

    const saveChanges = async () =>{
        try {
            //Datos que enviare a la DB
            console.log("actualizando titulo ", testName);
            
          const resultTitle = await fetchData(`/test/updateName/${id}`, 'PUT', {test_name: testName}, token)  
          console.log("res del server", resultTitle);
          
            //Creo array de promesas
          const promises = questions.map((elem)=>{  
              return fetchData('/question/updateQuestions', 'PATCH', {           
                test_id: id,
                question_id: elem.question_id,
                question_text: elem.question_text            
          }, token);
            });
            //Espero a que el map termine
            const results = await Promise.all(promises);
            //Validacion titulo
            let titleSucces = true;
            for (let i = 0; i < results.length; i++){
                if (results[i].status >=300){
                    titleSucces = false;
                    break;
                }
            }

            let questionSucces = resultTitle.status < 300;

            if (titleSucces && questionSucces) {
                setShowModal(true);
            }else{
                setMessage("Error al guardar datos")
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

     <Modal
        show={showModal} 
        onHide={handleCloseModal}
        centered
     >
         <Modal.Header>
                <Modal.Title>CAMBIOS GUARDADOS</Modal.Title>
                </Modal.Header>
                <Modal.Body>Se han realizado los cambios</Modal.Body>
                <Modal.Footer>
                    <MyButton
                        text="Ir a panel de control"
                        onSubmit={handleCloseModal}
                    />
                </Modal.Footer>
     </Modal>
    </Container>
  )

}
export default EditTest