import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { MyButton } from '../../../components/MyButton/MyButton';
import { fetchData } from '../../../../helpers/axiosHelper';
import { EditTestCategory } from '../../../components/EditTestCategory/EditTestCategory';
import { EditTestQuestion } from '../../../components/EditTestQuestion/EditTestQuestion';
import { Modal } from 'react-bootstrap';

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

    //Estado para modal de confirmacion de delete
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        const getData = async () =>{
            try {
                
                //peticion al endpoint de preguntas
                const res = await fetchData(`/question/getQuestions/${id}`, 'GET', null, token);
                console.log("Respuesta del Back (Preguntas):", res.data);
                if(res.data?.result){
                    setQuestions(res.data.result);
                    console.log("Estado 'questions' actualizado:", res.data.result);
                }
                console.log("Datos del Contexto (Tests):", test);
                //busco el test en el contexto y pre-selecciono categoria
                const currentTest = test?.find(individualTest=> individualTest.test_id == id);
                if(currentTest){
                    setTestName(currentTest.test_name)
                    console.log("Test actual encontrado:", currentTest);
                }
            } catch (error) {
                console.log("Error al cargar test", error);
                
            }
        }
        if (id && token && test){
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
            //const res = await fetchData('/test/editTest/${id}', 'PUT?', updatedTest, token);
            //if(res) {
            //    navigate('/dashboard')
            //}
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const deleteCategory = async () =>{
        try {
            const res = await fetchData(`/test/deleteTest/${id}`, 'PUT', null, token);

            if(res){
                handleCloseModal();
                navigate('/dashboard');
            }
        } catch (error) {
            console.log("Error al eliminar test", error);
            
        }
    }

    //Funciones para abrir y cerrar modal
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    
  return (
    <div className='edit-test-container'>
     <main className='container'>   
      <header className='header-content'>  
        <div>
        <h2>Edición de test</h2>
        </div>
      </header>  

            {/* categoria modificable */}
            <section className='form-card'>
                <h3 className='title-form'>Categoría</h3>
                 {/*Select edicion categoria  */}
                <EditTestCategory
                    categories={test}
                    testName={testName}
                    handleTitleChange={handleTitleChange}
                />
                
                
            </section>
            {/* Preguntas */}
            <section>
                <h2 className='title-form'>Preguntas</h2>
                {/* aca map de preguntas */}
                < EditTestQuestion
                    questions={questions}
                    handleQuestionChange={handleQuestionChange}
                    addQuestion={addQuestion}
                />
            </section>
        <footer>
            <MyButton
                text="Volver"
                onSubmit={()=> navigate('/dashboard')} 
            />
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header>
                    <Modal.Title>Confirmacion eliminar Test</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro que deseas eliminar el test <strong>{testName}</strong>?</Modal.Body>
                <Modal.Footer>
                    <MyButton
                        text="Cancelar"
                        onSubmit={handleCloseModal}
                    />
                    <MyButton
                        text="Si, eliminar test"
                        onSubmit={deleteCategory}
                    />

                </Modal.Footer>
            </Modal>
            <MyButton
                text="Guardar"
                onSubmit={saveChanges}
            />
            <MyButton
                text="Eliminar test"
                onSubmit={handleShowModal}
            />
        </footer>
     </main>
    </div>
  )
}

export default EditTest