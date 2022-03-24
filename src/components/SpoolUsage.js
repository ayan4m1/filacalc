import { useFormik } from 'formik';
import { useCallback } from 'react';
import { Form, Dropdown, Alert } from 'react-bootstrap';

import Layout from 'components/Layout';
import ResultsCard from 'components/ResultsCard';
import { getMaterial, getSpool, materials, spools } from 'utils';

export default function SpoolUsage() {
  const initialValues = {
    brand: null,
    material: null,
    diameter: 1.75,
    netWeight: 1000,
    currentWeight: 0
  };

  const { values, handleChange, setFieldValue } = useFormik({ initialValues });

  const changeBrand = useCallback(
    (name) => setFieldValue('brand', name),
    [setFieldValue]
  );
  const changeMaterial = useCallback(
    (name) => setFieldValue('material', name),
    [setFieldValue]
  );

  let remainingMass = 0,
    remainingPercent = 0,
    remainingVolume = 0,
    remainingLength = 0,
    showWarning = false;

  if (values.brand && values.material) {
    remainingMass = Math.max(
      0,
      values.currentWeight - getSpool(values.brand).mass
    );

    if (remainingMass === 0) {
      showWarning = true;
    }

    remainingVolume = remainingMass / getMaterial(values.material).density;
    remainingLength =
      remainingVolume / (Math.PI * Math.pow(values.diameter / 2.0, 2));

    if (values.netWeight > 0) {
      remainingPercent = (remainingMass / values.netWeight) * 1e2;
    }
  }

  return (
    <Layout title="Spool Usage">
      <h1>Spool Usage</h1>
      <Form>
        <Form.Group>
          <Form.Label>Brand</Form.Label>
          <Dropdown onSelect={changeBrand}>
            <Dropdown.Toggle variant="primary">
              {values.brand ? values.brand : 'Select One'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {spools.map((spool) => (
                <Dropdown.Item
                  key={spool.brand}
                  eventKey={spool.brand}
                  value={spool.brand}
                >
                  {spool.brand}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group>
          <Form.Label>Material</Form.Label>
          <Dropdown onSelect={changeMaterial}>
            <Dropdown.Toggle variant="primary">
              {values.material ? values.material : 'Select One'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {materials.map((material) => (
                <Dropdown.Item
                  key={material.name}
                  eventKey={material.name}
                  value={material.name}
                >
                  {material.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group>
          <Form.Label>Filament Diameter (mm)</Form.Label>
          <Form.Control
            type="text"
            name="diameter"
            onChange={handleChange}
            value={values.diameter}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Current Weight (g)</Form.Label>
          <Form.Control
            type="text"
            name="currentWeight"
            onChange={handleChange}
            value={values.currentWeight}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Net Weight (g)</Form.Label>
          <Form.Control
            type="text"
            name="netWeight"
            onChange={handleChange}
            value={values.netWeight}
          />
        </Form.Group>
      </Form>
      {showWarning && (
        <Alert className="mt-4" variant="warning">
          Spool weight looks incorrect, it should be empty.
        </Alert>
      )}
      {remainingMass > 0 && (
        <ResultsCard
          title="Remaining Filament"
          results={[
            {
              label: 'Mass',
              content: <span>{Math.round(remainingMass)} g</span>
            },
            {
              label: 'Percentage',
              content: <span>{Math.round(remainingPercent)} %</span>
            },
            {
              label: 'Length',
              content: <span>{remainingLength.toFixed(2)} m</span>
            }
          ]}
        />
      )}
    </Layout>
  );
}
