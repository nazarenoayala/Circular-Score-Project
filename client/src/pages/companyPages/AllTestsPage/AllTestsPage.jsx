import './AllTests.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import CardTest from '../../../components/CardTest/CardTest';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchData } from '../../../../helpers/axiosHelper';

const AllTestsPage = () => {

  // Nos traemos del AuthContext los datos de los test
  const {test, token} = useContext(AuthContext);
  // Añadimos los tests a un Estado
  const [allTest, setAllTest] = useState(test);
  // Flag para que se cargue el hijo cuando se haya ejecutado el useEffect y así se le pasa la última actualización del Estado
  const [ready, setReady] = useState(false);

  useEffect(() => {
    
    const fetchResults = async () => {

      try {

        let result = await fetchData('/statistics/allRecentResults', 'GET', null, token);
        console.log(result);

        const updateAllTest = allTest?.map((test, index) => ({
          ...test,
          testRes: result.data.result[index]?.resultTotal
        }));

        setAllTest(updateAllTest);
        setReady(true);


      } catch (error) {
        console.log(error);
      }

    }

    fetchResults()

  }, [])

  return (
    <Container className='userTests'>
      {ready && <div>
        {allTest.map((elem) => {
          return (
            <div key={elem.test_id} className='cardTest'>
              <CardTest
                test={elem}
              />
            </div>
          )
        })}
      </div>}
    </Container>
  )
}

export default AllTestsPage;
