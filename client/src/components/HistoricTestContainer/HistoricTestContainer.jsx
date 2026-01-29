import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchData } from '../../../helpers/axiosHelper';
import { MyButton } from '../MyButton/MyButton';
import './historyTest.css';

export const HistoricTestContainer = ({ id }) => {

  const [history, setHistory] = useState();

  const navigate = useNavigate();

  useEffect(() => {

    const fetchOneTestHistory = async () => {

      try {

        // todo: a futuro hay que meter token a esta petición para rescatar el id de company/usuario
        let result = await fetchData(`/statistics/oneTestHistory/${id}`, 'GET', null, null);
        console.log(result);
        setHistory(result.data.result);

      } catch (error) {
        console.log(error);
      }

    }

    fetchOneTestHistory();

  }, []);

  return (
    <div className='historyTestList'>
      {history?.map((test, id) => {
        return (
          <div className='historyTestCard' key={id}>
            {/* para darle la vuelta a la fecha */}
            <p>{test.test_date ? test.test_date.split('-').reverse().join('-') : 'No hay tests'}</p>
            <p>-</p>
            <p>PUNTUACIÓN: {test.completed && test.result}</p>
            {test.completed ?
              <p className='NC'>{parseInt(test.result_total) + '%'}</p>
              :
              <p className='text-danger NC'>No completado</p>}
            {test.completed ?
              <MyButton
                btnClass='btn-blue NCbutton'
                text='Detalles'
                onSubmit={() => navigate('/userTestRecord')}
              />
              :
              <MyButton
                btnClass='btn-green NCbutton'
                text='Continuar'
              />
            }
          </div>
        )
      })}
    </div>
  )
}
