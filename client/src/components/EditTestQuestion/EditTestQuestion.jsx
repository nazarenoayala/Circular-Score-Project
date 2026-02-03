import React, { useState } from 'react'
import { Card, CardBody, Form } from 'react-bootstrap'
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
    <Card>
        <CardBody>
            <Form>
            {/* Seccion edicion preguntas (añadir y modificar) */}
            <Form.Group>
                <Form.Label>Preguntas del test</Form.Label>
                {/* map de preguntas */}
                {questions?.map((preg, idx) =>(
                    <div key={idx}>
                        <Form.Control type="text" 
                               value={preg.text || ""}
                               onChange={(e) => handleQuestionChange(idx, e.target.value)} 
                        />
                    </div>
                ))}                

            <hr />

            {/* Sección para añadir nueva pregunta */}
            <div>
                <Form.Label>Nueva pregunta</Form.Label>
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

            </Form.Group>
            </Form>
            </CardBody>
    </Card>
  )
}
