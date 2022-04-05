import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header';

export default function Layout() {
  return (
    <Fragment>
      <Helmet titleTemplate="Filacalc :: %s" />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </Fragment>
  );
}
