import PropTypes from 'prop-types';
import { Fragment, useCallback } from 'react';
import { Col, Row, Container, Spinner, ProgressBar } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import FormErrors from 'components/FormErrors';
import ResultsCard from 'components/ResultsCard';
import useCalculatorForm from 'hooks/useCalculatorForm';
import useParser from 'hooks/useParser';

export default function FormPage({
  title,
  description,
  renderForm,
  renderResults,
  initialValues,
  shouldShow,
  validate,
  calculate
}) {
  const { formik, results, errors } = useCalculatorForm({
    initialValues,
    shouldShow,
    validate,
    calculate
  });
  const { setFieldValue } = formik;
  const parser = useParser(
    useCallback(
      (data) => setFieldValue('length', data.length.toFixed(2)),
      [setFieldValue]
    )
  );

  if (parser.loading) {
    return (
      <Fragment>
        <Helmet title="Filament Usage" />
        <h1>Filament Usage</h1>
        <Container>
          <Row>
            <Col className="text-center">
              <h4>Parsing your G-code...</h4>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Spinner animation="border" className="my-3" />
              <ProgressBar animated now={parser.progress} variant="primary" />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Helmet title={title} />
      <h1>{title}</h1>
      {Boolean(description) && <p>{description}</p>}
      {renderForm(formik, parser)}
      <FormErrors errors={errors} />
      {renderResults && results ? (
        renderResults(results)
      ) : (
        <ResultsCard results={results} />
      )}
    </Fragment>
  );
}

FormPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  renderForm: PropTypes.func.isRequired,
  renderResults: PropTypes.func,
  initialValues: PropTypes.object.isRequired,
  shouldShow: PropTypes.func.isRequired,
  validate: PropTypes.func,
  calculate: PropTypes.func.isRequired
};
