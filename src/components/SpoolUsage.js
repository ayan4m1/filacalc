import { useFormik } from 'formik';
import { Fragment, useCallback } from 'react';
import { Form, Dropdown, Alert, ProgressBar } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import ResultsCard from 'components/ResultsCard';
import { getMaterial, getSpool, materials, spools } from 'utils';

export default function SpoolUsage() {
  const initialValues = {
    brand: null,
    material: null,
    diameter: 1.75,
    netWeight: 1000,
    currentWeight: 0,
    customSpoolMass: 0,
    customMaterialDensity: 0
  };

  const { values, handleChange, setFieldValue, touched } = useFormik({
    initialValues
  });

  const changeBrand = useCallback(
    (name) => setFieldValue('brand', name),
    [setFieldValue]
  );
  const changeMaterial = useCallback(
    (name) => setFieldValue('material', name),
    [setFieldValue]
  );

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
        : values.customSpoolMass;
    const materialDensity =
      values.material !== 'custom'
        ? getMaterial(values.material).density
        : values.customMaterialDensity;

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

  let brandLabel = 'Select One',
    materialLabel = 'Select One';

  if (values.brand) {
    if (values.brand === 'custom') {
      brandLabel = 'Custom';
    } else {
      brandLabel = values.brand;
    }
  }

  if (values.material) {
    if (values.material === 'custom') {
      materialLabel = 'Custom';
    } else {
      materialLabel = values.material;
    }
  }

  return (
    <Fragment>
      <Helmet title="Spool Usage" />
      <h1>Spool Usage</h1>
      <p>
        Use this calculator to determine the amount of filament remaining on a
        partially used spool.
      </p>
      <Form>
        <Form.Group>
          <Form.Label>Brand</Form.Label>
          <Dropdown onSelect={changeBrand}>
            <Dropdown.Toggle variant="primary">{brandLabel}</Dropdown.Toggle>
            <Dropdown.Menu>
              {spools.map((spool) => (
                <Dropdown.Item eventKey={spool.brand} key={spool.brand}>
                  {spool.brand}
                </Dropdown.Item>
              ))}
              <Dropdown.Item eventKey="custom">Custom</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
          <Dropdown onSelect={changeMaterial}>
            <Dropdown.Toggle variant="primary">{materialLabel}</Dropdown.Toggle>
            <Dropdown.Menu>
              {materials.map((material) => (
                <Dropdown.Item eventKey={material.name} key={material.name}>
                  {material.name}
                </Dropdown.Item>
              ))}
              <Dropdown.Item eventKey="custom">Custom</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        {values.material === 'custom' && (
          <Form.Group>
            <Form.Label>
              Custom Material Density (g/cm<sup>3</sup>)
            </Form.Label>
            <Form.Control
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
            name="diameter"
            onChange={handleChange}
            type="number"
            value={values.diameter}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Current Weight (g)</Form.Label>
          <Form.Control
            name="currentWeight"
            onChange={handleChange}
            type="number"
            value={values.currentWeight}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Net Weight (g)</Form.Label>
          <Form.Control
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
