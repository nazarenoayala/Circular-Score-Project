import { useContext } from "react";
import { Container, Row } from "react-bootstrap";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { useParams } from "react-router";
import GraphicsViewer from "../../../components/GraphicsViewer/GraphicsViewer";


const GeneralGraphicPage = () => {

  const {id} = useParams();
  const {test} = useContext(AuthContext);

  const oneTest = test.filter((e) => e.test_id == id);

  return (
    <Container>
      <Row>
        <GraphicsViewer id={id} oneTest={oneTest}/>
      </Row>
      <Row>
        {/* Aquí el resumen de las preguntas y la puntuación final */}
      </Row>
    </Container>
  )
}

export default GeneralGraphicPage;