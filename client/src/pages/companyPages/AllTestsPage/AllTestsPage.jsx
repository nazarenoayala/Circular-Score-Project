import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import CardTest from '../../../components/CardTest/CardTest';
import { Container , Row , Col } from 'react-bootstrap';

const AllTestsPage = () => {

  const {test} = useContext(AuthContext);

  return (
    <Container>
      <Row>
            {test.map((elem) => {
              return (
                <Col key={elem.test_id} className='col-6 mb-3'>
                    <CardTest
                      test = {elem}
                    />
                </Col>
              )
            })}
      </Row>
    </Container>
  )
}

export default AllTestsPage;