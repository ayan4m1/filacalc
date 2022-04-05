import { Card } from 'react-bootstrap';

import { Helmet } from 'react-helmet';
import { Fragment } from 'react';

export default function Home() {
  return (
    <Fragment>
      <Helmet title="Home" />
      <Card body bg="light">
        <Card.Title>Welcome to Filacalc</Card.Title>
        <Card.Text>We provide utilities to help with 3D printing.</Card.Text>
        <Card.Text>
          If these utilities help you, consider a{' '}
          <a href="https://paypal.me/ayan4m1">donation</a> to the author.
        </Card.Text>
      </Card>
    </Fragment>
  );
}
