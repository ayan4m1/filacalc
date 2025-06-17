import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from 'components/Header';

export default function Layout() {
  return (
    <Fragment>
      <Header />
      <Container>
        <Outlet />
      </Container>
    </Fragment>
  );
}
