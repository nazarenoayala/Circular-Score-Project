import {useNavigate} from 'react-router';
import { MyButton } from '../MyButton/MyButton';
import './cardTest.css';

const urlImage = import.meta.env.VITE_IMAGES;

const CardTest = ({test}) => {

  const navigate = useNavigate()

  return (
    <div className='card-test'>
      <div className='image-title'>
        <img src={`${urlImage}/ODSimages/${test.test_image}`}alt="" />
        <div className='odsTitle'>
          <h3>{test.test_name}</h3>
          <h3>{test.test_name}</h3>
        </div>
      </div>
      <div className='resultsBar'>
        <h3>0 %</h3>
        <div className='progressBar'></div>
      </div>
      <div className='btnTest'>
        <MyButton
          text = 'comenzar test'
          onSubmit = {() => navigate(`/oneTestCompany/${test.test_id}`)}
          btnClass = 'btn-green'
        />
      </div>
    </div>
  )
}

export default CardTest