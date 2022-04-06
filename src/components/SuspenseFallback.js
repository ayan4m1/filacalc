import { Container, Row, Col, Spinner } from 'react-bootstrap';

import Layout from 'components/Layout';

export default function SuspenseFallback() {
  return (
    <Layout>
      <Container>
        <Row>
          <Col className="text-center">
            <h4>Loading...</h4>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Spinner animation="border" className="my-3" />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
