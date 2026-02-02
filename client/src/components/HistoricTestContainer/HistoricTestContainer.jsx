import React, { useContext, useEffect , useState } from 'react';
import {useNavigate} from 'react-router';
import { fetchData } from '../../../helpers/axiosHelper';
import { MyButton } from '../MyButton/MyButton';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import './historyTest.css';

export const HistoricTestContainer = ({id}) => {

  const {token} = useContext(AuthContext);
  const [history, setHistory] = useState();
  
  const navigate = useNavigate();

  useEffect(() => {

    const fetchOneTestHistory = async () => {

      try {

        let result = await fetchData(`/statistics/oneTestHistory/${id}`, 'GET', null, token);
        console.log(result);
        setHistory(result.data.result);
        
      } catch (error) {
        console.log(error);
      }

    }

    fetchOneTestHistory();

  },[]);

  return (
    <div className='historyTestList'>
      {history?.map((test, i) => {
        return (
          <div className='historyTestCard' key={i}>
            <p>{test.test_date ? test.test_date : 'No hay tests' }</p>
            <p>-</p>
            <p>PUNTUACIÓN: {test.completed && test.result}</p>
            <p>{test.completed ? parseInt(test.result_total) : 'NC'} </p>
            {test.completed ? <MyButton
              btnClass='btn-green'
              text='Detalles'
              onSubmit={() => navigate('/userTestRecord')}
            />
            :
            <MyButton
              btnClass='btn-green'
              text='Continuar'
              onSubmit={() => navigate(`/newTest/${id}`)}
            />
            }
          </div>
        )
      })}
    </div>
  )
}
