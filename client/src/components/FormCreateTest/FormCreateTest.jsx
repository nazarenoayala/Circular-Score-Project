import React from 'react';
import './formCreateTest.css';
import { MyButton } from '../MyButton/MyButton';
import { test } from '../../data/OdsTests/OdsTest';

export const FormCreateTest = ({newTest, handleChange}) => {
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
                value={newTest.test_name}
                onChange={handleChange} />
            <label>Categoría*</label>
            <select 
              value={newTest.category}
              name='category'
              onChange={handleChange}>
              <option value='' disabled>Elija Categoría</option>
              {test.map((elem)=>{
                return(
                  <option key={elem.id}>{elem.name}</option>
                )
              })}
            </select>
            <div className="question-header">
              <label>Preguntas*</label>
              <label className="premium-header">Premium</label>
            </div>
            <div className="question-row">
              <span className="question-number">1.</span>
              <input 
                className="question-input" 
                type="text"
                name='prompt'
                value={newTest.prompt}
                onChange={handleChange} />
              <input 
                  className="premium-checkbox" 
                  type="checkbox"
                  checked={newTest.is_public}
                  name='is_public'
                  onChange={handleChange} />
            </div>
            <div>
              <MyButton 
              text="Añadir pregunta" />
              <div className='btnOnsubmit '>
                <MyButton 
                  text="Enviar"
                  btnClass='btn-green' />
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
