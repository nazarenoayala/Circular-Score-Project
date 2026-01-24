
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { MyButton } from '../../../components/MyButton/MyButton';
import './oneTest.css';

const urlImage = import.meta.env.VITE_IMAGES;

const OneTestCompany = () => {

  // Nos traemos el array de los test
  const { test } = useContext(AuthContext);
  // Usamos el useParams para rescatar el id del parámetro dinámico para no tener que volver a hacer la llamada a la base de datos
  const { id } = useParams();
  const navigate = useNavigate()
  const oneTest = test.filter((e) => e.test_id == id);

  return (
    <div className='oneTest'>
      <div className='newTest'>
        <h2>{oneTest[0].test_name}</h2>
        <img src={`${urlImage}/ODSimages/${oneTest[0].test_image}`} alt="" />
        <div className='btnOneTest'>
          <MyButton
            text='Comenzar test'
            btnClass='btn-green'
          />
          <MyButton
            text='Volver atrás'
            btnClass='btn-blue'
            onSubmit={() => navigate('/allTests')}
          />
        </div>
      </div>
      <h3>Test realizados</h3>
      <div className='historicTest'>

      </div>
    </div>
  )
}

export default OneTestCompany;