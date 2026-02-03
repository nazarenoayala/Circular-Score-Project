import values from '../../data/CompanyRegisterData/options.js';
import './QuestionAnswerCard.css';


export const QuestionAnswerCard = ({ question, answer}) => {


  return (
    <div >
        <div className='py-3'>
          <div className='d-flex gap-2'>
            <p className="mb-0 fs-5">
              <strong>
                {question.question_id}.{question.text}
              </strong>
            </p>

            {answer[question.question_id] >= 1
            && answer[question.question_id] <= 5
            && answer[question.question_id] !== '' ? (
            
              <span>✅</span>
            ) : (
              <span>❌</span>
            )}
          </div>

          <div>
            {values?.map((option, id) => {
              if (answer[question.question_id] == option.value) {
                return (
                  <div className='d-flex gap-2' key={id}>
                    <input
                      type="radio"
                      readOnly
                      checked={answer[question.question_id] == option.value}
                    />
                    <p className="mb-0 text-muted ">{option.name}</p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
    </div>
  );
};
