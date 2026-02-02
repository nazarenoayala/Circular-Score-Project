import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { MyButton } from '../../../components/MyButton/MyButton';
import { HistoricTestContainer } from '../../../components/HistoricTestContainer/HistoricTestContainer';
import { fetchData } from '../../../../helpers/axiosHelper';
import './oneTest.css';

const urlImage = import.meta.env.VITE_IMAGES;

const OneTestCompany = () => {

  // Nos traemos el array de los test
  const { test , token } = useContext(AuthContext);
  // Usamos el useParams para rescatar el id del parámetro dinámico para no tener que volver a hacer la llamada a la base de datos
  const { id } = useParams();
  const navigate = useNavigate();
  const oneTest = test.filter((e) => e.test_id == id); 

  const createNewAnswerSet = async () => {

    try {

      let result = await fetchData(`/answerSet/newAnswerSet/${id}`, 'POST', null, token);
      console.log(result);

      navigate(`/newTest/${id}`);
      
    } catch (error) {
      console.log(error);
    }

  }
  
  return (
    <div className='oneTest text-'>
      <div className='newTest'>
        <h2>{oneTest[0].test_name}</h2>
        <img src={`${urlImage}/ODSimages/${oneTest[0].test_image}`} alt="" />
        <div className='btnOneTest'>
          <MyButton
            text='Nuevo test'
            btnClass='btn-green'
            onSubmit={createNewAnswerSet}
          />
          <MyButton
            text='Volver atrás'
            btnClass='btn-blue'
            onSubmit={() => navigate('/allTests')}
          />
        </div>
      </div>
      <h3 className='p-3'>Tests realizados</h3>
      <div className='historicTestContainer'>
        
        <HistoricTestContainer id = {id}/>
      </div>
    </div>
  )
}

export default OneTestCompany;