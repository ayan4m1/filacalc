import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { isRouteErrorResponse, useRouteError } from 'react-router';

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Container>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </Container>
    );
  } else if (error instanceof Error) {
    return (
      <Container>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>Unknown Error Occurred</h1>
      </Container>
    );
  }
}

ErrorBoundary.propTypes = {
  error: PropTypes.object
};
