import ResultsCard from 'components/ResultsCard';
import { useFormik } from 'formik';
import { Fragment } from 'react';
import { Form } from 'react-bootstrap';

export default function SpoolDimensions() {
  const initialValues = {
    filamentDiameter: 1.75,
    outerDiameter: 0,
    spoolDiameter: 0,
    spoolWidth: 0
  };

  const { values, handleChange } = useFormik({ initialValues });

  const showResults = Boolean(
    values.outerDiameter > 0 &&
      values.spoolDiameter > 0 &&
      values.spoolWidth > 0
  );

  let remainingLength = 0,
    remainingVolume = 0;

  if (showResults) {
    remainingLength =
      ((Math.pow(values.outerDiameter, 2) - Math.pow(values.spoolDiameter, 2)) *
        Math.PI *
        values.spoolWidth *
        0.8) /
      4 /
      Math.pow(values.filamentDiameter, 2) /
      1e3;
    remainingVolume =
      Math.PI * Math.pow(values.filamentDiameter / 2, 2) * remainingLength;
  }

  return (
    <Fragment>
      <Form>
        <Form.Group>
          <Form.Label>Filament diameter (mm)</Form.Label>
          <Form.Control
            min="0"
            name="filamentDiameter"
            onChange={handleChange}
            type="number"
            value={values.filamentDiameter}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Outer diameter of filament on spool (mm)</Form.Label>
          <Form.Control
            min="0"
            name="outerDiameter"
            onChange={handleChange}
            type="number"
            value={values.outerDiameter}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Inner diameter of spool (mm)</Form.Label>
          <Form.Control
            min="0"
            name="spoolDiameter"
            onChange={handleChange}
            type="number"
            value={values.spoolDiameter}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Inner width of spool (mm)</Form.Label>
          <Form.Control
            min="0"
            name="spoolWidth"
            onChange={handleChange}
            type="number"
            value={values.spoolWidth}
          />
        </Form.Group>
      </Form>
      {showResults && (
        <ResultsCard
          results={[
            {
              label: 'Length',
              content: `${remainingLength.toFixed(2)} m`
            },
            {
              label: 'Volume',
              content: (
                <span>
                  {remainingVolume.toFixed(2)} cm<sup>3</sup>
                </span>
              )
            }
          ]}
          title="Remaining Filament"
        />
      )}
    </Fragment>
  );
}
