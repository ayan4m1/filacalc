import { Card, Container } from 'react-bootstrap';
import { isRouteErrorResponse, useRouteError } from 'react-router';

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Container>
        <h1 className="display-1">Uh-oh.</h1>
        <h1 className="mt-0">
          {error.status} {error.statusText}
        </h1>
        <Card bg="primary" body text="white">
          {error.data}
        </Card>
      </Container>
    );
  } else if (error instanceof Error) {
    return (
      <Container>
        <h1 className="display-1">Uh-oh.</h1>
        <h1 className="mt-0">An error occurred. Please refresh the page.</h1>
        <Card bg="primary" body className="my-3" text="white">
          {error.message}
        </Card>
        <h2 className="mt-2">The stack trace (for developers):</h2>
        <Card bg="info" body className="my-3" text="white">
          <pre className="my-0">{error.stack}</pre>
        </Card>
      </Container>
    );
  } else {
    return (
      <Container>
        <h1 className="display-1">Uh-oh.</h1>
        <h1>An unknown error occurred. Please refresh the page.</h1>
      </Container>
    );
  }
}
