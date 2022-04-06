import { useFormik } from 'formik';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import {
  Col,
  Row,
  Form,
  Dropdown,
  Spinner,
  ProgressBar,
  Alert,
  Container
} from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import ResultsCard from 'components/ResultsCard';
import parserWorker from 'workers/parser';
import { createWebWorker, materials, getMaterial } from 'utils';

export default function FilamentUsage() {
  const ParserWorker = useMemo(() => createWebWorker(parserWorker), []);
  const [parseError, setParseError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
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

  const parseHandler = ({ data }) => {
    switch (data.type) {
      case 'progress':
        setProgress(data.progress);
        break;
      case 'result':
        setFieldValue('length', data.length.toFixed(2));
        setLoading(false);
        break;
      case 'error':
        setParseError(true);
        setLoading(false);
        break;
      default:
        break;
    }
  };

  const changeMaterial = useCallback(
    (name) => setFieldValue('material', name),
    [setFieldValue]
  );
  const changeFile = useCallback(
    (event) => {
      setParseError(false);
      setLoading(true);
      setProgress(0);

      const [file] = event.target.files;

      if (!file || !file.name.endsWith('.gcode')) {
        setParseError(true);
        setLoading(false);
        return;
      }

      ParserWorker.postMessage(file);
    },
    [setLoading, ParserWorker]
  );

  let mass = 0,
    volume = 0,
    density = 0,
    cost = 0;

  if (values.material || values.customMaterialDensity) {
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

  useEffect(() => {
    ParserWorker.addEventListener('message', parseHandler);

    return () => ParserWorker.removeEventListener('message', parseHandler);
  });

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
              <ProgressBar variant="primary" animated now={progress} />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }

  const showResults = Boolean(values.material);
  const showWarning = !showResults && values.length > 0 && !touched.material;

  let materialLabel = 'Select One';

  if (values.material) {
    if (values.material === 'custom') {
      materialLabel = 'Custom';
    } else {
      materialLabel = values.material;
    }
  }

  return (
    <Fragment>
      <Helmet title="Filament Usage" />
      <h1>Filament Usage</h1>
      <Form>
        <Form.Group>
          <Form.Label>Select a G-code file</Form.Label>
          <Form.Control
            type="file"
            onChange={changeFile}
            isInvalid={parseError}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Unable to parse the selected file.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>Material</Form.Label>
          <Dropdown onSelect={changeMaterial}>
            <Dropdown.Toggle variant="primary">{materialLabel}</Dropdown.Toggle>
            <Dropdown.Menu>
              {materials.map((material) => (
                <Dropdown.Item key={material.name} eventKey={material.name}>
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
              type="number"
              name="customMaterialDensity"
              value={values.customMaterialDensity}
              onChange={handleChange}
            />
          </Form.Group>
        )}
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
      {showWarning && (
        <Alert variant="warning" className="my-4">
          Select a material
        </Alert>
      )}
    </Fragment>
  );
}
