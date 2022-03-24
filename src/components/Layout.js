import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Header from 'components/Header';
import { Container } from 'react-bootstrap';

export default function Layout({ title, children }) {
  return (
    <Fragment>
      <Helmet title={title || 'Filacalc'} />
      <Header />
      <Container>{children}</Container>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};
