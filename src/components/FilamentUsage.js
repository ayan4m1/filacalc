import { useFormik } from 'formik';
import { Fragment, useCallback } from 'react';
import {
  Col,
  Row,
  Form,
  Spinner,
  ProgressBar,
  Alert,
  Container
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import ResultsCard from 'components/ResultsCard';
import { materials, getMaterial } from 'utils';
import useParser from 'hooks/useParser';

export default function FilamentUsage() {
  const initialValues = {
    material: null,
    diameter: 1.75,
    length: 0,
    price: 0,
    customMaterialDensity: 0
  };

  const { values, touched, handleChange, setFieldValue } = useFormik({
    initialValues
  });

  const { loading, error, progress, parse } = useParser((data) =>
    setFieldValue('length', data.length.toFixed(2))
  );

  const changeFile = useCallback(
    (event) => parse(event.target.files[0]),
    [parse]
  );

  if (loading) {
    return (
      <Fragment>
        <Helmet title="Filament Usage" />
        <h1>Filament Usage</h1>
        <Container>
          <Row>
            <Col className="text-center">
              <h4>Parsing your G-code...</h4>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Spinner animation="border" className="my-3" />
              <ProgressBar animated now={progress} variant="primary" />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }

  let mass = 0,
    volume = 0,
    density = 0,
    cost = 0;

  const showResults = Boolean(
    (values.material || values.customMaterialDensity) &&
      values.length > 0 &&
      values.diameter > 0
  );
  const showWarning = !showResults && values.length > 0 && !touched.material;

  if (showResults) {
    volume =
      (Math.PI * Math.pow(values.diameter / 2.0, 2) * (values.length * 1e3)) /
      1e3;
    density =
      values.material !== 'custom'
        ? getMaterial(values.material).density
        : values.customMaterialDensity;
    mass = volume * density;

    if (values.price > 0) {
      cost = (mass / 1e3) * values.price;
    }
  }

  return (
    <Fragment>
      <Helmet title="Filament Usage" />
      <h1>Filament Usage</h1>
      <p>
        Use this calculator to determine how much filament a given print will
        consume. You can either enter the filament length manually or parse a
        G-code file to derive this information.
      </p>
      <Form>
        <Form.Group>
          <Form.Label>Select a G-code file</Form.Label>
          <Form.Control isInvalid={error} onChange={changeFile} type="file" />
          <Form.Text className="text-muted">
            Files are parsed in your browser, not sent to a server.
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            Unable to parse the selected file.
          </Form.Control.Feedback>
        </Form.Group>
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
          <Form.Label>Diameter (mm)</Form.Label>
          <Form.Control
            min="0"
            name="diameter"
            onChange={handleChange}
            value={values.diameter}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Length (m)</Form.Label>
          <Form.Control
            min="0"
            name="length"
            onChange={handleChange}
            value={values.length}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price (cost/kg)</Form.Label>
          <Form.Control
            min="0"
            name="price"
            onChange={handleChange}
            value={values.price}
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
              label: 'Volume',
              content: (
                <span>
                  {volume.toFixed(2)} cm<sup>3</sup>
                </span>
              )
            },
            { label: 'Mass', content: <span>{mass.toFixed(2)} g</span> },
            { label: 'Cost', content: <span>{cost.toFixed(2)}</span> },
            {
              label: 'Prints per kg',
              content: <span>{Math.floor(1e3 / mass)}</span>
            }
          ]}
        />
      )}
    </Fragment>
  );
}
