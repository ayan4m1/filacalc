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
  ProgressBar,
  Alert
} from 'react-bootstrap';
import * as Yup from 'yup';

import useParser from 'hooks/useParser';
import { getMaterial, getRemainingFilament } from 'utils';

const FormSchema = Yup.object({
  filamentLength: Yup.number().moreThan(
    0,
    'Filament length must be greater than zero.'
  ),
  copies: Yup.number().moreThan(0, 'Copies must be greater than zero.')
});

export default function SpoolPrintForm({ spool, onHide, onSubmit }) {
  const initialValues = {
    filamentLength: 0,
    copies: 1
  };
  const { errors, values, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: FormSchema,
      onSubmit: useCallback(
        (vals) => {
          let consumedWeight = 0;

          const consumedLength = vals.filamentLength * vals.copies;
          const consumedVolume =
            Math.PI * Math.pow(spool.filamentDiameter / 2, 2) * consumedLength;

          if (spool.material !== 'custom') {
            consumedWeight =
              consumedVolume * getMaterial(spool.material).density;
          } else {
            consumedWeight = consumedVolume * spool.materialDensity;
          }

          onSubmit(consumedWeight);
        },
        [onSubmit, spool]
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

  const consumedFilamentLength = values.filamentLength * values.copies;
  const materialDensity =
    spool.material === 'custom'
      ? spool.materialDensity
      : getMaterial(spool.material).density;
  const consumedFilamentVolume =
    Math.PI * Math.pow(spool.filamentDiameter / 2, 2) * consumedFilamentLength;
  const consumedFilamentMass = consumedFilamentVolume * materialDensity;
  const { length: spoolFilamentLength } = getRemainingFilament(spool);
  const remainingFilamentLength = spoolFilamentLength - consumedFilamentLength;
  const remainingFilamentPercent =
    (remainingFilamentLength / spoolFilamentLength) * 1e2;
  const filamentCost =
    (consumedFilamentMass / spool.netWeight) * spool.purchaseCost;

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
          {remainingFilamentLength > 0 ? (
            <Alert className="mt-2" variant="info">
              <p>
                This print will consume {consumedFilamentLength.toFixed(2)}{' '}
                meters of filament, leaving this much of the spool:
              </p>
              <ProgressBar
                label={`${Math.round(remainingFilamentPercent)}%`}
                now={remainingFilamentPercent}
              />
              <p>The cost of the filament is {filamentCost.toFixed(2)}.</p>
            </Alert>
          ) : (
            <Alert className="mt-2" variant="danger">
              The spool does not have enough filament remaining for this print!
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Cancel
          </Button>
          <Button
            disabled={remainingFilamentLength <= 0}
            onClick={handleSubmit}
            variant="primary"
          >
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
