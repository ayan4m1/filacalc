import { useCallback } from 'react';
import { Form } from 'react-bootstrap';

import { Calculator } from '../components/Calculator';
import useCalculatorForm from '../hooks/useCalculatorForm';
import { useSettingsContext } from '../hooks/useSettingsContext';
import { SpoolDimensionsForm } from '../types';
import { materials, getMaterial } from '../utils';

export default function SpoolDimensions() {
  const { filamentDiameter } = useSettingsContext();
  const {
    formik: { values, handleBlur, handleChange },
    errors,
    results
  } = useCalculatorForm<SpoolDimensionsForm>({
    initialValues: {
      material: '',
      customMaterialDensity: 0,
      filamentDiameter,
      outerDiameter: 0,
      spoolDiameter: 0,
      spoolWidth: 0
    },
    shouldShow: useCallback(
      (vals, touched) =>
        touched.material ||
        vals.material ||
        touched.outerDiameter ||
        touched.spoolDiameter ||
        touched.spoolWidth,
      []
    ),
    validate: useCallback((vals) => {
      const result = [];

      if (!vals.material) {
        result.push('Select a material.');
      }

      if (vals.outerDiameter <= 0) {
        result.push('Filament outer diameter must be greater than zero.');
      }

      if (vals.spoolDiameter <= 0) {
        result.push('Spool diameter must be greater than zero.');
      }

      if (vals.spoolDiameter > vals.outerDiameter) {
        result.push(
          'Spool diameter should be less than filament outer diameter.'
        );
      }

      if (vals.spoolWidth <= 0) {
        result.push('Spool width must be greater than zero.');
      }

      return result;
    }, []),
    calculate: useCallback((vals) => {
      const materialDensity =
        vals.material !== 'custom'
          ? getMaterial(vals.material).density
          : parseFloat(vals.customMaterialDensity);
      const remainingLength =
        ((Math.pow(vals.outerDiameter, 2) - Math.pow(vals.spoolDiameter, 2)) *
          Math.PI *
          vals.spoolWidth *
          0.8) /
        4 /
        Math.pow(vals.filamentDiameter, 2) /
        1e3;
      const remainingVolume =
        Math.PI * Math.pow(vals.filamentDiameter / 2, 2) * remainingLength;
      const remainingMass = materialDensity * remainingVolume;

      return [
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
      ];
    }, [])
  });

  return (
    <Calculator>
      <Calculator.Heading title="Spool Usage - Dimensions" />
      <Calculator.Description>
        <p>
          Use this calculator to determine the amount of filament remaining on a
          partially used spool.
        </p>
        <p>
          Enter the spool dimensions and the calculator will estimate the
          remaining filament.
        </p>
      </Calculator.Description>
      <Form>
        <Form.Group>
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
          <Form.Label>Filament diameter (mm)</Form.Label>
          <Form.Control
            min="0"
            name="filamentDiameter"
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
            onChange={handleChange}
            type="number"
            value={values.spoolWidth}
          />
        </Form.Group>
      </Form>
      <Calculator.Errors errors={errors} />
      <Calculator.Results results={results} title="Remaining Filament" />
    </Calculator>
  );
}
