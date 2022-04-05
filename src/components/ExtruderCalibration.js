import { useFormik } from 'formik';
import { Fragment } from 'react';
import { Card, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

export default function ExtruderCalibration() {
  const initialValues = {
    currentSteps: 100,
    extrudedLength: 100
  };

  const { values, handleChange } = useFormik({
    initialValues
  });

  let newSteps = 0;

  if (values.extrudedLength > 0) {
    newSteps = (values.currentSteps / values.extrudedLength) * 1e2;
  }

  return (
    <Fragment>
      <Helmet title="Extruder Calibration" />
      <h1>Extruder Steps Calibration</h1>
      <Form>
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
      </Form>
      <Card body className="my-4">
        <Card.Title>Results</Card.Title>
        <p>
          The corrected value is <strong>{newSteps.toFixed(2)} steps/mm</strong>
        </p>
      </Card>
    </Fragment>
  );
}
