import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import {
  Button,
  Modal,
  Form,
  Container,
  Row,
  Col,
  Spinner,
  ProgressBar
} from 'react-bootstrap';

import useParser from 'hooks/useParser';
import { getRemainingFilament } from 'utils';

export default function SpoolPrintForm({ spool, onHide, onSubmit }) {
  const initialValues = {
    filamentLength: 0,
    copies: 1
  };
  const { errors, values, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validate: (vals) => {
        const result = {};

        if (vals.copies < 1) {
          result.copies = 'Copies must be greater than zero.';
        }

        const { length: remainingLength } = getRemainingFilament(spool);

        if (vals.filamentLength <= 0) {
          result.filamentLength = 'Filament length must be greater than zero.';
        } else if (vals.filamentLength > remainingLength) {
          result.filamentLength = `Filament length must be less than ${remainingLength.toFixed(
            2
          )} meters.`;
        }

        return result;
      },
      onSubmit: useCallback(
        (vals) => {
          onSubmit(vals.filamentLength * vals.copies);
        },
        [onSubmit]
      )
    });

  const {
    loading,
    error: parserError,
    progress,
    handleChange: handleFileChange
  } = useParser((data) =>
    setFieldValue('filamentLength', data.length.toFixed(2))
  );

  if (loading) {
    return (
      <Modal onHide={onHide} show={true}>
        <Modal.Header>
          <Modal.Title>Parsing your G-code...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col className="text-center mb-4">
                <Spinner animation="border" className="my-3" />
                <ProgressBar animated now={progress} variant="primary" />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal onHide={onHide} show={true}>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Print from {spool?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select a G-code file</Form.Label>
            <Form.Control
              isInvalid={parserError}
              onChange={handleFileChange}
              type="file"
            />
            <Form.Text className="text-muted">
              Files are parsed in your browser, not sent to a server.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Unable to parse the selected file.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Filament Length (m)</Form.Label>
            <Form.Control
              isInvalid={Boolean(errors.filamentLength)}
              min="0"
              name="filamentLength"
              onChange={handleChange}
              type="number"
              value={values.filamentLength}
            />
            <Form.Control.Feedback type="invalid">
              {errors.filamentLength}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>Number of Copies</Form.Label>
            <Form.Control
              isInvalid={Boolean(errors.copies)}
              min="1"
              name="copies"
              onChange={handleChange}
              type="number"
              value={values.copies}
            />
            <Form.Control.Feedback type="invalid">
              {errors.filamentLength}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            Print
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

SpoolPrintForm.propTypes = {
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  spool: PropTypes.object.isRequired
};
