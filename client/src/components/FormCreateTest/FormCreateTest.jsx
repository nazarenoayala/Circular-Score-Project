import React from 'react';
import './formCreateTest.css';
import { MyButton } from '../MyButton/MyButton';


export const FormCreateTest = ({newTest, handleChange, handleChange2, question, questions,addQuestion, valErrors, onSubmit}) => {
  return (
    <>
      <main className="create-main">
        <section className="create-section">
          <form className="form-card">
            <label htmlFor="">Título</label>
            <input 
                type="text" 
                placeholder="Título"
                name='test_name'
                value={newTest?.test_name}
                onChange={handleChange} />

                 {valErrors?.test_name && (
                    <p className='red'>{valErrors.test_name}</p>
                  )}

            <label>Categoría*</label>
              <input 
                /* className="question-input" */ 
                placeholder='Categoría'
                type="text"
                name='category'
                value={newTest?.category}
                onChange={handleChange} />

                 {valErrors?.category && (
                    <p className='red'>{valErrors.category}</p>
                  )}

            <label htmlFor='imagen'>
                <MyButton
                    text='Subir Imagen'/>
            </label>
              <input 
                className="question-input" 
                type="file"
                id='imagen'
                name='test_image'
                accept='image/*'
                hidden
                onChange={handleChange} />

              <div className='question-row'>
              <div>
                <label htmlFor="">Inserte su nueva pregunta</label>
                  <input
                    className="question-input"
                    placeholder="Inserte su nueva pregunta"
                    type="text"
                    name="question_text"
                    value={question?.question_text}
                    onChange={handleChange2}
                  />

                   {valErrors?.question_text && (
                    <p className='red'>{valErrors.question_text}</p>
                  )}

              </div>
                <div className='premium-wrapper'>
                  <label htmlFor="" >Premiun</label>
                  <input
                    className="premium-checkbox"
                    type="checkbox"
                    checked={question?.premium}
                    name="premium"
                    onChange={handleChange2}
                          />   
                </div>
              </div>
              <div className='mb-4'>
                <MyButton
                text="Añadir pregunta"
                onSubmit={addQuestion}/>
              </div>
              <h3>Preguntas del nuevo Test</h3>
              <div>
                <div className='question-test'>
                  {questions.map((elem, idx)=>{
                    return(
                      <div key={idx} className='question-div'>
                          <p>{elem.question_text}</p>
                        <div className='premium-basic'>
                          {elem.premium === true &&<p className='premium'>Premium</p>}
                          {elem.premium === false &&<p className='basic'>Básica</p>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              <div className='btnOnsubmit '>
                <MyButton 
                  text="Enviar"
                  btnClass='btn-green'
                  onSubmit={onSubmit} />
                <MyButton 
                  text="Cancelar"
                  btnClass='btn-red'/>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};
