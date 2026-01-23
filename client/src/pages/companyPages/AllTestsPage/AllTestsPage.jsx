import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import CardTest from '../../../components/CardTest/CardTest';
import { Container , Row , Col } from 'react-bootstrap';

const AllTestsPage = () => {

  const {test} = useContext(AuthContext);

  console.log(test);

  return (
    <Container>
      <Row>
            {test.map((elem) => {
              return (
                <Col className='col-6 mb-3'>
                  <div key={elem.test_id}>
                    <CardTest
                      test = {elem}
                    />
                  </div>
                </Col>
              )
            })}
      </Row>
    </Container>
  )
}

export default AllTestsPage;