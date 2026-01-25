import React, { useEffect , useState } from 'react';
import { fetchData } from '../../../helpers/axiosHelper';
import './historyTest.css';
import { MyButton } from '../MyButton/MyButton';

export const HistoricTestContainer = ({id}) => {

  const [history, setHistory] = useState();
  console.log(history)

  useEffect(() => {

    // Todo: hay que traerse el completed de la base de datos
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

  },[]);

  return (
    <div className='historyTestList'>
      {history?.map((test, id) => {
        return (
          <div className='historyTestCard' key={id}>
            <p>{test.test_date ? test.test_date : 'No hay tests' }</p>
            <p>-</p>
            <p>PUNTUACIÓN: {test.result}</p>
            <p>{parseInt(test.result_total)} %</p>
            <MyButton
              btnClass='btn-green'
              text='detalles'
            />
          </div>
        )
      })}
    </div>
  )
}
