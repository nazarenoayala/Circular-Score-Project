import {useNavigate} from 'react-router';
import { MyButton } from '../MyButton/MyButton';
import './cardTest.css';

const urlImage = import.meta.env.VITE_IMAGES;

const CardTest = ({test}) => {

  const navigate = useNavigate();

  // El valor nos llega con decimales, así que lo pasamos a entero
  const {testRes} = test;
  const lastResult = parseInt(testRes);

    //para separar el nº de ODS en una línea y el nombre del test en otra
  const ODS = test.test_name.slice(0,6);
  const testname = test.test_name.slice(8);


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
          <h3>{ODS}</h3>
          <h3>{testname}</h3>
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
