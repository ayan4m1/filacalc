import { Fragment, ReactNode } from 'react';
import { Card, Alert, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface CalculatorProps {
  children: ReactNode;
}

interface CalcDescriptionProps {
  children: ReactNode;
}

interface CalcHeadingProps {
  title: string;
  icon?: IconProp;
  children?: ReactNode;
}

interface CalcErrorsProps {
  errors: string[];
}

interface CalcResultsProps {
  title?: string;
  results?: {
    label: string;
    content: string;
  }[];
  children?: ReactNode;
}

export const Calculator = ({ children }: CalculatorProps) => (
  <Fragment>{children}</Fragment>
);

const Description = ({ children }: CalcDescriptionProps) =>
  Boolean(children) && <div className="my-4">{children}</div>;

const Heading = ({ title, icon, children }: CalcHeadingProps) => (
  <Fragment>
    {Boolean(title) && <title>{`Filacalc - ${title}`}</title>}
    <h1>
      {Boolean(icon) && <FontAwesomeIcon icon={icon} size="2x" />}
      {Boolean(title) && ` ${title}`}
    </h1>
    {children}
  </Fragment>
);

const Errors = ({ errors }: CalcErrorsProps) => {
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

const Results = ({
  title = 'Results',
  results,
  children
}: CalcResultsProps) => {
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

Calculator.Errors = Errors;
Calculator.Heading = Heading;
Calculator.Results = Results;
Calculator.Description = Description;
