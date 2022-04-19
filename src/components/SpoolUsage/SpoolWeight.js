import { useFormik } from 'formik';
import { Fragment } from 'react';
import { Form, Alert, ProgressBar } from 'react-bootstrap';

import ResultsCard from 'components/ResultsCard';
import { getMaterial, getSpool, materials, spools } from 'utils';

export default function SpoolWeight() {
  const initialValues = {
    brand: '',
    material: '',
    diameter: 1.75,
    netWeight: 1000,
    currentWeight: 0,
    customSpoolMass: 0,
    customMaterialDensity: 0
  };

  const { values, touched, handleChange } = useFormik({ initialValues });

  const showResults = Boolean(
    (values.brand || values.customSpoolMass) &&
      (values.material || values.customMaterialDensity)
  );
  const showWarning =
    !showResults &&
    values.currentWeight > 0 &&
    (!touched.brand || !touched.material);

  let remainingMass = 0,
    remainingPercent = 0,
    remainingVolume = 0,
    remainingLength = 0,
    inconsistentWarning = false,
    progressVariant = 'success';

  if (showResults) {
    const spoolMass =
      values.brand !== 'custom'
        ? getSpool(values.brand).mass
        : parseFloat(values.customSpoolMass);
    const materialDensity =
      values.material !== 'custom'
        ? getMaterial(values.material).density
        : parseFloat(values.customMaterialDensity);

    remainingMass = Math.max(0, values.currentWeight - spoolMass);

    if (remainingMass === 0) {
      inconsistentWarning = true;
    }

    remainingVolume = remainingMass / materialDensity;
    remainingLength =
      remainingVolume / (Math.PI * Math.pow(values.diameter / 2.0, 2));

    if (values.netWeight > 0) {
      remainingPercent = (remainingMass / values.netWeight) * 1e2;
    }

    if (remainingPercent <= 25) {
      progressVariant = 'danger';
    } else if (remainingPercent <= 50) {
      progressVariant = 'warning';
    }
  }

  return (
    <Fragment>
      <Form>
        <Form.Group>
          <Form.Label>Brand</Form.Label>
          <Form.Select
            name="brand"
            onChange={handleChange}
            value={values.brand}
          >
            <option>Select One</option>
            {spools.map((spool) => (
              <option key={spool.brand} value={spool.brand}>
                {spool.brand}
              </option>
            ))}
            <option value="custom">Custom</option>
          </Form.Select>
        </Form.Group>
        {values.brand === 'custom' && (
          <Form.Group>
            <Form.Label>Custom Spool Mass (g)</Form.Label>
            <Form.Control
              name="customSpoolMass"
              onChange={handleChange}
              type="number"
              value={values.customSpoolMass}
            />
          </Form.Group>
        )}
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
        <Form.Group>
          <Form.Label>Filament Diameter (mm)</Form.Label>
          <Form.Control
            min="0"
            name="diameter"
            onChange={handleChange}
            type="number"
            value={values.diameter}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Current Weight (g)</Form.Label>
          <Form.Control
            min="0"
            name="currentWeight"
            onChange={handleChange}
            type="number"
            value={values.currentWeight}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Net Weight (g)</Form.Label>
          <Form.Control
            min="0"
            name="netWeight"
            onChange={handleChange}
            type="number"
            value={values.netWeight}
          />
        </Form.Group>
      </Form>
      {showWarning && (
        <Alert className="my-4" variant="warning">
          Select a material and brand.
        </Alert>
      )}
      {inconsistentWarning && (
        <Alert className="mt-4" variant="warning">
          Spool weight looks incorrect, it should be empty.
        </Alert>
      )}
      {showResults && (
        <ResultsCard
          results={[
            {
              label: 'Mass',
              content: <span>{Math.round(remainingMass)} g</span>
            },
            {
              label: 'Percentage',
              content: (
                <ProgressBar
                  className="text-light"
                  label={`${Math.round(remainingPercent)} %`}
                  now={remainingPercent}
                  variant={progressVariant}
                />
              )
            },
            {
              label: 'Length',
              content: <span>{remainingLength.toFixed(2)} m</span>
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
