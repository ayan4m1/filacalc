import { useFormik } from 'formik';
import { useCallback } from 'react';
import { Form, Dropdown } from 'react-bootstrap';

import Layout from 'components/Layout';
import ResultsCard from 'components/ResultsCard';
import { materials, getMaterial } from 'utils';

export default function FilamentUsage() {
  const initialValues = {
    material: null,
    diameter: 1.75,
    length: 1,
    price: 0
  };

  const { values, handleChange, setFieldValue } = useFormik({
    initialValues
  });

  const changeMaterial = useCallback(
    (name) => setFieldValue('material', name),
    [setFieldValue]
  );

  let mass = 0,
    volume = 0,
    density = 0,
    cost = 0;

  if (values.material) {
    volume =
      (Math.PI * Math.pow(values.diameter / 2.0, 2) * (values.length * 1e3)) /
      1e3;
    density = getMaterial(values.material).density;
    mass = volume * density;

    if (values.price > 0) {
      cost = (mass / 1e3) * values.price;
    }
  }

  return (
    <Layout title="Filament Usage">
      <h1>Filament Usage</h1>
      <Form>
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
          <Form.Label>Diameter (mm)</Form.Label>
          <Form.Control
            name="diameter"
            onChange={handleChange}
            value={values.diameter}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Length (m)</Form.Label>
          <Form.Control
            name="length"
            onChange={handleChange}
            value={values.length}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price (cost/kg)</Form.Label>
          <Form.Control
            name="price"
            onChange={handleChange}
            value={values.price}
          />
        </Form.Group>
      </Form>
      {Boolean(values.material) && (
        <ResultsCard
          results={[
            {
              label: 'Volume',
              content: (
                <span>
                  {volume.toFixed(2)} cm<sup>3</sup>
                </span>
              )
            },
            { label: 'Mass', content: <span>{mass.toFixed(2)} g</span> },
            { label: 'Cost', content: <span>{cost.toFixed(2)}</span> }
          ]}
        />
      )}
    </Layout>
  );
}
