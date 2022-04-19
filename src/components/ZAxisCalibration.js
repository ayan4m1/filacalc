import { useFormik } from 'formik';
import { Fragment, useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import ResultsCard from 'components/ResultsCard';
import { leadscrewPitches, stepAngles } from 'utils';

export default function ZAxisCalibration() {
  const [printHeight, setPrintHeight] = useState(100);
  const [stepHeight, setStepHeight] = useState(null);
  const [evenlyDivisible, setEvenlyDivisible] = useState(false);
  const [layerHeights, setLayerHeights] = useState([]);
  const initialValues = {
    layerHeight: 0.2,
    stepAngle: 1.8,
    customStepAngle: 0,
    leadscrewPitch: 1.25,
    customLeadscrewPitch: 0,
    printHeight: 100
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (vals) => {
      setPrintHeight(vals.printHeight);

      const stepAngle = parseFloat(
        vals.stepAngle === 'custom' ? vals.customStepAngle : vals.stepAngle
      );
      const leadscrewPitch = parseFloat(
        vals.leadscrewPitch === 'custom'
          ? vals.customLeadscrewPitch
          : vals.leadscrewPitch
      );

      const newStepHeight = leadscrewPitch / (360 / stepAngle);

      setStepHeight(newStepHeight);
      const heightMultiple = vals.layerHeight / newStepHeight;
      const newEvenlyDivisible = Math.floor(heightMultiple) === heightMultiple;

      setEvenlyDivisible(newEvenlyDivisible);

      if (newEvenlyDivisible) {
        return;
      }

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

        error *= vals.printHeight / vals.layerHeight / 1e2;

        newLayerHeights.push({
          height: heightMultiple * newStepHeight,
          steps: heightMultiple,
          error: `${errorSign}${error.toFixed(4)}`
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

  return (
    <Fragment>
      <Helmet title="Z-Axis Calibration" />
      <h1>Z-Axis Calibration</h1>
      <p>
        Use this calculator to calibrate your layer heights based on your Z-axis
        hardware. The goal is to use a layer height which is evenly divisble by
        the smallest amount of motion your Z-axis is capable of producing. If
        you do not do this, you can expect to see various print issues,
        especially with tall prints as the error is cumulative.
      </p>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Motor Step Angle (&deg;)</Form.Label>
          <Form.Select>
            {stepAngles.map((stepAngle) => (
              <option key={stepAngle} value={stepAngle}>
                {stepAngle}
              </option>
            ))}
            <option value="custom">Custom</option>
          </Form.Select>
        </Form.Group>
        {values.stepAngle === 'custom' && (
          <Form.Group>
            <Form.Label>Custom Step Angle (&deg;)</Form.Label>
            <Form.Control
              name="customStepAngle"
              onChange={handleChange}
              type="number"
              value={values.customStepAngle}
            />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Leadscrew Pitch (mm/rev)</Form.Label>
          <Form.Select
            name="leadscrewPitch"
            onChange={handleChange}
            value={values.leadscrewPitch}
          >
            {leadscrewPitches.map((leadscrewPitch) => (
              <option key={leadscrewPitch} value={leadscrewPitch}>
                {leadscrewPitch}
              </option>
            ))}
            <option value="custom">Custom</option>
          </Form.Select>
        </Form.Group>
        {values.leadscrewPitch === 'custom' && (
          <Form.Group>
            <Form.Label>Leadscrew Pitch (mm/rev)</Form.Label>
            <Form.Control
              name="leadscrewPitch"
              onChange={handleChange}
              type="number"
              value={values.leadscrewPitch}
            />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Layer Height (mm)</Form.Label>
          <Form.Control
            name="layerHeight"
            onChange={handleChange}
            type="number"
            value={values.layerHeight}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Print Height (mm)</Form.Label>
          <Form.Control
            name="printHeight"
            onChange={handleChange}
            type="number"
            value={values.printHeight}
          />
          <Form.Text className="text-muted">
            This is used to calculate accumulated error if layer height is not
            evenly divisible by minimum step height.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Button className="mt-4" type="primary">
            Calculate
          </Button>
        </Form.Group>
      </Form>
      {Boolean(stepHeight) && (
        <ResultsCard
          results={[
            {
              label: 'Divisibility Check',
              content: evenlyDivisible ? (
                <p className="text-success">
                  Your layer height is evenly divisible by your step height!
                </p>
              ) : (
                <p className="text-danger">
                  Your layer height is not evenly divisible by your step height!
                </p>
              )
            },
            {
              label: 'Minimum Step Height',
              content: `${stepHeight.toFixed(6)}mm`
            }
          ]}
        >
          {!evenlyDivisible && (
            <Table>
              <thead>
                <tr>
                  <th>Layer Height (mm)</th>
                  <th>Number of Steps</th>
                  <th>Error over {printHeight / 10}cm (mm)</th>
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
          )}
        </ResultsCard>
      )}
    </Fragment>
  );
}
