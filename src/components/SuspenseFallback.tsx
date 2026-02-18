import { Fragment } from 'react';
import { Row, Col, Spinner, Container } from 'react-bootstrap';

import Header from './Header';

export default function SuspenseFallback() {
  return (
    <Fragment>
      <Header />
      <Container>
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
      </Container>
    </Fragment>
  );
}
