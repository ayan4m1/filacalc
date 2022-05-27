import { useCallback } from 'react';
import { Form, ProgressBar } from 'react-bootstrap';

import { Calculator } from 'components/Calculator';
import useCalculatorForm from 'hooks/useCalculatorForm';
import { useSettingsContext } from 'hooks/useSettingsContext';
import { getRemainingFilament, getSpool, materials, spools } from 'utils';

export default function SpoolWeight() {
  const { filamentDiameter } = useSettingsContext();
  const {
    formik: { values, handleBlur, handleChange },
    errors,
    results
  } = useCalculatorForm({
    initialValues: {
      brand: '',
      material: '',
      filamentDiameter,
      netWeight: 1000,
      currentWeight: 0,
      spoolWeight: 0,
      materialDensity: 0
    },
    shouldShow: useCallback(
      (vals, touched) =>
        touched.brand || vals.brand || touched.material || vals.material,
      []
    ),
    validate: useCallback((vals) => {
      const result = [];

      if (vals.currentWeight <= 0) {
        result.push('Current spool weight must be greater than zero.');
      }

      if (vals.netWeight <= 0) {
        result.push('Net weight must be greater than zero');
      }

      if (!vals.brand) {
        result.push('Select a brand.');
      } else {
        const spoolMass =
          vals.brand !== 'custom'
            ? getSpool(vals.brand).mass
            : parseFloat(vals.customSpoolMass);
        const remainingMass = Math.max(0, vals.currentWeight - spoolMass);

        if (remainingMass === 0) {
          result.push('Spool weight looks incorrect, it should be empty.');
        }
      }

      if (!vals.material) {
        result.push('Select a material.');
      }

      return result;
    }, []),
    calculate: useCallback((vals) => {
      if (vals.brand !== 'custom') {
        vals.spoolWeight = getSpool(vals.brand).mass;
      }

      const {
        mass: remainingMass,
        volume: remainingVolume,
        length: remainingLength,
        percent: remainingPercent
      } = getRemainingFilament(vals);

      let progressVariant = 'success';

      if (remainingPercent <= 25) {
        progressVariant = 'danger';
      } else if (remainingPercent <= 50) {
        progressVariant = 'warning';
      }

      return [
        {
          label: 'Mass',
          content: <span>{Math.round(remainingMass)} g</span>
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
        }
      ];
    }, [])
  });

  return (
    <Calculator>
      <Calculator.Heading title="Spool Usage - Weight" />
      <Calculator.Description>
        <p>
          Use this calculator to determine the amount of filament remaining on a
          partially used spool.
        </p>
        <p>
          Enter the current net weight and the spool weight and the calculator
          will determine the amount of remaining filament.
        </p>
      </Calculator.Description>
      <Form>
        <Form.Group>
          <Form.Label>Brand</Form.Label>
          <Form.Select
            name="brand"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.brand}
          >
            <option value="">Select One</option>
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
          <Form.Label>Filament Diameter (mm)</Form.Label>
          <Form.Control
            min="0"
            name="filamentDiameter"
            onChange={handleChange}
            type="number"
            value={values.filamentDiameter}
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
      <Calculator.Errors errors={errors} />
      <Calculator.Results results={results} title="Remaining Filament" />
    </Calculator>
  );
}
