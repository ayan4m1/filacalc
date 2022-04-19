import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';

export default function ResultsCard({ children, results, title = 'Results' }) {
  return (
    <Card body className="my-4">
      <Card.Title>{title}</Card.Title>
      {results.map((result, index) => (
        <Row
          className={
            Boolean(children) && index === results.length - 1 ? 'mb-4' : null
          }
          key={result.label}
        >
          <Col xs={2}>
            <strong>{result.label}</strong>
          </Col>
          <Col xs={10}>{result.content}</Col>
        </Row>
      ))}
      {children}
    </Card>
  );
}

ResultsCard.propTypes = {
  children: PropTypes.node,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
        .isRequired
    })
  ).isRequired,
  title: PropTypes.string
};
