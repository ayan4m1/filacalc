import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

export default function FormErrors({ errors }) {
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
}

FormErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired
};
