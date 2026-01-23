import {useNavigate} from 'react-router';
import { MyButton } from '../MyButton/MyButton';
import './cardTestAdmin.css';
import { fetchData } from '../../../helpers/axiosHelper';

const urlImage = import.meta.env.VITE_IMAGES;

const CardTestAdmin = ({test}) => {

  const navigate = useNavigate();

  const disableTest = async () => {

    try {

      // Falta meter el token a esta petición:
      let result = await fetchData(`/test/disableTest/${test.test_id}`, 'PUT', null);
      console.log(result);
      
    } catch (error) {
      console.log(error);
    }

    
  }

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
          onSubmit={() => navigate(`/oneTest/${test.test_id}`)}
          />
        <MyButton
          text = 'Editar'
          btnClass='btn-green'
          onSubmit={() => navigate('/createTest')}
        />
        <MyButton
          text = 'Deshabilitar'
          btnClass='btn-white'
          onSubmit={disableTest}
        />
      </div>
    </div>
  )
}

export default CardTestAdmin;
