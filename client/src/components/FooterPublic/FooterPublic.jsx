
import './FooterPublic.css';
import { Row, Col } from 'react-bootstrap';

export const FooterPublic = () => {
  return (
    <div className='footer-public'>
      <Row>
        <Col>
          <img src="/src/assets/logoblanco.png" />
        </Col>
        <Col className="child2">
          <Row>
            <Col>
              <p>Privacidad</p>
              <p>Cookies</p>
              <p>Aviso legal</p>
            </Col>

            <Col className="logos">
              <i className="fa-brands fa-youtube"></i>
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-instagram"></i>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
