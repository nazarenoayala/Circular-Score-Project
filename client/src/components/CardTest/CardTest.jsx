import {useNavigate} from 'react-router';
import { MyButton } from '../MyButton/MyButton';
import './cardTest.css';

const urlImage = import.meta.env.VITE_IMAGES;

const CardTest = ({test}) => {
console.log(test);

  const navigate = useNavigate();

  // El valor nos llega con decimales, así que lo pasamos a entero
  const {testRes} = test;
  const lastResult = parseInt(testRes);



  let classProgress;

  if (lastResult >= 80) {
    classProgress = 'highResult'
  }
  else if (lastResult >= 50) {
    classProgress = 'medResult'
  }
  else if (lastResult > 0) {
    classProgress = 'lowResult'
  }

  return (
    <div className='card-test'>
      <div className='image-title'>
        <img src={`${urlImage}/ODSimages/${test.test_image}`}alt="" />
        <div className='odsTitle'>
          <h3>{test.test_name.split('·')[0]}</h3>
          <h3>{test.test_name.split('·')[1]}</h3>
        </div>
      </div>
      <div className='resultsBar'>
        <h3>{lastResult} %</h3>
        <div className='progressBar'>
          <div 
            className={classProgress}
            style={{ width: `${lastResult}%` }}
          >
          </div>
        </div>
      </div>
      <div className='btnTest'>
        <MyButton
          text = 'Ir a test'
          onSubmit = {() => navigate(`/oneTestCompany/${test.test_id}`)}
          btnClass = 'btn-green'
        />
      </div>
    </div>
  )
}

export default CardTest
