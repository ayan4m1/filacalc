import { useCallback } from 'react';
import { Form, ListGroup, ListGroupItem } from 'react-bootstrap';

import FormPage from 'components/FormPage';
import ResultsCard from 'components/ResultsCard';

export default function ExtruderCalibration() {
  return (
    <FormPage
      calculate={useCallback((vals) => {
        const actualExtrusion =
          vals.extrusionLength + vals.extrusionPadding - vals.measuredOffset;
        const stepsTaken = vals.currentSteps * vals.extrusionLength;
        const stepsPerMm = stepsTaken / actualExtrusion;

        return { stepsPerMm };
      }, [])}
      description="Use this calculator to calibrate your extruder steps per mm. This is a
        value which is either stored in EEPROM on the printer or specified in
        your G-code. It represents the number of step commands required to make
        the motor extrude 1mm of filament. If you modify any part of your
        extruder or are experiencing consistent under/over-extrusion with a
        clean nozzle, it's wise to re-calibrate this value."
      initialValues={{
        currentSteps: 100,
        measuredOffset: 0,
        extrusionLength: 100,
        extrusionPadding: 20
      }}
      renderForm={useCallback(
        ({ values, handleChange, handleBlur }) => (
          <Form>
            <Form.Group>
              <Form.Label>Current Steps per mm</Form.Label>
              <Form.Control
                min="0"
                name="currentSteps"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.currentSteps}
              />
              <Form.Text className="text-muted">
                To find your current steps per mm, look in one of two places:
                your printer configuration menus or your slicer configuration.
                You should be able to find the extruder steps per mm that you
                are currently using in one of these places. If it is present in
                both, the value from your slicer takes precedence.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Extrusion Length (mm)</Form.Label>
              <Form.Control
                min="0"
                name="extrusionLength"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.extrusionLength}
              />
              <Form.Text className="text-muted">
                An extrusion length of 100mm allows for enough error to build up
                to give us an accurate final value and is recommended. The less
                filament you extrude, the less accurate your calibration will
                be.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Extrusion Padding (mm)</Form.Label>
              <Form.Control
                min="0"
                name="extrusionPadding"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.extrusionPadding}
              />
              <Form.Text className="text-muted">
                This is an arbitrary value.
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Measured Length Between Extrusion and Marking (mm)
              </Form.Label>
              <Form.Control
                min="0"
                name="measuredOffset"
                onBlur={handleBlur}
                onChange={handleChange}
                type="number"
                value={values.measuredOffset}
              />
              <Form.Text className="text-primary">
                Enter your measurement here after following the steps above.
              </Form.Text>
            </Form.Group>
          </Form>
        ),
        []
      )}
      renderHelp={useCallback(
        ({ values }) => (
          <ListGroup>
            <ListGroupItem>
              <strong>1.</strong> Using calipers, measure your filament starting
              from where it enters the extruder. Measure to{' '}
              {Math.ceil(values.extrusionLength + values.extrusionPadding)}mm
              and mark the filament there.
            </ListGroupItem>
            <ListGroupItem>
              <strong>2.</strong> Manually extrude {values.extrusionLength}mm.
            </ListGroupItem>
            <ListGroupItem>
              <strong>3.</strong> Using calipers, measure the distance from
              where the filament enters the extruder to the marking.
            </ListGroupItem>
            <ListGroupItem>
              <strong>4.</strong> Enter the caliper reading into the final form
              field.
            </ListGroupItem>
          </ListGroup>
        ),
        []
      )}
      renderResults={useCallback(
        (results) => (
          <ResultsCard>
            <p>
              The corrected value is{' '}
              <strong>{results?.stepsPerMm.toFixed(2)} steps/mm.</strong>
            </p>
          </ResultsCard>
        ),
        []
      )}
      shouldShow={useCallback(
        (_, touched) => touched.extrusionLength || touched.measuredOffset,
        []
      )}
      title="Extruder Calibration"
      validate={useCallback((vals) => {
        const result = [];

        if (vals.currentSteps <= 0) {
          result.push('Current steps must be greater than zero.');
        }

        if (vals.extrusionLength <= 0) {
          result.push('Extrusion length must be greater than zero.');
        }

        const actualExtrusion =
          vals.extrusionLength + vals.extrusionPadding - vals.measuredOffset;

        if (actualExtrusion <= 0) {
          result.push('Inputs do not make sense.');
        }

        return result;
      }, [])}
    />
  );
}
