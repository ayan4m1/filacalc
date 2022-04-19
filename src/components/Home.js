import { Card } from 'react-bootstrap';

import { Helmet } from 'react-helmet';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <Helmet title="Home" />
      <Card bg="light" body>
        <Card.Title>Welcome to Filacalc</Card.Title>
        <Card.Text>We provide utilities to help with 3D printing.</Card.Text>
      </Card>
    </Fragment>
  );
}
