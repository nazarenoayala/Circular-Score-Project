import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import CardTest from '../../../components/CardTest/CardTest';
import { Container , Row , Col } from 'react-bootstrap';
import { fetchData } from '../../../../helpers/axiosHelper';

const AllTestsPage = () => {

  // Nos traemos del AuthContext los datos de los test
  const {test} = useContext(AuthContext);
  // Añadimos los tests a un Estado
  const [allTest, setAllTest] = useState(test);
  // Flag para que se cargue el hijo cuando se haya ejecutado el useEffect y así se le pasa la última actualización del Estado
  const [ready, setReady] = useState(false);

  useEffect(() => {

    const fetchResults = async () => {

      try {

        // todo: AÑADIR EL TOKEN A LA PETICIÓN SINO NO PODEMOS RESCATAR EL USER_ID
        let result = await fetchData('/statistics/allRecentResults', 'GET', null, null);
        console.log(result);

        const updateAllTest = allTest.map((test, index) => ({
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

  },[])

  return (
    <Container className='p-5'>
      {ready && <Row>
            {allTest.map((elem) => {
              return (
                <Col key={elem.test_id} className='col-6 mb-3'>
                    <CardTest
                      test = {elem}
                    />
                </Col>
              )
            })}
      </Row>}
    </Container>
  )
}

export default AllTestsPage;
