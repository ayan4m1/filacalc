import { useFormik } from 'formik';
import { Fragment, useCallback, useState } from 'react';
import { Button, Form, Dropdown, Card, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import { leadscrewPitches, stepAngles } from 'utils';

export default function ZAxisCalibration() {
  const [stepHeight, setStepHeight] = useState(null);
  const [evenlyDivisible, setEvenlyDivisible] = useState(false);
  const [layerHeights, setLayerHeights] = useState([]);
  const initialValues = {
    layerHeight: 0.2,
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

      const newStepHeight = leadscrewPitch / (360 / stepAngle);

      setStepHeight(newStepHeight);
      const heightMultiple = vals.layerHeight / newStepHeight;
      const newEvenlyDivisible = Math.floor(heightMultiple) === heightMultiple;

      setEvenlyDivisible(newEvenlyDivisible);

      const newLayerHeights = [];

      if (newEvenlyDivisible) {
        newLayerHeights.push({
          height: (heightMultiple - 1) * newStepHeight,
          steps: heightMultiple - 1,
          error: 0
        });
        newLayerHeights.push({
          height: heightMultiple * newStepHeight,
          steps: heightMultiple,
          error: 0
        });
        newLayerHeights.push({
          height: (heightMultiple + 1) * newStepHeight,
          steps: heightMultiple + 1,
          error: 0
        });
      } else {
        newLayerHeights.push({
          height: Math.floor(heightMultiple) * newStepHeight,
          steps: Math.floor(heightMultiple),
          error: 0
        });
        let error =
          heightMultiple / newStepHeight -
          Math.floor(heightMultiple / newStepHeight);

        let errorSign = '-';

        if (error > 0.5) {
          error = 1 - error;
          errorSign = '+';
        }

        error *= 1e2 / vals.layerHeight / 1e2;

        newLayerHeights.push({
          height: heightMultiple * newStepHeight,
          steps: heightMultiple,
          error: `${errorSign}${error}`
        });
        newLayerHeights.push({
          height: Math.ceil(heightMultiple) * newStepHeight,
          steps: Math.ceil(heightMultiple),
          error: 0
        });
      }

      setLayerHeights(newLayerHeights);
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
    <Fragment>
      <Helmet title="Z-Axis Calibration" />
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
          <Form.Label>Layer Height (mm)</Form.Label>
          <Form.Control
            type="number"
            name="layerHeight"
            onChange={handleChange}
            value={values.layerHeight}
          />
        </Form.Group>
        <Form.Group>
          <Button type="primary" className="mt-4">
            Calculate
          </Button>
        </Form.Group>
      </Form>
      {Boolean(stepHeight) && (
        <Card body className="my-4">
          <Card.Title>Results</Card.Title>
          {evenlyDivisible ? (
            <p className="text-success">
              Your layer height is evenly divisible by your step height!
            </p>
          ) : (
            <p className="text-danger">
              Your layer height is not evenly divisible by your step height!
            </p>
          )}
          <p>
            Your layer height should be a multiple of{' '}
            <strong>{stepHeight.toFixed(6)}mm</strong>
          </p>
          <Table>
            <thead>
              <tr>
                <th>Layer Height (mm)</th>
                <th>Number of Steps</th>
                <th>Error over 10cm (mm)</th>
              </tr>
            </thead>
            <tbody>
              {layerHeights.map((layerHeight) => (
                <tr key={layerHeight.height}>
                  <td
                    className={
                      layerHeight.steps % 1 === 0
                        ? 'text-success'
                        : 'text-danger'
                    }
                  >
                    {layerHeight.height.toFixed(4)}
                  </td>
                  <td>{layerHeight.steps}</td>
                  <td>{layerHeight.error}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}
    </Fragment>
  );
}
