import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { MyButton } from '../MyButton/MyButton';
import { fetchData } from '../../../helpers/axiosHelper';
import './cardTestAdmin.css';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const urlImage = import.meta.env.VITE_IMAGES;

const CardTestAdmin = ({ test }) => {

  const {token} = useContext(AuthContext);
  const [isPublic, setIsPublic] = useState(test.is_public);
  const navigate = useNavigate();

    //para separar el nº de ODS en una línea y el nombre del test en otra


  const disableTest = async () => {

    try {
      // Falta meter el token a esta petición:
      let result = await fetchData(`/test/disableTest/${test.test_id}`, 'PUT', null, token);
      setIsPublic(0);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const enableTest = async () => {

    try {
      // Falta añadir el token;
      let result = await fetchData(`/test/enableTest/${test.test_id}`, 'PUT', null, token);
      setIsPublic(1);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='card-test px-4'>
      <div className='image-title pt-2 px-2'>
        <img src={`${urlImage}/ODSimages/${test.test_image}`} alt="" />
        <div className='odsTitle'>
          <h3>{test.test_name.split('·')[0]}</h3>
          <h3>{test.test_name.split('·')[1]}</h3>
        </div>
      </div>
      <div className='buttonsAdminTest'>
        <MyButton
          text='Ver info'
          btnClass='btn-green py-2 px-2'
          onSubmit={() => navigate(`/oneTest/${test.test_id}`)}
        />
        <MyButton
          text='Editar'
          btnClass='btn-green py-2 px-2'
          onSubmit={() => navigate('/createTest')}
        />
        {
          isPublic === 1 ?
            <MyButton
              text='Deshabilitar'
              btnClass='btn-red py-2 px-2'
              onSubmit={disableTest}
            />
            :
            <MyButton
              text='Habilitar'
              btnClass='btn-blue py-2 px-2'
              onSubmit={enableTest}
            />
        }
      </div>
    </div>
  )
}

export default CardTestAdmin;
