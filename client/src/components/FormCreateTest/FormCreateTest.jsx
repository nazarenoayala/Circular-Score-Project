import { useNavigate } from 'react-router';
import './formCreateTest.css';
import { MyButton } from '../MyButton/MyButton';
import uploadImage from '../../assets/Images/Logo/upload.svg'
export const FormCreateTest = ({
  newTest,
  handleChange,
  handleChange2,
  question,
  questions,
  setQuestions,
  addQuestion,
  valErrors,
  onSubmit,
  message,
}) => {
  const navigate = useNavigate();

  //funcion para poder eliminar una pregunta del array.

  const deleteQuestion = (idx) => {
    const newArray = questions.filter((e, i) => i !== idx);
    setQuestions(newArray);
  };

  return (
    <>
      <main className="create-main">
        <section className="create-section">
          <form className="form-card">
            <div className="question-row">
              <div>
                <label htmlFor="">Título del Test</label>
                <input
                  type="text"
                  placeholder="Título del Test"
                  name="test_name"
                  value={newTest?.test_name}
                  onChange={handleChange}
                />
              </div>

              <div className="premium-wrapper">
                <label htmlFor="">Test Premiun</label>
                <input
                  className="premium-checkbox"
                  type="checkbox"
                  checked={newTest.is_public}
                  name="is_public"
                  onChange={handleChange}
                />
              </div>
            </div>

            {valErrors?.test_name && (
              <p className="red">{valErrors.test_name}</p>
            )}

            <label htmlFor="image">
              <img
                src={uploadImage}
                alt=""
                className='icon'
              />
              Subir Imagen del Test
            </label>
            <input
              className="question-input"
              type="file"
              id="image"
              name="test_image"
              accept="image/*"
              hidden
              onChange={handleChange}
            />

            <div className="question-row">
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
              </div>

              <div className="premium-wrapper">
                <label htmlFor="">Pregunta Premiun</label>
                <input
                  className="premium-checkbox"
                  type="checkbox"
                  checked={question?.premium === 1}
                  name="premium"
                  onChange={handleChange2}
                />
              </div>
            </div>

            {valErrors?.question_text && (
              <p className="red">{valErrors.question_text}</p>
            )}

            <div className="mb-4">
              <MyButton text="Añadir pregunta" onSubmit={addQuestion} />
            </div>

            <h3>Preguntas del nuevo Test</h3>
            <div>
              <div className="question-test">
                {questions.map((elem, idx) => {
                  return (
                    <div key={idx} className="question-div">
                      <p>
                        {idx + 1}. {elem.question_text}
                      </p>
                      <div className="d-flex gap-3">
                        <div className="mt-4">
                          <MyButton
                            onSubmit={() => deleteQuestion(idx)}
                            btnClass="btn-red"
                            text="Eliminar"
                          />
                        </div>
                      {elem.premium === 1 && <div className="premium-basic">
                            <p className="premium">⭐</p>
                        </div>}
                      </div>
                    </div>
                  );
                })}
              </div>
                <p className='red'>{message}</p>
              <div className="btnOnsubmit ">
                <MyButton
                  text="Enviar"
                  btnClass="btn-green"
                  onSubmit={onSubmit}
                />
                <MyButton
                  text="Cancelar"
                  btnClass="btn-red"
                  onSubmit={() => navigate('/dashboard')}
                />
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};
