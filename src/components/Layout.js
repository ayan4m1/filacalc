import { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Header from 'components/Header';

export default function Layout() {
  return (
    <Fragment>
      <Helmet titleTemplate="Filacalc - %s" />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </Fragment>
  );
}
