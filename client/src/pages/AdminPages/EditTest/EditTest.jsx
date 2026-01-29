import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../../../context/AuthContext/AuthContext';

const EditTest = () => {
    //rescato id del test
    const {id} = useParams(); 
    const {token} = useContext(AuthContext);

    //array de preguntas
    const [questions, setQuestions] = useState([]);

    useEffect(()=>{
        const getQuestions = async () =>{
            try {
                //peticion al endpoint de preguntas
                const res = await fetchData(`/question/getQuestions/${id}`, 'GET', null, token);
                
                if(res.data){
                    setQuestions(res.data);
                    console.log(res.data);
                    
                }
            } catch (error) {
                console.log(error);
                
            }
        }
    }, [])
  return (
    <div className='edit-test-page'>
        <h1>Editar Test: {id}</h1>
    </div>
  )
}

export default EditTest