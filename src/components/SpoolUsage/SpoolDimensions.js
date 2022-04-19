import { useFormik } from 'formik';
import { Fragment } from 'react';
import { Alert, Form } from 'react-bootstrap';

import ResultsCard from 'components/ResultsCard';
import { materials, getMaterial } from 'utils';

export default function SpoolDimensions() {
  const initialValues = {
    material: '',
    customMaterialDensity: 0,
    filamentDiameter: 1.75,
    outerDiameter: 0,
    spoolDiameter: 0,
    spoolWidth: 0
  };

  const { values, touched, handleChange } = useFormik({ initialValues });

  const showResults = Boolean(
    (values.material || values.customMaterialDensity) &&
      values.outerDiameter > 0 &&
      values.spoolDiameter > 0 &&
      values.spoolWidth > 0
  );
  const showWarning =
    !showResults &&
    values.outerDiameter > 0 &&
    values.spoolDiameter > 0 &&
    values.spoolWidth > 0 &&
    !touched.material;

  let remainingLength = 0,
    remainingVolume = 0,
    remainingMass = 0;

  if (showResults) {
    const materialDensity =
      values.material !== 'custom'
        ? getMaterial(values.material).density
        : parseFloat(values.customMaterialDensity);

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
    remainingMass = materialDensity * remainingVolume;
  }

  return (
    <Fragment>
      <Form>
        <Form.Group>
          <Form.Group>
            <Form.Label>Material</Form.Label>
            <Form.Select
              name="material"
              onChange={handleChange}
              value={values.material}
            >
              <option>Select One</option>
              {materials.map((material) => (
                <option key={material.name} value={material.name}>
                  {material.name}
                </option>
              ))}
              <option value="custom">Custom</option>
            </Form.Select>
          </Form.Group>
          {values.material === 'custom' && (
            <Form.Group>
              <Form.Label>
                Custom Material Density (g/cm<sup>3</sup>)
              </Form.Label>
              <Form.Control
                min="0"
                name="customMaterialDensity"
                onChange={handleChange}
                type="number"
                value={values.customMaterialDensity}
              />
            </Form.Group>
          )}
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
      {showWarning && (
        <Alert className="my-4" variant="warning">
          Select a material.
        </Alert>
      )}
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
            },
            {
              label: 'Mass',
              content: `${remainingMass.toFixed(2)} g`
            }
          ]}
          title="Remaining Filament"
        />
      )}
    </Fragment>
  );
}
