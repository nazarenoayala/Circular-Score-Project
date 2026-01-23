// import {useNavigate} from 'react-router';
import { MyButton } from '../MyButton/MyButton';
import './cardTestAdmin.css';

const urlImage = import.meta.env.VITE_IMAGES;

const CardTestAdmin = ({test}) => {

  // const navigate = useNavigate()

  return (
    <div className='card-test'>
      <div className='image-title'>
        <img src={`${urlImage}/ODSimages/${test.test_image}`}alt="" />
        <div className='odsTitle'>
          <h3>{test.test_name}</h3>
          <h3>{test.test_name}</h3>
        </div>
      </div>
      <div className='buttonsAdminTest'>
        <MyButton
          text = 'Ver info'
          btnClass='btn-green'
          />
        <MyButton
          text = 'Editar'
          btnClass='btn-green'
        />
      </div>
    </div>
  )
}

export default CardTestAdmin;
