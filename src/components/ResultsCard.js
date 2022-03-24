import PropTypes from 'prop-types';
import { Card, Row, Col } from 'react-bootstrap';

export default function ResultsCard({ results, title = 'Results' }) {
  return (
    <Card body className="my-4">
      <Card.Title>{title}</Card.Title>
      {results.map((result) => (
        <Row key={result.label}>
          <Col xs={2}>
            <strong>{result.label}</strong>
          </Col>
          <Col xs={10}>{result.content}</Col>
        </Row>
      ))}
    </Card>
  );
}

ResultsCard.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.oneOfType(PropTypes.node, PropTypes.string).isRequired
    })
  ).isRequired,
  title: PropTypes.string
};
