import { Fragment, useCallback } from 'react';
import { Form, Table } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import FormErrors from 'components/FormErrors';
import ResultsCard from 'components/ResultsCard';
import useCalculatorForm from 'hooks/useCalculatorForm';
import { leadscrewPitches, stepAngles } from 'utils';

export default function ZAxisCalibration() {
  const initialValues = {
    layerHeight: 0.2,
    stepAngle: 1.8,
    customStepAngle: 0,
    leadscrewPitch: 1.25,
    customLeadscrewPitch: 0,
    printHeight: 100
  };

  const {
    formik: { values, handleChange },
    results,
    errors
  } = useCalculatorForm({
    initialValues,
    shouldShow: useCallback(() => true, []),
    validate: useCallback((vals) => {
      const result = [];

      if (vals.stepAngle <= 0) {
        result.push('Step angle must be greater than zero.');
      }

      if (vals.leadscrewPitch <= 0) {
        result.push('Leadscrew pitch must be greater than zero.');
      }

      return result;
    }, []),
    calculate: useCallback((vals) => {
      const layerHeights = [];

      const stepAngle = parseFloat(
        vals.stepAngle === 'custom' ? vals.customStepAngle : vals.stepAngle
      );
      const leadscrewPitch = parseFloat(
        vals.leadscrewPitch === 'custom'
          ? vals.customLeadscrewPitch
          : vals.leadscrewPitch
      );

      const stepHeight = leadscrewPitch / (360 / stepAngle);

      const heightMultiple = vals.layerHeight / stepHeight;
      const evenlyDivisible = Math.floor(heightMultiple) === heightMultiple;

      if (!evenlyDivisible) {
        layerHeights.push({
          height: Math.floor(heightMultiple) * stepHeight,
          steps: Math.floor(heightMultiple),
          error: 0
        });
        let error =
          heightMultiple / stepHeight - Math.floor(heightMultiple / stepHeight);

        let errorSign = '-';

        if (error > 0.5) {
          error = 1 - error;
          errorSign = '+';
        }

        error *= vals.printHeight / vals.layerHeight / 1e2;

        layerHeights.push({
          height: heightMultiple * stepHeight,
          steps: heightMultiple,
          error: `${errorSign}${error.toFixed(4)}`
        });
        layerHeights.push({
          height: Math.ceil(heightMultiple) * stepHeight,
          steps: Math.ceil(heightMultiple),
          error: 0
        });
      }

      return {
        results: [
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
        ],
        layerHeights,
        evenlyDivisible,
        printHeight: vals.printHeight
      };
    }, [])
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
      <Form>
        <Form.Group>
          <Form.Label>Motor Step Angle (&deg;)</Form.Label>
          <Form.Select
            name="stepAngle"
            onChange={handleChange}
            value={values.stepAngle}
          >
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
      </Form>
      <FormErrors errors={errors} />
      {Boolean(results) && (
        <ResultsCard results={results.results}>
          {!results.evenlyDivisible && (
            <Table>
              <thead>
                <tr>
                  <th>Layer Height</th>
                  <th>Number of Steps</th>
                  <th>Error over {results.printHeight / 10}cm</th>
                </tr>
              </thead>
              <tbody>
                {results.layerHeights.map((layerHeight) => (
                  <tr key={layerHeight.height}>
                    <td
                      className={
                        layerHeight.steps % 1 === 0
                          ? 'text-success'
                          : 'text-danger'
                      }
                    >
                      {layerHeight.height.toFixed(4)} mm
                    </td>
                    <td>{layerHeight.steps}</td>
                    <td>{layerHeight.error} mm</td>
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
