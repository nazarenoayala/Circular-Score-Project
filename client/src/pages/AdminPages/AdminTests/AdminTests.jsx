import './AdminTests.css';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { Container } from 'react-bootstrap';
import CardTestAdmin from '../../../components/CardTestAdmin/CardTestAdmin';

const AdminTests = () => {
  const { test } = useContext(AuthContext);

  console.log(test);

  return (
    <Container
      className='AdmintestsContainer'>
      <div>
        {test.map((e) => {
          return (
            <div
              className='cardTest'
              key={e.test_id}>
              <CardTestAdmin
                test={e}
              />
            </div>
          )
        })}
      </div>
    </Container>
  )
}

export default AdminTests;
