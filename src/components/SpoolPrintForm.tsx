import { useFormik } from 'formik';
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
  Card
} from 'react-bootstrap';
import * as Yup from 'yup';

import useParser from '../hooks/useParser';
import { getMaterial, getRemainingFilament } from '../utils';
import { Spool, SpoolPrintForm } from '../types';

const FormSchema = Yup.object({
  filamentLength: Yup.number().moreThan(
    0,
    'Filament length must be greater than zero.'
  ),
  copies: Yup.number().moreThan(0, 'Copies must be greater than zero.')
});

interface IProps {
  spool: Spool;
  onHide: () => void;
  onSubmit: CallableFunction;
}

export default function SpoolPrintForm({ spool, onHide, onSubmit }: IProps) {
  const { errors, values, handleChange, handleSubmit, setFieldValue } =
    useFormik<SpoolPrintForm>({
      initialValues: {
        filamentLength: 0,
        copies: 1
      },
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
      <Modal onHide={onHide} show>
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
    <Modal onHide={onHide} show>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Print using {spool?.name}</Modal.Title>
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
            <Card bg="info" body className="mt-3 mb-0" text="light">
              <h1>Usage Info</h1>
              <Container fluid>
                <Row>
                  <Col md={3} sm={12}>
                    Meters:
                  </Col>
                  <Col md={9} sm={12}>
                    {consumedFilamentLength.toFixed(2)}
                  </Col>
                </Row>
                <Row>
                  <Col md={3} sm={12}>
                    Cost:
                  </Col>
                  <Col md={3} sm={12}>
                    {filamentCost.toFixed(2)}
                  </Col>
                </Row>
                <Row>
                  <Col md={3} sm={12}>
                    Remaining:
                  </Col>
                  <Col className="d-flex align-items-center" md={9} sm={12}>
                    <ProgressBar
                      className="flex-grow-1"
                      label={`${Math.round(remainingFilamentPercent)}%`}
                      now={remainingFilamentPercent}
                    />
                  </Col>
                </Row>
              </Container>
            </Card>
          ) : (
            <Card bg="danger" body className="mt-3 mb-0" text="light">
              The spool does not have enough filament remaining for this print!
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Cancel
          </Button>
          <Button
            disabled={remainingFilamentLength <= 0}
            onClick={() => handleSubmit()}
            variant="primary"
          >
            Print
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
