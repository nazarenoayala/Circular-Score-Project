import React from 'react'
import values from '../../data/CompanyRegisterData/options.js';
import './questionCard.css';

export const QuestionCard = ({question, answer, setAnswer}) => {

  const handleChange = (questionId, value) => {
    setAnswer(prevState => ({
      ...prevState,
      [questionId]: value 
    }))
  }

  console.log(answer);

  return (
    <div className='questionContainer'>
      <h2>{question.question_id}. {question.text}</h2>

      <div className='groupCheck'>
        {values?.map((option, id) => {
          return (
          <div key={id} className='groupCheckIndividual'>
            <input 
              type="radio"
              name={`${question.question_id}`}
              value={option.value}
              checked={answer[question.question_id] === option.value}
              onChange={() => handleChange(question.question_id, option.value)}
            />
            <p>{option.name}</p>
        </div>
          )
        })}
        
      </div>
      
    </div>
  )
}
