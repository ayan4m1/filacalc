import { useFormik } from 'formik';
import { Fragment, useCallback } from 'react';
import { Card, Container, Form, Dropdown } from 'react-bootstrap';

import Header from 'components/Header';

const materials = [
  { name: 'PLA', density: 1.24 },
  { name: 'ABS', density: 1.04 },
  { name: 'PETG', density: 1.27 },
  { name: 'Nylon', density: 1.52 },
  { name: 'TPU', density: 1.21 },
  { name: 'PC', density: 1.3 },
  { name: 'CF', density: 1.3 },
  { name: 'HIPS', density: 1.03 },
  { name: 'PVA', density: 1.23 },
  { name: 'ASA', density: 1.05 },
  { name: 'PP', density: 0.9 },
  { name: 'POM', density: 1.4 },
  { name: 'PMMA', density: 1.18 }
];

export default function App() {
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
    density = materials.find(
      (material) => material.name === values.material
    ).density;
    mass = volume * density;

    if (values.price > 0) {
      cost = (mass / 1e3) * values.price;
    }
  }

  return (
    <Fragment>
      <Header />
      <Container>
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
          <Card body className="my-4">
            <Card.Title>Results</Card.Title>
            <Card.Text>
              <strong>Volume</strong> {volume.toFixed(2)} cm<sup>3</sup>
            </Card.Text>
            <Card.Text>
              <strong>Mass</strong> {mass.toFixed(2)}g
            </Card.Text>
            <Card.Text>
              <strong>Cost</strong> {cost.toFixed(2)}
            </Card.Text>
          </Card>
        )}
      </Container>
    </Fragment>
  );
}
