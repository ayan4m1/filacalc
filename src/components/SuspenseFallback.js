import { Row, Col, Spinner } from 'react-bootstrap';

import Layout from 'components/Layout';

export default function SuspenseFallback() {
  return (
    <Layout>
      <Row>
        <Col className="text-center">
          <h1>Loading...</h1>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Spinner animation="border" className="my-3" />
        </Col>
      </Row>
    </Layout>
  );
}
