import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { MyButton } from '../MyButton/MyButton'

export const EditTestQuestion = ({questions, handleQuestionChange, addQuestion}) => {
    
    
    // Estado para la nueva pregunta
    const [newQuestion, setNewQuestion] = useState("");
    // Funcion para evitar preguntas vacias, y limpiar input
    const protectClean = () =>{
        if (newQuestion.trim() !== ""){
            addQuestion(newQuestion); //paso el texto al padre
            setNewQuestion(""); //limpio el input
        }
    }

  return (
            <Form>
            {/* Seccion edicion preguntas (añadir y modificar) */}
            <div className='section-edit'>
            <Form.Group>
                <Form.Label>Preguntas del test</Form.Label>
                {/* map de preguntas */}
                <div className='mb-4'>
                {questions?.map((preg, idx) =>(
                    <div key={idx} className='question-divider'>
                        <Form.Control type="text" 
                               value={preg.question_text || ""}
                               onChange={(e) => handleQuestionChange(idx, e.target.value)} 
                        />
                    </div>
                ))}                
                </div>
            <hr />

            {/* Sección para añadir nueva pregunta */}
            <div>
                <Form.Label>Nueva pregunta</Form.Label>
                <div className='new-questions'>
                    <Form.Control
                        type='text'
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />

                    
                <MyButton
                    onSubmit={protectClean}
                    text="Añadir pregunta"
                />
                </div>
               </div>
             </Form.Group>
             </div>
            </Form>
  )
}
