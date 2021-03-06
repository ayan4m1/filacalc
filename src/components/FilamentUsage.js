import { useCallback } from 'react';
import { Form } from 'react-bootstrap';

import FormPage from 'components/FormPage';
import { materials, getMaterial } from 'utils';

export default function FilamentUsage() {
  return (
    <FormPage
      calculate={useCallback((vals) => {
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
      }, [])}
      description="Use this calculator to determine how much filament a given print will
        consume. You can either enter the filament length manually or parse a
        G-code file to derive this information."
      initialValues={{
        material: '',
        diameter: 1.75,
        length: 0,
        price: 0,
        customMaterialDensity: 0
      }}
      renderForm={(
        { handleBlur, handleChange, values },
        { error: parserError, handleChange: handleFileChange }
      ) => (
        <Form>
          <Form.Group>
            <Form.Label>Select a G-code file</Form.Label>
            <Form.Control
              isInvalid={parserError}
              onChange={handleFileChange}
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
      )}
      shouldShow={useCallback(
        (vals, touched) =>
          touched.material || vals.material || touched.length || vals.length,
        []
      )}
      title="Filament Usage"
      validate={useCallback((vals) => {
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
      }, [])}
    />
  );
}
