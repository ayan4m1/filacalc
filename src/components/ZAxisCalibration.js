import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import { Button, Form, Dropdown, Card } from 'react-bootstrap';
import { leadscrewPitches, stepAngles } from 'utils';
import Layout from './Layout';

export default function ZAxisCalibration() {
  const [stepHeight, setStepHeight] = useState(null);
  const initialValues = {
    stepAngle: 1.8,
    customStepAngle: 0,
    leadscrewPitch: 1.25,
    customLeadscrewPitch: 0
  };

  const { values, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    onSubmit: (vals) => {
      const stepAngle =
        vals.stepAngle === 'custom' ? vals.customStepAngle : vals.stepAngle;
      const leadscrewPitch =
        vals.leadscrewPitch === 'custom'
          ? vals.customLeadscrewPitch
          : vals.leadscrewPitch;

      setStepHeight((1.0 / (360.0 / stepAngle)) * leadscrewPitch);
    }
  });

  const changeStepAngle = useCallback(
    (angle) => setFieldValue('stepAngle', parseFloat(angle)),
    [setFieldValue]
  );
  const changeLeadscrewPitch = useCallback(
    (pitch) => setFieldValue('leadscrewPitch', parseFloat(pitch)),
    [setFieldValue]
  );

  return (
    <Layout title="Z-Axis Calibration">
      <h1>Z-Axis Calibration</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Motor Step Angle (&deg;)</Form.Label>
          <Dropdown onSelect={changeStepAngle}>
            <Dropdown.Toggle variant="primary">
              {values.stepAngle ? values.stepAngle : 'Select One'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {stepAngles.map((stepAngle) => (
                <Dropdown.Item key={stepAngle} eventKey={stepAngle}>
                  {stepAngle} &deg;
                </Dropdown.Item>
              ))}
              <Dropdown.Item eventKey="custom">Custom</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        {values.stepAngle === 'custom' && (
          <Form.Group>
            <Form.Label>Custom Step Angle (&deg;)</Form.Label>
            <Form.Control
              type="number"
              name="customStepAngle"
              onChange={handleChange}
              value={values.customStepAngle}
            />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Leadscrew Pitch (mm/rev)</Form.Label>
          <Dropdown onSelect={changeLeadscrewPitch}>
            <Dropdown.Toggle variant="primary">
              {values.leadscrewPitch ? values.leadscrewPitch : 'Select One'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {leadscrewPitches.map((leadscrewPitch) => (
                <Dropdown.Item key={leadscrewPitch} eventKey={leadscrewPitch}>
                  {leadscrewPitch} mm/rev
                </Dropdown.Item>
              ))}
              <Dropdown.Item eventKey="custom">Custom</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        {values.leadscrewPitch === 'custom' && (
          <Form.Group>
            <Form.Label>Leadscrew Pitch (mm/rev)</Form.Label>
            <Form.Control
              type="number"
              name="leadscrewPitch"
              onChange={handleChange}
              value={values.leadscrewPitch}
            />
          </Form.Group>
        )}
        <Form.Group>
          <Button type="primary" className="mt-4">
            Calculate
          </Button>
        </Form.Group>
      </Form>
      {Boolean(stepHeight) && (
        <Card body className="my-4">
          <Card.Title>Results</Card.Title>
          <p>
            Your layer height should be a multiple of {stepHeight.toFixed(6)}mm
          </p>
        </Card>
      )}
    </Layout>
  );
}
