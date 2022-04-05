import { useFormik } from 'formik';
import { Fragment, useCallback, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

export default function ExtruderCalibration() {
  const [newSteps, setNewSteps] = useState(0);
  const initialValues = {
    currentSteps: 100,
    extrudedLength: 100
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: useCallback(
      (vals) => setNewSteps((vals.currentSteps / vals.extrudedLength) * 1e2),
      [setNewSteps]
    )
  });

  return (
    <Fragment>
      <Helmet title="Extruder Calibration" />
      <h1>Extruder Steps Calibration</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Current Steps per mm</Form.Label>
          <Form.Control
            type="number"
            name="currentSteps"
            value={values.currentSteps}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Length of 100mm Extrusion (mm)</Form.Label>
          <Form.Control
            type="number"
            name="extrudedLength"
            value={values.extrudedLength}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Button variant="primary" type="submit">
            Calculate
          </Button>
        </Form.Group>
      </Form>
      {newSteps > 0 && (
        <Alert className="mt-4" variant="success">
          Corrected steps per mm: {newSteps.toFixed(2)}
        </Alert>
      )}
    </Fragment>
  );
}
