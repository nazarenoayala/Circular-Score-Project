import {useContext} from 'react'
import { AuthContext } from '../../../context/AuthContext/AuthContext'
import {Container, Row, Col} from 'react-bootstrap';
import CardTestAdmin from '../../../components/CardTestAdmin/CardTestAdmin';

const AdminTests = () => {

  const {test} = useContext(AuthContext);

  console.log(test);

  return (
    
    <Container className='p-5'>
      <Row>
        {test.map((e) => {
          return (
            <Col className='col-lg-6 mb-3' key={e.test_id}>
                <CardTestAdmin
                  test = {e}
                />
            </Col>
          )
        })}
      </Row>
    </Container>
    
  )
}

export default AdminTests
