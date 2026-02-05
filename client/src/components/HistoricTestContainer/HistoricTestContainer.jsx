import { useContext, useEffect , useState } from 'react';
import {useNavigate} from 'react-router';
import { fetchData } from '../../../helpers/axiosHelper';
import { MyButton } from '../MyButton/MyButton';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import './historyTest.css';

export const HistoricTestContainer = ({ id }) => {

  const {token} = useContext(AuthContext);
  const [history, setHistory] = useState();

  const navigate = useNavigate();

  useEffect(() => {

    const fetchOneTestHistory = async () => {

      try {

        let result = await fetchData(`/statistics/oneTestHistory/${id}`, 'GET', null, token);
        
        setHistory(result.data.result);

      } catch (error) {
        console.log(error);
      }

    }

    fetchOneTestHistory();

  }, []);

  console.log(history);

  return (
    <div className='historyTestList'>
      {history?.map((test, i) => {
        return (
          <div className='historyTestCard' key={i}>
            <p className='fw-bold'>{test.test_date ? test.test_date.split('-').reverse().join('-') : 'No hay tests'}</p>
            <p>-</p>

            <p>PUNTUACIÓN: <span className='fw-bold'>{test.completed && `${test.result} / ${test.max_score}`}</span></p>
            <p className='fw-bold'>{test.completed ? `${parseInt(test.result_total)} %`  : 'NC'} </p>
            {!test.test_date ? null : test.completed ? <MyButton
              btnClass='btn-green'
              text='Detalles'

                onSubmit={() => navigate(`/infoOneTest/${test.test_id}/${test.answer_set_id}?navigate=1`)}
            />
            :
            <MyButton
              btnClass='btn-blue'
              text='Continuar'
              onSubmit={() => navigate(`/CompanyTestSaved/${id}/${test.answer_set_id}`)}
            />
            }
          </div>
        )
      })}
    </div>
  )
}
