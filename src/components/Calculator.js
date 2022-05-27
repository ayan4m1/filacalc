import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { Card, Alert, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

export const Calculator = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

const Description = ({ children }) =>
  Boolean(children) && <div className="my-4">{children}</div>;

const Heading = ({ title, icon, children }) => (
  <Fragment>
    {Boolean(title) && <Helmet title={title} />}
    <h1>
      {Boolean(icon) && <FontAwesomeIcon icon={icon} size="2x" />}
      {Boolean(title) && ` ${title}`}
    </h1>
    {children}
  </Fragment>
);

const Errors = ({ errors }) => {
  if (!errors?.length) {
    return null;
  }

  return (
    <Alert className="my-4" variant="warning">
      <ul className="mb-0">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </Alert>
  );
};

const Results = ({ title = 'Results', results, children }) => {
  if (!children && !results?.length) {
    return null;
  }

  return (
    <Card body className="my-4">
      <Card.Title>{title}</Card.Title>
      {Boolean(results?.length) &&
        results.map((result, index) => (
          <Row
            className={
              Boolean(children) && index === results.length - 1 ? 'mb-4' : null
            }
            key={result.label}
          >
            <Col sm={4} xs={2}>
              <strong>{result.label}</strong>
            </Col>
            <Col sm={8} xs={10}>
              {result.content}
            </Col>
          </Row>
        ))}
      {children}
    </Card>
  );
};

Calculator.propTypes = {
  children: PropTypes.node.isRequired
};

Description.propTypes = {
  children: PropTypes.node
};

Heading.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  title: PropTypes.string
};

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string.isRequired)
};

Results.propTypes = {
  title: PropTypes.string,
  results: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object.isRequired),
    PropTypes.object.isRequired
  ]),
  children: PropTypes.node
};

Calculator.Errors = Errors;
Calculator.Heading = Heading;
Calculator.Results = Results;
Calculator.Description = Description;
