import { useCallback } from 'react';
import {
  Form,
  Col,
  Row,
  Container,
  Spinner,
  ProgressBar
} from 'react-bootstrap';

import { Calculator } from '../components/Calculator';
import useCalculatorForm from '../hooks/useCalculatorForm';
import { useSettingsContext } from '../hooks/useSettingsContext';
import useParser from '../hooks/useParser';
import { FilamentUsageForm } from '../types';
import { materials, getMaterial } from '../utils';

export default function FilamentUsage() {
  const { filamentDiameter } = useSettingsContext();
  const {
    formik: { setFieldValue, handleBlur, handleChange, values },
    errors,
    results
  } = useCalculatorForm<FilamentUsageForm>({
    initialValues: {
      material: '',
      diameter: filamentDiameter,
      length: 0,
      price: 0,
      customMaterialDensity: 0
    },
    shouldShow: useCallback(
      (vals, touched) =>
        touched.material || vals.material || touched.length || vals.length,
      []
    ),
    validate: useCallback((vals) => {
      const result = [];

      if (!vals.material) {
        result.push('Select a material.');
      }

      if (vals.length <= 0) {
        result.push('Extrusion length must be greater than zero.');
      }

      if (vals.diameter <= 0) {
        result.push('Filament diameter must be greater than zero.');
      }

      return result;
    }, []),
    calculate: useCallback((vals) => {
      const volume =
        (Math.PI * Math.pow(vals.diameter / 2.0, 2) * (vals.length * 1e3)) /
        1e3;
      const density =
        vals.material !== 'custom'
          ? getMaterial(vals.material).density
          : vals.customMaterialDensity;
      const mass = volume * density;

      let cost = 0;

      if (vals.price > 0) {
        cost = (mass / 1e3) * vals.price;
      }

      return [
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
      ];
    }, [])
  });
  const parser = useParser(
    useCallback(
      (data) => setFieldValue('length', data.length.toFixed(2)),
      [setFieldValue]
    )
  );

  if (parser.loading) {
    return (
      <Calculator>
        <Calculator.Heading title="Filament Usage" />
        <Container>
          <Row>
            <Col className="text-center">
              <h4>Parsing your G-code...</h4>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              <Spinner animation="border" className="my-3" />
              <ProgressBar animated now={parser.progress} variant="primary" />
            </Col>
          </Row>
        </Container>
      </Calculator>
    );
  }

  return (
    <Calculator>
      <Calculator.Heading title="Filament Usage" />
      <Calculator.Description>
        <p>
          Use this calculator to determine how much filament a given print will
          consume.
        </p>
        <p>
          You can either enter the filament length manually or parse a G-code
          file to derive this information.
        </p>
      </Calculator.Description>
      <Form>
        <Form.Group>
          <Form.Label>Select a G-code file</Form.Label>
          <Form.Control
            isInvalid={parser.error}
            onChange={parser.handleChange}
            type="file"
          />
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
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.material}
          >
            <option value="">Select One</option>
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
            onBlur={handleBlur}
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
      <Calculator.Errors errors={errors} />
      <Calculator.Results results={results} />
    </Calculator>
  );
}
