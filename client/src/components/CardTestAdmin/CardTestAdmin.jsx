import { useState } from 'react';
import {useNavigate} from 'react-router';
import { MyButton } from '../MyButton/MyButton';
import { fetchData } from '../../../helpers/axiosHelper';
import './cardTestAdmin.css';

const urlImage = import.meta.env.VITE_IMAGES;

const CardTestAdmin = ({test}) => {

  const [isPublic, setIsPublic] = useState(test.is_public);
  const navigate = useNavigate();

    //para separar el nº de ODS en una línea y el nombre del test en otra
  const ODS = test.test_name.slice(0,6);
  const testname = test.test_name.slice(8);

  const disableTest = async () => {

    try {
      // Falta meter el token a esta petición:
      let result = await fetchData(`/test/disableTest/${test.test_id}`, 'PUT', null);
      setIsPublic(0);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  const enableTest = async () => {

    try {
      // Falta añadir el token;
      let result = await fetchData(`/test/enableTest/${test.test_id}`, 'PUT', null);
      setIsPublic(1);
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
<<<<<<< HEAD
          <h3>{test.test_name.split('·')[0]}</h3>
          <h3>{test.test_name.split('·')[1]}</h3>
=======
         <h3>{ODS}</h3>
          <h3>{testname}</h3>
>>>>>>> 85a39b9a9843f544f10056033096c2b66b56cab8
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
        {
        isPublic === 1 ?
        <MyButton
          text = 'Deshabilitar'
          btnClass='btn-red'
          onSubmit={disableTest}
        />
          :
        <MyButton
          text = 'Habilitar'
          btnClass='btn-blue'
          onSubmit={enableTest}
        />
        }
      </div>
    </div>
  )
}

export default CardTestAdmin;
